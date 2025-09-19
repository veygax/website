<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { TuiConfig } from '$lib/tui/types';
	import { tuiConfig } from '$lib/tui/config';

	let config: TuiConfig = tuiConfig;

	let activeTabIndex = 0;
	let selectedIndex = 0;
	let focusColumn: 'tabs' | 'list' | 'details' = 'tabs';

	let now = new Date();
	let clockInterval: number | undefined;

	const setFocus = (column: typeof focusColumn) => {
		focusColumn = column;
	};

	const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

	const onKey = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowLeft':
			case 'h':
				if (focusColumn === 'list') setFocus('tabs');
				else if (focusColumn === 'details') setFocus('list');
				e.preventDefault();
				break;
			case 'ArrowRight':
			case 'l':
				if (focusColumn === 'tabs') setFocus('list');
				else if (focusColumn === 'list') setFocus('details');
				e.preventDefault();
				break;
			case 'ArrowUp':
			case 'k': {
				if (focusColumn === 'tabs') {
					activeTabIndex = clamp(activeTabIndex - 1, 0, config.tabs.length - 1);
					selectedIndex = 0;
				} else if (focusColumn === 'list') {
					const items = config.tabs[activeTabIndex]?.items ?? [];
					selectedIndex = clamp(selectedIndex - 1, 0, items.length - 1);
				}
				e.preventDefault();
				break;
			}
			case 'ArrowDown':
			case 'j': {
				if (focusColumn === 'tabs') {
					activeTabIndex = clamp(activeTabIndex + 1, 0, config.tabs.length - 1);
					selectedIndex = 0;
				} else if (focusColumn === 'list') {
					const items = config.tabs[activeTabIndex]?.items ?? [];
					selectedIndex = clamp(selectedIndex + 1, 0, items.length - 1);
				}
				e.preventDefault();
				break;
			}
			case 'Enter':
			case ' ': {
				if (focusColumn === 'tabs') {
					setFocus('list');
				} else if (focusColumn === 'list') {
					setFocus('details');
				}
				e.preventDefault();
				break;
			}
			case 'g': {
				if (e.ctrlKey) break;
				if (focusColumn === 'list') selectedIndex = 0;
				e.preventDefault();
				break;
			}
			case 'G': {
				const items = config.tabs[activeTabIndex]?.items ?? [];
				if (focusColumn === 'list') selectedIndex = Math.max(0, items.length - 1);
				e.preventDefault();
				break;
			}
			case 'Tab': {
				if (focusColumn === 'tabs') setFocus('list');
				else if (focusColumn === 'list') setFocus('details');
				else setFocus('tabs');
				e.preventDefault();
				break;
			}
			case 'q':
				// noop escape gesture placeholder
				e.preventDefault();
				break;
		}
	};

	onMount(() => {
		const id = setInterval(() => (now = new Date()), 1000);
		clockInterval = id as unknown as number;
		window.addEventListener('keydown', onKey);
	});

	onDestroy(() => {
		if (clockInterval) clearInterval(clockInterval);
		window.removeEventListener('keydown', onKey);
	});
</script>

<div class="min-h-screen bg-neutral-950 font-mono text-neutral-200 select-none">
	<div class="mx-auto max-w-7xl p-4">
		<div class="grid grid-cols-12 gap-4">
			<!-- Tabs / Sections -->
			<section class="col-span-2">
				<div class="rounded border border-neutral-700">
					<div class="border-b border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-400">
						Sections
					</div>
					<ul>
						{#each config.tabs as tab, i}
							<li
								class="border-b border-neutral-800 last:border-b-0"
								class:bg-neutral-800={i === activeTabIndex}
							>
								<button
									type="button"
									class="w-full cursor-pointer px-3 py-2 text-left"
									class:text-emerald-400={focusColumn === 'tabs' && i === activeTabIndex}
									on:click={() => {
										activeTabIndex = i;
										selectedIndex = 0;
										setFocus('list');
									}}
								>
									{i === activeTabIndex ? '▸ ' : '  '}
									{tab.label}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</section>

			<!-- List -->
			<section class="col-span-5">
				<div class="flex h-[70vh] flex-col rounded border border-neutral-700">
					<div
						class="flex items-center justify-between border-b border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-400"
					>
						<span>{config.tabs[activeTabIndex]?.label}</span>
						<span class="text-xs">{config.tabs[activeTabIndex]?.items.length ?? 0} items</span>
					</div>
					<div class="overflow-auto">
						<ul>
							{#each config.tabs[activeTabIndex]?.items ?? [] as item, idx}
								<li
									class="cursor-default border-b border-neutral-800 px-3 py-2 last:border-b-0"
									class:bg-neutral-800={idx === selectedIndex}
									class:text-emerald-400={focusColumn === 'list' && idx === selectedIndex}
									on:mouseenter={() => (selectedIndex = idx)}
								>
									{idx === selectedIndex ? '➜ ' : '  '}
									{item.label}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</section>

			<!-- Details -->
			<section class="col-span-5">
				<div class="flex h-[70vh] flex-col rounded border border-neutral-700">
					<div class="border-b border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-400">
						Details
					</div>
					<div class="p-4 text-sm leading-relaxed">
						{#if config.tabs[activeTabIndex]?.items[selectedIndex]?.detail}
							<svelte:component
								this={config.tabs[activeTabIndex].items[selectedIndex].detail}
								meta={config.tabs[activeTabIndex].items[selectedIndex].meta}
							/>
						{:else}
							<div class="text-neutral-400">No details for this item.</div>
						{/if}
					</div>
				</div>
			</section>
		</div>

		<!-- Status Bar -->
		<footer class="mt-4 rounded border border-neutral-700 bg-neutral-900 text-neutral-300">
			<div class="flex items-center justify-between px-3 py-2 text-xs">
				<div>
					<span class="text-neutral-500">Keys:</span>
					<span class="ml-2">h/j/k/l</span>
					<span class="ml-2">←/→/↑/↓</span>
					<span class="ml-2">Enter</span>
					<span class="ml-2">Tab</span>
					<span class="ml-2">g/G</span>
				</div>
				<div class="text-neutral-500">{now.toLocaleTimeString()}</div>
			</div>
		</footer>
	</div>
</div>

<style>
	:global(html, body) {
		height: 100%;
	}
	:global(*) {
		outline: none;
	}
	:global(::selection) {
		background: rgba(16, 185, 129, 0.25);
	}
</style>
