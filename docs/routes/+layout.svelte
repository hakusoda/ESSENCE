<script lang="ts">
	import '$essence/styles.scss';
	import TextLogo from '../components/TextLogo.svelte';

	import { theme } from '../stores';
</script>

<div class="app theme-{$theme}">
	<header>
		<TextLogo/>
		<p>user interface library 🦑</p>
	</header>
	<main class="content">
		<slot/>
	</main>
</div>

<style lang="scss">
	.app {
		width: 100%;
		height: 100%;
		overflow: auto;
		header {
			display: flex;
			padding: 12px 32px;
			p {
				color: var(--color-secondary);
				margin: auto 32px;
				font-size: 1.2em;
				font-weight: 500;
				font-variant: small-caps;
			}
		}
		.content {
			display: flex;
			padding: 16px 64px;
			flex-direction: column;
		}
	}
</style>