<script lang="ts">
    interface Props {
        onClick: () => void;
    }

    let { onClick }: Props = $props();
</script>

<button class="spread-btn" onclick={onClick}>↺ Uniform spread</button>

<style>
    .spread-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 11px;
        font-size: 0.82rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .spread-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }
</style>
