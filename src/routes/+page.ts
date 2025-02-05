import { redirect } from '@sveltejs/kit';

export const prerender = true;

export async function load() {
	redirect(307, `/posts`);
}
