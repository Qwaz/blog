<script>
	import '../app.css';
	import { page } from '$app/state';
</script>

<div class="my-16 text-center">
	<h1 class="text-4xl">{page.status}: {page.error?.message}</h1>
</div>
