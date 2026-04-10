<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const SECTION_COUNT = 5;
    let sectionIndex = $state(0);

    const attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 1;

    const frictionPresets = [0.8, 0.25, 0.06, 0.0];
    let friction = $derived(sectionIndex < 4 ? frictionPresets[sectionIndex] : 0.5);

    const startSim = (f: number) => {
        friction = f;
        const cfg: SimulationConfig = {
            horizontalResolution: 6,
            verticalResolution: 4,
            initialSpreadConfig: 'center',
            colorWeights: { white: 1, red: 0, green: 0, blue: 0 },
            maxAttractionRadius: 32,
            attractionTable,
            nbParticles: 11,
            friction: f
        };
        simulationComponent?.startSim(generateSimulationParams(cfg));
    };

    $effect(() => {
        if (!simulationComponent) return;
        const idx = sectionIndex;
        untrack(() => startSim(idx < 4 ? frictionPresets[idx] : 0.5));
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
    <h2>Friction</h2>
    {#if sectionIndex === 0}
        <p>
            Another force governing our particles is friction. Friction controls how quickly
            particles slow down. The higher the friction, the stickier the universe, the quicker the
            particles stop moving. Here all the particles are attracted by each other.
        </p>
        <p>
            At <b>{frictionPresets[0]}</b> the friction is high and particles quickly find an equilibrium.
        </p>
        <div class="section-btns">
            <ScreenBtn
                active={friction === frictionPresets[0]}
                onclick={() => startSim(frictionPresets[0])}
            >
                {frictionPresets[0]}
            </ScreenBtn>
        </div>
    {:else if sectionIndex === 1}
        <p>
            At <b>{frictionPresets[1]}</b> the friction is lower. The particles wiggle a bit longer before
            finding their final position.
        </p>
        <div class="section-btns">
            <ScreenBtn
                active={friction === frictionPresets[1]}
                onclick={() => startSim(frictionPresets[1])}
            >
                {frictionPresets[1]}
            </ScreenBtn>
        </div>
    {:else if sectionIndex === 2}
        <p>
            At <b>{frictionPresets[2]}</b> we crossed a threshold where friction is no longer keeping
            the attraction forces in check. The particles keep bouncing into each other in a structure
            which could start looking like something organic.
        </p>
        <div class="section-btns">
            <ScreenBtn
                active={friction === frictionPresets[2]}
                onclick={() => startSim(frictionPresets[2])}
            >
                {frictionPresets[2]}
            </ScreenBtn>
        </div>
    {:else if sectionIndex === 3}
        <p>
            Finally, when the friction gets to <b>{frictionPresets[3]}</b> the particles never slow down
            and their motion is bound only by the maximal velocity of the universe. Chaos is created.
        </p>
        <div class="section-btns">
            <ScreenBtn
                active={friction === frictionPresets[3]}
                onclick={() => startSim(frictionPresets[3])}
            >
                {frictionPresets[3]}
            </ScreenBtn>
        </div>
    {:else}
        <p>
            Using the slider, can you find the lowest friction which stabilizes the universe in less
            than 10 seconds?
        </p>
        <div class="slider-row">
            <label for="friction-slider">Friction:</label>
            <input
                id="friction-slider"
                type="range"
                bind:value={friction}
                onchange={() => startSim(friction)}
                min="0"
                max="1"
                step="0.01"
            />
            <span class="slider-value">{friction.toFixed(2)}</span>
        </div>
    {/if}
</div>
