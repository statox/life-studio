<script lang="ts">
    import { onMount } from 'svelte';

    import type { AttractionTable } from '$lib/particles/attraction';
    import { COLORS, PARTICLE_COLORS } from '$lib/particles/engine';
    import {
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import type { ColorProportions } from '$lib/particles/engine/cells';
    import type { Cell } from '$lib/particles/engine';
    import Simulation from './Simulation.svelte';
    import { getAllUniverses, type StoredUniverse } from '$lib/particles/universe';

    let simulationComponent: Simulation;

    const universes: StoredUniverse[] = getAllUniverses();
    let selectedIndex = 0;

    let cells: Cell[] = [];
    let attractionTable: AttractionTable = universes[0].attractionTable;
    let colorWeights: ColorProportions = universes[0].colorWeights;
    let nbParticles = universes[0].nbParticles;
    let maxAttractionRadius = universes[0].maxAttractionRadius;
    let horizontalResolution = universes[0].horizontalResolution;
    let verticalResolution = universes[0].verticalResolution;

    const worldSize = { x: 0, y: 0 };

    const startSim = () => {
        simulationComponent?.startSim({ cells, worldSize, maxAttractionRadius, attractionTable });
    };

    const loadUniverse = (u: StoredUniverse) => {
        attractionTable = u.attractionTable;
        colorWeights = u.colorWeights;
        nbParticles = u.nbParticles;
        maxAttractionRadius = u.maxAttractionRadius;
        horizontalResolution = u.horizontalResolution;
        verticalResolution = u.verticalResolution;
        worldSize.x = u.maxAttractionRadius * u.horizontalResolution;
        worldSize.y = u.maxAttractionRadius * u.verticalResolution;
        cells = getNewCells(worldSize, u.nbParticles, u.colorWeights);
        if (u.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);
        if (u.preferredInitialConfig === 'rainbow') rainbowCellsInPlace(cells, worldSize);
        startSim();
    };

    const selectUniverse = (i: number) => {
        selectedIndex = i;
        loadUniverse(universes[i]);
    };

    onMount(() => {
        loadUniverse(universes[0]);
    });

    const uniformSpread = () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        simulationComponent?.updateCells(cells);
    };

    const centerSpread = () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        largeCenterCellsInPlace(cells, worldSize);
        simulationComponent?.updateCells(cells);
    };

    const rainbowSpread = () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        rainbowCellsInPlace(cells, worldSize);
        simulationComponent?.updateCells(cells);
    };

    const valueColor = (val: number): string => {
        if (val <= -2) return '#b71c1c';
        if (val === -1) return '#c62828';
        if (val === 0) return '#37474f';
        if (val === 1) return '#2e7d32';
        return '#1b5e20';
    };

    const valueLabel = (val: number): string => (val > 0 ? `+${val}` : `${val}`);

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

    $: selected = universes[selectedIndex];
</script>

