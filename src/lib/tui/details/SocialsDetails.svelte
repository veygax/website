<script lang="ts">
	import { onMount } from 'svelte';

	type SocialInput = { platform: string; handle: string };

	export let meta: { socials?: SocialInput[] } | undefined;

	type SocialResolved = SocialInput & {
		count: number | null;
		metric: string | null;
		url: string | null;
		loading: boolean;
	};

	let resolved: SocialResolved[] = [];

	const fetchSocial = async (
		platform: string,
		handle: string
	): Promise<{ count: number; metric: string; url: string }> => {
		const params = new URLSearchParams({ platform, handle });
		const res = await fetch(`/api/socials?${params.toString()}`);
		if (!res.ok) throw new Error('Failed to fetch social info');
		return (await res.json()) as { count: number; metric: string; url: string };
	};

	onMount(async () => {
		const list = meta?.socials ?? [];
		resolved = list.map((s) => ({ ...s, count: null, metric: null, url: null, loading: true }));
		await Promise.all(
			resolved.map(async (item, idx) => {
				try {
					const data = await fetchSocial(item.platform, item.handle);
					resolved[idx] = {
						...item,
						count: data.count,
						metric: data.metric,
						url: data.url,
						loading: false
					};
				} catch (err) {
					resolved[idx] = { ...item, count: 0, metric: null, url: null, loading: false };
				}
			})
		);
	});
</script>

<div class="space-y-3">
	<h3 class="text-neutral-200">socials</h3>
	{#if (meta?.socials ?? []).length}
		<ul class="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
			{#each resolved as s}
				<li
					class="flex items-center justify-between rounded border border-neutral-800 bg-neutral-900 px-3 py-2"
				>
					<div class="min-w-0 flex-1 text-neutral-300">
						<span class="text-neutral-500">{s.platform}:</span>
						{#if s.url}
							<a
								class="ml-1 inline-block max-w-full truncate underline decoration-neutral-700 hover:decoration-emerald-500"
								href={s.url}
								target="_blank"
								rel={s.platform === 'Mastodon' ? 'me noopener noreferrer' : 'noopener noreferrer'}
								>{s.handle}</a
							>
						{:else}
							<span class="ml-1 inline-block max-w-full truncate">{s.handle}</span>
						{/if}
					</div>
					{#if s.platform.toLowerCase() !== 'x'}
						<div class="shrink-0 pl-3 text-right text-xs text-neutral-400">
							<span class="text-neutral-500">{s.metric ?? 'metric'}:</span>
							{#if s.loading}
								<span>…</span>
							{:else}
								{s.count ?? 0}
							{/if}
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<div class="text-sm text-neutral-400">No socials yet.</div>
	{/if}
</div>
