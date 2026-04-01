<script lang="ts">
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { getNewCells, largeCenterCellsInPlace } from '$lib/particles/engine/cells';
    import { getUniverseById, type StoredUniverse } from '$lib/particles/universe';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const preset: StoredUniverse = getUniverseById('1_color_still');
    const attractionTable: AttractionTable = preset.attractionTable;

    const startScreen = () => {
        const worldSize = {
            x: preset.maxAttractionRadius * preset.horizontalResolution,
            y: preset.maxAttractionRadius * preset.verticalResolution
        };
        const cells = getNewCells(worldSize, preset.nbParticles, preset.colorWeights);
        if (preset.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);

        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius: preset.maxAttractionRadius,
            attractionTable: preset.attractionTable,
            friction: preset.friction
        });
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>A Still Universe</h2>
    <p>
        Here we have a bunch of white particles initially spread in a circle and without any force
        applied to them. Notice that at the very beginning the cells in the center push each other
        until everyone is far enough to not overlap its neighbors.
    </p>
    <p>Then nothing more happens.</p>

    <div class="controls">
        <div class="control-section">
            <h3>Attraction Table</h3>
            <AttractionTableComponent {attractionTable} readonly />
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
</style>
