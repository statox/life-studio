<script lang="ts">
    import { untrack } from 'svelte';

    import type { InitialConfig } from '$lib/particles/universe';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import ScreenBtn from '../ScreenBtn.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';

    interface Props {
        simulationComponent: Simulation;
    }

    let { simulationComponent }: Props = $props();

    let attractionTable = getZeroedAttractionTable();

    let initialSpreadConfig: InitialConfig | undefined = $state(undefined);
    let nbParticles = 0;

    const uniformSpread = () => {
        initialSpreadConfig = 'uniform';
        nbParticles = 2000;
        startScreen();
    };

    const centerSpread = () => {
        initialSpreadConfig = 'center';
        nbParticles = 2000;
        startScreen();
    };

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: 30,
            verticalResolution: 20,
            initialSpreadConfig: initialSpreadConfig || 'uniform',
            colorWeights: {
                white: 1,
                red: 0,
                green: 0,
                blue: 0
            },
            maxAttractionRadius: 32,
            attractionTable: attractionTable,
            nbParticles,
            friction: 0.5
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $effect(() => {
        if (!simulationComponent) return;
        untrack(startScreen);
    });
</script>

<div class="screen">
    <h2>Restart Buttons</h2>
    <p>Let's add a few particles</p>
    <p>
        <em
            >Click the buttons in the text and observe the simulation update at the bottom of the
            page.</em
        >
        <ScreenBtn active={initialSpreadConfig === 'uniform'} onclick={() => uniformSpread()}>
            Add particles
        </ScreenBtn>
    </p>
    <p>
        Meet <span class="cw">White</span>. This is our first species. For now it is doing nothing.
        That is going to change soon.
    </p>

    <p>
        Look at what happens when we pack our particles a bit more tightly:
        <ScreenBtn active={initialSpreadConfig === 'center'} onclick={() => centerSpread()}>
            Pack particles
        </ScreenBtn>
    </p>

    <p>
        We get some motion! Let's zoom in on that.
        <em>Click the "Next" (→) button at the bottom of the page.</em>
    </p>
    <div class="controls">
        <div class="control-section">
            <div class="btn-group">
                <ScreenBtn
                    active={initialSpreadConfig === 'uniform'}
                    onclick={() => uniformSpread()}
                >
                    Add particles
                </ScreenBtn>
                <ScreenBtn active={initialSpreadConfig === 'center'} onclick={() => centerSpread()}>
                    Pack particles
                </ScreenBtn>
            </div>
        </div>
    </div>
</div>
