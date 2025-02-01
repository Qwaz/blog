<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		as="style"
		crossorigin=""
		href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
	/>
</svelte:head>

<div class="flex justify-center">
	<div class="w-full max-w-5xl md:mx-6 md:my-8 md:shadow-lg">
		<nav class="bg-primary flex items-center justify-between px-6 py-3 text-white">
			<a href="/" class="inline-block font-mono text-3xl font-semibold">qwaz</a>
			<ul class="flex grow justify-end gap-6 text-lg">
				<li class="cursor-not-allowed opacity-40">Resume</li>
				<li><a href="/posts">Blog</a></li>
			</ul>
		</nav>

		<div class="mx-6 mt-5 mb-8">
			{@render children()}
		</div>
	</div>
</div>
