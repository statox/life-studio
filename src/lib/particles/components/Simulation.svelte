<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import Canvas from '$lib/particles/components/Canvas.svelte';
    import ExportModal from '$lib/particles/components/ExportModal.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import type { Cell, Coordinates, UpdateCellsResponse } from '$lib/particles/engine';
    import { COLORS } from '$lib/particles/engine/Engine';

    import {
        getMutatedAttractionTable,
        getRandomAttractionTable,
        tables
    } from '$lib/particles/attraction';
    import { getNewCells } from '$lib/particles/engine/cells';

    let worker: Worker;
    let cells: Cell[];
    let buffer: Coordinates[][] = [];
    let attractionTable: AttractionTable;
    let lastFrameTimestamp = 0;
    let timeToFrame = 0;
    let renderPaused = false;
    let showColors = true;
    let maxFPS = 60;
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

    const cellSize = 3;

    let maxAttractionRadius = 32;
    let nbParticles = 4000;
    let horizontalResolution = 30;
    let verticalResolution = 20;

    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };

    let WorkerConstructor: new () => Worker;
    const loadWorker = async () => {
        const SimulationWorker = await import('$lib/particles/engine/simulation.worker?worker');
        WorkerConstructor = SimulationWorker.default;
        start();
    };

    const updateAttractionTable = (newAttractionTable: AttractionTable) => {
        attractionTable = newAttractionTable;
        worker.postMessage({ msg: 'updateTable', attractionTable });
        buffer = [cells.map((c) => c.pos)];
        frameIndex = 0;
    };

    const updateWorldSettings = () => {
        worldSize.x = maxAttractionRadius * horizontalResolution;
        worldSize.y = maxAttractionRadius * verticalResolution;
        start();
    };

    const centerCells = () => {
        for (const cell of cells) {
            const r = 2 * Math.random();
            const theta = Math.random() * 2 * Math.PI;
            cell.pos = {
                x: worldSize.x / 2 + r * Math.cos(theta),
                y: worldSize.y / 2 + r * Math.sin(theta)
            };
        }
        start(true, true);
    };

    const largeCenterCells = () => {
        for (const cell of cells) {
            const r = 200 * Math.random();
            const theta = Math.random() * 2 * Math.PI;
            cell.pos = {
                x: worldSize.x / 2 + r * Math.cos(theta),
                y: worldSize.y / 2 + r * Math.sin(theta)
            };
        }
        start(true, true);
    };

    const rainbowCells = () => {
        const sectionWidth = worldSize.x / 4;
        for (const cell of cells) {
            cell.color = COLORS[Math.min(Math.floor(cell.pos.x / sectionWidth), 3)];
        }
        start(true, true);
    };

    const MAX_BUFFER_SIZE = 1000;
    const start = (keepCells?: boolean, keepTable?: boolean) => {
        if (WorkerConstructor === undefined) throw new Error('Worker is not initialized');
        if (worker) {
            worker.postMessage({ msg: 'destroy' });
            worker.terminate();
        }
        worker = new WorkerConstructor();
        worker.onmessage = (response: MessageEvent<UpdateCellsResponse>) => {
            buffer.push(response.data.positions);
            // Limit the buffer size to avoid memory overflow
            if (buffer.length >= MAX_BUFFER_SIZE) {
                buffer.shift();
                frameIndex = Math.max(frameIndex - 1, 0);
            }
        };
        if (!keepCells) cells = getNewCells(worldSize, nbParticles);
        if (!keepTable) attractionTable = getRandomAttractionTable();
        buffer = [];
        frameIndex = 0;
        worker.postMessage({
            msg: 'start',
            cells,
            attractionTable,
            worldSize,
            maxAttractionRadius
        });
    };

    const handleKeydown = (e: KeyboardEvent) => {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
        const actions: Record<string, () => void> = {
            q: () => start(false, true),
            w: largeCenterCells,
            e: centerCells,
            r: rainbowCells,
            t: () => updateAttractionTable(getRandomAttractionTable()),
            m: () => updateAttractionTable(getMutatedAttractionTable(attractionTable))
        };
        actions[e.key]?.();
    };

    let canvasWrap: HTMLElement;
    let isFullscreen = false;
    let showExportModal = false;

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

    let frameIndex = 0;
    const updateFrame = () => {
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

    onMount(() => {
        loadWorker();
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    });
    onDestroy(() => worker?.terminate());
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="sim">
    <!-- Control panels -->
    <div class="panels">
        <!-- Simulation settings -->
        <div class="card">
            <div class="card-title">Simulation</div>
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
                <label for="radius">Max attraction radius</label>
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
                <label for="nb-particles">Particles</label>
                <input
                    id="nb-particles"
                    type="number"
                    bind:value={nbParticles}
                    on:change={updateWorldSettings}
                    min="1"
                />
            </div>
            <div class="field">
                <label for="fps-cap">FPS cap</label>
                <input id="fps-cap" type="number" bind:value={maxFPS} min="1" max="120" />
            </div>
        </div>

        <!-- Display -->
        <div class="card">
            <div class="card-title">Display</div>
            <button
                class="toggle-btn"
                class:active={showColors}
                on:click={() => (showColors = !showColors)}
            >
                <span class="pdots">
                    <span class="pdot" style="background:#ffedff" />
                    <span class="pdot" style="background:#fc2a51" />
                    <span class="pdot" style="background:#8ff97c" />
                    <span class="pdot" style="background:#77cfff" />
                </span>
                {showColors ? 'Colors on' : 'Colors off'}
            </button>
        </div>

        <!-- Cells -->
        <div class="card">
            <div class="card-title">Cells</div>
            <div class="btn-stack">
                <button on:click={() => start(false, true)}>↺ Reset random</button>
                <button on:click={centerCells}>◎ Center</button>
                <button on:click={largeCenterCells}>⊙ Wide center</button>
                <button on:click={rainbowCells}>≋ Rainbow</button>
            </div>
        </div>
    </div>

    <!-- Canvas -->
    <div class="canvas-wrap" bind:this={canvasWrap}>
        <Canvas {cells} {worldSize} {cellSize} {showColors} drewFrame={updateFrame} {maxFPS} />
    </div>

    <!-- Timeline bar -->
    <div class="timeline">
        <div class="tl-btns">
            <button class="icon-btn" on:click={() => (frameIndex = 0)} title="Go to start">⏮</button
            >
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
            on:click={toggleFullscreen}
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

    <!-- Preset selector -->
    <div class="card preset-card">
        <div class="preset-row">
            <div class="card-title">Preset</div>
            <button
                class="export-btn"
                on:click={() => (showExportModal = true)}
                title="Export current table"
            >
                ↗ Export
            </button>
        </div>
        <select
            on:change={(e) => {
                const v = e.currentTarget.value;
                if (v === '__random__') updateAttractionTable(getRandomAttractionTable());
                else updateAttractionTable(JSON.parse(v));
            }}
        >
            <option value="__random__">✦ Random</option>
            {#each tables as t}
                <option value={JSON.stringify(t.table)}>{t.name} — {t.description}</option>
            {/each}
        </select>
    </div>

    <!-- Attraction table editor (collapsible) -->
    <details class="card">
        <summary>
            <span class="card-title inline">Attraction table</span>
            <span class="summary-hint">— click to expand</span>
        </summary>
        {#if attractionTable}
            <div class="table-body">
                <AttractionTableComponent {attractionTable} onUpdateTable={updateAttractionTable} />
            </div>
        {/if}
    </details>

    <!-- Keyboard shortcuts -->
    <div class="shortcuts">
        {#each [{ key: 'Q', label: 'Reset random' }, { key: 'W', label: 'Wide center' }, { key: 'E', label: 'Center' }, { key: 'R', label: 'Rainbow' }, { key: 'T', label: 'Random table' }, { key: 'M', label: 'Mutate table' }] as s}
            <span class="shortcut"><kbd>{s.key}</kbd>{s.label}</span>
        {/each}
    </div>
</div>

{#if showExportModal}
    <ExportModal {attractionTable} on:close={() => (showExportModal = false)} />
{/if}

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

    /* ── Timeline ───────────────────────────── */
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

    .card-title.inline {
        display: inline;
        margin-bottom: 0;
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
        color: #455a64;
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

    .icon-btn {
        padding: 5px 9px;
        font-size: 0.88rem;
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
    }

    /* ── Preset card ─────────────────────────── */
    .preset-card select {
        width: 100%;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 6px;
        color: #eceff1;
        padding: 7px 10px;
        font-size: 0.82rem;
        cursor: pointer;
        appearance: auto;
    }

    .preset-card select:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
    }

    /* ── Collapsible attraction table ────────── */
    details > summary {
        cursor: pointer;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 0;
        user-select: none;
    }

    details > summary::-webkit-details-marker {
        display: none;
    }

    .summary-hint {
        font-size: 0.72rem;
        color: #455a64;
        margin-left: 6px;
    }

    details[open] .summary-hint {
        display: none;
    }

    .table-body {
        margin-top: 14px;
    }

    /* ── Preset row ───────────────────────────── */
    .preset-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .preset-row .card-title {
        margin-bottom: 0;
    }

    .export-btn {
        font-size: 0.75rem;
        padding: 4px 9px;
        color: #90a4ae;
    }

    /* ── Keyboard shortcuts ───────────────────── */
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
