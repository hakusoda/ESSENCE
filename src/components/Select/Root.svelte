<script lang="ts">
	import { key } from '.';
	import type { Writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';
	let show = false;
	let inner: any;
	let items: Record<any, HTMLElement> = {};
	export let value: Writable<any>;
	export let placeholder: string;

	setContext(key, {
		set: (newValue: any, html: any) => {
			value.set(newValue);
			inner = html;
			show = false;
		},
		items,
		current: value
	});

	onMount(() => {
		inner = items[$value]?.childNodes;
		console.log(inner);
	});
</script>

<button type="button" class="trigger" on:click={() => show = true}>
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
	<div class="content" class:show>
		<slot/>
	</div>
</button>

<style lang="scss">
	.trigger {
		gap: 32px;
		color: var(--color-primary);
		height: 32px;
		border: none;
		outline: none;
		padding: 0 16px;
		display: inline-flex;
		position: relative;
		min-width: 192px;
		font-size: .75em;
		box-sizing: border-box;
		transition: box-shadow .25s;
		background: var(--background-primary);
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
		&:focus {
			animation: 1s infinite alternate basic-focus;
		}
	}
	.content {
		top: -9px;
		left: -13px;
		width: 100%;
		border: 1px solid var(--border-primary);
		display: none;
		z-index: 1000;
		padding: 8px 12px;
		overflow: hidden;
		position: absolute;
		animation: show .25s cubic-bezier(0, 0, 0, 1.0);
		background: var(--background-primary);
		box-shadow: rgb(22 23 24 / 35%) 0px 0px 20px 4px;
		border-radius: 8px;
		:global(p) {
			color: var(--color-secondary);
			margin: 0;
			padding: 0 8px;
			text-align: start;
			font-weight: 400;
			line-height: 24px;
		}
		&.show {
			display: block;
		}
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

	@keyframes show {
		0% {
			opacity: 0;
			transform: translateY(16px);
		}
		100% {
			opacity: 1;
			transform: none;
		}
	}
</style>