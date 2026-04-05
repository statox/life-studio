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

    let simulationComponent: Simulation;

    const universes: StoredUniverse[] = getAllUniverses();
    let selected: StoredUniverse | undefined = undefined;

    let lastParams: SimulationParams;
    let attractionTable: AttractionTable = getRandomAttractionTable();

    let showColors = true;
    let maxFPS = 60;
    let useWorkers = true;

    let ws: WorldSettings = {
        nbParticles: 4000,
        horizontalResolution: 30,
        verticalResolution: 20,
        maxAttractionRadius: 32,
        friction: 0.5,
        colorWeights: { white: 500, red: 500, green: 500, blue: 500 }
    };

    const worldSize = {
        x: ws.maxAttractionRadius * ws.horizontalResolution,
        y: ws.maxAttractionRadius * ws.verticalResolution
    };

    const syncWorldSize = () => {
        worldSize.x = ws.maxAttractionRadius * ws.horizontalResolution;
        worldSize.y = ws.maxAttractionRadius * ws.verticalResolution;
    };

    $: universe = {
        attractionTable,
        colorWeights: ws.colorWeights,
        nbParticles: ws.nbParticles,
        maxAttractionRadius: ws.maxAttractionRadius,
        horizontalResolution: ws.horizontalResolution,
        verticalResolution: ws.verticalResolution,
        friction: ws.friction
    };

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

    let perfData: PerfData | null = null;
    let renderMs: number | null = null;
    let showExportModal = false;
</script>

<div class="sim">
    <!-- Universe selector -->
    <UniverseSelector {universes} {selected} onSelect={loadPreset} />

    <!-- Simulation canvas -->
    <Simulation
        bind:this={simulationComponent}
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

    <!-- Spread buttons -->
    <div class="spread-btns">
        <UniformSpreadButton onClick={() => spread('uniform')} />
        <CenteredCircleButton onClick={() => spread('center')} />
        <RainbowButton onClick={() => spread('rainbow')} />
        <button
            class="export-btn"
            on:click={() => (showExportModal = true)}
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

    <div class="panels">
        <div class="card">
            <div class="card-title">Attraction Table</div>
            <AttractionTablePanel
                {attractionTable}
                on:updateTable={(e) => updateAttractionTable(e.detail)}
            />
        </div>
        <div class="card">
            <div class="card-title">World</div>
            <WorldSettingsSelector settings={ws} onChange={onWorldSettingsChange} />
        </div>
    </div>

    <!-- World settings -->
    <div class="panels">
        <div class="card">
            <div class="card-title">Simulation</div>
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
            <div class="field">
                <label for="fps-cap">FPS cap</label>
                <input id="fps-cap" type="number" bind:value={maxFPS} min="1" max="120" />
            </div>
        </div>
    </div>

    <!-- Keyboard shortcuts legend -->
    <KeyboardShortcuts actions={keyActions} />
</div>

{#if showExportModal}
    <UniverseExportModal {universe} on:close={() => (showExportModal = false)} />
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

    /* ── Spread buttons ─────────────────────── */
    .spread-btns {
        display: flex;
        gap: 6px;
    }

    /* ── Panels grid ─────────────────────────── */
    .panels {
        display: grid;
        grid-template-columns: 1fr auto;
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
