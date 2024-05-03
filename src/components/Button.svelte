<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { classCombine } from '../util';
	export let as: 'button' | 'a' | 'summary' | 'input' | 'file' = 'button';
	export let href = '';
	if (href)
		as = 'a';

	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let value = '';
	export let colour: 'accent' | 'secondary' = 'accent';

	export let circle = false;
	export let disabled = false;

	export let title = '';
	export let target = '';

	let className: string;
	$: className = classCombine([
		'button',
		`button--size-${size}`,
		`button--colour-${colour}`,
		(circle && 'button--circle') as string
	]);

	const dispatch = createEventDispatcher();
	const handleChangeFiles = (event: Event) => {
		if (!disabled)
			dispatch('files', (event.target as HTMLInputElement).files || new FileList());
	};
	const handleDropFiles = (event: DragEvent) => {
		event.preventDefault();
		if (!disabled)
			dispatch('files', event.dataTransfer?.files || new FileList());
	};
</script>

{#if as === 'a'}
	<a class={className} {href} {disabled} {title} {target} on:click>
		<slot />
	</a>
{:else if as === 'input'}
	<input class={className} {value} {disabled} {title} on:click/>
{:else if as === 'file'}
	<label
		class={className}
		{disabled}
		{title}
		on:drop={handleDropFiles}
		on:dragover={(event) => event.preventDefault()}>
		<input type="file" on:change={handleChangeFiles} />
		<slot />
	</label>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svelte:element this={as} class={className} {disabled} {title} tabindex="0" on:click>
		<slot/>
	</svelte:element>
{/if}

<style lang="scss">
	.button {
		gap: 8px;
		width: fit-content;
		height: 40px;
		border: none;
		cursor: pointer;
		outline: 0;
		padding: 0 24px;
		display: inline-flex;
		position: relative;
		font-size: 14px;
		transition: background .5s, box-shadow .5s;
		font-weight: 600;
		line-height: 38px;
		align-items: center;
		font-family: var(--font-primary);
		border-radius: 20px;
		text-decoration: none;
		justify-content: center;

		&--circle {
			width: 40px;
			padding: 0;
			border-radius: 50%;
		}
		&--colour {
			&-accent {
				color: var(--button-color);
				background: var(--button-background);
				box-shadow: inset 0 0 0 1px var(--button-border);
				&:not(:disabled):hover {
					background: var(--button-background-hover);
				}
			}
			&-secondary {
				color: #fff;
				background: none;
				box-shadow: inset 0 0 0 1px #fff;
				&:not(:disabled):hover {
					background: #ffffff0d;
					box-shadow: inset 0 0 0 1px #ffffff80;
				}
			}
		}
		&:disabled {
			cursor: not-allowed;
			filter: grayscale(50%);
			opacity: 50%;
		}
		input[type='file'] {
			display: none;
		}
	}
</style>