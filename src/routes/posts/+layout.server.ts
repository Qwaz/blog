import { getPosts } from '$posts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		posts: await getPosts()
	};
};
