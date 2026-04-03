<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    let attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 0;

    let forceValue: -1 | 0 | 1 = 0;
    let horizontalResolution = 6;
    let verticalResolution = 4;
    let nbParticles = 500;

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
        If we zoom in on the center of the previous universe we get something like this. All
        particles start tightly packed and slowly move away from each other.
    </p>
    <div class="controls">
        <div class="btn-group">
            <button class="screen-btn" class:active={forceValue === 0} on:click={() => setForce(0)}>
                neutral
            </button>
        </div>
    </div>
    <p>
        That shows their default behavior: If a particle is too close to a neighbor it gets repulsed
        and tries to move away. If no neighbor is close enough it just rests and does nothing.
    </p>
    <p>But particles can also attract each other</p>
    <div class="controls">
        <div class="btn-group">
            <button class="screen-btn" class:active={forceValue === 1} on:click={() => setForce(1)}>
                attract
            </button>
        </div>
    </div>
    <p>
        In this case their natural repulsion force has to fight a new attraction force: When a
        neighbor is close enough, the particle is now attracted. They pack as closely as possible to
        each other and their natural repulsion force pushes them into clusters.
    </p>
    <p>
        Finally, they can also repel each other, which causes clusters to form as groups push
        against one another.
    </p>
    <div class="controls">
        <div class="btn-group">
            <button
                class="screen-btn"
                class:active={forceValue === -1}
                on:click={() => setForce(-1)}
            >
                repulse
            </button>
        </div>
    </div>
</div>
