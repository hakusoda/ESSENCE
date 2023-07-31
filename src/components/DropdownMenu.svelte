<script lang="ts">
	import { clamp } from '../util';

	let show = false;
	export const trigger = () => {
		show = true;
		content.style.display = 'block';

		// TODO: clean-up 👍
		const width = window.innerWidth, height = window.innerHeight;
		const rect1 = container.getBoundingClientRect(), rect2 = content.getBoundingClientRect();
		let top = rect1.y + rect1.height + 8;
		if (top > height - rect2.height - 8) {
			top = rect1.y - rect2.height - 8;
			arrow.style.top = '100%';
			arrow.style.transform = 'translate(-50%, 0) rotate(180deg)';
		} else
			arrow.style.top = '', arrow.style.transform = '';

		const left = clamp(rect1.x + rect1.width / 2 - rect2.width / 2, 16, width - rect2.width - 8);
		arrow.style.left = `${rect1.x - left + rect1.width / 2}px`;
		content.style.top = `${top}px`;
		content.style.left = `${left}px`;
		content.style.display = '';
	};

	let arrow: SVGSVGElement;
	let content: HTMLDivElement;
	let backdrop: HTMLDivElement;
	let container: HTMLDivElement;

	const clickHandler = ({ target }: MouseEvent) => {
		if (target) {
			const { nodeName } = target as HTMLElement;
			if (nodeName === 'BUTTON' || nodeName === 'A')
				show = false;
		}
	};
</script>

<div class="container" bind:this={container}>
	<slot name="trigger"/>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop" class:show bind:this={backdrop} on:click={event => {
	if (event.target === backdrop)
		show = false;
}}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="menu-content" class:show bind:this={content} on:click={clickHandler}>
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