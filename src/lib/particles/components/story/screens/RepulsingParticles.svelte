<script lang="ts">
    import {
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import { getUniverseById } from '$lib/particles/universe';
    import type { Cell } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const preset = getUniverseById('1_colors_repulsion');
    const attractionTable = preset.attractionTable;
    const worldSize = {
        x: preset.maxAttractionRadius * preset.horizontalResolution,
        y: preset.maxAttractionRadius * preset.verticalResolution
    };

    const startSim = (cells: Cell[]) => {
        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius: preset.maxAttractionRadius,
            attractionTable,
            friction: preset.friction
        });
    };

    const uniformSpread = () => {
        startSim(getNewCells(worldSize, preset.nbParticles, preset.colorWeights));
    };

    const centerSpread = () => {
        const cells = getNewCells(worldSize, preset.nbParticles, preset.colorWeights);
        largeCenterCellsInPlace(cells, worldSize);
        startSim(cells);
    };

    const rainbowSpread = () => {
        const cells = getNewCells(worldSize, preset.nbParticles, preset.colorWeights);
        rainbowCellsInPlace(cells, worldSize);
        startSim(cells);
    };

    const startScreen = () => {
        centerSpread();
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Restart Buttons</h2>
    <!-- TODO: Write text about the restart buttons.
         Points to address:
         - "Uniform spread" distributes particles randomly across the whole world
         - "Centered circle" places all particles in a circle at the center
         - "Rainbow" distributes particles and colors them by horizontal position
         - Each restart re-generates particles with the same rules, but different initial positions
         - Initial conditions affect how the simulation evolves
    -->
    <p>[Placeholder: description of the three restart buttons and how initial conditions matter]</p>

    <div class="controls">
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
