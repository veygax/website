<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { TuiConfig } from '$lib/tui/types';
	import { tuiConfig } from '$lib/tui/config';

	let config: TuiConfig = tuiConfig;

	let activeTabIndex = 0;
	let selectedIndex = 0;
	let focusColumn: 'tabs' | 'list' | 'details' = 'tabs';

	// responsive mobile, single-view flow
	let isMobile = false;
	let mobileStep: 'tabs' | 'list' | 'details' = 'tabs';
	const evaluateIsMobile = () =>
		(isMobile = typeof window !== 'undefined' && window.innerWidth < 768);
	let onResizeHandler: ((this: Window, ev: UIEvent) => any) | null = null;

	let now = new Date();
	let clockInterval: number | undefined;

	const setFocus = (column: typeof focusColumn) => {
		focusColumn = column;
	};

	const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

	const onKey = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowLeft':
			case 'a':
				if (focusColumn === 'list') setFocus('tabs');
				else if (focusColumn === 'details') setFocus('list');
				e.preventDefault();
				break;
			case 'ArrowRight':
			case 'd':
				if (focusColumn === 'tabs') setFocus('list');
				else if (focusColumn === 'list') setFocus('details');
				e.preventDefault();
				break;
			case 'ArrowUp':
			case 'w': {
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
			case 's': {
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
			case 'Enter': {
				if (focusColumn === 'tabs') {
					setFocus('list');
				} else if (focusColumn === 'list') {
					setFocus('tabs');
				}
				e.preventDefault();
				break;
			}

			case 'Tab':
			case ' ': {
				const delta = e.shiftKey ? -1 : 1;
				if (focusColumn === 'tabs') {
					const count = config.tabs.length;
					if (count > 0) {
						activeTabIndex = (activeTabIndex + delta + count) % count;
						selectedIndex = 0;
					}
				} else if (focusColumn === 'list') {
					const items = config.tabs[activeTabIndex]?.items ?? [];
					const count = items.length;
					if (count > 0) {
						selectedIndex = (selectedIndex + delta + count) % count;
					}
				}
				e.preventDefault();
				break;
			}
			case 'q': {
				e.preventDefault();
				history.back();
				break;
			}
		}
	};

	onMount(() => {
		const id = setInterval(() => (now = new Date()), 1000);
		clockInterval = id as unknown as number;
		window.addEventListener('keydown', onKey);
		// setup responsive listener
		evaluateIsMobile();
		onResizeHandler = () => evaluateIsMobile();
		window.addEventListener('resize', onResizeHandler);
	});

	onDestroy(() => {
		if (clockInterval) clearInterval(clockInterval);
		window.removeEventListener('keydown', onKey);
		if (onResizeHandler) window.removeEventListener('resize', onResizeHandler);
	});
</script>

<div class="min-h-screen bg-neutral-950 font-mono text-neutral-200 select-none">
	<div class="mx-auto max-w-7xl p-4">
		{#if isMobile}
			<!-- Mobile: single-view flow -->
			{#if mobileStep === 'tabs'}
				<section>
					<div class="rounded border border-neutral-700">
						<div class="border-b border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-400">
							sections
						</div>
						<ul>
							{#each config.tabs as tab, i}
								<li class="border-b border-neutral-800 last:border-b-0">
									<button
										type="button"
										class="w-full cursor-pointer px-3 py-2 text-left"
										on:click={() => {
											activeTabIndex = i;
											selectedIndex = 0;
											mobileStep = 'list';
										}}
									>
										▸ {tab.label}
									</button>
								</li>
							{/each}
						</ul>
					</div>
				</section>
			{:else if mobileStep === 'list'}
				<section>
					<div class="flex h-[70vh] flex-col rounded border border-neutral-700">
						<div
							class="flex items-center justify-between border-b border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-400"
						>
							<div class="flex items-center gap-2">
								<button
									type="button"
									class="rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-800"
									on:click={() => (mobileStep = 'tabs')}
								>
									← back
								</button>
								<span>{config.tabs[activeTabIndex]?.label}</span>
							</div>
							<span class="text-xs">{config.tabs[activeTabIndex]?.items.length ?? 0} items</span>
						</div>
						<div class="overflow-auto">
							<ul>
								{#each config.tabs[activeTabIndex]?.items ?? [] as item, idx}
									<li class="border-b border-neutral-800 last:border-b-0">
										<button
											type="button"
											class="w-full cursor-pointer px-3 py-2 text-left"
											on:mouseenter={() => (selectedIndex = idx)}
											on:click={() => {
												selectedIndex = idx;
												mobileStep = 'details';
											}}
										>
											{item.label}
										</button>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</section>
			{:else}
				<section>
					<div class="flex h-[70vh] flex-col rounded border border-neutral-700">
						<div
							class="flex items-center justify-between border-b border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-400"
						>
							<div class="flex items-center gap-2">
								<button
									type="button"
									class="rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-800"
									on:click={() => (mobileStep = 'list')}
								>
									← back
								</button>
								<span>details</span>
							</div>
						</div>
						<div class="p-4 text-sm leading-relaxed">
							{#if config.tabs[activeTabIndex]?.items[selectedIndex]?.detail}
								<svelte:component
									this={config.tabs[activeTabIndex].items[selectedIndex].detail}
									meta={config.tabs[activeTabIndex].items[selectedIndex].meta}
								/>
							{:else}
								<div class="text-neutral-400">no details for this item.</div>
							{/if}
						</div>
					</div>
				</section>
			{/if}
		{:else}
			<div class="grid grid-cols-12 gap-4">
				<!-- Tabs / Sections -->
				<section class="col-span-2">
					<div class="rounded border border-neutral-700">
						<div class="border-b border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-400">
							sections
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
							details
						</div>
						<div class="p-4 text-sm leading-relaxed">
							{#if config.tabs[activeTabIndex]?.items[selectedIndex]?.detail}
								<svelte:component
									this={config.tabs[activeTabIndex].items[selectedIndex].detail}
									meta={config.tabs[activeTabIndex].items[selectedIndex].meta}
								/>
							{:else}
								<div class="text-neutral-400">no details for this item.</div>
							{/if}
						</div>
					</div>
				</section>
			</div>
		{/if}

		<!-- Status Bar -->
		<footer class="mt-4 rounded border border-neutral-700 bg-neutral-900 text-neutral-300">
			<div class="flex items-center justify-between px-3 py-2 text-xs">
				<div>
					<span class="text-neutral-500">Keys:</span>
					<span class="ml-2">w/a/s/d</span>
					<span class="ml-2">←/→/↑/↓</span>
					<span class="ml-2">Enter</span>
					<span class="ml-2">Tab</span>
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
