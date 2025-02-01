<script>
	import '../app.css';
	import { page } from '$app/state'
</script>

<div class="text-center my-16">
	<h1 class="text-4xl">{page.status}: {page.error?.message}</h1>
</div>
