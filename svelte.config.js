import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

// https://shiki.style/themes
const shikiTheme = 'dracula-soft';
const languages = ['javascript', 'typescript', 'python', 'c', 'cpp', 'rust', 'haskell'];
const highlighter = await createHighlighter({
	themes: [shikiTheme],
	langs: languages
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.svx'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: shikiTheme }));
			return `{@html \`${html}\` }`;
		}
	},
	remarkPlugins: [remarkMath],
	rehypePlugins: [rehypeKatexSvelte]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],

	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			// Compare these patterns with `.svelte-kit/cloudflare/_routes.json`
			// after turning off this option
			routes: {
				include: ['/*'],
				exclude: ['<build>', '/favicon.png', '/post-images/*', '/', '/posts', '/posts/*']
			}
		}),

		alias: {
			$posts: 'src/posts'
		}
	}
};

export default config;
