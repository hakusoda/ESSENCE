<script lang="ts">
	import 'voxeliface/styles.scss';
	import TextLogo from '../components/TextLogo.svelte';
	import { Header } from 'voxeliface';

	import { theme } from '../stores';
	const themeHues: Record<string, number> = {
		purple: 280
	};
	$: [themeName, themeColor] = $theme.split('|');
	function themeHue(node: HTMLDivElement, color: string) {
		node.style.setProperty('--theme-hue', themeHues[color]?.toString());
		return {
			update: (color: string) =>
				node.style.setProperty('--theme-hue', themeHues[color]?.toString())
		}
	}
</script>

<div class="app theme-{themeName}" use:themeHue={themeColor}>
	<Header>
		<TextLogo/>
	</Header>
	<main class="app-content">
		<slot/>
	</main>
</div>

<style lang="scss">
	.app {
		width: 100%;
		height: 100%;
		overflow: auto;
		background: var(--background-primary);
	}
	.app-content {
		display: flex;
		padding: 0 2rem;
		flex-direction: column;
	}
</style>