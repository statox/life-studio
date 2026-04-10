<script lang="ts">
    import { untrack } from 'svelte';

    import type { InitialConfig } from '$lib/particles/universe';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import ScreenBtn from '../ScreenBtn.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const SECTION_COUNT = 2;
    let sectionIndex = $state(0);

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
        const idx = sectionIndex;
        untrack(() => {
            if (idx === 0) startSim('uniform');
            else startSim('center');
        });
    });

    $effect(() => {
        onSectionChange?.(sectionIndex);
    });

    export function next() {
        if (sectionIndex < SECTION_COUNT - 1) {
            sectionIndex++;
        } else {
            onNextScreen?.();
        }
    }

    export function prev() {
        if (sectionIndex > 0) {
            sectionIndex--;
        } else {
            onPrevScreen?.();
        }
    }

    export function jumpToSection(idx: number) {
        if (idx >= 0 && idx < SECTION_COUNT) sectionIndex = idx;
    }
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
