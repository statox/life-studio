<script lang="ts">
    import { run } from 'svelte/legacy';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { COLORS, generateSimulationParams, PARTICLE_COLORS } from '$lib/particles/engine';
    import type { ColorProportions } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';

    interface Props {
        simulationComponent: Simulation;
    }

    let { simulationComponent }: Props = $props();

    const universe = getUniverseById('crystal_stripes');

    const weightPresets: Record<string, ColorProportions> = {
        equal: { white: 500, red: 500, green: 500, blue: 500 },
        no_white: { white: 0, red: 500, green: 500, blue: 500 },
        no_red: { white: 500, red: 0, green: 500, blue: 500 },
        no_green: { white: 500, red: 500, green: 0, blue: 500 },
        no_blue: { white: 500, red: 500, green: 500, blue: 0 }
    };
    let currentPreset: string | undefined = $state('equal');
    let colorWeights: ColorProportions = $state(weightPresets[currentPreset]);

    const setProportions = (preset: string) => {
        if (!Object.keys(weightPresets).includes(preset)) {
            throw new Error('Unknown preset name ' + preset);
        }
        currentPreset = preset;
        colorWeights = weightPresets[currentPreset];
        startScreen();
    };

    const onWeightsChange = () => {
        startScreen();
    };

    const startScreen = () => {
        const simulationParams = generateSimulationParams({
            ...universe,
            initialSpreadConfig: universe.preferredInitialConfig,
            colorWeights
        });
        simulationComponent?.startSim(simulationParams);
    };

    run(() => {
        if (simulationComponent) startScreen();
    });
</script>

<div class="screen">
    <h2>Changing species proportions</h2>
    <p>
        Check the current simulation at the bottom of the page. Our 4 species all have the same
        number of individuals. We can see that the universe converges into a crystal-like structure
        where
        <span class="cw">White</span>, <span class="cg">Green</span> and
        <span class="cb">Blue</span>
        pack into compact structures and between them <span class="cr">Red</span> randomly moves in
        poaches where some
        <span class="cw">White</span> and <span class="cb">Blue</span> sometimes mix in small quantities.
    </p>
    <p>
        Now, use the buttons to observe what happens when you remove one species altogether. Can you
        predict what will happen when you remove <span class="cw">White</span>?
        <ScreenBtn
            active={currentPreset === 'no_white'}
            on:click={() => setProportions('no_white')}
        >
            Remove <span class="cw">White</span>
        </ScreenBtn>
    </p>
    <p>
        It looks like the <span class="cw">White</span> dynamic was the motor of the motion in the
        universe now everything stabillize very quickly. Let's reintroduce
        <span class="cw">White</span>
        and remove <span class="cr">Red</span> completely.
        <ScreenBtn active={currentPreset === 'no_red'} on:click={() => setProportions('no_red')}>
            Remove <span class="cr">Red</span>
        </ScreenBtn>
    </p>
    <p>
        As we could have preditected from the initial configuration removing <span class="cr"
            >Red</span
        > doesn't prevent the creation of crystals. Actually since red isn't there to create holes in
        the crystal, all the particles tend to form one big area.
    </p>
    <p>
        Let's remove <span class="cg">Green</span>.
        <ScreenBtn
            active={currentPreset === 'no_green'}
            on:click={() => setProportions('no_green')}
        >
            Remove <span class="cg">Green</span>
        </ScreenBtn>
    </p>
    <p>
        Now it is clear that the <span class="cb">Blue</span>-<span class="cg">Green</span>
        attraction is the basis of the crystal we saw. When this strong crystal doesn't exist anymore
        <span class="cr">Red</span>
        and
        <span class="cw">White</span> have all the room to chase each other.
    </p>
    <p>
        <ScreenBtn active={currentPreset === 'no_blue'} on:click={() => setProportions('no_blue')}>
            Remove <span class="cb">Blue</span>
        </ScreenBtn>
    </p>
    <p>
        Finally without <span class="cb">Blue</span> you can observe a more chaotic world where
        waves of <span class="cw">White</span> chase groups of <span class="cg">Green</span> and
        <span class="cr">Red</span>. It's interesting to see how simple oscillations end up
        converging in larger waves like it happens in some physical systems.
    </p>

    <div class="controls">
        <div class="control-section">
            <div class="btn-group">
                <ScreenBtn
                    active={currentPreset === 'equal'}
                    on:click={() => setProportions('equal')}
                >
                    Equal
                </ScreenBtn>
                <ScreenBtn
                    active={currentPreset === 'no_white'}
                    on:click={() => setProportions('no_white')}
                >
                    No White
                </ScreenBtn>
                <ScreenBtn
                    active={currentPreset === 'no_red'}
                    on:click={() => setProportions('no_red')}
                >
                    No Red
                </ScreenBtn>
                <ScreenBtn
                    active={currentPreset === 'no_green'}
                    on:click={() => setProportions('no_green')}
                >
                    No Green
                </ScreenBtn>
                <ScreenBtn
                    active={currentPreset === 'no_blue'}
                    on:click={() => setProportions('no_blue')}
                >
                    No Blue
                </ScreenBtn>
            </div>
        </div>
    </div>

    <div class="controls">
        <div class="control-section">
            <h3>Color Proportions</h3>
            <div class="proportion-list">
                {#each COLORS as c}
                    <div class="field">
                        <span class="pdot" style="background:{PARTICLE_COLORS[c]}"></span>
                        <input
                            type="range"
                            bind:value={colorWeights[c]}
                            onchange={onWeightsChange}
                            min="0"
                            max="1000"
                            step="1"
                        />
                        <span class="dim">{colorWeights[c]}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
