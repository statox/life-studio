<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import Canvas from '$lib/particles/components/Canvas.svelte';
    import Timeline from '$lib/particles/components/Timeline.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { createSimulationWorker } from '$lib/particles/engine/simulationWorker';
    import type { Cell, Coordinates } from '$lib/particles/engine';

    const sim = createSimulationWorker();

    let cells: Cell[] = [];
    let buffer: Coordinates[][] = [];
    let displayIndex = 0;
    let absoluteFrameOffset = 0;

    let showColors = true;
    let maxFPS = 60;

    const cellSize = 3;

    let maxAttractionRadius = 32;
    let horizontalResolution = 30;
    let verticalResolution = 20;

    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };

    let savedAttractionTable: AttractionTable | null = null;
    let savedWorldSize: { x: number; y: number } | null = null;
    let savedMaxAttractionRadius: number | null = null;

    export const startSim = async (params: {
        cells: Cell[];
        worldSize?: { x: number; y: number };
        maxAttractionRadius?: number;
        attractionTable?: AttractionTable;
    }) => {
        buffer = [];
        displayIndex = 0;
        absoluteFrameOffset = 0;

        savedAttractionTable = params.attractionTable || savedAttractionTable;
        cells = params.cells;
        savedWorldSize = params.worldSize || savedWorldSize;
        savedMaxAttractionRadius = params.maxAttractionRadius || savedMaxAttractionRadius;

        if (!savedAttractionTable || !cells || !savedWorldSize || !savedMaxAttractionRadius) {
            throw new Error('Missing parameters to start simulation');
        }

        await sim.start(
            {
                worldSize: savedWorldSize,
                maxAttractionRadius: savedMaxAttractionRadius,
                cells: cells,
                attractionTable: savedAttractionTable
            },
            (positions) => {
                buffer.push(positions);
                buffer = buffer;
            }
        );
    };

    export const updateAttractionTable = (newTable: AttractionTable) => {
        sim.updateAttractionTable(newTable);
        savedAttractionTable = newTable;
        buffer = [cells.map((c) => c.pos)];
        displayIndex = 0;
        absoluteFrameOffset = 0;
    };

    export const updateCells = (newCells: Cell[]) => {
        startSim({ cells: newCells });
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
</script>

<div class="sim">
    <!-- Canvas -->
    <div class="canvas-wrap" bind:this={canvasWrap}>
        <Canvas
            {cells}
            {worldSize}
            {cellSize}
            {showColors}
            drewFrame={() => timeline?.updateFrame()}
            {maxFPS}
        />
    </div>
    <!-- Timeline bar -->
    <Timeline
        bind:this={timeline}
        bind:buffer
        bind:displayIndex
        bind:absoluteFrameOffset
        {cells}
        {isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onPauseEngine={() => sim.pause()}
        onUnpauseEngine={() => sim.unpause()}
    />
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
