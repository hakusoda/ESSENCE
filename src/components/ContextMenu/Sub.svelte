<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { key } from '.';
	const currentItem: Writable<HTMLElement | null> = getContext(key);

	let top = 0;
	let left = 0;
	let isLeft = false;
	let element: HTMLDivElement;
	let menuElement: HTMLDialogElement;
	$: hover = $currentItem === element || element?.contains($currentItem);
	$: if (menuElement) {
		const rect = element.getBoundingClientRect(), rect2 = menuElement.getBoundingClientRect();
		top = Math.min(rect.y, window.innerHeight - rect2.height - 80);

		const l = rect.x + rect.width + 16;
		left = (isLeft = l + rect2.width > window.innerWidth - 16) ? rect.x - rect2.width - 32 : l;

		// TODO: revert to popover when firefox supports it
		menuElement.showModal();
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="sub-context-menu" bind:this={element}>
	<button type="button" class="sub-context-menu-trigger" class:hover>
		<slot name="trigger"/>
		<svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
			<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
		</svg>
	</button>
	{#if hover}
	<!-- svelte-ignore a11y-autofocus -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<dialog class="context-menu menu-content show" class:left={isLeft} autofocus bind:this={menuElement} on:click={() => menuElement.close()} style={`top: ${top}px; left: ${left}px`} on:toggle={event => {
			if (event.newState !== 'open')
				hover = false;
		}}>
			<slot/>
		</dialog>
	{/if}
</div>

<style lang="scss">
	.sub-context-menu {
		.menu-content {
			position: fixed;
			transform-origin: left center;
			&.left {
				transform-origin: right center;
			}
			&::backdrop {
				display: none;
			}
		}
		svg.chevron {
			margin-left: auto;
		}
	}
</style>