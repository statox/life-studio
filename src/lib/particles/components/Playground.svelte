<script lang="ts">
    import { onMount, tick } from 'svelte';

    import AttractionTablePanel from '$lib/particles/components/AttractionTablePanel.svelte';
    import KeyboardShortcuts from '$lib/particles/components/KeyboardShortcuts.svelte';
    import WorldSettingsSelector from '$lib/particles/components/WorldSettingsSelector.svelte';
    import type { WorldSettings } from '$lib/particles/engine/types';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { getMutatedAttractionTable, getRandomAttractionTable } from '$lib/particles/attraction';
    import { COLORS, PARTICLE_COLORS } from '$lib/particles/engine';
    import { centerCellsInPlace, getNewCells } from '$lib/particles/engine/cells';
    import { loadPresetParams, respreadParams } from '$lib/particles/engine';
    import type { SimulationParams } from '$lib/particles/engine/types';
    import UniformSpreadButton from './buttons/UniformSpreadButton.svelte';
    import CenteredCircleButton from './buttons/CenteredCircleButton.svelte';
    import RainbowButton from './buttons/RainbowButton.svelte';
    import Simulation from './Simulation.svelte';
    import PerfMonitor from './PerfMonitor.svelte';
    import type { PerfData } from '$lib/particles/engine/types';
    import UniverseExportModal from './UniverseExportModal.svelte';
    import UniverseSelector from './UniverseSelector.svelte';
    import { getAllUniverses, type StoredUniverse } from '$lib/particles/universe';

    let simulationComponent: Simulation = $state();

    const universes: StoredUniverse[] = getAllUniverses();
    let selected: StoredUniverse | undefined = $state(undefined);

    let lastParams: SimulationParams;
    let attractionTable: AttractionTable = $state(getRandomAttractionTable());

    let showColors = $state(true);
    let maxFPS = $state(60);
    let useWorkers = $state(true);

    let ws: WorldSettings = $state({
        nbParticles: 4000,
        horizontalResolution: 30,
        verticalResolution: 20,
        maxAttractionRadius: 32,
        friction: 0.5,
        colorWeights: { white: 500, red: 500, green: 500, blue: 500 }
    });

    const worldSize = {
        x: ws.maxAttractionRadius * ws.horizontalResolution,
        y: ws.maxAttractionRadius * ws.verticalResolution
    };

    const syncWorldSize = () => {
        worldSize.x = ws.maxAttractionRadius * ws.horizontalResolution;
        worldSize.y = ws.maxAttractionRadius * ws.verticalResolution;
    };

    let universe = $derived({
        attractionTable,
        colorWeights: ws.colorWeights,
        nbParticles: ws.nbParticles,
        maxAttractionRadius: ws.maxAttractionRadius,
        horizontalResolution: ws.horizontalResolution,
        verticalResolution: ws.verticalResolution,
        friction: ws.friction
    });

    const startWithParams = (params: SimulationParams) => {
        lastParams = params;
        simulationComponent?.startSim(params);
    };

    /** Build SimulationParams from the current editable ws + attractionTable state. */
    const buildCurrentParams = () => ({
        cells: getNewCells(worldSize, ws.nbParticles, ws.colorWeights),
        worldSize: { ...worldSize },
        maxAttractionRadius: ws.maxAttractionRadius,
        attractionTable,
        friction: ws.friction
    });

    const startSim = () => {
        startWithParams(buildCurrentParams());
    };

    const updateAttractionTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        lastParams = {
            ...lastParams,
            attractionTable
        };
        simulationComponent?.updateAttractionTable(newTable);
    };

    let updateWorldSettingsTimer: ReturnType<typeof setTimeout> | undefined;
    const onWorldSettingsChange = () => {
        clearTimeout(updateWorldSettingsTimer);
        updateWorldSettingsTimer = setTimeout(() => {
            syncWorldSize();
            startSim();
        }, 750);
    };

    const loadPreset = (u: StoredUniverse) => {
        selected = u;
        attractionTable = u.attractionTable;
        ws = {
            colorWeights: u.colorWeights,
            nbParticles: u.nbParticles,
            maxAttractionRadius: u.maxAttractionRadius,
            horizontalResolution: u.horizontalResolution,
            verticalResolution: u.verticalResolution,
            friction: u.friction
        };
        syncWorldSize();
        startWithParams(loadPresetParams(u));
    };

    const spread = (type: 'uniform' | 'center' | 'rainbow') => {
        startWithParams(respreadParams(lastParams, type, ws.nbParticles, ws.colorWeights));
    };

    // Small-center spread (unique to WorkBench, keyboard shortcut 'e')
    const centerCells = () => {
        const params = buildCurrentParams();
        centerCellsInPlace(params.cells, worldSize);
        startWithParams(params);
    };

    const keyActions: Record<string, () => void> = {
        q: () => spread('uniform'),
        w: () => spread('center'),
        e: centerCells,
        r: () => spread('rainbow'),
        t: () => updateAttractionTable(getRandomAttractionTable()),
        m: () => updateAttractionTable(getMutatedAttractionTable(attractionTable)),
        f: () => simulationComponent?.toggleFullscreen()
    };

    onMount(async () => {
        attractionTable = getRandomAttractionTable();
        startSim();
    });

    let perfData: PerfData | null = $state(null);
    let renderMs: number | null = $state(null);
    let showExportModal = $state(false);
