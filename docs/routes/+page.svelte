<script lang="ts">
	import { Tabs, Button, Select, TextInput, DropdownMenu } from 'voxeliface';

	import { theme } from '../stores';
	const themes = ['dark', 'light', 'color|purple'];

	let tabsTest = 0;
	let inputTest = 'burgers';
	let dropdownTrigger: () => void;
</script>

<h1>{inputTest}</h1>
<p>holy bingle. what?! :3</p>
<p class="sub">i omor</p>
<TextInput bind:value={inputTest} placeholder="burgers"/>
<TextInput multiline placeholder="winner!"/>

<div>
	<Button on:click={() => $theme = 'dark'}>Button</Button>
	<Button disabled>Disabled</Button>
</div>

<p class="theme-select">
	theme
	<Select.Root bind:value={$theme} placeholder="Select a value">
		<p>Themes</p>
		{#each themes as theme}
			<Select.Item value={theme}>
				<img src="https://cdn.discordapp.com/attachments/957170483097391124/1102481867405541376/image.png" alt="img" width="16" height="16"/>
				{theme}
			</Select.Item>
		{/each}
		<Select.Item value="dark">
			LONGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
		</Select.Item>
	</Select.Root>
</p>

<Tabs.Root bind:value={tabsTest}>
	<Tabs.Item value={0} title="ohayō">
		good morning!
	</Tabs.Item>
	<Tabs.Item value={1} title="konbanwa">
		good evening!
	</Tabs.Item>
	{#if !tabsTest}
		<Tabs.Item value={2} title="oyasumi">
			good night!
		</Tabs.Item>
	{/if}
</Tabs.Root>

<div class="bg secondary">
	{inputTest}
	<div class="bg primary">
		143 143 143 143 143 143
	</div>
</div>

<div class="test">
	<DropdownMenu.Root bind:trigger={dropdownTrigger}>
		<Button slot="trigger" on:click={dropdownTrigger}>touchdown!</Button>
		<p>User Options</p>
		<a href="/">Your Profile</a>
		<div class="separator"/>
		<DropdownMenu.Sub>
			<svelte:fragment slot="trigger">
				More Options...
			</svelte:fragment>
			<a href="/">Your Profile</a>
			<div class="separator"/>
			<DropdownMenu.Sub>
				<svelte:fragment slot="trigger">
					More Options...
				</svelte:fragment>
				<a href="/">Your Profile</a>
				<div class="separator"/>
				<DropdownMenu.Sub>
					<svelte:fragment slot="trigger">
						More Options...
					</svelte:fragment>
					<a href="/">Your Profile</a>
					<div class="separator"/>
					<button>Sign out</button>
				</DropdownMenu.Sub>
				<div class="separator"/>
				<button>Sign out</button>
			</DropdownMenu.Sub>
			<div class="separator"/>
			<button>Sign out</button>
		</DropdownMenu.Sub>
		<div class="separator"/>
		<button>Sign out</button>
	</DropdownMenu.Root>
</div>

<svelte:head>
	<title>{inputTest}</title>
	<meta
		name="description"
		content={inputTest}
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

	:global(.tabs-container) {
		color: var(--color-tertiary);
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