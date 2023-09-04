<script lang="ts">
	export let type: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url' = 'text';
	export let value = '';
	export let multiline = false;
	export let placeholder = '';
	
	const typeAction = (node: HTMLInputElement) => {
		node.type = type
	};
</script>

{#if multiline}
	<span class="text-input focusable" role="textbox" contenteditable bind:innerText={value} style={`--placeholder: "${placeholder}";`}/>
{:else}
	<input class="text-input focusable" {placeholder} bind:value use:typeAction/>
{/if}

<style lang="scss">
	.text-input {
		width: auto;
		color: var(--color-primary);
		border: none;
		height: 40px;
		display: inline-flex;
		padding: 0 20px;
		min-width: 192px;
		font-size: 14px;
		min-height: 32px;
		box-sizing: border-box;
		transition: box-shadow .5s;
		background: var(--background-secondary);
		box-shadow: inset 0 0 0 1px var(--border-primary);
		font-weight: 500;
		line-height: 18px;
		align-items: center;
		font-family: var(--font-primary);
		border-radius: 20px;
		&:hover {
			box-shadow: inset 0 0 0 1px var(--border-secondary);
		}
		&::placeholder {
			color: var(--color-tertiary);
		}
		&[contenteditable] {
			height: unset;
			padding: 11px 20px;
			&:empty::before {
				color: var(--color-tertiary);
				content: var(--placeholder);
			}
		}
	}
</style>