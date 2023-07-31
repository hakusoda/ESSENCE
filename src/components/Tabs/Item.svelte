<script lang="ts">
	import { key } from '.';
	import { onMount, getContext } from 'svelte';
	const { addItem, current, removeItem } = getContext<any>(key);

	export let value: number;
	export let title: string;

	$: selected = $current === value;

	onMount(() => {
		addItem(value, title);
		return () => removeItem(value);
	});
</script>

{#if selected}
	<div>
		<slot/>
	</div>
{/if}