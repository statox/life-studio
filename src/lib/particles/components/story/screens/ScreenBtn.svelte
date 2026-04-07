<script lang="ts">
    import { createBubbler, handlers } from 'svelte/legacy';

    const bubble = createBubbler();
    interface Props {
        active?: boolean;
        children?: import('svelte').Snippet;
    }

    let { active = false, children }: Props = $props();

    const isVisibleInViewport = (element: Element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) + rect.height / 2
        );
    };

    const handleClick = () => {
        // After a short delay (let the simulation start), scroll the canvas into view
        setTimeout(() => {
            const canvasEl = document.querySelector('.canvas-col');
            if (!canvasEl) {
                return;
            }

            // Only scroll if the simulation is not already partly visible
            if (isVisibleInViewport(canvasEl)) {
                return;
            }
            document.querySelector('.canvas-col')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };
</script>

<button class="screen-btn" class:active onclick={handlers(bubble('click'), handleClick)}>
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
        transition: background 0.13s, border-color 0.13s;
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
