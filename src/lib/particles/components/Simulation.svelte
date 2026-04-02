<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import Canvas from '$lib/particles/components/Canvas.svelte';
    import Timeline from '$lib/particles/components/Timeline.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { createSimulationWorker } from '$lib/particles/engine/simulationWorker';
    import { colorToIndex } from '$lib/particles/engine';
    import type { SimulationParams } from '$lib/particles/engine/types';

    const sim = createSimulationWorker();

    let numParticles = 0;
    let colorIndices: Uint8Array = new Uint8Array(0);
    let buffer: Float32Array[] = [];
    let displayIndex = 0;
    let absoluteFrameOffset = 0;

    export let useWorkers = true;
    export let maxFPS = 60;
    export let onToggleWorkers: (() => void) | undefined = undefined;
    export let hideTimeline = false;

    let showColors = true;

    const cellSize = 2;

    // Rendering state derived from startSim params
    let canvasWorldSize = { x: 0, y: 0 };

    export const startSim = async (params: SimulationParams) => {
        buffer = [];
        displayIndex = 0;
        absoluteFrameOffset = 0;

        canvasWorldSize = { x: params.worldSize.x, y: params.worldSize.y };

        // Extract color indices once (colors don't change during sim)
        numParticles = params.cells.length;
        colorIndices = new Uint8Array(numParticles);
        for (let i = 0; i < numParticles; i++) {
            colorIndices[i] = colorToIndex(params.cells[i].color);
        }

        await sim.start(
            {
                worldSize: params.worldSize,
                maxAttractionRadius: params.maxAttractionRadius,
                cells: params.cells,
                attractionTable: params.attractionTable,
                useWorkers,
                friction: params.friction
            },
            (positions: Float32Array) => {
                buffer.push(positions);
                buffer = buffer;
            }
        );
    };

    export const updateAttractionTable = (newTable: AttractionTable) => {
        sim.updateAttractionTable(newTable);
        // Keep the current frame so Canvas doesn't go blank, discard stale frames
        const currentFrame = buffer[displayIndex];
        buffer = currentFrame ? [currentFrame] : [];
        displayIndex = 0;
        absoluteFrameOffset = 0;
    };

    let canvasWrap: HTMLElement;
    let isFullscreen = false;
    let timeline: Timeline;

    export const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            canvasWrap.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const onFullscreenChange = () => {
        isFullscreen = !!document.fullscreenElement;
    };

    onMount(async () => {
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    });
    onDestroy(() => sim.destroy());

    $: currentPositions =
        buffer.length > 0 && displayIndex < buffer.length ? buffer[displayIndex] : null;
</script>

<div class="sim">
    <!-- Canvas -->
    <div class="canvas-wrap" bind:this={canvasWrap}>
        <Canvas
            positions={currentPositions}
            {colorIndices}
            {numParticles}
            worldSize={canvasWorldSize}
            {cellSize}
            {showColors}
            drewFrame={() => timeline?.updateFrame()}
            {maxFPS}
        />
    </div>
    <!-- Timeline bar -->
    <div class="timeline-row" class:hidden={hideTimeline}>
        <Timeline
            bind:this={timeline}
            bind:buffer
            bind:displayIndex
            bind:absoluteFrameOffset
            {isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onPauseEngine={() => sim.pause()}
            onUnpauseEngine={() => sim.unpause()}
        />
        {#if onToggleWorkers}
            <button class="engine-toggle" class:active={useWorkers} on:click={onToggleWorkers}>
                {useWorkers ? '⚡ Multi-threaded' : '▶ Single-threaded'}
            </button>
        {/if}
    </div>
</div>

<style>
    /* ── Layout ─────────────────────────────── */
    .sim {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px 16px 32px;
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .timeline-row {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        gap: 8px;
    }

    .timeline-row > :global(.timeline) {
        flex: 1;
        min-width: 230px;
    }

    .timeline-row.hidden {
        display: none;
    }

    .engine-toggle {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 0.82rem;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
        transition: background 0.13s, border-color 0.13s;
    }

    .engine-toggle:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .engine-toggle.active {
        border-color: #c3e88d55;
        color: #c3e88d;
    }

    .canvas-wrap {
        width: 100%;
    }

    .canvas-wrap:fullscreen {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1a2327;
        width: 100vw;
        height: 100vh;
    }

    .canvas-wrap:fullscreen :global(canvas) {
        width: auto;
        height: 100%;
        max-width: 100%;
        max-height: 100vh;
        border-radius: 0;
    }
</style>
