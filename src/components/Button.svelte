<script lang="ts">
	import { classCombine } from '../util';
	import { createEventDispatcher } from 'svelte';

	export let as: 'button' | 'a' | 'summary' | 'input' | 'file' = 'button';
	export let href = '';
	if (href)
		as = 'a';

	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let value = '';
	export let color:
		| 'accent'
		| 'primary'
		| 'primary-light'
		| 'secondary'
		| 'tertiary'
		| 'danger'
		| 'danger-light'
		| 'transparent' = 'accent';

	export let raised = false;

	export let badge = false;
	export let disabled = false;

	export let title = '';
	export let target = '';

	let className: string;
	$: className = classCombine([
		'button',
		`button--size-${size}`,
		`button--color-${color}`,
		(raised && 'button--raised') as string,
		(badge && 'has-badge') as string,
	]);

	const dispatch = createEventDispatcher();
	const dispatchClick = () => {
		if (!disabled)
			dispatch('click');
	};
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
	<a class={className} {href} {disabled} {title} {target} on:click={dispatchClick}>
		<slot />
	</a>
{:else if as === 'input'}
	<input class={className} {value} {disabled} {title} on:click={dispatchClick} />
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
	<svelte:element this={as} class={className} {disabled} {title} on:click={dispatchClick}>
		<slot/>
	</svelte:element>
{/if}

<style lang="scss">
	.button {
		gap: 8px;
		width: fit-content;
		color: var(--button-color);
		border: none;
		cursor: pointer;
		height: fit-content;
		outline: 0;
		display: inline-flex;
		padding: 6px 12px;
		position: relative;
		font-size: 12px;
		box-shadow: var(--button-shadow);
		font-weight: 450;
		font-family: var(--font-primary);
		line-height: 1.43;
		align-items: center;
		border-radius: 4px;
		justify-content: center;
		background-color: var(--color-button-bg);

		&--raised {
			box-shadow: var(--shadow-inset-sm), var(--shadow-raised);
			background-color: var(--color-raised-bg);
		}
		&:hover:not(&--color-transparent, &:disabled) {
			background: var(--button-background-hover);
		}
		&:active:not(&--color-transparent, &:disabled) {
			color: var(--button-color-active);
			box-shadow: none;
			background: var(--button-background-active);
		}
		&--color {
			&-accent {
				background: var(--button-background);
			}
			&-primary {
				color: var(--color-brand-contrast);
				background-color: var(--color-brand);
			}
			&-primary-light {
				background-color: var(--color-brand-light);
			}
			&-secondary {
				background-color: var(--color-secondary);
				color: var(--color-brand-contrast);
			}
			&-tertiary {
				background-color: var(--color-tertiary);
			}
			&-transparent {
				background-color: transparent;
				box-shadow: none;
				filter: brightness(1) !important;
				&:hover {
					background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
				}
				&:active {
					background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0 0);
				}
			}
			&-danger {
				background-color: var(--color-badge-red-dot);
				color: var(--color-brand-contrast);
			}
			&-danger-light {
				background-color: var(--color-danger-bg);
				color: var(--color-danger-text);
			}
		}
		&:disabled {
			cursor: not-allowed;
			filter: grayscale(50%);
			opacity: 50%;
		}
		&.has-badge::after {
			top: 0.5rem;
			right: 0.5rem;
			width: 0.5rem;
			height: 0.5rem;
			content: '';
			position: absolute;
			border-radius: var(--rounded-max);
			background-color: var(--color-brand);
		}
		input[type='file'] {
			display: none;
		}
	}
</style>