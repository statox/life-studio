<script lang="ts">
    import { onMount } from 'svelte';

    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
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

    let cells: Cell[] = [];
    let attractionTable: AttractionTable = universes[0].attractionTable;
    let colorWeights: ColorProportions = universes[0].colorWeights;
    let nbParticles = universes[0].nbParticles;
    let maxAttractionRadius = universes[0].maxAttractionRadius;

    const worldSize = { x: 0, y: 0 };

    const startSim = () => {
        simulationComponent?.startSim({ cells, worldSize, maxAttractionRadius, attractionTable });
    };

    const loadUniverse = (u: StoredUniverse) => {
        attractionTable = u.attractionTable;
        colorWeights = u.colorWeights;
        nbParticles = u.nbParticles;
        maxAttractionRadius = u.maxAttractionRadius;
        worldSize.x = u.maxAttractionRadius * u.horizontalResolution;
        worldSize.y = u.maxAttractionRadius * u.verticalResolution;
        cells = getNewCells(worldSize, u.nbParticles, u.colorWeights);
        if (u.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);
        if (u.preferredInitialConfig === 'rainbow') rainbowCellsInPlace(cells, worldSize);
        startSim();
    };

    const loadByName = (name: string) => {
        const u = universes.find((u) => u.name === name);
        if (u) loadUniverse(u);
    };

    const updateAttractionTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        simulationComponent?.updateAttractionTable(newTable);
    };

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

    onMount(() => {
        loadUniverse(universes[0]);
    });
</script>

<div class="demo">
    <!-- Left column: narrative -->
    <div class="narrative">
        <!-- Section 1: Hero -->
        <section class="hero">
            <h1>Particle Life</h1>
            <p class="placeholder">[Introduction text goes here]</p>
        </section>

        <!-- Section 2: The Basics -->
        <section>
            <h2>The Basics</h2>
            <p class="placeholder">[Basics explanation goes here]</p>
            <div class="preset-btns">
                <button on:click={() => loadByName('Still')}>Still</button>
                <button on:click={() => loadByName('Uniform repulsion')}>Uniform repulsion</button>
                <button on:click={() => loadByName('2 colors own attraction')}
                    >2 colors own attraction</button
                >
            </div>
            <p class="placeholder">[Reset explanation goes here]</p>
            <div class="preset-btns">
                <button on:click={uniformSpread}>↺ Uniform spread</button>
                <button on:click={centerSpread}>◎ Centered circle</button>
            </div>
        </section>

        <!-- Section 3: Emergent Complexity -->
        <section>
            <h2>Emergent Complexity</h2>
            <p class="placeholder">[Complexity explanation goes here]</p>
            <div class="preset-btns">
                <button on:click={() => loadByName('2 colors own repulsion')}
                    >2 colors own repulsion</button
                >
                <button on:click={() => loadByName('Central circle spread')}
                    >Central circle spread</button
                >
            </div>
        </section>

        <!-- Section 4: The Attraction Table -->
        <section>
            <h2>The Attraction Table</h2>
            <p class="placeholder">[Attraction table explanation goes here]</p>
            <div class="card">
                <AttractionTableComponent {attractionTable} onUpdateTable={updateAttractionTable} />
            </div>
        </section>

        <!-- Section 5: Tuning the Mix -->
        <section>
            <h2>Tuning the Mix</h2>
            <p class="placeholder">[Mix explanation goes here]</p>
            <div class="card">
                <div class="card-title">Color proportions</div>
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
                <div class="preset-btns">
                    <button on:click={uniformSpread}>↺ Uniform spread</button>
                    <button on:click={centerSpread}>◎ Centered circle</button>
                    <button on:click={rainbowSpread}>≋ Rainbow</button>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <section class="footer">
            <p class="placeholder">[Footer — link to /particles/dev for the full sandbox]</p>
        </section>
    </div>

    <!-- Right column: sticky canvas -->
    <div class="canvas-col">
        <div class="canvas-sticky">
            <Simulation bind:this={simulationComponent} />
        </div>
    </div>
</div>

<style>
    /* ── Layout ─────────────────────────────── */
    .demo {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 32px 24px 64px;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        .demo {
            grid-template-columns: 1fr;
            padding: 16px 12px 48px;
            gap: 16px;
        }
    }

    /* ── Narrative column ────────────────────── */
    .narrative {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .narrative section {
        padding: 48px 0;
        border-bottom: 1px solid #37474f22;
    }

    .narrative section:first-child {
        padding-top: 0;
    }

    .narrative section:last-child {
        border-bottom: none;
    }

    .narrative h1 {
        font-size: 1.8rem;
        color: #eceff1;
        margin: 0 0 16px;
        font-weight: 700;
    }

    .narrative h2 {
        font-size: 1.2rem;
        color: #eceff1;
        margin: 0 0 12px;
        font-weight: 600;
    }

    .narrative p {
        color: #90a4ae;
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0 0 16px;
    }

    /* ── Sticky canvas column ────────────────── */
    .canvas-col {
        min-width: 0;
    }

    .canvas-sticky {
        position: sticky;
        top: 16px;
        align-self: start;
    }

    @media (max-width: 768px) {
        .canvas-col {
            order: -1;
        }

        .canvas-sticky {
            position: sticky;
            top: 0;
            z-index: 10;
            background: #1a2327;
            padding: 8px 0;
        }
    }

    /* ── Preset buttons ──────────────────────── */
    .preset-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 16px;
    }

    /* ── Placeholder text ────────────────────── */
    .placeholder {
        background: #1a232744;
        border-left: 3px solid #546e7a;
        padding: 12px 16px;
        border-radius: 0 6px 6px 0;
        font-style: italic;
        color: #546e7a;
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

    /* ── Particle dots ───────────────────────── */
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
