<script lang="ts">
	import { key } from '.';
	import type { Writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';
	let items: string[] = [];
	let buttons: HTMLButtonElement[] = [];
	let container: HTMLDivElement;
	export let value: Writable<number>;

	let indicator: HTMLDivElement;
	setContext(key, {
		set: (newValue: any) => value.set(newValue),
		addItem: (value: any, title: string) => items[value] = title,
		current: value
	});

	$: if (indicator) {
		const button = buttons[$value];
		if (button) {
			indicator.style.left = `${button.getBoundingClientRect().left - container.getBoundingClientRect().left}px`;
			indicator.style.width = `${button.getBoundingClientRect().width}px`;
		}
	}
</script>

<div class="container" bind:this={container}>
	<div class="buttons">
		{#each items as title, val}
			<button type="button" class="focusable" tabindex={val} bind:this={buttons[val]} class:selected={$value === val} on:click={() => value.set(val)}>
				{title}
			</button>
		{/each}
		<div class="indicator" bind:this={indicator}/>
	</div>
	<div class="content">
		<slot/>
	</div>
</div>

<style lang="scss">
	.container {
		.buttons {
			height: 36px;
			display: flex;
			overflow: hidden;
			position: relative;
			background: var(--background-secondary);
			margin-bottom: 8px;
			border-radius: 12px;
			button {
				flex: 1 auto;
				color: var(--color-secondary);
				border: none;
				outline: none;
				padding: 0 16px;
				background: none;
				transition: .25s background;
				font-family: var(--font-primary);
				&:hover, &:focus, &.selected {
					color: var(--color-primary);
					background: var(--background-tertiary);
				}
			}
			.indicator {
				bottom: 0;
				height: 4px;
				position: absolute;
				transition: .25s left, .25s width;
				background: var(--button-background);
			}
		}
	}
</style>