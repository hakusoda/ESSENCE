<script lang="ts">
	import { Tabs, Button, Select, TextInput, NumberInput, ContextMenu } from '$essence';

	import { theme } from '../stores';
	const themes = ['dark', 'light'];
	const enjoyables = ['burgers', 'soda', 'cats', 'mushrooms', 'movies', 'exercise'];

	let enjoys: string[] = ['burgers'];
	let tabsTest = 0;
	let inputTest = '';
	let contextTrigger: (event: MouseEvent) => void;
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
<br/>
<NumberInput/>

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

<p class="input-label">
	what do you enjoy?
</p>
<Select.Root bind:values={enjoys} placeholder="Select one or more items" withSearch>
	{#each enjoyables as item}
		<Select.Item value={item}>
			{item}
		</Select.Item>
	{/each}
</Select.Root>
<p>wow! you enjoy {enjoys.join(', ')}!</p>

<div class="test">
	<Button on:click={contextTrigger}>touchdown!</Button>
	<ContextMenu.Root bind:trigger={contextTrigger}>
		<p>User Options</p>
		<a href="/">Your Profile</a>
		<p>User Options</p>
		<a href="/">Your Profile</a>
		<div class="separator"/>
		<p>woooooahh</p>
		<ContextMenu.Sub>
			<p>Deep Travel</p>
			<svelte:fragment slot="trigger">
				More Options...
			</svelte:fragment>
			<a href="/">Your Profile</a>
			<div class="separator"/>
			<ContextMenu.Sub>
				<svelte:fragment slot="trigger">
					More Options...
				</svelte:fragment>
				<p>Deeper Travel</p>
				<ContextMenu.Sub>
					<svelte:fragment slot="trigger">
						Bigger Options...
					</svelte:fragment>
					<p>BLACKSPACE</p>
					<button type="button">Everything</button>
					<button type="button">Everything</button>
					<button type="button">Everything</button>
					<button type="button">Everything is</button>
					<button type="button">Everything is</button>
					<button type="button">Everything is</button>
					<button type="button">Everything is going</button>
					<button type="button">Everything is going</button>
					<button type="button">Everything is going</button>
					<button type="button">Everything is going to</button>
					<button type="button">Everything is going to</button>
					<button type="button">Everything is going to</button>
					<button type="button">Everything is going to be</button>
					<button type="button">Everything is going to be</button>
					<button type="button">Everything is going to be</button>
					<button type="button">Everything is going to be okay</button>
					<button type="button">Everything is going to be okay</button>
					<button type="button">Everything is going to be okay</button>
					<button type="button">Everything is going to be okay...</button>
					<button type="button">Everything is going to be okay...</button>
					<button type="button">Everything is going to be okay...</button>
				</ContextMenu.Sub>
			</ContextMenu.Sub>
			<div class="separator"/>
			<button>Sign out</button>
		</ContextMenu.Sub>
		<div class="separator"/>
		<button>Sign out</button>
	</ContextMenu.Root>
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