<script lang="ts">
	import type { Snippet } from 'svelte';

	const { title, children }: { title: string; children: Snippet } = $props();
</script>

<details>
	<summary>{title}</summary>

	{@render children?.()}
</details>