<div class="sim">
    <!-- Universe selector -->
    <ul class="universe-list" role="listbox" aria-label="Universe selector">
        {#each universes as u, i}
            <li
                class="universe-item"
                class:active={i === selectedIndex}
                role="option"
                aria-selected={i === selectedIndex}
                tabindex="0"
                on:click={() => selectUniverse(i)}
                on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectUniverse(i); } }}
            >
                <div class="universe-item-row">
                    <span class="universe-item-name">{u.name}</span>
                    <div class="badges">
                        <span class="badge" style="background:{behaviorColor(u.behavior)}"
                            >{u.behavior}</span
                        >
                        <span class="stars">{stars(u.complexity)}</span>
                    </div>
                </div>
                <span class="universe-item-desc dim">{u.description}</span>
            </li>
        {/each}
    </ul>

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
            <div class="field">
                <label for="gallery-particles">Particles</label>
                <input id="gallery-particles" type="number" value={nbParticles} disabled />
            </div>
            <div class="field">
                <label for="gallery-hcells">H cells</label>
                <input id="gallery-hcells" type="number" value={horizontalResolution} disabled />
                <span class="dim">{horizontalResolution * maxAttractionRadius}px</span>
            </div>
            <div class="field">
                <label for="gallery-vcells">V cells</label>
                <input id="gallery-vcells" type="number" value={verticalResolution} disabled />
                <span class="dim">{verticalResolution * maxAttractionRadius}px</span>
            </div>
            <div class="field">
                <label for="gallery-maxradius">Max radius</label>
                <input id="gallery-maxradius" type="number" value={maxAttractionRadius} disabled />
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
                            disabled
                        />
                        <span class="dim" style="width:28px;text-align:right"
                            >{colorWeights[c]}</span
                        >
                    </div>
                {/each}
            </div>
        </div>

        <!-- Attraction Table (read-only) -->
        <div class="card">
            <div class="card-title">Attraction</div>
            <div class="scroll-wrap">
                <div class="matrix">
                    <!-- Corner -->
                    <div class="corner">
                        <span class="corner-label">self ↓</span>
                        <span class="corner-label">other →</span>
                    </div>
                    <!-- Column headers -->
                    {#each COLORS as c}
                        <div class="col-header">
                            <span class="dot" style="background:{PARTICLE_COLORS[c]}" />
                            <span class="col-label">{c}</span>
                        </div>
                    {/each}
                    <!-- Rows -->
                    {#each COLORS as selfColor}
                        <div class="row-header">
                            <span class="dot" style="background:{PARTICLE_COLORS[selfColor]}" />
                            <span class="col-label">{selfColor}</span>
                        </div>
                        {#each COLORS as otherColor}
                            {@const val = attractionTable[selfColor][otherColor]}
                            <div
                                class="swatch"
                                style="background:{valueColor(val)}"
                                title="{selfColor} → {otherColor}"
                            >
                                {valueLabel(val)}
                            </div>
                        {/each}
                    {/each}
                </div>
            </div>
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

    /* ── Universe selector ───────────────────── */
    .universe-list {
        list-style: none;
        margin: 0;
        padding: 0;
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        overflow-y: auto;
        max-height: calc(6 * 56px);
    }

    .universe-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 10px 14px;
        cursor: pointer;
        border-left: 3px solid transparent;
        transition: background 0.13s, border-color 0.13s;
    }

    .universe-item + .universe-item {
        border-top: 1px solid #1e2a2f;
    }

    .universe-item:hover {
        background: #2e3c43;
    }

    .universe-item.active {
        border-left-color: #c3e88d;
        background: #1e2e1a;
    }

    .universe-item-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
    }

    .universe-item-name {
        font-size: 0.85rem;
        font-weight: 700;
        color: #cfd8dc;
    }

    .universe-item.active .universe-item-name {
        color: #c3e88d;
    }

    .universe-item-desc {
        font-size: 0.75rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .badges {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
    }

    .badge {
        font-size: 0.62rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        padding: 2px 6px;
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .stars {
        font-size: 0.72rem;
        color: #c3e88d;
        letter-spacing: 1px;
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

    .field label,
    .field .field-label {
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

    .field input[type='number']:disabled {
        opacity: 0.7;
        cursor: default;
    }

    .dim {
        font-size: 0.7rem;
        color: #aeafb0;
    }

    .pdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .proportion-list {
        margin-top: 10px;
    }

    .proportion-list .field input[type='range'] {
        flex: 1;
        min-width: 0;
        accent-color: #c3e88d;
    }

    /* ── Attraction table (read-only) ────────── */
    .scroll-wrap {
        overflow-x: auto;
    }

    .matrix {
        display: grid;
        grid-template-columns: auto repeat(4, 1fr);
        gap: 4px;
        min-width: 220px;
    }

    .corner {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 6px;
        padding-right: 6px;
    }

    .corner-label {
        font-size: 0.6rem;
        color: #546e7a;
        line-height: 1.4;
    }

    .col-header,
    .row-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 4px 2px;
    }

    .row-header {
        flex-direction: row;
        justify-content: flex-start;
        padding-right: 6px;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .col-label {
        font-size: 0.62rem;
        color: #90a4ae;
        text-transform: capitalize;
    }

    @media (max-width: 640px) {
        .col-label {
            display: none;
        }
    }

    .swatch {
        border-radius: 4px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.92);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
    }
</style>
