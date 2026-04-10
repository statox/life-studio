<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        sections: Snippet[];
        footer?: Snippet;
    }

    let { sections, footer }: Props = $props();
    let idx = $state(0);
</script>

<div class="section-body">
    {@render sections[idx]()}
</div>

{#if sections.length > 1}
    <div class="section-nav">
        <button class="section-nav-btn" disabled={idx === 0} onclick={() => idx--}>←</button>
        <span class="section-nav-count">{idx + 1} / {sections.length}</span>
        <button class="section-nav-btn" disabled={idx === sections.length - 1} onclick={() => idx++}
            >→</button
        >
    </div>
{/if}

{#if footer}
    <div class="section-footer">
        {@render footer()}
    </div>
{/if}

<style>
    .section-body {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .section-nav {
        display: flex;
        align-items: center;
        gap: 8px;
        padding-top: 2px;
    }

    .section-nav-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #90a4ae;
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 0.85rem;
        cursor: pointer;
        transition:
            background 0.13s,
            border-color 0.13s;
        min-width: 32px;
    }

    .section-nav-btn:hover:not(:disabled) {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .section-nav-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .section-nav-count {
        font-size: 0.8rem;
        color: #546e7a;
        min-width: 36px;
        text-align: center;
    }

    .section-footer {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 4px;
        border-top: 1px solid #263238;
        margin-top: 2px;
    }
</style>
