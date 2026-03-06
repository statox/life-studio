<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import AttractionTablePanel from '$lib/particles/components/AttractionTablePanel.svelte';
    import Canvas from '$lib/particles/components/Canvas.svelte';
    import KeyboardShortcuts from '$lib/particles/components/KeyboardShortcuts.svelte';
    import Timeline from '$lib/particles/components/Timeline.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { getMutatedAttractionTable, getRandomAttractionTable } from '$lib/particles/attraction';
    import { COLORS, PARTICLE_COLORS } from '$lib/particles/engine';
    import {
        centerCellsInPlace,
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import type { ColorProportions } from '$lib/particles/engine/cells';
    import { createSimulationWorker } from '$lib/particles/engine/simulationWorker';
    import type { Cell, Coordinates } from '$lib/particles/engine';

    const sim = createSimulationWorker();

    let cells: Cell[] = [];
    let attractionTable: AttractionTable = getRandomAttractionTable();
    let buffer: Coordinates[][] = [];
    let displayIndex = 0;
    let absoluteFrameOffset = 0;

    let colorWeights: ColorProportions = { white: 500, red: 500, green: 500, blue: 500 };

    let showColors = true;
    let maxFPS = 60;

    const cellSize = 3;

    let maxAttractionRadius = 32;
    let nbParticles = 4000;
    let horizontalResolution = 30;
    let verticalResolution = 20;

    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };

    const startSim = (keepCells = false, keepTable = false) => {
        if (!keepCells) cells = getNewCells(worldSize, nbParticles, colorWeights);
        if (!keepTable) attractionTable = getRandomAttractionTable();
        buffer = [];
        displayIndex = 0;
        absoluteFrameOffset = 0;
        sim.start({ worldSize, maxAttractionRadius, cells, attractionTable }, (positions) => {
            buffer.push(positions);
            buffer = buffer;
        });
    };

    const updateAttractionTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        sim.updateAttractionTable(newTable);
        buffer = [cells.map((c) => c.pos)];
        displayIndex = 0;
        absoluteFrameOffset = 0;
    };

    const updateWorldSettings = () => {
        worldSize.x = maxAttractionRadius * horizontalResolution;
        worldSize.y = maxAttractionRadius * verticalResolution;
        startSim();
    };

    const centerCells = () => {
        centerCellsInPlace(cells, worldSize);
        startSim(true, true);
    };

    const largeCenterCells = () => {
        largeCenterCellsInPlace(cells, worldSize);
        startSim(true, true);
    };

    const rainbowCells = () => {
        rainbowCellsInPlace(cells, worldSize);
        startSim(true, true);
    };

    const keyActions: Record<string, () => void> = {
        q: () => startSim(false, true),
        w: largeCenterCells,
        e: centerCells,
        r: rainbowCells,
        t: () => updateAttractionTable(getRandomAttractionTable()),
        m: () => updateAttractionTable(getMutatedAttractionTable(attractionTable)),
        f: () => toggleFullscreen()
    };

    let canvasWrap: HTMLElement;
    let isFullscreen = false;
    let timeline: Timeline;

    const toggleFullscreen = () => {
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
        await sim.loadWorker();
        startSim();
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    });
    onDestroy(() => sim.destroy());
</script>

