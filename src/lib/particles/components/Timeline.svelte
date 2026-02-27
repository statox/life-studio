<script lang="ts">
    import type { Coordinates, Cell } from '$lib/particles/engine';

    export let buffer: Coordinates[][];
    export let frameIndex: number;
    export let cells: Cell[];
    export let isFullscreen: boolean;
    export let onToggleFullscreen: () => void;

    let renderPaused = false;
    let lastFrameTimestamp = 0;
    let timeToFrame = 0;
    let fps = 0;

    let fpsFrameCount = 0;
    let fpsLastSecond = 0;
    const tickFPS = () => {
        const now = Date.now();
        fpsFrameCount++;
        if (now - fpsLastSecond >= 1000) {
            fps = fpsFrameCount;
            fpsFrameCount = 0;
            fpsLastSecond = now;
        }
    };

    export const updateFrame = () => {
        if (buffer.length - 1 > frameIndex) {
            const now = Date.now();
            timeToFrame = now - lastFrameTimestamp;
            lastFrameTimestamp = now;
            if (!renderPaused) frameIndex++;
            tickFPS();
            const positions = buffer[frameIndex];
            buffer = buffer;
            if (positions.length !== cells.length) return;
            for (let i = 0; i < cells.length; i++) cells[i].pos = positions[i];
        }
    };
</script>

<div class="timeline">
    <div class="tl-btns">
        <button class="icon-btn" on:click={() => (frameIndex = 0)} title="Go to start">⏮</button>
        <button class="icon-btn" on:click={() => (renderPaused = !renderPaused)}>
            {renderPaused ? '▶' : '⏸'}
        </button>
        <button
            class="icon-btn"
            on:click={() => (frameIndex = buffer?.length - 1 || 0)}
            title="Catch up to latest">⏭</button
        >
    </div>
    <input
        type="range"
        class="tl-slider"
        min="1"
        max={buffer?.length ? buffer.length - 1 : 0}
        bind:value={frameIndex}
    />
    <button
        class="icon-btn"
        on:click={onToggleFullscreen}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
        {isFullscreen ? '⊡' : '⛶'}
    </button>
    <div class="tl-stats">
        <span class="stat"
            ><span class="stat-label">buf</span> {(buffer?.length || 0) - frameIndex}</span
        >
        <span class="stat"><span class="stat-label">frame</span> {frameIndex}</span>
        <span class="stat">{timeToFrame}<span class="stat-label">ms</span></span>
        <span class="stat">{fps}<span class="stat-label">fps</span></span>
    </div>
</div>

<style>
    .timeline {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        padding: 8px 12px;
    }

    .tl-btns {
        display: flex;
        gap: 4px;
        flex-shrink: 0;
    }

    .tl-slider {
        flex: 1;
        min-width: 50px;
        accent-color: #c3e88d;
        cursor: pointer;
    }

    .tl-stats {
        display: flex;
        gap: 10px;
        font-size: 0.75rem;
        color: #eceff1;
        flex-shrink: 0;
        white-space: nowrap;
    }

    .stat {
        display: flex;
        align-items: baseline;
        gap: 3px;
    }

    .stat-label {
        font-size: 0.65rem;
        color: #546e7a;
    }

    button {
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

    button:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .icon-btn {
        padding: 5px 9px;
        font-size: 0.88rem;
    }
</style>
