<script lang="ts">
	import { Tabs, Button, Select, TextInput, DropdownMenu } from 'voxeliface';

	import { theme } from '../stores';
	const themes = ['dark', 'light'];

	let tabsTest = 0;
	let inputTest = '';
	let dropdownTrigger: () => void;
</script>

<h1>Next Generation Burgers</h1>
<p class="sub">burgers are now better than ever!</p>

<TextInput bind:value={inputTest} placeholder="Your Name"/><br/>
<TextInput multiline placeholder="Your reasoning for consumption"/>

<div class="buttons">
	<Button on:click={() => $theme = 'light'}>Get Started</Button>
	<Button disabled>Gain Money</Button>
</div>
<div class="buttons">
	<Button colour="secondary">Buy OMORI</Button>
	<Button circle>🍔</Button>
</div>

<p class="input-label">
	Colour Theme
</p>
<Select.Root bind:value={$theme} placeholder="Select a value">
	<p>Themes</p>
	{#each themes as theme}
		<Select.Item value={theme}>
			{theme}
		</Select.Item>
	{/each}
</Select.Root>

<br/><br/><br/><br/><br/><br/><br/><br/>
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
	h1 {
		margin: 32px 0 16px;
		font-size: 3em;
		font-weight: 750;
	}
	.sub {
		color: var(--color-secondary);
		margin: 0 0 32px;
	}
	.buttons {
		gap: 16px;
		margin: 16px 0 0;
		display: flex;
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