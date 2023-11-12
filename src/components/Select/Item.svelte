<script lang="ts">
	import { key } from '.';
	import { getContext } from 'svelte';
	export let value: any;

	const { set, items, query, current } = getContext<any>(key) ?? { items: [], current: {} };

	let element: HTMLButtonElement;
	$: $items[value] = element;

	$: selected = $current.values?.includes(value) || $current.value === value;
</script>

<button type="button" class="focusable" class:hidden={!element?.textContent?.toLowerCase().includes($query?.toLowerCase())} bind:this={element} class:selected on:click|stopPropagation={() => set(value)}>
	<slot/>
	{#if selected}
		<svg class="indicator" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
			<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
		</svg>
	{/if}
</button>