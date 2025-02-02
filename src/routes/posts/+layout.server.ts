import { getPosts } from '$posts';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	return {
		posts: await getPosts()
	};
};
