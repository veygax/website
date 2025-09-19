<script lang="ts">
	export let meta: { description?: string; tracks?: number; followers?: number } | undefined;
</script>

<div class="space-y-2">
	<h3 class="text-neutral-200">Playlist</h3>
	<p class="text-sm text-neutral-400">{meta?.description ?? 'A curated mix to focus.'}</p>
	<div class="grid grid-cols-3 gap-4 text-xs text-neutral-400">
		<div><span class="text-neutral-500">Tracks:</span> {meta?.tracks ?? 0}</div>
		<div><span class="text-neutral-500">Followers:</span> {meta?.followers ?? 0}</div>
		<div><span class="text-neutral-500">Updated:</span> {new Date().toLocaleDateString()}</div>
	</div>
</div>
