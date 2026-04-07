<script lang="ts">
    import { base } from '$app/paths';

    interface Props {
        path: string;
        title?: string | undefined;
        description?: string | undefined;
        showTitle?: boolean;
        showDescription?: boolean;
        alt?: string;
    }

    let {
        path,
        title = undefined,
        description = undefined,
        showTitle = true,
        showDescription = true,
        alt = ''
    }: Props = $props();

    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    let isVideo = $derived(videoExtensions.some((ext) => path.toLowerCase().endsWith(ext)));
    let src = $derived(`${base}${path}`);
    let altText = $derived(alt || title || '');

    let expanded = $state(false);

    const open = () => (expanded = true);
    const close = () => (expanded = false);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
    };
</script>

<svelte:window onkeydown={expanded ? handleKeydown : undefined} />

<figure class="media" onclick={open} onkeydown={undefined}>
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
    <div class="overlay" onclick={close} onkeydown={undefined}>
        <figure class="overlay-content" onclick={(e) => e.stopPropagation()} onkeydown={undefined}>
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
            <button class="close-btn" onclick={close} title="Close">✕</button>
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
