<script lang="ts">
	export let value = '';
	export let multiline = false;
	export let placeholder = '';
</script>

{#if multiline}
	<span class="text-input focusable" role="textbox" contenteditable bind:innerText={value} style={`--placeholder: "${placeholder}";`}/>
{:else}
	<input type="text" class="text-input focusable" {placeholder} bind:value/>
{/if}

<style lang="scss">
	.text-input {
		color: var(--color-primary);
		border: none;
		display: inline-block;
		padding: 9px 16px 8px;
		min-width: 192px;
		font-size: .75em;
		min-height: 32px;
		background: none;
		box-sizing: border-box;
		transition: box-shadow .25s;
		box-shadow: inset 0 0 0 1px var(--border-primary);
		line-height: 1.25;
		font-family: var(--font-primary);
		border-radius: 4px;
		&:hover {
			box-shadow: inset 0 0 0 1px var(--border-secondary);
		}
		&::placeholder {
			color: var(--color-secondary);
		}
		&[contenteditable]:empty::before {
			color: var(--color-secondary);
			content: var(--placeholder);
		}
	}
</style>