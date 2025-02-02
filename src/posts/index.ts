import { z } from 'zod';

const Category = z.enum(['web', 'problem-solving', 'security', 'rust', 'life', 'opinion']);
export type Category = z.infer<typeof Category>;

const Language = z.enum(['ko', 'en']);
export type Language = z.infer<typeof Language>;

const Post = z.object({
	// Front matter properties
	title: z.string(),
	date: z.string().date(),
	language: Language,
	categories: z.array(Category),
	// Derived properties
	slug: z.string(),
	subdir: z.string()
});
export type Post = z.infer<typeof Post>;

interface PostWithMetadata {
	metadata: {};
}

export async function getPosts() {
	let posts: Post[] = [];

	const fileDict = import.meta.glob<PostWithMetadata>('/src/posts/**/*.svx', { eager: true });

	for (const path in fileDict) {
		const file = fileDict[path];

		const subdir = path.split('/').at(-2);
		const fileName = path.split('/').at(-1);
		if (subdir === undefined) {
			throw new Error('year is undefined');
		}
		if (fileName === undefined) {
			throw new Error('fileName is undefined');
		}

		if (!fileName.endsWith('.svx')) {
			throw new Error('extension is not svx');
		}
		const slug = fileName.slice(0, -4);

		const payload = { ...file.metadata, slug, subdir };
		const parsedPost = Post.safeParse(payload);
		if (!parsedPost.success) {
			const errorText = parsedPost.error.errors
				.map((error) => JSON.stringify(error, null, 2))
				.join('\n');
			throw new Error(
				`Error while parsing ${path}\nData:\n${JSON.stringify(payload, null, 2)}\nErrors:\n${errorText}`
			);
		}
		posts.push(parsedPost.data);
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}
