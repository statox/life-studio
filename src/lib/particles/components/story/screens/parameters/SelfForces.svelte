<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    let attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 0;

    let forceValue: -1 | 0 | 1 | undefined = undefined;
    let horizontalResolution = 6;
    let verticalResolution = 4;
    let nbParticles = 0; // Start with an empty screen

    const setForce = (val: -1 | 0 | 1) => {
        forceValue = val;
        attractionTable = getZeroedAttractionTable();
        attractionTable.white.white = val;
        if (val === -1) {
            horizontalResolution = 12;
            verticalResolution = 8;
            nbParticles = 100;
        } else {
            horizontalResolution = 6;
            verticalResolution = 4;
            nbParticles = 500;
        }
        startScreen();
    };

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution,
            verticalResolution,
            initialSpreadConfig: 'center',
            colorWeights: {
                white: 1,
                red: 0,
                green: 0,
                blue: 0
            },
            maxAttractionRadius: 32,
            attractionTable: attractionTable,
            nbParticles,
            friction: 0.77
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Forces</h2>
    <p>
        Let's zoom in on the center of the previous universe.
        <button class="screen-btn" class:active={forceValue === 0} on:click={() => setForce(0)}>
            Zoooom
        </button>
    </p>
    <p>
        All particles start tightly packed and slowly move away from each other. <b
            >This is their default behavior:</b
        > If a particle is too close to a neighbor it gets repulsed and tries to move away. If no neighbor
        is close enough it just rests and does nothing.
    </p>
    <p>
        Particles can attract each other
        <button class="screen-btn" class:active={forceValue === 1} on:click={() => setForce(1)}>
            Create attraction force
        </button>
    </p>
    <p>
        In this case their natural repulsion force has to fight a new force: When a neighbor is
        close enough, the particle is now attracted. They pack as closely as possible to each other
        and their natural repulsion force pushes them into clusters.
    </p>
    <p>
        Finally, they can also repel each other, which causes clusters to form as groups push
        against one another.
        <button class="screen-btn" class:active={forceValue === -1} on:click={() => setForce(-1)}>
            Create repulsion force
        </button>
    </p>
</div>
