<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { COLORS, generateSimulationParams, PARTICLE_COLORS } from '$lib/particles/engine';
    import type { ColorProportions } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';

    interface Props {
        simulationComponent: Simulation;
        sectionIndex?: number;
    }

    let { simulationComponent, sectionIndex = 0 }: Props = $props();

    const universe = getUniverseById('crystal_stripes');

    type PresetName = 'equal' | 'no_white' | 'no_red' | 'no_green' | 'no_blue';
    const presetNames: PresetName[] = ['equal', 'no_white', 'no_red', 'no_green', 'no_blue'];
    const weightPresets: Record<PresetName, ColorProportions> = {
        equal: { white: 500, red: 500, green: 500, blue: 500 },
        no_white: { white: 0, red: 500, green: 500, blue: 500 },
        no_red: { white: 500, red: 0, green: 500, blue: 500 },
        no_green: { white: 500, red: 500, green: 0, blue: 500 },
        no_blue: { white: 500, red: 500, green: 500, blue: 0 }
    };

    const initialPreset = presetNames[sectionIndex] ?? 'equal';
    let currentPreset = $state(initialPreset);
    let colorWeights: ColorProportions = $state({ ...weightPresets[initialPreset] });

    const setPreset = (name: PresetName) => {
        currentPreset = name;
        colorWeights = { ...weightPresets[name] };
        startSim();
    };

    const startSim = () => {
        simulationComponent?.startSim(
            generateSimulationParams({
                ...universe,
                initialSpreadConfig: universe.preferredInitialConfig,
                colorWeights
            })
        );
    };

    $effect(() => {
        if (!simulationComponent) return;
        untrack(startSim);
    });
</script>

<div class="screen">
    <h2>Changing species proportions</h2>
    {#if sectionIndex === 0}
        <p>
            Our 4 species all have the same number of individuals. The universe converges into a
            crystal-like structure where <span class="cw">White</span>,
            <span class="cg">Green</span> and <span class="cb">Blue</span> pack into compact
            structures and between them <span class="cr">Red</span> randomly moves in patches.
        </p>
        <p>Now observe what happens when you remove one species altogether.</p>
        <p>Can you predict what will happen when you remove <span class="cw">White</span>?</p>
        <div class="section-btns">
            <ScreenBtn active={currentPreset === 'equal'} onclick={() => setPreset('equal')}>
                Reset to equal
            </ScreenBtn>
        </div>
    {:else if sectionIndex === 1}
        <p>
            It looks like the <span class="cw">White</span> dynamic was the motor of the motion in the
            universe — now everything stabilizes very quickly.
        </p>
        <div class="section-btns">
            <ScreenBtn active={currentPreset === 'no_white'} onclick={() => setPreset('no_white')}>
                Remove <span class="cw">White</span>
            </ScreenBtn>
        </div>
    {:else if sectionIndex === 2}
        <p>
            Let's reintroduce <span class="cw">White</span> and remove
            <span class="cr">Red</span> completely. Removing <span class="cr">Red</span> doesn't prevent
            the creation of crystals. Actually since red isn't there to create holes in the crystal, all
            the particles tend to form one big area.
        </p>
        <div class="section-btns">
            <ScreenBtn active={currentPreset === 'no_red'} onclick={() => setPreset('no_red')}>
                Remove <span class="cr">Red</span>
            </ScreenBtn>
        </div>
    {:else if sectionIndex === 3}
        <p>
            Now it is clear that the <span class="cb">Blue</span>-<span class="cg">Green</span>
            attraction is the basis of the crystal. When this strong crystal doesn't exist anymore
            <span class="cr">Red</span> and <span class="cw">White</span> have all the room to chase each
            other.
        </p>
        <div class="section-btns">
            <ScreenBtn active={currentPreset === 'no_green'} onclick={() => setPreset('no_green')}>
                Remove <span class="cg">Green</span>
            </ScreenBtn>
        </div>
    {:else}
        <p>
            Without <span class="cb">Blue</span> you can observe a more chaotic world where waves of
            <span class="cw">White</span>
            chase groups of <span class="cg">Green</span> and
            <span class="cr">Red</span>. Simple oscillations end up converging in larger waves like
            in some physical systems.
        </p>
        <div class="section-btns">
            <ScreenBtn active={currentPreset === 'no_blue'} onclick={() => setPreset('no_blue')}>
                Remove <span class="cb">Blue</span>
            </ScreenBtn>
        </div>
        <div class="proportion-list">
            {#each COLORS as c}
                <div class="field">
                    <span class="pdot" style="background:{PARTICLE_COLORS[c]}"></span>
                    <input
                        type="range"
                        bind:value={colorWeights[c]}
                        onchange={startSim}
                        min="0"
                        max="1000"
                        step="1"
                    />
                    <span class="dim">{colorWeights[c]}</span>
                </div>
            {/each}
        </div>
    {/if}
</div>
