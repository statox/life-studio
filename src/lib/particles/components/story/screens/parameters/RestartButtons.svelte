<script lang="ts">
    import { untrack } from 'svelte';

    import type { InitialConfig } from '$lib/particles/universe';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import ScreenBtn from '../ScreenBtn.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';

    interface Props {
        simulationComponent: Simulation;
        sectionIndex?: number;
    }

    let { simulationComponent, sectionIndex = 0 }: Props = $props();

    const attractionTable = getZeroedAttractionTable();
    let spreadConfig: InitialConfig = $state('uniform');

    const startSim = (config: InitialConfig) => {
        spreadConfig = config;
        const cfg: SimulationConfig = {
            horizontalResolution: 30,
            verticalResolution: 20,
            initialSpreadConfig: config,
            colorWeights: { white: 1, red: 0, green: 0, blue: 0 },
            maxAttractionRadius: 32,
            attractionTable,
            nbParticles: 2000,
            friction: 0.5
        };
        simulationComponent?.startSim(generateSimulationParams(cfg));
    };

    $effect(() => {
        if (!simulationComponent) return;
        untrack(() => {
            if (sectionIndex === 0) startSim('uniform');
            else startSim('center');
        });
    });
</script>

<div class="screen">
    <h2>Restart Buttons</h2>
    {#if sectionIndex === 0}
        <p>Let's add a few particles.</p>
        <p>
            Meet <span class="cw">White</span>. This is our first species. For now it is doing
            nothing. That is going to change soon.
        </p>
        <div class="section-btns">
            <ScreenBtn active={spreadConfig === 'uniform'} onclick={() => startSim('uniform')}>
                Add particles
            </ScreenBtn>
        </div>
    {:else}
        <p>Look at what happens when we pack our particles a bit more tightly:</p>
        <div class="section-btns">
            <ScreenBtn active={spreadConfig === 'center'} onclick={() => startSim('center')}>
                Pack particles
            </ScreenBtn>
        </div>
        <p>We get some motion! Let's zoom in on that.</p>
    {/if}
</div>
