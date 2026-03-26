<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { COLORS, PARTICLE_COLORS } from '$lib/particles/engine';
    import {
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import type { ColorProportions } from '$lib/particles/engine/cells';
    import type { Cell } from '$lib/particles/engine';
    import Simulation from './Simulation.svelte';
    import {
        getAllDemoUniverses,
        getAllUniverses,
        type StoredUniverse
    } from '$lib/particles/universe';

    let simulationComponent: Simulation;
    let hoveredControl: 'restart' | 'attraction' | 'proportions' | null = null;

    const universes: StoredUniverse[] = getAllUniverses();
    const demoUniverses: StoredUniverse[] = getAllDemoUniverses();

    let cells: Cell[] = [];
    let attractionTable: AttractionTable = universes[0].attractionTable;
    let colorWeights: ColorProportions = universes[0].colorWeights;
    let nbParticles = universes[0].nbParticles;
    let maxAttractionRadius = universes[0].maxAttractionRadius;

    const worldSize = { x: 0, y: 0 };

    const startSim = () => {
        simulationComponent?.startSim({ cells, worldSize, maxAttractionRadius, attractionTable });
    };

    const loadUniverse = (u: StoredUniverse) => {
        attractionTable = u.attractionTable;
        colorWeights = u.colorWeights;
        nbParticles = u.nbParticles;
        maxAttractionRadius = u.maxAttractionRadius;
        worldSize.x = u.maxAttractionRadius * u.horizontalResolution;
        worldSize.y = u.maxAttractionRadius * u.verticalResolution;
        cells = getNewCells(worldSize, u.nbParticles, u.colorWeights);
        if (u.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);
        if (u.preferredInitialConfig === 'rainbow') rainbowCellsInPlace(cells, worldSize);
        startSim();
    };

    const loadByName = (name: string) => {
        const u = demoUniverses.find((u) => u.name === name);
        if (u) loadUniverse(u);
    };

    const randomUniversesForDemo = [
        '2 colors chase',
        '2 colors chase - White attraction',
        'Cellular strips 2',
        'Cellular strips - Inner islands',
        '4 colors worms',
        '3 Colors - Stable islands',
        'spatial repartition'
    ].sort((_a, _b) => Math.random() - 1);
    let randUniverseIndex = -1;

    const loadRandomUniverse = () => {
        randUniverseIndex = (randUniverseIndex + 1) % randomUniversesForDemo.length;
        const name = randomUniversesForDemo[randUniverseIndex];
        loadByName(name);
    };

    const updateAttractionTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        simulationComponent?.updateAttractionTable(newTable);
    };

    const uniformSpread = () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        simulationComponent?.updateCells(cells);
    };

    const centerSpread = () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        largeCenterCellsInPlace(cells, worldSize);
        simulationComponent?.updateCells(cells);
    };

    onMount(() => {
        loadRandomUniverse();
    });
</script>

<div class="intro">
    <!-- Hero -->
    <section class="hero">
        <h1>Particle Life</h1>
        <p>
            This is Particles Life. This is the simulation of a small universe where a few thousand
            particles move freely and interact with each other.
        </p>
        <p>
            Press the next button a few times and observe these new universes coming to life in the
            simulation window
        </p>
        <button class="universe-btn" on:click={() => loadRandomUniverse()}
            >Try another universe ({randUniverseIndex + 1} / {randomUniversesForDemo.length})</button
        >
        <p>
            While all these universes follow a small set of physical rules applied with different
            parameters, they produce a wide range of emergent behaviors. I made this page to explain
            how this type of simulation works and provide some insights to better understand how
            different parameters affect the outcome in a reproducible way.
        </p>
        <p>
            This page is inspired by <a
                rel="noopener noreferrer"
                target="none"
                href="https://sandbox-science.com/particle-life">this tool</a
            > which I have tried to reimplement from scratch without looking at the original code. You
            should definitely check it out because it provides a GPU-powered version of the simulation
            that allows to run the simulation at a much higher resolution than on this page. Reading
            this page first should allow you to better appreciate how truly amazing this other tool is.
        </p>

        <div class="notice">
            <p>
                This page was made to be browsed on a computer screen. The experience on mobile
                devices suffer from the smaller screen size.
            </p>
            <p>
                Also the simulations run directly in your browser so their smoothness is directly
                linked to the processing power of your device.
            </p>
        </div>
    </section>
