import { z } from 'zod';

const Category = z.enum(['web']);
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
	year: z.coerce.number()
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

		const year = path.split('/').at(-2);
		const fileName = path.split('/').at(-1);
		if (year === undefined) {
			throw new Error('year is undefined');
		}
		if (fileName === undefined) {
			throw new Error('fileName is undefined');
		}

		const dotSplit = fileName.split('.');
		const slug = dotSplit[0];
		const extension = dotSplit[1];
		if (extension != 'svx') {
			throw new Error('extension is not svx');
		}

		const payload = { ...file.metadata, slug, year };
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
