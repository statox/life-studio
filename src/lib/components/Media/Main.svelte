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
    let hasCaption = $derived((showTitle && !!title) || (showDescription && !!description));

    let expanded = $state(false);

    const open = () => (expanded = true);
    const close = () => (expanded = false);
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
    };
</script>

{#snippet mediaContent(autoplay: boolean)}
    {#if isVideo}
        <video {src} preload={autoplay ? 'auto' : 'none'} controls loop muted playsinline {autoplay}>
            <track kind="captions" />
        </video>
    {:else}
        <img {src} alt={altText} loading={autoplay ? 'eager' : 'lazy'} />
    {/if}
    {#if hasCaption}
        <figcaption>
            {#if showTitle && title}<span class="title">{title}</span>{/if}
            {#if showDescription && description}<span class="description">{description}</span>{/if}
        </figcaption>
    {/if}
{/snippet}

<svelte:window onkeydown={expanded ? handleKeydown : undefined} />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<figure class="media" onclick={open} onkeydown={undefined}>
    {@render mediaContent(false)}
</figure>

{#if expanded}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay" onclick={close} onkeydown={undefined}>
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <figure class="overlay-content" onclick={(e) => e.stopPropagation()} onkeydown={undefined}>
            {@render mediaContent(true)}
            <button class="close-btn" onclick={close} title="Close">&#x2715;</button>
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
        padding: 2vh 2vw;
        cursor: pointer;
    }

    .overlay-content {
        position: relative;
        margin: 0;
        width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: default;
    }

    .overlay-content img,
    .overlay-content video {
        display: block;
        width: 100%;
        max-height: calc(100vh - 8vh);
        object-fit: contain;
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
