<script lang="ts">
    import { recordStoryInteraction } from '$lib/api/webStats';

    interface Props {
        onClick: () => void;
    }

    let { onClick }: Props = $props();

    const handleClick = () => {
        recordStoryInteraction('story-spread-uniform');
        onClick();
    };
</script>

<button class="spread-btn" onclick={handleClick} title="Uniform spread"
    >↺<span class="spread-btn-text"> Uniform spread</span></button
>

<style>
    .spread-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 11px;
        font-size: 0.82rem;
        cursor: pointer;
        transition:
            background 0.13s,
            border-color 0.13s;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .spread-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    @media (max-width: 480px) {
        .spread-btn {
            padding: 8px 10px;
            min-width: 44px;
            justify-content: center;
        }

        .spread-btn-text {
            display: none;
        }
    }
</style>
