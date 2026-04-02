<script lang="ts">
    import { onMount } from 'svelte';

    import type { AttractionTable } from '$lib/particles/attraction';
    import {
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import type { Cell } from '$lib/particles/engine';
    import Simulation from './Simulation.svelte';
    import AttractionTableComponent from './AttractionTableComponent.svelte';
    import WorldSettingsSelector from './WorldSettingsSelector.svelte';
    import type { WorldSettings } from '$lib/particles/engine/types';
    import { getAllUniverses, type StoredUniverse } from '$lib/particles/universe';
    import UniverseSelector from './UniverseSelector.svelte';

    let simulationComponent: Simulation;

    const universes: StoredUniverse[] = getAllUniverses();
    let selected: StoredUniverse = universes[0];

    let cells: Cell[] = [];
    let attractionTable: AttractionTable = universes[0].attractionTable;

    let ws: WorldSettings = {
        nbParticles: universes[0].nbParticles,
        horizontalResolution: universes[0].horizontalResolution,
        verticalResolution: universes[0].verticalResolution,
        maxAttractionRadius: universes[0].maxAttractionRadius,
        friction: universes[0].friction,
        colorWeights: universes[0].colorWeights
    };

    const worldSize = { x: 0, y: 0 };

    const startSim = () => {
        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius: ws.maxAttractionRadius,
            attractionTable,
            friction: ws.friction
        });
    };

    const restartWithCells = (newCells: Cell[]) => {
        cells = newCells;
        startSim();
    };

    const loadUniverse = (u: StoredUniverse) => {
        attractionTable = u.attractionTable;
        ws = {
            colorWeights: u.colorWeights,
            nbParticles: u.nbParticles,
            maxAttractionRadius: u.maxAttractionRadius,
            horizontalResolution: u.horizontalResolution,
            verticalResolution: u.verticalResolution,
            friction: u.friction
        };
        worldSize.x = u.maxAttractionRadius * u.horizontalResolution;
        worldSize.y = u.maxAttractionRadius * u.verticalResolution;
        cells = getNewCells(worldSize, u.nbParticles, u.colorWeights);
        if (u.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);
        if (u.preferredInitialConfig === 'rainbow') rainbowCellsInPlace(cells, worldSize, u.colorWeights);
        startSim();
    };

    const selectUniverse = (u: StoredUniverse) => {
        selected = u;
        loadUniverse(u);
    };

    onMount(() => {
        loadUniverse(universes[0]);
    });

    const uniformSpread = () => {
        restartWithCells(getNewCells(worldSize, ws.nbParticles, ws.colorWeights));
    };

    const centerSpread = () => {
        const newCells = getNewCells(worldSize, ws.nbParticles, ws.colorWeights);
        largeCenterCellsInPlace(newCells, worldSize);
        restartWithCells(newCells);
    };

    const rainbowSpread = () => {
        const newCells = getNewCells(worldSize, ws.nbParticles, ws.colorWeights);
        rainbowCellsInPlace(newCells, worldSize, ws.colorWeights);
        restartWithCells(newCells);
    };

    const behaviorColor = (b: string): string => {
        if (b === 'still') return '#546e7a';
        if (b === 'converges') return '#1565c0';
        if (b === 'cyclic') return '#2e7d32';
        return '#e65100';
    };

    const energyColor = (e: string): string => {
        if (e === 'low') return '#78909c';
        if (e === 'medium') return '#c3e88d';
        return '#fc2a51';
    };

    const stars = (n: number): string => '★'.repeat(n) + '☆'.repeat(3 - n);
</script>

<div class="sim">
    <!-- Universe selector -->
    <UniverseSelector {universes} {selected} onSelect={selectUniverse} />

    <!-- Simulation canvas -->
    <Simulation bind:this={simulationComponent} />

    <!-- Spread buttons -->
    <div class="spread-btns">
        <button on:click={uniformSpread}>↺ Uniform spread</button>
        <button on:click={centerSpread}>◎ Centered circle</button>
        <button on:click={rainbowSpread}>≋ Rainbow</button>
    </div>

    <!-- Details + Attraction Table -->
    <div class="panels">
        <!-- Universe Details -->
        <div class="card">
            <div class="card-title">Universe</div>
            <div class="universe-header">
                <span class="universe-name-lg">{selected.name}</span>
                <span class="dim">{selected.description}</span>
            </div>
            <div class="card-subtitle">Classification</div>
            <div class="field">
                <span class="field-label">Behavior</span>
                <span class="meta-pill" style="background:{behaviorColor(selected.behavior)}"
                    >{selected.behavior}</span
                >
            </div>
            <div class="field">
                <span class="field-label">Structure</span>
                <span class="meta-value">{selected.structure}</span>
            </div>
            <div class="field">
                <span class="field-label">Colors</span>
                <span class="meta-value">{selected.activeColors}</span>
            </div>
            <div class="field">
                <span class="field-label">Convergence</span>
                <span class="meta-value">{selected.convergenceSpeed}</span>
            </div>
            <div class="field">
                <span class="field-label">Energy</span>
                <span class="meta-value" style="color:{energyColor(selected.energyLevel)}"
                    >{selected.energyLevel}</span
                >
            </div>
            <div class="field">
                <span class="field-label">Complexity</span>
                <span class="meta-stars">{stars(selected.complexity)}</span>
            </div>
            <div class="card-subtitle">Properties</div>
            <WorldSettingsSelector settings={ws} readonly />
        </div>

        <!-- Attraction Table (read-only) -->
        <div class="card">
            <div class="card-title">Attraction</div>
            <AttractionTableComponent {attractionTable} readonly />
        </div>
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

    /* ── Spread buttons ─────────────────────── */
    .spread-btns {
        display: flex;
        gap: 6px;
    }

    .spread-btns button {
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

    .spread-btns button:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    /* ── Panels grid ─────────────────────────── */
    .panels {
        display: grid;
        grid-template-columns: 1fr 2fr;
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

    .universe-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
    }

    .card-subtitle {
        font-size: 0.63rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #546e7a;
        font-weight: 600;
        margin: 10px 0 6px;
        padding-top: 8px;
        border-top: 1px solid #37474f;
    }

    .meta-pill {
        font-size: 0.72rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        padding: 2px 8px;
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .meta-value {
        font-size: 0.82rem;
        color: #b0bec5;
    }

    .meta-stars {
        font-size: 0.82rem;
        color: #c3e88d;
        letter-spacing: 1px;
    }

    .universe-name-lg {
        font-size: 1rem;
        font-weight: 700;
        color: #eceff1;
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

    .field .field-label {
        font-size: 0.8rem;
        color: #90a4ae;
        width: 60px;
        flex-shrink: 0;
    }

    .dim {
        font-size: 0.7rem;
        color: #aeafb0;
    }
</style>
