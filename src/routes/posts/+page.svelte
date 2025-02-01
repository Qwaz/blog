<script lang="ts">
	import type { PageProps } from './$types';
	import { formatDate as reformatDateString } from '$lib/date';

	let { data }: PageProps = $props();
</script>

<h1 class="text-2xl font-bold">All Posts</h1>

<ul>
	{#each data.posts as post}
		<li>
			<h2 class="mt-3 text-xl font-semibold">{post.title}</h2>
			<span class="text-gray-500">{reformatDateString(post.date, post.language)}</span>
		</li>
	{/each}
</ul>
