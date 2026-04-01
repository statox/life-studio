<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import { COLORS, PARTICLE_COLORS, type Cell } from '$lib/particles/engine';
    import {
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import type { ColorProportions } from '$lib/particles/engine/cells';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 2;
    attractionTable.white.red = 2;
    attractionTable.white.green = 1;
    attractionTable.white.blue = 0;
    attractionTable.red.white = -1;
    attractionTable.red.red = 1;
    attractionTable.red.green = 1;
    attractionTable.red.blue = -1;
    attractionTable.green.white = 2;
    attractionTable.green.red = -1;
    attractionTable.green.green = 1;
    attractionTable.green.blue = 2;
    attractionTable.blue.white = 0;
    attractionTable.blue.red = 0;
    attractionTable.blue.green = 2;
    attractionTable.blue.blue = 1;
    let colorWeights: ColorProportions = { white: 250, red: 250, green: 250, blue: 250 };

    const maxAttractionRadius = 32;
    const horizontalResolution = 3;
    const verticalResolution = 2;
    const nbParticles = 100;
    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };

    const startSim = (cells: Cell[]) => {
        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius,
            attractionTable,
            friction: 0.5
        });
    };

    const uniformSpread = () => {
        startSim(getNewCells(worldSize, nbParticles, colorWeights));
    };

    const centerSpread = () => {
        const cells = getNewCells(worldSize, nbParticles, colorWeights);
        largeCenterCellsInPlace(cells, worldSize);
        startSim(cells);
    };

    const rainbowSpread = () => {
        const cells = getNewCells(worldSize, nbParticles, colorWeights);
        rainbowCellsInPlace(cells, worldSize);
        startSim(cells);
    };

    const onWeightsChange = () => {
        centerSpread();
    };

    const startScreen = () => {
        centerSpread();
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Four Colors</h2>
    <!-- TODO: Write text about color proportions and 4 colors.
         Points to address:
         - Up to 4 species can coexist in the simulation
         - Color weights control how many particles of each color are created
         - Set a weight to 0 to remove a species entirely
         - More species = more possible interactions = more complex emergent behavior
         - 4 colors x 4 colors = 16 rules in the attraction table
         - Try different proportions and table values to see what emerges
    -->
    <p>[Placeholder: introducing 4 colors, color proportions, more complexity]</p>

    <div class="controls">
        <div class="control-section">
            <h3>Color Proportions</h3>
            <div class="proportion-list">
                {#each COLORS as c}
                    <div class="field">
                        <span class="pdot" style="background:{PARTICLE_COLORS[c]}" />
                        <input
                            type="range"
                            bind:value={colorWeights[c]}
                            on:change={onWeightsChange}
                            min="0"
                            max="1000"
                            step="1"
                        />
                        <span class="dim">{colorWeights[c]}</span>
                    </div>
                {/each}
            </div>
        </div>

        <div class="spread-btns">
            <button class="restart-btn" on:click={uniformSpread}>↺ Uniform spread</button>
            <button class="restart-btn" on:click={centerSpread}>◎ Centered circle</button>
            <button class="restart-btn" on:click={rainbowSpread}>≋ Rainbow</button>
        </div>
    </div>
</div>

<style>
    .screen {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    h2 {
        font-size: 1.2rem;
        color: #eceff1;
        margin: 0;
        font-weight: 600;
    }

    h3 {
        font-size: 0.85rem;
        color: #b0bec5;
        margin: 0 0 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    p {
        color: #90a4ae;
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0;
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 8px;
    }

    .control-section {
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        padding: 14px 16px;
    }

    .field {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 7px;
    }

    .field:last-child {
        margin-bottom: 0;
    }

    .field input[type='range'] {
        flex: 1;
        accent-color: #c3e88d;
    }

    .pdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .dim {
        font-size: 0.7rem;
        color: #aeafb0;
        min-width: 28px;
        text-align: right;
    }

    .spread-btns {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }

    .restart-btn {
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

    .restart-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }
</style>
