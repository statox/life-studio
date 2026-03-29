<script lang="ts">
    import { onMount, tick } from 'svelte';

    import AttractionTablePanel from '$lib/particles/components/AttractionTablePanel.svelte';
    import KeyboardShortcuts from '$lib/particles/components/KeyboardShortcuts.svelte';
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
    import type { Cell } from '$lib/particles/engine';
    import Simulation from './Simulation.svelte';
    import UniverseExportModal from './UniverseExportModal.svelte';
    import PresetSelector from './PresetSelector.svelte';
    import type { StoredUniverse } from '$lib/particles/universe';

    let simulationComponent: Simulation;

    let cells: Cell[] = [];
    let attractionTable: AttractionTable = getRandomAttractionTable();

    let colorWeights: ColorProportions = { white: 500, red: 500, green: 500, blue: 500 };

    let showColors = true;
    let maxFPS = 60;
    let useWorkers = true;
    let friction = 0.5;

    let maxAttractionRadius = 32;
    let nbParticles = 4000;
    let horizontalResolution = 30;
    let verticalResolution = 20;

    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };

    $: universe = {
        attractionTable,
        colorWeights,
        nbParticles,
        maxAttractionRadius,
        horizontalResolution,
        verticalResolution,
        friction
    };

    const startSim = () => {
        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius,
            attractionTable,
            friction
        });
    };

    const restartWithCells = (newCells: Cell[]) => {
        cells = newCells;
        startSim();
    };

    const updateAttractionTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        simulationComponent?.updateAttractionTable(newTable);
    };

    let updateWorldSettingsTimer: ReturnType<typeof setTimeout> | undefined;
    const updateWorldSettings = (resetCells?: boolean) => {
        clearTimeout(updateWorldSettingsTimer);

        updateWorldSettingsTimer = setTimeout(() => {
            worldSize.x = maxAttractionRadius * horizontalResolution;
            worldSize.y = maxAttractionRadius * verticalResolution;
            if (resetCells) {
                cells = getNewCells(worldSize, nbParticles, colorWeights);
            }
            startSim();
        }, 750);
    };

    const loadPreset = (u: StoredUniverse) => {
        attractionTable = u.attractionTable;
        colorWeights = u.colorWeights;
        nbParticles = u.nbParticles;
        maxAttractionRadius = u.maxAttractionRadius;
        horizontalResolution = u.horizontalResolution;
        verticalResolution = u.verticalResolution;
        friction = u.friction;
        worldSize.x = u.maxAttractionRadius * u.horizontalResolution;
        worldSize.y = u.maxAttractionRadius * u.verticalResolution;
        cells = getNewCells(worldSize, u.nbParticles, u.colorWeights);
        if (u.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);
        if (u.preferredInitialConfig === 'rainbow') rainbowCellsInPlace(cells, worldSize);
        startSim();
    };

    const randomCells = () => {
        restartWithCells(getNewCells(worldSize, nbParticles, colorWeights));
    };

    const centerCells = () => {
        const newCells = getNewCells(worldSize, nbParticles, colorWeights);
        centerCellsInPlace(newCells, worldSize);
        restartWithCells(newCells);
    };

    const largeCenterCells = () => {
        const newCells = getNewCells(worldSize, nbParticles, colorWeights);
        largeCenterCellsInPlace(newCells, worldSize);
        restartWithCells(newCells);
    };

    const rainbowCells = () => {
        const newCells = getNewCells(worldSize, nbParticles, colorWeights);
        rainbowCellsInPlace(newCells, worldSize);
        restartWithCells(newCells);
    };

    const keyActions: Record<string, () => void> = {
        q: randomCells,
        w: largeCenterCells,
        e: centerCells,
        r: rainbowCells,
        t: () => updateAttractionTable(getRandomAttractionTable()),
        m: () => updateAttractionTable(getMutatedAttractionTable(attractionTable)),
        f: () => simulationComponent?.toggleFullscreen()
    };

    onMount(async () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        attractionTable = getRandomAttractionTable();
        startSim();
    });

    let showExportModal = false;
</script>

<div class="sim">
    <div class="panels">
        <div class="card">
            <div class="card-title">Cells</div>
            <div class="preset-wrap">
                <PresetSelector onSelect={loadPreset} />
            </div>
            <div class="btn-stack">
                <button on:click={randomCells}>↺ Uniform spread</button>
                <button on:click={largeCenterCells}>◎ Centered circle</button>
                <button on:click={rainbowCells}>≋ Rainbow</button>
            </div>

            <button
                class="export-btn"
                on:click={() => (showExportModal = true)}
                title="Export current table"
            >
                ↗ Export
            </button>
        </div>
    </div>

    <Simulation
        bind:this={simulationComponent}
        {useWorkers}
        onToggleWorkers={async () => {
            useWorkers = !useWorkers;
            await tick();
            startSim();
        }}
    />

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
                    on:change={() => updateWorldSettings(true)}
                    min="1"
                />
            </div>
            <div class="proportion-list">
                {#each COLORS as c}
                    <div class="field">
                        <span class="pdot" style="background:{PARTICLE_COLORS[c]}" />
                        <input
                            on:change={() => updateWorldSettings(true)}
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
                <!-- Attraction table panel -->
                <AttractionTablePanel
                    {attractionTable}
                    on:updateTable={(e) => updateAttractionTable(e.detail)}
                />
            </div>
        </div>
    </div>

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
                    on:change={() => updateWorldSettings(true)}
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
                    on:change={() => updateWorldSettings(true)}
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
                    on:change={() => updateWorldSettings(true)}
                    min="8"
                    max="128"
                />
            </div>
            <div class="field">
                <label for="fps-cap">FPS cap</label>
                <input id="fps-cap" type="number" bind:value={maxFPS} min="1" max="120" />
            </div>
            <div class="field">
                <label for="friction">Friction</label>
                <input
                    id="friction"
                    type="range"
                    bind:value={friction}
                    on:change={startSim}
                    min="0"
                    max="1"
                    step="0.01"
                />
                <span class="dim">{friction.toFixed(2)}</span>
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

    .preset-wrap {
        margin-bottom: 8px;
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
