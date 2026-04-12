<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { recordStoryInteraction } from '$lib/api/webStats';

    interface Props extends HTMLButtonAttributes {
        active?: boolean;
        children?: import('svelte').Snippet;
        onclick?: () => void;
    }

    let { active = false, children, onclick }: Props = $props();

    const handleClick = () => {
        recordStoryInteraction('story-restart');
        if (onclick) {
            onclick();
        }
    };
</script>

<button class="screen-btn" class:active onclick={handleClick}>
    {@render children?.()}
</button>

<style>
    .screen-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 0.95rem;
        min-height: 25px;
        cursor: pointer;
        transition:
            background 0.13s,
            border-color 0.13s;
    }

    .screen-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .screen-btn.active {
        border-color: #c3e88d;
        color: #c3e88d;
        background: #1e2e1a;
    }
</style>
