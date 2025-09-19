<script lang="ts">
	export let meta:
		| {
				displayName?: string;
				email?: string;
				sshKey?: string;
		  }
		| undefined;
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
		<div>
			<span class="text-neutral-500">ssh key:</span>
			<code
				class="ml-2 block max-w-full rounded bg-neutral-900 px-1 py-0.5 text-[11px] break-all text-emerald-400"
				>{meta?.sshKey ?? '—'}</code
			>
		</div>
	</div>
</div>
