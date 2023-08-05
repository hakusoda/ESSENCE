<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { key } from '.';
	const currentItem: Writable<HTMLElement | null> = getContext(key);

	let left = false;
	let element: HTMLDivElement;
	$: hover = $currentItem === element || element?.contains($currentItem);
	$: if (hover) {
		const rect = element.getBoundingClientRect();
		left = rect.x + rect.width + 128 > window.innerWidth;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="sub" bind:this={element}>
	<button type="button" class:hover>
		<slot name="trigger"/>
		<svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
			<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
		</svg>
	</button>
	{#if hover}
		<div class="menu-content show" class:left>
			<slot/>
		</div>
	{/if}
</div>

<style lang="scss">
	.sub {
		position: relative;
		.menu-content {
			top: 0;
			left: calc(100% + 8px);
			animation: show-menu-right .25s cubic-bezier(0, 0, 0, 1.0);
			&.left {
				left: unset;
				right: calc(100% + 8px);
				animation: show-menu-left .25s cubic-bezier(0, 0, 0, 1.0);
			}
		}
		svg.chevron {
			margin-left: auto;
		}
	}
</style>