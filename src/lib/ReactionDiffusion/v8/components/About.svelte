<script lang="ts">
    import { base } from '$app/paths';
    import SvelteMarkdown from 'svelte-markdown';
    import ImageRenderer from './renderer/ImageAbout.svelte';
    import LinkRenderer from './renderer/LinkAbout.svelte';
    import source from './about.md';

    // Shitty hack because I didn't figure out how to tweak the pre-renderer
    // to properly include the baseUrl in the image links
    const sourceWithFixedLinks = source.replaceAll('{baseUrl}', base);

    // svelte-markdown still expects Svelte 4 class constructors; cast to satisfy its types
    // until svelte-markdown releases Svelte 5 compatible types
    const renderers = { image: ImageRenderer as any, link: LinkRenderer as any };
</script>

<SvelteMarkdown source={sourceWithFixedLinks} {renderers} />
