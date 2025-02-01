<script lang="ts">
	import type { PageProps } from './$types';
	import { reformatDateString } from '$lib/date';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Qwaz's Blog Posts</title>
</svelte:head>

<h1 class="text-2xl font-bold">All Posts</h1>

<ul>
	{#each data.posts as post}
		<li class="mt-3">
			<span class="text-gray-500">{reformatDateString(post.date, post.language)}</span>
			<h2 class="text-xl font-semibold">
				<a href="posts/{post.slug}" class="hover:text-blue-600">
					{post.title}
				</a>
			</h2>
		</li>
	{/each}
</ul>
