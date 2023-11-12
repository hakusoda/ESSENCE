<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import { key } from '.';
	class EmptyClass {}

	export let value: any = undefined;
	export let values: any[] | null = null;
	export let withSearch = false;
	export let placeholder: string = '';

	let show = false;
	let query = writable('');
	let inner: string[] | NodeListOf<HTMLElement>;
	let items = writable({} as Record<any, HTMLElement>);
	let menuElement: HTMLDivElement;
	let searchElement: HTMLInputElement;

	const store = writable({ value, values });
	setContext(key, {
		set: (newValue: any) => {
			if (values)
				values = values.includes(newValue) ? values.filter(item => item !== newValue) : [...values, newValue];
			else
				value = newValue, show = false;
		},
		items,
		query,
		current: store
	});
	
	$: $store = { value, values }, inner = values ? values.map(item => $items[item]?.textContent?.trim()) : $items[value]?.childNodes as any;
	
	let top = 0;
	let left = 0;
	let width = 0;
	let container: HTMLButtonElement;
	$: if (show) {
		const rect = container.getBoundingClientRect(), rect2 = menuElement.getBoundingClientRect();
		top = Math.max(Math.min(rect.y - 8, window.innerHeight - rect2.height - 80), 16);
		left = rect.x - 8;
		width = rect.width + 16;
	}
</script>

<button type="button" class="select-trigger focusable" class:multi={!!values?.length} on:click={() => {
	show = true;
	if (searchElement)
		requestAnimationFrame(() => searchElement.focus());
}} bind:this={container}>
	<div class="item" class:placeholder={!inner?.length}>
		{#if inner instanceof (globalThis.NodeList ?? EmptyClass)}
			{#each [...inner].slice(0, inner[inner.length - 1]?.tagName === 'svg' ? -1 : undefined) as element}
				{@html element.outerHTML ?? element.textContent}
			{/each}
		{:else if inner?.length}
			{#each inner as item}
				<p>{item}</p>
			{/each}
		{:else}
			{placeholder}
		{/if}
	</div>
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
	</svg>
</button>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop" class:show on:click|self={() => show = false}>
	<div class="menu-content" class:show style={`top: ${top}px; left: ${left}px; width: ${width}px`} bind:this={menuElement}>
		{#if withSearch}
			<!-- svelte-ignore a11y-autofocus -->
			<input type="text" class="search focusable" bind:this={searchElement} bind:value={$query} placeholder="Search..." on:keydown={event => {
				if (event.key === 'Enter') {
					const element = menuElement.children[1];
					if (element instanceof HTMLElement)
						element.focus();
				}
			}}/>
		{/if}
		<slot/>
	</div>
</div>

<style lang="scss">
	.select-trigger {
		gap: 32px;
		color: var(--color-primary);
		height: 40px;
		border: none;
		cursor: pointer;
		padding: 0 20px;
		display: inline-flex;
		min-width: 192px;
		font-size: 14px;
		box-sizing: border-box;
		transition: box-shadow .5s;
		background: var(--background-secondary);
		box-shadow: inset 0 0 0 1px var(--border-primary);
		font-weight: 500;
		user-select: none;
		align-items: center;
		white-space: nowrap;
		font-family: var(--font-primary);
		border-radius: 20px;
		justify-content: space-between;
		&.multi {
			gap: 8px;
			padding-left: 8px;
			.item {
				mask: linear-gradient(to right, #fff calc(100% - 32px), transparent);
				-webkit-mask: linear-gradient(to right, #fff calc(100% - 32px), transparent);
				border-radius: 0 20px 20px 0;
			}
		}
		.item {
			gap: 8px;
			width: -webkit-fill-available;
			display: flex;
			overflow: hidden;
			align-items: center;
			&.placeholder {
				color: var(--color-secondary);
			}
			p {
				margin: 0;
				height: 28px;
				display: flex;
				padding: 0 16px;
				font-size: .9em;
				background: #ffffff0d;
				box-shadow: inset 0 0 0 1px #ffffff40;
				font-weight: 400;
				align-items: center;
				line-height: normal;
				border-radius: 16px;
			}
		}
		&:hover {
			box-shadow: inset 0 0 0 1px var(--border-secondary);
		}
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