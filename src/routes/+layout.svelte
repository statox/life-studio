<script>
    import { base } from '$app/paths';
    import { page } from '$app/stores';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    const noHeaderPaths = ['/particles-life/story'];

    $: showHeader = !noHeaderPaths.some((p) => $page.url.pathname.endsWith(p));
</script>

{#if showHeader}
    <header>
        <a class="home-link" href="{base}/">Home</a>
        {#if $pageMetadataStore.name}
            <h1>{$pageMetadataStore.name}</h1>
        {/if}
    </header>
{/if}

<slot />

<style>
    :global(.svelte-tabs li.svelte-tabs__tab) {
        background-color: #bfbec6;
        margin-right: 4px;
    }

    header {
        max-width: 1200px;
        margin: 0 auto;
        padding: 8px 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .home-link {
        color: #90a4ae;
        text-decoration: none;
        font-size: 0.9rem;
    }

    .home-link:hover {
        color: #eceff1;
    }

    h1 {
        font-size: 1.2rem;
        font-weight: 600;
        color: #eceff1;
        margin: 0;
    }
</style>
