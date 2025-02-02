<script lang="ts">
	import { reformatDateString } from '$lib/date';

	const { data } = $props();
	const metadata = data.metadata;
</script>

<svelte:head>
	<title>{metadata.title}</title>

	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
		integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
		crossorigin="anonymous"
	/>
</svelte:head>

<main class="article">
	<article>
		<time datetime={metadata.date} class="text-gray-500">
			{reformatDateString(metadata.date, metadata.language)}
		</time>
		<h1 class="text-2xl font-bold">{metadata.title}</h1>

		<div id="content" class="mt-4"><data.content /></div>
	</article>
</main>
