import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const { posts } = await parent();

	const metadata = posts.find((post) => post.slug === params.slug);
	if (!metadata) {
		error(404, `Could not find ${params.slug}`);
	}

	const post = await import(`../../../posts/${metadata.subdir}/${metadata.slug}.svx`);

	return {
		content: post.default,
		metadata
	};
}
