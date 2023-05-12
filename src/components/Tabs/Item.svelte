<script lang="ts">
	import { key } from '.';
	import { onMount, getContext } from 'svelte';
	const { addItem, current } = getContext<any>(key);

	export let value: number;
	export let title: string;

	$: selected = $current === value;

	onMount(() => addItem(value, title));
</script>

{#if selected}
	<div>
		<slot/>
	</div>
{/if}