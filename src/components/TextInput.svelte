<script lang="ts">
	export let value = '';
	export let placeholder = '';
</script>

<input type="text" class="focusable" {placeholder} bind:value={value}/>

<style lang="scss">
	input {
		color: var(--color-primary);
		height: 32px;
		border: none;
		padding: 0 16px;
		display: inline-flex;
		min-width: 192px;
		font-size: .75em;
		background: none;
		box-sizing: border-box;
		transition: box-shadow .25s;
		box-shadow: 0 0 0 1px var(--border-primary);
		font-family: var(--font-primary);
		border-radius: 4px;
		&:hover {
			box-shadow: 0 0 0 1px var(--border-secondary);
		}
		&::placeholder {
			color: var(--color-secondary);
		}
	}
</style>