<div class="sim">
    <div class="panels">
        <!-- Simulation controls -->
        <div class="card">
            <div class="card-title">Simulation</div>
            <div class="field">
                <label for="nb-particles">Particles</label>
                <input
                    id="nb-particles"
                    type="number"
                    bind:value={nbParticles}
                    on:change={updateWorldSettings}
                    min="1"
                />
            </div>
            <div class="proportion-list">
                {#each COLORS as c}
                    <div class="field">
                        <span class="pdot" style="background:{PARTICLE_COLORS[c]}" />
                        <input
                            type="range"
                            bind:value={colorWeights[c]}
                            min="0"
                            max="1000"
                            step="1"
                        />
                        <span class="dim" style="width:28px;text-align:right"
                            >{colorWeights[c]}</span
                        >
                    </div>
                {/each}
            </div>
            <button
                class="toggle-btn"
                class:active={showColors}
                on:click={() => (showColors = !showColors)}
            >
                <span class="pdots">
                    {#each COLORS as c}
                        <span class="pdot" style="background:{PARTICLE_COLORS[c]}" />
                    {/each}
                </span>
                {showColors ? 'Colors on' : 'Colors off'}
            </button>
        </div>
        <div class="card">
            <div class="card-title">Cells</div>
            <div class="btn-stack">
                <button on:click={() => startSim(false, true)}>↺ Uniform spread</button>
                <button on:click={largeCenterCells}>◎ Centered circle</button>
                <button on:click={rainbowCells}>≋ Rainbow</button>
            </div>
        </div>
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

    <!-- Attraction table panel -->
    <AttractionTablePanel
        {attractionTable}
        on:updateTable={(e) => updateAttractionTable(e.detail)}
    />

    <!-- World settings -->
    <div class="panels">
        <div class="card">
            <div class="card-title">World</div>
            <div class="field">
                <label for="h-cells">H cells</label>
                <input
                    id="h-cells"
                    type="number"
                    bind:value={horizontalResolution}
                    on:change={updateWorldSettings}
                    min="1"
                    max="100"
                />
                <span class="dim">{horizontalResolution * maxAttractionRadius}px</span>
            </div>
            <div class="field">
                <label for="v-cells">V cells</label>
                <input
                    id="v-cells"
                    type="number"
                    bind:value={verticalResolution}
                    on:change={updateWorldSettings}
                    min="1"
                    max="100"
                />
                <span class="dim">{verticalResolution * maxAttractionRadius}px</span>
            </div>
            <div class="field">
                <label for="radius">Max radius</label>
                <input
                    id="radius"
                    type="number"
                    bind:value={maxAttractionRadius}
                    on:change={updateWorldSettings}
                    min="8"
                    max="128"
                />
            </div>
            <div class="field">
                <label for="fps-cap">FPS cap</label>
                <input id="fps-cap" type="number" bind:value={maxFPS} min="1" max="120" />
            </div>
        </div>
    </div>

    <!-- Keyboard shortcuts legend -->
    <KeyboardShortcuts actions={keyActions} />
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

    /* ── Panels grid ─────────────────────────── */
    .panels {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    @media (max-width: 640px) {
        .panels {
            grid-template-columns: 1fr;
        }
    }

    /* ── Card ────────────────────────────────── */
    .card {
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        padding: 14px 16px;
    }

    .card-title {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #78909c;
        margin-bottom: 12px;
        font-weight: 600;
        display: block;
    }

    /* ── Fields ──────────────────────────────── */
    .field {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 7px;
    }

    .field:last-child {
        margin-bottom: 0;
    }

    .field input {
        flex-grow: 2;
    }

    .field label {
        font-size: 0.8rem;
        color: #90a4ae;
        width: 60px;
        flex-shrink: 0;
    }

    .field input[type='number'] {
        width: 62px;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #eceff1;
        padding: 4px 7px;
        font-size: 0.82rem;
    }

    .field input[type='number']:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
    }

    .dim {
        font-size: 0.7rem;
        color: #aeafb0;
    }

    /* ── Buttons ─────────────────────────────── */
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

    .btn-stack {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .btn-stack button {
        width: 100%;
        justify-content: flex-start;
    }

    /* ── Toggle button ───────────────────────── */
    .toggle-btn {
        width: 100%;
        justify-content: flex-start;
        gap: 10px;
        padding: 8px 12px;
        margin-bottom: 8px;
    }

    .toggle-btn.active {
        border-color: #c3e88d55;
        color: #c3e88d;
    }

    .pdots {
        display: flex;
        gap: 3px;
        flex-shrink: 0;
    }

    .pdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .proportion-list {
        margin-bottom: 10px;
    }

    .proportion-list .field input[type='range'] {
        flex: 1;
        min-width: 0;
        accent-color: #c3e88d;
    }
</style>
