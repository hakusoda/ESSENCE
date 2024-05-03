<script lang="ts">
	export let min: string | number | null | undefined = null;
	export let max: string | number | null | undefined = null;
	export let step: string | number | null | undefined = null;
	export let value: number | null | undefined = 0;
	export let string = '0';
	export let placeholder = '';
	export let no_controls = false;
	$: string = value ? value.toString() : '0';

	let interval: number | undefined = undefined;
	const startInterval = (step: number) => {
		clearInterval(interval);
		interval = setInterval(() => value! += step, 100);
	};
	const stopInterval = () => (interval = undefined, clearInterval(interval));

	const inc = (increment: number) => value = (value ?? 0) + increment;
	$: stepNum = Number(step ?? 1);
</script>

<div class="number_input" class:no_controls>
	{#if !no_controls}
		<button type="button" on:click={() => inc(stepNum)}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
			</svg>
		</button>
	{/if}
	<input {min} {max} {step} type="number" {placeholder} bind:value/>
	{#if !no_controls}
		<button type="button" on:click={() => inc(-stepNum)}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
			</svg>
		</button>
	{/if}
</div>

<style lang="scss">
	.number_input {
		width: fit-content;
		color: var(--color-primary);
		height: 40px;
		display: inline-flex;
		position: relative;
		font-size: 14px;
		transition: box-shadow .5s;
		background: var(--background-secondary);
		font-weight: 500;
		font-family: var(--font-primary);
		border-radius: 20px;
		&.no_controls {
			box-shadow: inset 0 0 0 1px var(--border-primary);
			&:hover {
				box-shadow: inset 0 0 0 1px var(--border-secondary);
			}
			input {
				min-width: 192px;
				clip-path: none;
				box-shadow: none;
				text-align: unset;
				&:hover {
					box-shadow: none;
				}
			}
		}
		&::placeholder {
			color: var(--color-tertiary);
		}
		input {
			width: 0;
			color: inherit;
			height: 100%;
			border: none;
			display: flex;
			outline: none;
			padding: 0 20px;
			min-width: 32px;
			font-size: inherit;
			clip-path: polygon(0 0, 100% 0, 100% 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - 1px), 100% calc(100% - 1px), 100% 100%, 0 100%, 0 calc(100% - 1px), 1px calc(100% - 1px), 1px 1px, 0 1px);
			background: none;
			text-align: center;
			font-weight: inherit;
			font-family: inherit;
			font-variant-numeric: tabular-nums;
			&::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
				display: none;
			}
		}
		button {
			width: 40px;
			color: inherit;
			height: 40px;
			border: none;
			cursor: pointer;
			padding: 0 0 0 4px;
			background: none;
			border-radius: 20px 0 0 20px;
			&:last-child {
				padding: 0 4px 0 0;
				border-radius: 0 20px 20px 0;
			}
			&:hover {
				background: #ffffff0d;
			}
		}
		input, button {
			transition: background .5s, box-shadow .5s;
			box-shadow: inset 0 0 0 1px var(--border-primary);
			&:focus {
				stroke: none;
			}
			&:hover {
				box-shadow: inset 0 0 0 1px var(--border-secondary);
			}
		}
		&:has(input:focus) {
			animation: forwards awesome_focus ease-out .25s;
		}
	}
</style>