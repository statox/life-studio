<script lang="ts">
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';
    import AttractionTableComponent from '../../AttractionTableComponent.svelte';

    export let simulationComponent: Simulation;

    const preset = getUniverseById('4_colors_worms');

    const sizePresets: Record<
        string,
        {
            horizontalResolution: number;
            verticalResolution: number;
            nbParticles: number;
            friction: number;
        }
    > = {
        small: {
            horizontalResolution: 10,
            verticalResolution: 7,
            nbParticles: 1000,
            friction: 0.7
        },
        medium: {
            horizontalResolution: 30,
            verticalResolution: 20,
            nbParticles: 4000,
            friction: 0.5
        },
        large: {
            horizontalResolution: 90,
            verticalResolution: 60,
            nbParticles: 4000,
            friction: 0.5
        }
    };
    let currentPreset: string | undefined = 'medium';
    let currentSize = sizePresets.medium;

    const setProportions = (preset: string) => {
        if (!Object.keys(sizePresets).includes(preset)) {
            throw new Error('Unknown preset name ' + preset);
        }
        currentPreset = preset;
        currentSize = sizePresets[currentPreset];
        startScreen();
    };

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: currentSize.horizontalResolution,
            verticalResolution: currentSize.verticalResolution,
            initialSpreadConfig: 'center',
            colorWeights: preset.colorWeights,
            maxAttractionRadius: 32,
            attractionTable: preset.attractionTable,
            nbParticles: currentSize.nbParticles,
            friction: preset.friction
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Four Colors</h2>
    <!-- TODO: Write text about worldsize
        Key points:
            - The cells always have the same size and same attraction radius
            - It is the size of "the box" which changes
            - Medium box 
                - Base reference
                - Shows worm behaviors and spinning structures
            - Large box
                - Leave room for worms to grow longer but the pattern is the same
            - Small box
                - shows how the world wraps
-->
    <p>[Placeholder: World size. Same behavior. Observe wrapping.]</p>

    <div class="controls">
        <div class="control-section">
            <div class="size-btns">
                <button
                    class="size-btn"
                    class:active={currentPreset === 'small'}
                    on:click={() => setProportions('small')}
                >
                    Small
                </button>
                <button
                    class="size-btn"
                    class:active={currentPreset === 'medium'}
                    on:click={() => setProportions('medium')}
                >
                    Medium
                </button>
                <button
                    class="size-btn"
                    class:active={currentPreset === 'large'}
                    on:click={() => setProportions('large')}
                >
                    Large
                </button>
            </div>
        </div>
        <div class="control-section">
            <h3>Attraction Table</h3>
            <AttractionTableComponent attractionTable={preset.attractionTable} readonly compact />
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

    .control-section {
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        padding: 14px 16px;
    }
</style>
