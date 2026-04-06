<script lang="ts">
    import { base } from '$app/paths';

    export let path: string;
    export let title: string | undefined = undefined;
    export let description: string | undefined = undefined;
    export let showTitle = true;
    export let showDescription = true;
    export let alt = '';

    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    $: isVideo = videoExtensions.some((ext) => path.toLowerCase().endsWith(ext));
    $: src = `${base}${path}`;
    $: altText = alt || title || '';

    let expanded = false;

    const open = () => (expanded = true);
    const close = () => (expanded = false);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
    };
</script>

<svelte:window on:keydown={expanded ? handleKeydown : undefined} />

<figure class="media" on:click={open} on:keydown={undefined}>
    {#if isVideo}
        <video {src} preload="none" controls loop muted playsinline>
            <track kind="captions" />
        </video>
    {:else}
        <img {src} alt={altText} loading="lazy" />
    {/if}
    {#if (showTitle && title) || (showDescription && description)}
        <figcaption>
            {#if showTitle && title}<span class="title">{title}</span>{/if}
            {#if showDescription && description}<span class="description">{description}</span>{/if}
        </figcaption>
    {/if}
</figure>

{#if expanded}
    <div class="overlay" on:click={close} on:keydown={undefined}>
        <figure class="overlay-content" on:click|stopPropagation={undefined} on:keydown={undefined}>
            {#if isVideo}
                <video {src} controls loop muted playsinline autoplay>
                    <track kind="captions" />
                </video>
            {:else}
                <img {src} alt={altText} />
            {/if}
            {#if (showTitle && title) || (showDescription && description)}
                <figcaption>
                    {#if showTitle && title}<span class="title">{title}</span>{/if}
                    {#if showDescription && description}<span class="description"
                            >{description}</span
                        >{/if}
                </figcaption>
            {/if}
            <button class="close-btn" on:click={close} title="Close">✕</button>
        </figure>
    </div>
{/if}

<style>
    /* ── Inline ──────────────────────────────── */
    .media {
        margin: 0;
        cursor: pointer;
    }

    .media img,
    .media video {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 6px;
    }

    figcaption {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 6px 2px;
    }

    .title {
        font-size: 0.85rem;
        font-weight: 600;
        color: #eceff1;
    }

    .description {
        font-size: 0.78rem;
        color: #90a4ae;
        line-height: 1.5;
    }

    /* ── Overlay ─────────────────────────────── */
    .overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .overlay-content {
        position: relative;
        margin: 0;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        cursor: default;
    }

    .overlay-content img,
    .overlay-content video {
        display: block;
        max-width: 90vw;
        max-height: 80vh;
        width: auto;
        height: auto;
        border-radius: 6px;
    }

    .overlay-content figcaption {
        padding: 10px 2px;
    }

    .overlay-content .title {
        font-size: 1rem;
    }

    .overlay-content .description {
        font-size: 0.88rem;
    }

    .close-btn {
        position: absolute;
        top: -12px;
        right: -12px;
        background: #263238;
        border: 1px solid #37474f;
        color: #eceff1;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        font-size: 0.82rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.13s;
    }

    .close-btn:hover {
        background: #37474f;
    }
</style>
