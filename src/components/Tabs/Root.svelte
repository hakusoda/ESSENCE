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
		removeItem: (itemValue: any) => {
			items = items.filter((_,index) => index !== itemValue);
			if (value === itemValue)
				value = items.findIndex(() => true);
		},
		current: store
	});

	$: if (indicator && _143) {
		const button = buttons[$store];
		if (button) {
			indicator.style.left = `${button.getBoundingClientRect().left - container.getBoundingClientRect().left}px`;
			indicator.style.width = `${button.getBoundingClientRect().width}px`;
		}
	}

	$: value = items[value] === undefined ? items.findIndex(() => true) : value;
</script>

<div class="tabs-container" bind:this={container}>
	<div class="buttons" use:resize={() => _143++}>
		{#each items as title, val}
			<button type="button" tabindex={val} bind:this={buttons[val]} class:selected={value === val} on:click={() => (value = val, $store = val)}>
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
			height: 40px;
			display: flex;
			overflow: hidden;
			position: relative;
			background: var(--background-secondary);
			box-shadow: inset 0 0 0 1px var(--border-primary);
			margin-bottom: 8px;
			border-radius: 20px;
			button {
				flex: 1 auto;
				color: var(--color-secondary);
				border: none;
				outline: none;
				padding: 0 16px;
				background: none;
				transition: .25s background;
				font-weight: 500;
				font-family: var(--font-primary);
				&:hover, &:focus, &.selected {
					color: var(--color-primary);
					background: var(--background-tertiary);
				}
				&.selected {
					font-weight: 600;
				}
			}
			.indicator {
				bottom: 0;
				height: 4px;
				position: absolute;
				transition: .5s left, .5s width;
				background: var(--button-background);
			}
		}
	}
</style>