</div>

<div class="demo">
    <!-- Left column: narrative -->
    <div class="narrative">
        <!-- Controls -->
        <section>
            <h2>Controls</h2>
            <p>
                This page is meant to be an interactive walkthrough. Each section introduces new
                concepts and invites you to click on a button to update the simulation to a new
                universe.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Complexe moving structures')}
                >Like this !</button
            >
            <p>
                Below the simulation you'll find the three controls that govern every universe in
                this simulation. You can adjust them at any time while a universe is running, or use
                the restart buttons to apply a fresh set of particles.
            </p>

            <div
                class="control-desc"
                on:mouseenter={() => (hoveredControl = 'restart')}
                on:mouseleave={() => (hoveredControl = null)}
            >
                <h3>Restart Buttons</h3>
                <p>
                    <strong>Uniform spread</strong> distributes all particles randomly across the
                    full world. <strong>Centered circle</strong> packs them into a dense cluster at the
                    center - many universes produce cleaner structures from this starting point since
                    interactions begin in a concentrated area before spreading out. Both buttons preserve
                    the current attraction table and color proportions.
                </p>
            </div>

            <div
                class="control-desc"
                on:mouseenter={() => (hoveredControl = 'attraction')}
                on:mouseleave={() => (hoveredControl = null)}
            >
                <h3>The Attraction Table</h3>
                <p>
                    The attraction table is the heart of the simulation. Each cell defines the force
                    that the <em>column</em> species exerts on the <em>row</em> species: a positive
                    value means the row species is attracted toward the column species, a negative
                    value means it is repelled. The table is not symmetric -
                    <span class="cr">red</span>
                    can be strongly attracted to <span class="cw">white</span> while
                    <span class="cw">white</span> is completely indifferent to
                    <span class="cr">red</span>, or even repelled by it. This asymmetry is what
                    makes complex behaviors possible.
                </p>
            </div>

            <div
                class="control-desc"
                on:mouseenter={() => (hoveredControl = 'proportions')}
                on:mouseleave={() => (hoveredControl = null)}
            >
                <h3>Color Proportions</h3>
                <p>
                    The sliders set the relative number of particles of each species <span
                        class="cw">white</span
                    >, <span class="cr">red</span>, <span class="cg">green</span> and
                    <span class="cb">blue</span>. Setting a color to zero removes it from the
                    universe entirely. Adjusting proportions while a simulation is running has no
                    effect on existing particles - hit one of the restart buttons to generate a new
                    set with the updated mix.
                </p>
            </div>
        </section>

        <!-- The Basics -->
        <section>
            <h2>The Basics</h2>
            <p>Let's start by making a cleaner universe.</p>
            <button class="universe-btn" on:click={() => loadByName('1 color still')}
                >Click me !</button
            >
            <p>
                Here we have a bunch of <span class="cw">white</span> particles initially spread in a
                circle and without any force applied to them. Notice that at the very beginning the cells
                in the center push each other until everyone is far enough to not overlap its neighbors.
                Then nothing more happens...
            </p>

            <p>So let's add our first force: Repulsion!</p>
            <button class="universe-btn" on:click={() => loadByName('1 color repulsion spread')}
                >Add repulsion</button
            >
            <p>
                Now every particle is repulsed by its neighbors, that makes the species covering as
                much space as needed to have sufficient space between each individual so that no one
                repulses the other.
            </p>
            <div class="notice">
                <h4>Attraction Radius</h4>
                Each particle has an attraction radius - a fixed circular neighborhood around it. Only
                particles within this radius exert forces on it; everything outside is ignored entirely.
                The radius is the same for all particles in a universe.
            </div>

            <p>
                Notice that when the population size increases, the particles don't have enough
                space to have zero neighbors in their attraction radius. That creates clusters where
                some particles get repulsed into small compact groups. Like in the first example a
                small universal repulsion force prevents the particles from overlaping when they get
                too close.
            </p>
            <button class="universe-btn" on:click={() => loadByName('1 color repulsion uniform')}
                >More cells!</button
            >
            <p>Inversely, we can make particles attract each other.</p>
            <button class="universe-btn" on:click={() => loadByName('1 color attraction uniform')}
                >Use attraction</button
            >
            <p>
                Here clusters are much bigger and more compact because particles are pulled together
                into groups, unlike the previous settings where they were pushed against each other
                into groups. Everything stabilizes once all groups have attracted all the particles
                in their attraction radius.
            </p>
            <p>
                With these few examples we described all the possible forces which can exist in our
                universes. From now on the only parameters we will tweak are how many forces we
                create in the universes and to whom they apply.
            </p>
        </section>

        <!-- Species -->
        <section>
            <h2>Species</h2>
            <p>
                To make all of this more interesting we need to add more particle species that we
                differentiate with their color. Click to introduce <span class="cr">red</span>!
            </p>
            <button class="universe-btn" on:click={() => loadByName('2 colors still')}
                >Create the <span class="cr">red</span> species</button
            >
            <p>
                To begin, particles will only actively interact with other particles of the same
                species. <span class="cw">white</span> gets attracted by
                <span class="cw">white</span>
                but <span class="cr">red</span> is repulsed by <span class="cr">red</span>.
            </p>
            <button class="universe-btn" on:click={() => loadByName('2 colors inverse forces')}
                >Add intra-species forces</button
            >
            <p>
                We find the same <span class="cw">white</span> clusters forming as seen before but
                this time they move through masses of self repulsing <span class="cr">red</span>.
            </p>
            <p>
                Now let's create inter-species attraction! Here <span class="cr">red</span> is
                attracted by <span class="cw">white</span> and <span class="cw">white</span>
                is attracted by <span class="cr">red</span> but particles don't interact with their own
                species. This creates filament-like structures which quickly converge into bi-color clusters:
                Inter-species rules can create more complex structures.
            </p>
            <button class="universe-btn" on:click={() => loadByName('2 colors stable attraction')}
                >Create inter-species attraction</button
            >
            <p>
                And if we combine inter-species attraction with intra-species repulsion the
                particles will pave the space trying to get as close as possible to their preferred
                color while pushing away their siblings.
            </p>
            <button
                class="universe-btn"
                on:click={() => loadByName('2 colors stable attraction inner repulsion')}
                >Combine forces</button
            >
            <p>
                Now let's add some motion here! If <span class="cw">white</span> is very attracted
                to <span class="cr">red</span> but <span class="cr">red</span> is strongly repulsed
                by <span class="cw">white</span> we create a thrusting force: When a pair of cells
                of different colors is close enough the chasing starts! And with enough particles we
                see waves of <span class="cw">white</span> chasing waves of
                <span class="cr">red</span> appearing. While everything looks pretty random we can still
                clearly see a common pattern.
            </p>
            <button class="universe-btn" on:click={() => loadByName('2 colors chase')}
                >Motion !</button
            >
            <p>
                You can try to restart the simulation with the "Uniform spread" button to observe
                that the swarm-like patterns still appear.
            </p>
            <p>
                Let's create some order in this chaos by enabling intra-species attraction: We keep
                the <span class="cw">white</span>-<span class="cr">red</span> thrusting force we just
                created and we add clusters of self-attracting species. We end up with our simplest moving
                structures!
            </p>
            <button class="universe-btn" on:click={() => loadByName('2 colors structured chase')}
                >Moving structures</button
            >
            <p>
                Look at these small, inefficient <span class="cw">white</span>-<span class="cr"
                    >red</span
                >
                organisms moving around their universe and gobbling each other! Since everything is strongly
                attracted the universe quickly stabilizes as the
                <span class="cr">red</span>-<span class="cw">white</span> groups get sufficiently far
                away from each other.
            </p>
            <p>
                This is the very beginning of what we want to observe with this tool: Complex
                behaviors emerging from simple rules.
            </p>
        </section>

        <!-- Emergent Complexity -->
        <section>
            <h2>Three Species</h2>
            <p>
                With only two species we've already seen how simple rules can produce rich
                behaviors. Adding a third species expands the possibility space: instead of 4 forces
                to tune, we now have 9. More importantly, the three-way relationships interact in
                ways that are harder to predict: that's where things get interesting.
            </p>

            <button class="universe-btn" on:click={() => loadByName('3 colors still')}
                >Create the <span class="cg">green</span> species</button
            >

            <h3>Equilibrium</h3>
            <p>
                The simplest 3-species universes are those where forces quickly find a balance. In
                the next universe <span class="cr">red</span> self-attracts and repels everything
                around it, while <span class="cw">white</span> and green are neutral bystanders. The
                result: tight <span class="cr">red</span> islands floating in a disorganized
                <span class="cw">white</span>-<span class="cg">green</span> sea.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Islands')}
                >Make <span class="cr">red</span> islands</button
            >
            <p>
                When all three species interact with each other, the equilibrium becomes more
                structured. In the "layered islands" universe everyone is attracted to everyone
                else, but
                <span class="cr">red</span>
                weakly repels itself while the others don't. This imbalance causes
                <span class="cr">red</span>
                to spread into rings around
                <span class="cw">white</span>-<span class="cg">green</span> cores, creating repeated
                layered islands across the universe.
            </p>
            <button class="universe-btn" on:click={() => loadByName('3 Colors - Stable islands')}
                >Make layered islands</button
            >
            <p>
                The equilibrium can take a long time to settle. And a balanced repartition of
                attraction and repulsion allows for a wider spatial repartition.
            </p>
            <button class="universe-btn" on:click={() => loadByName('spatial repartition')}
                >Slow equilibrium</button
            >
            <p>
                Here each species self-repels and is attracted to exactly one other in a
                one-directional chain: <span class="cw">white</span> chases
                <span class="cr">red</span>, <span class="cr">red</span> chases
                <span class="cg">green</span>, <span class="cg">green</span> chases
                <span class="cw">white</span>. Each species is simultaneously a pursuer and a prey,
                but the cycle is one-sided: the prey doesn't know it's being chased. The resulting
                tension creates a slow churning motion that takes a long time to resolve into
                organized territories.
            </p>
            <p>
                This setup is interesting because sometimes it creates moving structures which
                completely break the equilibrium, click the button several times to observe both
                behaviors.
            </p>

            <h3>Chaos</h3>
            <p>
                Not all configurations find a stable equilibrium. When inter-species forces conflict
                -a species chasing another that flees it, all while the third pulls in a different
                direction- the universe churns in an infinite turbulent state.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Competing predators')}
                >Chaos !</button
            >

            <h3>Moving Structures</h3>
            <p>
                Spectacular behaviors can emerge from a fully closed cycle: <span class="cw"
                    >white</span
                >
                chases <span class="cg">green</span>, <span class="cg">green</span> chases
                <span class="cr">red</span>, <span class="cr">red</span>
                chases <span class="cw">white</span>. A classic rock-paper-scissors arrangement. No
                species ever wins and no equilibrium is found. Instead, the three colors form
                sweeping waves that rotate across the universe indefinitely.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Rock - Paper - Scissors')}
                >Rock - Paper - Scissors</button
            >
            <p>
                This is fundamentally different from the chase patterns we saw with two species.
                There, one color always caught the other and the motion decayed. Here the 3-way
                cycle means the motion never decays: each pursuer that catches its prey is
                immediately caught from behind by its own pursuer.
            </p>
            <p>
                Try adding some self-attraction for a color (for example using <code>+1</code> for
                the <span class="cw">white</span>-<span class="cw">white</span> force) and observe how
                these waves become more structured patterns.
            </p>

            <h3>Order</h3>
            <p>
                Some 3-species universes converge to surprisingly intricate structures. Here <span
                    class="cw">white</span
                >
                particles strongly repel each other but are attracted to
                <span class="cr">red</span>, while <span class="cg">green</span> also gravitates
                toward
                <span class="cr">red</span>. <span class="cr">red</span> meanwhile pushes both
                <span class="cw">white</span>
                and <span class="cg">green</span> away. This tension resolves very slowly into a
                repeating mesh - each
                <span class="cr">red</span>
                particle surrounded at a precise distance by shells of <span class="cw">white</span>
                and <span class="cg">green</span>. Watch it for a while to see the structure
                appearing.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Crystal')}>Crystal</button>
        </section>

        <!-- Four Species -->
        <section>
            <h2>Four Species</h2>
            <p>
                With four species the interaction table has 16 entries. The configurations that
                produce coherent behavior become rarer and harder to find by chance, but when they
                do emerge they tend to be more intricate than what three species systems produce.
                Here are some of the patterns that become possible.
            </p>
            <button class="universe-btn" on:click={() => loadByName('4 colors still')}
                >Create the <span class="cb">blue</span> species</button
            >

            <h3>Spatial Partitioning</h3>
            <p>
                The simplest stable configuration comes from a cyclic repulsion chain: <span
                    class="cw">white</span
                >
                pushes
                <span class="cr">red</span> away, <span class="cr">red</span> pushes
                <span class="cg">green</span>, <span class="cg">green</span> pushes
                <span class="cb">blue</span>, <span class="cb">blue</span>
                pushes <span class="cw">white</span>. Nobody is attracted to anything. Starting from
                a central cluster, this expands into organic blobs of paired colors -<span
                    class="cr">red</span
                >-<span class="cb">blue</span> regions and
                <span class="cw">white</span>-<span class="cg">green</span> regions- separated by empty
                corridors.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Cellular strips')}
                >Create an organic pattern</button
            >
            <p>
                A small change -adding the cross-pair repulsions- makes the separating corridors
                much thinner. Each color now repels two others instead of one, which tightens the
                spacing and produces finer, more intricate strip patterns.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Cellular strips 2')}
                >Create a different organic pattern</button
            >
            <p>
                A different approach to separation: make one species a universal pariah. <span
                    class="cw">white</span
                >
                repels all others and all others repel <span class="cw">white</span>, while the
                remaining three are neutral to each other. They cluster into mixed blobs but always
                leave <span class="cw">white</span>-free voids - and
                <span class="cw">white</span> fills those voids, producing hollow
                <span class="cw">white</span> islands enclosed by rings of the other three.
            </p>
            <button
                class="universe-btn"
                on:click={() => loadByName('Cellular strips - Inner islands')}
                >Hollow islands</button
            >
            <p>
                Finally, a case of natural alliances: <span class="cw">white</span> and
                <span class="cg">green</span>
                attract each other and repel
                <span class="cr">red</span> and <span class="cb">blue</span>, while
                <span class="cr">red</span>
                and <span class="cb">blue</span>
                attract each other and repel <span class="cw">white</span> and
                <span class="cg">green</span>. Two opposing teams slowly consolidate into larger and
                larger two-color blobs until the universe settles.
            </p>
            <button
                class="universe-btn"
                on:click={() => loadByName('4 Colors - Slowly merging 2-colors blobs')}
                >Slowly merging two-color blobs</button
            >

            <h3>Moving Structures</h3>
            <p>
                The most complex type of behavior in this simulation. A four-way cyclic chase -
                <span class="cw">white</span> follows <span class="cb">blue</span>,
                <span class="cb">blue</span>
                follows
                <span class="cg">green</span>, <span class="cg">green</span> follows
                <span class="cr">red</span>, <span class="cr">red</span> follows
                <span class="cw">white</span>- where each pursuer also repels the species behind it.
                This creates self-maintaining worm-like organisms that travel endlessly, merge when
                they collide, split when they grow too large, and occasionally fold into spinning
                rings that absorb passing worms.
            </p>
            <button class="universe-btn" on:click={() => loadByName('4 colors worms')}
                >Make long structured moving worms</button
            >
            <p>
                A subtler variant of the same cyclic geometry, extended with a mutual attraction
                between <span class="cg">green</span> and <span class="cb">blue</span>. The result
                is not free-roaming worms but rigid crystal filaments -
                <span class="cw">white</span>-<span class="cg">green</span>-<span class="cb"
                    >blue</span
                >
                lattices with rivers of
                <span class="cr">red</span> flowing through the channels between them.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Crystal stripes')}
                >Crystals and moving fluids</button
            >
            <p>
                Reducing the cohesion of the worm rules produces looser structures: groups that form
                a single two-color stage before slipping apart and reforming elsewhere. The
                organisms are shorter-lived but the universe never settles.
            </p>
            <button
                class="universe-btn"
                on:click={() => loadByName('4 Colors - worms - single stage')}
                >Create movers with low cohesion</button
            >

            <h3>Persistent Chaos</h3>
            <p>
                Some configurations never settle. Here <span class="cw">white</span> is attracted to
                all three other colors while they all repel <span class="cw">white</span> - making
                <span class="cw">white</span>
                an incessant pursuer and the others its perpetual prey. The result is waves of
                <span class="cw">white</span>
                sweeping through incoherent masses of
                <span class="cr">red</span>, <span class="cg">green</span> and
                <span class="cb">blue</span> that can never outrun their pursuer.
            </p>
            <button class="universe-btn" on:click={() => loadByName('4 colors - Waves')}
                >Chaos again !</button
            >
            <p>
                More complex asymmetric rules produce a higher-energy version: many small
                low-cohesion groups constantly forming, colliding and scattering. No alliance is
                stable enough to persist, and the universe maintains a perpetual churn.
            </p>
            <button
                class="universe-btn"
                on:click={() => loadByName('4 Colors - Inifnite moving low cohesion groups')}
                >Chaos, but blue stick together</button
            >
            <p>
                An interesting hybrid: <span class="cb">blue</span> quietly self-attracts into
                compact, immovable islands while the other three species are locked in a permanent
                chase. The <span class="cb">blue</span> islands act as anchors - the
                <span class="cw">white</span>-<span class="cr">red</span>-<span class="cg"
                    >green</span
                >
                turbulence flows around them, occasionally engulfing one before being pushed away again.
            </p>
            <button class="universe-btn" on:click={() => loadByName('Blue islands')}
                >Create <span class="cb">blue</span> islands</button
            >
        </section>

        <!-- Footer -->
        <section class="footer">
            <h2>Going further</h2>
            <p>
                Now that you know more about how this simulation works you can checkout <a
                    href="{base}/particles-life/gallery">the gallery</a
                > which gathers the interesting configurations I have found while building this page.
            </p>
            <p>
                You can also checkout my <a href="{base}/particles-life/workbench">workbench</a> which
                I use to find new configurations and play with the simulation.
            </p>
            <p>
                You can also checkout <a
                    rel="noopener noreferrer"
                    target="none"
                    href="https://sandbox-science.com/particle-life">this tool</a
                > which runs the same simulation but uses the GPU of your computer instead of the CPU
                as my implementation does. That allows for simulations with a much larger number of particles.
                The app also allows to create more than 4 species and more complex attraction tables.
            </p>
        </section>
    </div>

    <!-- Right column: sticky scrollable panel -->
    <div class="canvas-col">
        <div class="canvas-sticky">
            <Simulation bind:this={simulationComponent} />
        </div>
        <div class="canvas-params">
            <div class="card" class:highlighted={hoveredControl === 'restart'}>
                <div class="card-title">Restart</div>
                <div class="preset-btns">
                    <button on:click={uniformSpread}>↺ Uniform spread</button>
                    <button on:click={centerSpread}>◎ Centered circle</button>
                </div>
            </div>
            <div class="card" class:highlighted={hoveredControl === 'attraction'}>
                <div class="card-title">Attraction Table</div>
                <AttractionTableComponent {attractionTable} onUpdateTable={updateAttractionTable} />
            </div>
            <div class="card" class:highlighted={hoveredControl === 'proportions'}>
                <div class="card-title">Color proportions</div>
                <div class="proportion-list">
                    {#each COLORS as c}
                        <div class="field">
                            <span class="pdot" style="background:{PARTICLE_COLORS[c]}" />
                            <input
                                type="range"
                                bind:value={colorWeights[c]}
                                min="0"
                                max="1000"
                                step="1"
                            />
                            <span class="dim" style="width:28px;text-align:right"
                                >{colorWeights[c]}</span
                            >
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .intro {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 32px 24px 64px;
        box-sizing: border-box;
    }

    /* ── Layout ─────────────────────────────── */
    .demo {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 32px 24px 64px;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        .demo {
            grid-template-columns: 1fr;
            padding: 16px 12px 48px;
            gap: 16px;
        }
    }

    /* ── Narrative column ────────────────────── */
    .narrative {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .narrative section {
        padding: 48px 0;
        border-bottom: 1px solid #37474f22;
    }

    .narrative section:first-child {
        padding-top: 0;
    }

    .narrative section:last-child {
        border-bottom: none;
    }

    .narrative h1 {
        font-size: 1.8rem;
        color: #eceff1;
        margin: 0 0 16px;
        font-weight: 700;
    }

    .narrative h2 {
        font-size: 1.2rem;
        color: #eceff1;
        margin: 0 0 12px;
        font-weight: 600;
    }

    .narrative h3 {
        font-size: 0.95rem;
        color: #b0bec5;
        margin: 24px 0 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .narrative p {
        color: #90a4ae;
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0 0 16px;
    }

    /* ── Sticky canvas column ────────────────── */
    .canvas-col {
        min-width: 0;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
        box-sizing: border-box;
        scrollbar-width: thin;
        scrollbar-color: #37474f transparent;
    }

    .canvas-sticky {
        flex-shrink: 0;
    }

    .canvas-params {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-bottom: 8px;
    }

    @media (max-width: 768px) {
        /* Make canvas-col transparent to the grid so its children
           become direct grid items of .demo and sticky works page-wide */
        .canvas-col {
            display: contents;
        }

        .canvas-sticky {
            order: -1; /* appear before .narrative */
            position: sticky;
            top: 0;
            z-index: 10;
            background: #1a2327;
            padding: 8px 0;
        }

        .canvas-params {
            padding: 16px 0;
        }
    }

    /* ── Preset buttons ──────────────────────── */
    .preset-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    /* ── Control description hover ───────────── */
    .control-desc {
        padding: 2px 8px;
        border-left: 2px solid transparent;
        border-radius: 0 4px 4px 0;
        transition: background 0.15s, border-color 0.15s;
        margin-left: -10px;
    }

    .control-desc:hover {
        background: #c3e88d08;
        border-left-color: #c3e88d66;
    }

    /* ── Card ────────────────────────────────── */
    .card {
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        padding: 14px 16px;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .card.highlighted {
        border-color: #c3e88daa;
        box-shadow: 0 0 0 1px #c3e88d33;
    }

    .card-title {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #78909c;
        margin-bottom: 12px;
        font-weight: 600;
        display: block;
    }

    /* ── Fields ──────────────────────────────── */
    .field {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 7px;
    }

    .field:last-child {
        margin-bottom: 0;
    }

    .dim {
        font-size: 0.7rem;
        color: #aeafb0;
    }

    /* ── Buttons ─────────────────────────────── */
    button {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 11px;
        font-size: 0.82rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    button:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .universe-btn {
        width: 100%;
        justify-content: center;
        padding: 10px 16px;
        font-size: 0.88rem;
        margin: 4px 0 16px;
        border-color: #c3e88d55;
        color: #c3e88d;
        border-radius: 8px;
    }

    .universe-btn:hover {
        background: #c3e88d0f;
        border-color: #c3e88daa;
        color: #d4f0a0;
    }

    /* ── Particle dots ───────────────────────── */
    .pdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .proportion-list {
        margin-bottom: 10px;
    }

    .proportion-list .field input[type='range'] {
        flex: 1;
        min-width: 0;
        accent-color: #c3e88d;
    }

    .notice {
        background: #1a232744;
        border-left: 3px solid #546e7a;
        padding-left: 10px;
        border-radius: 0 6px 6px 0;
        font-style: italic;
        color: #546e7a;
        margin-bottom: 0.5em;
    }

    /* ── Species colors ──────────────────────── */
    .cw,
    .cr,
    .cg,
    .cb {
        display: inline-block;
        padding: 0px 5px;
        border-radius: 3px;
        font-weight: 500;
        font-size: 0.95em; /* slightly smaller to feel like a tag */
        line-height: 1.5;
        letter-spacing: 0.01em;
    }

    .cw {
        color: #eceff1;
        background: #37474f;
    } /* white needs dark bg */
    .cr {
        color: #ef5350;
        background: #ef535018;
    }
    .cg {
        color: #c3e88d;
        background: #c3e88d18;
    } /* matches existing accent */
    .cb {
        color: #42a5f5;
        background: #42a5f518;
    }
</style>
