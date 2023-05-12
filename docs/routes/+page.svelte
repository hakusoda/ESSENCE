<script lang="ts">
	import { Button, Select } from 'voxeliface';

	import { theme } from '../stores';
	const themes = ['dark', 'light', 'color|purple'];
</script>

<h1>burgers</h1>
<p>holy bingle. what?! :3</p>
<p class="sub">i omor</p>
<div>
	<Button>Button</Button>
	<Button disabled>Disabled</Button>
</div>

<p class="theme-select">
	theme
	<Select.Root value={theme} placeholder="Select a value">
		<p>Themes</p>
		{#each themes as theme}
			<Select.Item value={theme}>
				<img src="https://cdn.discordapp.com/attachments/957170483097391124/1102481867405541376/image.png" alt="img" width="16" height="16"/>
				{theme}
			</Select.Item>
		{/each}
	</Select.Root>
</p>

<div class="bg secondary">
	<div class="bg primary">
		holy bingle
	</div>
</div>

<svelte:head>
	<title>burgers</title>
	<meta
		name="description"
		content="burgers"
	/>
</svelte:head>

<style lang="scss">
	.theme-select {
		margin: 16px 0;
		img {
			object-fit: contain;
		}
	}
	.sub {
		color: var(--color-secondary);
	}

	.bg {
		color: var(--color-primary);
		padding: 16px;
		&.primary {
			background: var(--background-primary);
		}
		&.secondary {
			background: var(--background-secondary);
		}
	}
</style>