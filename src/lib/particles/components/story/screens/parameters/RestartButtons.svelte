<script lang="ts">
    import UniformSpreadButton from '$lib/particles/components/buttons/UniformSpreadButton.svelte';
    import CenteredCircleButton from '$lib/particles/components/buttons/CenteredCircleButton.svelte';
    import type { InitialConfig } from '$lib/particles/universe';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';

    export let simulationComponent: Simulation;

    let attractionTable = getZeroedAttractionTable();

    let initialSpreadConfig: InitialConfig = 'uniform';
    let nbParticles = 100;

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
            initialSpreadConfig: initialSpreadConfig,
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

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Restart Buttons</h2>
    <p>
        <span
            >You can add many more particles to this universe, you just have to click the button:</span
        >
        <UniformSpreadButton onClick={uniformSpread} />
    </p>

    <div class="controls">
        <div class="spread-btns" />
    </div>

    <p>
        But still nothing happens... What if we pack our particles a bit more thightly?
        <CenteredCircleButton onClick={centerSpread} />
    </p>

    <p>We get some motion! Let's zoom in on that</p>
</div>
