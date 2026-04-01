<script lang="ts">
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { getNewCells, largeCenterCellsInPlace } from '$lib/particles/engine/cells';
    import { getUniverseById, type StoredUniverse } from '$lib/particles/universe';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const preset: StoredUniverse = getUniverseById('1_colors_repulsion');
    let attractionTable: AttractionTable = preset.attractionTable;
    let friction = preset.friction;

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
            attractionTable,
            friction
        });
    };

    const onFrictionChange = () => {
        // Restart sim with new friction since friction requires a restart
        startScreen();
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Repulsion and Space Paving</h2>
    <p>
        Now every particle repels its neighbors. That makes the species cover as much space as
        needed so that no one repulses the other. Notice how the particles form a regular grid-like
        pattern.
    </p>
    <p>Try changing the friction to see how it affects the way particles settle into position.</p>

    <div class="controls">
        <div class="control-section">
            <h3>Attraction Table</h3>
            <AttractionTableComponent {attractionTable} readonly />
        </div>

        <div class="control-section">
            <h3>Friction</h3>
            <div class="friction-control">
                <input
                    type="range"
                    bind:value={friction}
                    on:change={onFrictionChange}
                    min="0"
                    max="1"
                    step="0.01"
                />
                <span class="friction-value">{friction.toFixed(2)}</span>
            </div>
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

    .friction-control {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .friction-control input[type='range'] {
        flex: 1;
        accent-color: #c3e88d;
    }

    .friction-value {
        font-size: 0.82rem;
        color: #b0bec5;
        min-width: 32px;
        text-align: right;
    }
</style>
