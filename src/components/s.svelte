<script lang="ts">
	let open = false;
</script>

<button type="button" class="trigger" on:click={() => open = true}>
	<slot name="trigger"/>
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
	</svg>
</button>

<div class="content" class:show={open}>
	<slot name="content"/>
</div>

<style lang="scss">
	.trigger {
		gap: 32px;
		color: var(--color-primary);
		height: 32px;
		border: 1px solid var(--border-primary);
		display: inline-flex;
		padding: 0 16px;
		position: relative;
		font-size: .75em;
		box-sizing: border-box;
		transition: border .25s;
		background: var(--background-primary);
		user-select: none;
		align-items: center;
		border-radius: 4px;
		justify-content: space-between;
		&:hover {
			border-color: var(--border-secondary);
		}
	}
	.content {
		border: 1px solid var(--border-primary);
		display: none;
		z-index: 1000;
		padding: 8px 12px;
		overflow: hidden;
		position: absolute;
		background: var(--background-primary);
		box-shadow: rgb(22 23 24 / 35%) 0px 0px 20px 4px;
		border-radius: 4px;
		:global(option) {
			color: var(--color-primary);
			height: 24px;
			display: flex;
			padding: 0 8px;
			font-size: .75em;
			user-select: none;
			align-items: center;
			border-radius: 4px;
			&:hover {
				color: var(--button-color);
				box-shadow: var(--button-shadow);
				background: var(--button-background);
			}
		}
		&.show {
			display: block;
		}
	}
</style>