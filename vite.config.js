import { sveltekit } from '@sveltejs/kit/vite';
import plainText from 'vite-plugin-plain-text';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [
        plainText(['**/*.md', '**/*.glsl', '**/*.rle'], {
            namedExport: false,
            dtsAutoGen: true,
            distAutoClean: false
        }),
        sveltekit()
    ],
    test: {},
    build: {
        // minify: false,
        // This build target is necessary to make top-level await work
        // and I use top-level await to load workers
        target: 'esnext'
    },
    worker: {
        // Build workers as ES modules so import.meta.url is supported natively.
        // The default IIFE format polyfills import.meta.url with document.currentScript,
        // which throws "document is not defined" inside Web Worker scope.
        format: 'es'
    }
};

export default config;
