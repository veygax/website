import type { RequestHandler } from '@sveltejs/kit';

type KnownPlatform = 'github' | 'x' | 'mastodon' | 'codeberg';

const platformResolvers: Record<KnownPlatform, (handle: string) => Promise<{ count: number; metric: string; url: string }>> = {
  async github(handle: string) {
    const user = handle.replace(/^@/, '');
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}`);
      if (!res.ok) throw new Error('github error');
      const data = (await res.json()) as { public_repos?: number; html_url?: string } & Record<string, unknown>;
      const count = (data.public_repos as number | undefined) ?? (data['repo_count'] as number | undefined) ?? 0;
      return { count, metric: 'repos', url: data.html_url ?? `https://github.com/${user}` };
    } catch {
      return { count: 0, metric: 'repos', url: `https://github.com/${user}` };
    }
  },
  async x(handle: string) { // no unauth public metric available
    const user = handle.replace(/^@/, '');
    return { count: 0, metric: 'followers', url: `https://x.com/${user}` };
  },
  async mastodon(handle: string) {
    // handle like @name@instance or name@instance
    const m = handle.match(/^@?([^@]+)@([^@]+)$/);
    if (!m) return { count: 0, metric: 'followers', url: '' };
    const [, name, host] = m;
    const base = `https://${host}`;
    const profileUrl = `${base}/@${name}`;

    const lookup = await fetch(`${base}/api/v1/accounts/lookup?acct=${encodeURIComponent(name)}`);
    if (lookup.ok) {
      const account = (await lookup.json()) as { id?: string; followers_count?: number };
      if (typeof account.followers_count === 'number') {
        return { count: account.followers_count, metric: 'followers', url: profileUrl };
      }
    }
    return { count: 0, metric: 'followers', url: profileUrl };
  },
  async codeberg(handle: string) {
    const user = handle.replace(/^@/, '');
    try {
      const res = await fetch(`https://codeberg.org/api/v1/users/${encodeURIComponent(user)}`);
      if (!res.ok) throw new Error('codeberg error');
      const data = (await res.json()) as { followers_count?: number } & Record<string, unknown>;
      const count = (data.followers_count as number);
      return { count, metric: 'followers', url: `https://codeberg.org/${user}` };
    } catch {
      return { count: 0, metric: 'followers', url: `https://codeberg.org/${user}` };
    }
  }
};

export const GET: RequestHandler = async ({ url }) => {
  const platform = (url.searchParams.get('platform') ?? '').toLowerCase() as KnownPlatform;
  const handle = url.searchParams.get('handle') ?? '';

  if (!platform || !handle) {
    return new Response(JSON.stringify({ error: 'platform and handle required' }), { status: 400 });
  }

  const resolver = platformResolvers[platform as KnownPlatform];
  if (!resolver) {
    return new Response(JSON.stringify({ count: 0, metric: 'unknown', url: null }), { status: 200 });
  }

  const data = await resolver(handle);
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' }
  });
};



