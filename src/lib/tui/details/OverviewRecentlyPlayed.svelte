<script lang="ts">
	export let meta: Record<string, unknown> | undefined;
</script>

<div class="space-y-2">
	<h3 class="text-neutral-200">Recently Played</h3>
	<p class="text-sm text-neutral-400">
		{meta?.description ?? 'Your last few sessions at a glance.'}
	</p>
	<ul class="ml-5 list-disc text-sm text-neutral-300">
		{#each (meta?.tracks as any[]) ?? [] as track}
			<li>{track.artist} — {track.title}</li>
		{/each}
	</ul>
</div>
