<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import resize from '../../util/resize';
	import { key } from '.';
	export let value: number;

	let _143 = 1;
	let items: string[] = [];
	let buttons: HTMLButtonElement[] = [];
	let container: HTMLDivElement;
	let indicator: HTMLDivElement;

	const store = writable(value);
	setContext(key, {
		set: (newValue: any) => (value = newValue, $store = newValue),
		addItem: (value: any, title: string) => items[value] = title,
		current: store
	});

	$: if (indicator && _143) {
		const button = buttons[$store];
		if (button) {
			indicator.style.left = `${button.getBoundingClientRect().left - container.getBoundingClientRect().left}px`;
			indicator.style.width = `${button.getBoundingClientRect().width}px`;
		}
	}
</script>

<div class="tabs-container" bind:this={container}>
	<div class="buttons" use:resize={() => _143++}>
		{#each items as title, val}
			<button type="button" class="focusable" tabindex={val} bind:this={buttons[val]} class:selected={value === val} on:click={() => (value = val, $store = val)}>
				{title}
			</button>
		{/each}
		<div class="indicator" bind:this={indicator}/>
	</div>
	<div>
		<slot/>
	</div>
</div>

<style lang="scss">
	.tabs-container {
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