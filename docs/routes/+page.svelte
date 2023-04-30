<script lang="ts">
	import { Button } from 'voxeliface';

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
	<select bind:value={$theme}>
		{#each themes as theme}
			<option value={theme}>{theme}</option>
		{/each}
	</select>
</p>

<svelte:head>
	<title>burgers</title>
	<meta
		name="description"
		content="burgers"
	/>
</svelte:head>

<style>
	.theme-select {
		margin: 16px 0;
	}
	.sub {
		color: var(--color-secondary);
	}
</style>