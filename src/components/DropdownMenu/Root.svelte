<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import { key } from '.';
	import { clamp } from '../../util';

	const currentItem = writable<HTMLElement | null>(null);
	setContext(key, currentItem);

	let show = false;
	export const trigger = () => {
		show = true;
		content.style.display = 'block';

		// TODO: clean-up 👍
		const width = window.innerWidth, height = window.innerHeight;
		const rect1 = container.getBoundingClientRect(), rect2 = content.getBoundingClientRect();
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

	let arrow: SVGSVGElement;
	let content: HTMLDivElement;
	let container: HTMLDivElement;

	const clickHandler = ({ target }: MouseEvent) => {
		if (target) {
			const { nodeName } = target as HTMLElement;
			if (nodeName === 'BUTTON' || nodeName === 'A')
				show = false;
		}
	};
	const moveHandler = ({ target }: MouseEvent) => {
		console.log(target);
		if (target) {
			const { nodeName } = target as HTMLElement;
			console.log(nodeName);
			if (nodeName === 'BUTTON' || nodeName === 'A')
				$currentItem = target as HTMLElement;
		}
	};
</script>

<div class="container" bind:this={container}>
	<slot name="trigger"/>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop" class:show on:click={event => {
	if (event.target === event.currentTarget)
		show = false;
}}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="menu-content" class:show bind:this={content} on:click={clickHandler} on:mousemove={moveHandler}>
		<slot/>
		<svg class="arrow" width="10" height="5" viewBox="0 0 30 10" bind:this={arrow}>
			<polygon points="0,10 30,10 15,0" fill="currentColor"/>
		</svg>
	</div>
</div>

<style lang="scss">
	.container {
		width: fit-content;
		height: fit-content;
		position: relative;
	}
	.backdrop {
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1000;
		position: fixed;
		visibility: hidden;
		.menu-content {
			position: fixed;
		}
		&.show {
			visibility: visible;
		}
	}
</style>