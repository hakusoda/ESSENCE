<script lang="ts">
	// TODO: rewrite to work in SSR
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import { key } from '.';
	import { clamp } from '../../util';

	const currentItem = writable<HTMLElement | null>(null);
	setContext(key, currentItem);

	let arrow: SVGSVGElement;
	let content: HTMLDivElement;
	let dialogElement: HTMLDialogElement;
	export const trigger = (event: MouseEvent) => {
		dialogElement.showModal();
		content.style.display = 'block';

		const target = event.target! as HTMLElement;

		// TODO: clean-up 👍
		const width = window.innerWidth, height = window.innerHeight;
		const rect1 = target.getBoundingClientRect(), rect2 = content.getBoundingClientRect();
		let top = rect1.y + rect1.height + 16;
		if (top > height - rect2.height - 24) {
			top = rect1.y - rect2.height - 24;
			arrow.style.top = '100%';
			arrow.style.transform = 'translate(-50%, 0) rotate(180deg)';
		} else
			arrow.style.top = '', arrow.style.transform = '';

		const left = clamp(rect1.x + rect1.width / 2 - rect2.width / 2, 32, width - rect2.width - 32);
		arrow.style.left = `${rect1.x - left + rect1.width / 2}px`;
		content.style.top = `${top}px`;
		content.style.left = `${left}px`;
		content.style.display = '';
	};

	const clickHandler = ({ target }: MouseEvent) => {
		if (target) {
			const { classList, nodeName } = target as HTMLElement;
			if ((nodeName === 'BUTTON' || nodeName === 'A') && !classList.contains('sub-context-menu-trigger'))
				dialogElement.close(), $currentItem = null;
		}
	};
	const moveHandler = ({ target }: MouseEvent) => {
		if (target) {
			const { nodeName } = target as HTMLElement;
			if (nodeName === 'BUTTON' || nodeName === 'A')
				$currentItem = target as HTMLElement;
		}
	};
</script>

<!-- svelte-ignore a11y-autofocus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog autofocus bind:this={dialogElement} on:click|self={() => (dialogElement.close(), $currentItem = null)}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="context-menu menu-content show" bind:this={content} on:click={clickHandler} on:mousemove={moveHandler}>
		<slot/>
		<svg class="arrow" width="10" height="5" viewBox="0 0 30 10" bind:this={arrow}>
			<polygon points="0,10 30,10 15,0" fill="currentColor"/>
		</svg>
	</div>
</dialog>

<style lang="scss">
	dialog {
		width: 100%;
		border: none;
		height: 100%;
		background: none;
		.menu-content {
			position: absolute;
		}
		&::backdrop {
			display: none;
		}
		.arrow {
			display: none; // temporary
		}
	}
</style>