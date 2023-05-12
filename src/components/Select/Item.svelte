<script lang="ts">
	import { key } from '.';
	import { getContext } from 'svelte';
	const { set, items, current } = getContext<any>(key);

	export let value: any;

	$: selected = $current === value;
</script>

<button type="button" class="focusable" bind:this={items[value]} class:selected on:click|stopPropagation={() => set(value, items[value].childNodes)}>
	<slot/>
	{#if selected}
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
			<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
		</svg>
	{/if}
</button>

<style lang="scss">
	button {
		gap: 8px;
		width: 100%;
		color: var(--color-primary);
		height: 32px;
		border: none;
		display: flex;
		padding: 0 8px;
		background: none;
		transition: background .25s, box-shadow .25s;
		user-select: none;
		font-family: inherit;
		
		align-items: center;
		border-radius: 4px;
		svg {
			margin-left: auto;
		}
		&:hover {
			color: var(--button-color);
			box-shadow: var(--button-shadow);
			background: var(--button-background);
		}
		&.selected {
			font-weight: 500;
		}
	}
</style>