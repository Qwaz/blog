<script lang="ts">
	import { reformatDateString } from '$lib/date';

	const { data } = $props();
	const metadata = data.metadata;
</script>

<svelte:head>
	<title>{metadata.title}</title>
</svelte:head>

<main class="article">
	<article>
		<time datetime={metadata.date} class="text-gray-500">
			{reformatDateString(metadata.date, metadata.language)}
		</time>
		<h1>{metadata.title}</h1>

		<div class="mt-4"><data.content /></div>
	</article>
</main>
