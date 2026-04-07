<script lang="ts">
    import { run } from 'svelte/legacy';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';
    import AttractionTableComponent from '../../../AttractionTableComponent.svelte';

    interface Props {
        simulationComponent: Simulation;
    }

    let { simulationComponent }: Props = $props();

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
    let currentPreset: string | undefined = $state('medium');
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

    run(() => {
        if (simulationComponent) startScreen();
    });
</script>

<div class="screen">
    <h2>World size</h2>
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
    <p>
        The last parameter we can control is the size of our universe. Here we will keep the same
        amount of particles but we will vary the size of the "box" they live in.
    </p>
    <p>
        We start with a
        <ScreenBtn active={currentPreset === 'medium'} on:click={() => setProportions('medium')}>
            Medium
        </ScreenBtn>
        size to observe the base behavior of this universe: Each color is attracted to the next one which
        creates moving worm-like structures. Sometimes the worm eats its own tail and the structure becomes
        circular. When they get close to each other, structures tend to merge and split.
    </p>

    <p>
        If we use
        <ScreenBtn active={currentPreset === 'large'} on:click={() => setProportions('large')}>
            Large
        </ScreenBtn> dimensions for the world we see that the particles have more room to move. The worms
        take more time to travel across the world. Since particles are less tightly packed in the world,
        they interact with each other less often, which allows more worms to form as they merge less
        often with other worms.
    </p>

    <p>
        Finally in a
        <ScreenBtn active={currentPreset === 'small'} on:click={() => setProportions('small')}>
            Small
        </ScreenBtn> world the particles don't have enough room to create several structures and most
        of the world is merged into a single worm. This view allows you to better see how the world wraps
        on itself: The top and bottom borders are connected and so are the left and right borders.
    </p>

    <div class="controls">
        <div class="control-section">
            <div class="btn-group">
                <ScreenBtn
                    active={currentPreset === 'medium'}
                    on:click={() => setProportions('medium')}
                >
                    Medium
                </ScreenBtn>
                <ScreenBtn
                    active={currentPreset === 'large'}
                    on:click={() => setProportions('large')}
                >
                    Large
                </ScreenBtn>
                <ScreenBtn
                    active={currentPreset === 'small'}
                    on:click={() => setProportions('small')}
                >
                    Small
                </ScreenBtn>
            </div>
        </div>
        <div class="control-section">
            <h3>Attraction Table</h3>
            <AttractionTableComponent attractionTable={preset.attractionTable} readonly compact />
        </div>
    </div>
</div>
