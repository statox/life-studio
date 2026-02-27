<script lang="ts">
    export let actions: Record<string, () => void>;

    const shortcuts = [
        { key: 'Q', label: 'Reset random' },
        { key: 'W', label: 'Wide center' },
        { key: 'E', label: 'Center' },
        { key: 'R', label: 'Rainbow' },
        { key: 'T', label: 'Random table' },
        { key: 'M', label: 'Mutate table' }
    ];

    const handleKeydown = (e: KeyboardEvent) => {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
        actions[e.key]?.();
    };
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="shortcuts">
    {#each shortcuts as s}
        <span class="shortcut"><kbd>{s.key}</kbd>{s.label}</span>
    {/each}
</div>

<style>
    .shortcuts {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 16px;
        justify-content: center;
        padding: 4px 0;
    }

    .shortcut {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.72rem;
        color: #546e7a;
    }

    kbd {
        font-family: 'Fira Mono', 'Consolas', monospace;
        font-size: 0.7rem;
        color: #78909c;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 4px;
        padding: 1px 6px;
        line-height: 1.6;
    }
</style>
