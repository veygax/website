<script lang="ts">
	export let meta:
		| {
				name?: string;
				description?: string;
				url?: string;
				stack?: string[];
		  }
		| undefined;
</script>

<div class="space-y-2">
	<h3 class="text-neutral-200">{meta?.name ?? 'Untitled Project'}</h3>
	<p class="text-sm text-neutral-400">
		{meta?.description ?? 'A future thing. Details coming soon.'}
	</p>
	<div class="grid grid-cols-2 gap-4 text-xs text-neutral-400">
		<div><span class="text-neutral-500">URL:</span> {meta?.url ?? '—'}</div>
		<div><span class="text-neutral-500">Stack:</span> {(meta?.stack ?? []).join(', ') || '—'}</div>
	</div>
</div>
