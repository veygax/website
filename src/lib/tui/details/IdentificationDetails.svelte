<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let meta:
		| {
				displayName?: string;
				email?: string;
				sshKey?: string;
				pgpKey?: string;
		  }
		| undefined;

	let copied = false;
	let downloadUrl: string | null = null;

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(meta?.pgpKey ?? '');
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {}
	};

	onMount(() => {
		const blob = new Blob([meta?.pgpKey ?? ''], { type: 'text/plain' });
		downloadUrl = URL.createObjectURL(blob);
	});

	onDestroy(() => {
		if (downloadUrl) URL.revokeObjectURL(downloadUrl);
	});
</script>

<div class="space-y-3">
	<h3 class="text-neutral-200">identification</h3>
	<div class="text-sm text-neutral-400">
		<div class="mb-2">
			<span class="text-neutral-500">display name:</span>
			<span class="ml-2 text-neutral-300">{meta?.displayName ?? '—'}</span>
		</div>
		<div class="mb-2">
			<span class="text-neutral-500">email:</span>
			{#if meta?.email}
				<a
					class="ml-2 text-neutral-300 underline decoration-neutral-700 hover:decoration-emerald-500"
					href={`mailto:${meta.email}`}
				>
					{meta.email}
				</a>
			{:else}
				<span class="ml-2">—</span>
			{/if}
		</div>
		<div class="mb-3">
			<span class="text-neutral-500">ssh key:</span>
			<code
				class="ml-2 block max-w-full rounded bg-neutral-900 px-1 py-0.5 text-[11px] break-all text-emerald-400"
				>{meta?.sshKey ?? '—'}</code
			>
		</div>

		<div>
			<div class="mb-2 flex flex-wrap items-center gap-2">
				<span class="text-neutral-500">gpg key:</span>
				<button
					type="button"
					class="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-800"
					on:click={copy}
					aria-label="Copy PGP public key"
				>
					{#if copied}copied!{:else}copy{/if}
				</button>
				{#if downloadUrl}
					<a
						class="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-800"
						href={downloadUrl}
						download="veygax-gpg-pub.asc"
						rel="noopener noreferrer"
					>
						download .asc
					</a>
				{/if}
			</div>
			<pre
				class="max-h-64 overflow-auto rounded border border-neutral-800 bg-neutral-900 p-3 text-[11px] leading-relaxed break-all whitespace-pre-wrap text-emerald-400 select-text sm:max-h-80 sm:text-xs"><code
					>{meta?.pgpKey ?? ''}</code
				></pre>
		</div>
	</div>
</div>
