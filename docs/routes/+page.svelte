<script lang="ts">
	import { writable } from 'svelte/store';
	import { Tabs, Button, Select, DropdownMenu } from 'voxeliface';

	import { theme } from '../stores';
	const themes = ['dark', 'light', 'color|purple'];

	const tabsTest = writable(0);

	let dropdownTrigger: () => void;
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

<Tabs.Root value={tabsTest}>
	<Tabs.Item value={0} title="ohayō">
		good morning!
	</Tabs.Item>
	<Tabs.Item value={1} title="konbanwa">
		good evening!
	</Tabs.Item>
	<Tabs.Item value={2} title="oyasumi">
		good night!
	</Tabs.Item>
</Tabs.Root>

<div class="bg secondary">
	burgers
	<div class="bg primary">
		143 143 143 143 143 143
	</div>
</div>

<div class="test">
	<DropdownMenu bind:trigger={dropdownTrigger}>
		<Button slot="trigger" on:click={dropdownTrigger}>touchdown!</Button>
		<p>User Options</p>
		<a href="/">Your Profile</a>
		<div class="separator"/>
		<button>Sign out</button>
	</DropdownMenu>
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
		margin-top: 16px;
		&.primary {
			background: var(--background-primary);
		}
		&.secondary {
			background: var(--background-secondary);
		}
	}
	.test {
		margin: 50rem 0 50rem auto;
	}
</style>