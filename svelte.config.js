import adapter from 'svelte-adapter-github';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const prod = process.env.ENV === 'prod';
const base = '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            pages: 'docs',
            assets: 'docs',
            fallback: null,
            precompress: false,
            domain: '',
            jekyll: false
        }),
        paths: {
            base
        },
        alias: {
            $vendor: 'src/vendor'
        }
    }
};

export default config;
