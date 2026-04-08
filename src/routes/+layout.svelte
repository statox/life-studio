<script lang="ts">
    import { base } from '$app/paths';
    import { page } from '$app/stores';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

    const noHeaderPaths = ['/particles-life/story', '/particles-life/infinite'];

    let showHeader = $derived(!noHeaderPaths.some((p) => $page.url.pathname.endsWith(p)));

    let pathname = $derived($page.url.pathname.replace(/\/$/, ''));
    let basePath = $derived((base || '').replace(/\/$/, ''));
    let isHome = $derived(pathname === basePath);
    let parentPath = $derived(
        pathname.includes('/')
            ? pathname.substring(0, pathname.lastIndexOf('/')) || basePath || '/'
            : basePath || '/'
    );
</script>

{#if showHeader}
    <header>
        {#if !isHome}
            <a class="home-link" href={parentPath} title="Back">←</a>
        {/if}
        {#if $pageMetadataStore.name}
            <h1>{$pageMetadataStore.name}</h1>
        {/if}
    </header>
{/if}

{@render children?.()}

<style>
    /* TODO Move that in a global css file */
    :global(.svelte-tabs li.svelte-tabs__tab) {
        background-color: #bfbec6;
        margin-right: 4px;
    }

    header {
        background-color: inherit;
        max-width: 1200px;
        margin: 0 auto;
        padding: 8px 16px;
        box-sizing: border-box;
        display: flex;
        align-items: baseline;
        gap: 16px;
        border-bottom: 2px solid #bfbec6;
    }

    .home-link {
        color: #c3e88d;
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1;
        min-width: 2em;
        transition: color 0.15s;
        -webkit-text-stroke: 1px #c3e88d;
    }

    .home-link:hover {
        color: #dce775;
        -webkit-text-stroke-color: #dce775;
    }

    h1 {
        font-size: 2.1rem;
        font-weight: bolder;
    }
</style>