</script>

<div class="playground">
    <!-- Left sidebar: controls (full height) -->
    <aside class="sidebar">
        <div class="card">
            <div class="card-title">World</div>
            <WorldSettingsSelector settings={ws} onChange={onWorldSettingsChange} />
        </div>

        <div class="card">
            <div class="card-title">Simulation</div>
            <button
                class="toggle-btn"
                class:active={showColors}
                onclick={() => (showColors = !showColors)}
            >
                <span class="pdots">
                    {#each COLORS as c}
                        <span class="pdot" style="background:{PARTICLE_COLORS[c]}"></span>
                    {/each}
                </span>
                {showColors ? 'Colors on' : 'Colors off'}
            </button>
            <div class="field">
                <label for="fps-cap">FPS cap</label>
                <input id="fps-cap" type="number" bind:value={maxFPS} min="1" max="120" />
            </div>
        </div>

        <div class="spread-btns">
            <UniformSpreadButton onClick={() => spread('uniform')} />
            <CenteredCircleButton onClick={() => spread('center')} />
            <RainbowButton onClick={() => spread('rainbow')} />
            <button
                class="export-btn"
                onclick={() => (showExportModal = true)}
                title="Export current table"
            >
                ↗ Export
            </button>
        </div>

        {#if !useWorkers}
            <div class="card">
                <div class="card-title">Performance (single-thread)</div>
                <PerfMonitor enginePerf={perfData} {renderMs} />
            </div>
        {/if}

        <KeyboardShortcuts actions={keyActions} />
    </aside>

    <!-- Right content area -->
    <div class="right-content">
        <!-- Top: simulation canvas -->
        <main class="canvas-area">
            <Simulation
                bind:this={simulationComponent}
                fillContainer
                {useWorkers}
                {maxFPS}
                onToggleWorkers={async () => {
                    useWorkers = !useWorkers;
                    perfData = null;
                    renderMs = null;
                    await tick();
                    startSim();
                }}
                onPerfData={(p) => (perfData = p)}
                onRenderPerf={(ms) => (renderMs = ms)}
            />
        </main>

        <!-- Bottom panels: attraction table + universe selector -->
        <div class="bottom-panels">
            <section class="bottom-left card">
                <div class="card-title">Attraction Table</div>
                <AttractionTablePanel
                    {attractionTable}
                    on:updateTable={(e) => updateAttractionTable(e.detail)}
                />
            </section>

            <section class="bottom-right">
                <UniverseSelector {universes} {selected} onSelect={loadPreset} />
            </section>
        </div>
    </div>
</div>

{#if showExportModal}
    <UniverseExportModal {universe} on:close={() => (showExportModal = false)} />
{/if}

<style>
    /* ── Dashboard layout ────────────────────── */
    .playground {
        display: flex;
        gap: 10px;
        padding: 12px 16px;
        height: calc(100vh - 60px);
        box-sizing: border-box;
        overflow: hidden;
    }

    .sidebar {
        width: 280px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;
        overflow-x: hidden;
        min-width: 0;
    }

    .right-content {
        flex: 1;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .canvas-area {
        flex: 1 1 0;
        min-height: 0;
        min-width: 0;
        overflow: hidden;
    }

    /* Make the Simulation canvas shrink to fit available height */
    .canvas-area :global(.sim) {
        height: 100%;
    }

    .canvas-area :global(.canvas-wrap) {
        height: calc(100% - 50px); /* leave room for timeline */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .canvas-area :global(canvas) {
        width: auto;
        height: 100%;
        max-width: 100%;
        object-fit: contain;
    }

    .bottom-panels {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        flex-shrink: 0;
        max-height: 40vh;
        overflow-y: auto;
    }

    /* ── Tablet ──────────────────────────────── */
    @media (max-width: 1023px) {
        .playground {
            flex-direction: column;
            height: auto;
            overflow: auto;
        }

        .sidebar {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            overflow-x: visible;
        }

        .sidebar > :global(*) {
            flex: 1;
            min-width: 200px;
        }

        .spread-btns {
            min-width: 0;
            flex: 0 0 auto;
        }

        .sidebar > :global(.shortcuts) {
            min-width: 0;
            flex: 0 0 auto;
            font-size: 0.65rem;
            gap: 4px 10px;
        }

        .canvas-area {
            flex: none;
            min-height: auto;
            overflow: visible;
        }

        .canvas-area :global(.canvas-wrap) {
            height: auto;
        }

        .canvas-area :global(canvas) {
            width: 100%;
            height: auto;
        }

        .bottom-panels {
            max-height: none;
            overflow: visible;
        }
    }

    /* ── Mobile ──────────────────────────────── */
    @media (max-width: 767px) {
        .sidebar {
            flex-direction: column;
        }

        .sidebar > :global(*) {
            min-width: 0;
        }

        .bottom-panels {
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

    /* ── Spread buttons ─────────────────────── */
    .spread-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
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
</style>
