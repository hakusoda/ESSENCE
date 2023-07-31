<script lang="ts">
import { writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';

	import '../../styles/components/menu.scss';
	import { key } from '.';
	export let value: any;
	export let placeholder: string;

	let show = false;
	let inner: any;
	let items: Record<any, HTMLElement> = {};
	const store = writable(value);
	setContext(key, {
		set: (newValue: any, html: any) => {
			value = newValue, $store = newValue;
			inner = html;
			show = false;
		},
		items,
		current: store
	});

	onMount(() => inner = items[value]?.childNodes);
</script>

<button type="button" class="trigger focusable" on:click={() => show = true}>
	<div class="item">
		{#if inner}
			{#each [...inner].slice(0, inner[inner.length - 1]?.tagName === 'svg' ? -1 : undefined) as element}
				{@html element.outerHTML ?? element.textContent}
			{/each}
		{:else}
			{placeholder}
		{/if}
	</div>
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
	</svg>
	<button type="button" class="cover" class:show on:click|stopPropagation={() => show = false}/>
	<div class="menu-content" class:show>
		<slot/>
	</div>
</button>

<style lang="scss">
	.trigger {
		gap: 32px;
		color: var(--color-primary);
		height: 32px;
		border: none;
		padding: 0 16px;
		display: inline-flex;
		position: relative;
		min-width: 192px;
		font-size: .75em;
		background: none;
		box-sizing: border-box;
		transition: box-shadow .25s;
		box-shadow: 0 0 0 1px var(--border-primary);
		user-select: none;
		align-items: center;
		font-family: var(--font-primary);
		border-radius: 4px;
		justify-content: space-between;
		.item {
			gap: 8px;
			display: flex;
			align-items: center;
		}
		&:hover {
			box-shadow: 0 0 0 1px var(--border-secondary);
		}
	}
	.menu-content {
		top: -9px;
		left: -13px;
		min-width: 100%;
	}
	.cover {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
		display: none;
		position: fixed;
		background: none;
		&.show {
			display: block
		}
	}
</style>