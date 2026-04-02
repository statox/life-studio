<script lang="ts">
    import Simulation from '$lib/particles/components/Simulation.svelte';
    import Introduction from './screens/Introduction.svelte';
    import Parameters_AttractionTable from './screens/parameters/AttractionTable.svelte';
    import Parameters_ColorProportions from './screens/parameters/ColorProportions.svelte';
    import Parameters_ColorProportionsDynamic from './screens/parameters/ColorProportionsDynamic.svelte';
    import Parameters_EmptyUniverse from './screens/parameters/EmptyUniverse.svelte';
    import Parameters_Friction from './screens/parameters/Friction.svelte';
    import Parameters_RestartButtons from './screens/parameters/RestartButtons.svelte';
    import Parameters_SelfForces from './screens/parameters/SelfForces.svelte';
    import Parameters_SomeParticles from './screens/parameters/SomeParticles.svelte';
    import Parameters_WorldSize from './screens/parameters/WorldSize.svelte';
    import Demos_Introduction from './screens/demos/Introduction.svelte';
    import Demos_Frontier from './screens/demos/Frontier.svelte';
    import './screens/shared.css';

    import type { SvelteComponent } from 'svelte';

    type ScreenConfig = {
        component: typeof SvelteComponent;
        noSimulation?: boolean;
    };

    let simulationComponent: Simulation;

    const screens: ScreenConfig[] = [
        { component: Introduction, noSimulation: true },
        { component: Parameters_EmptyUniverse },
        { component: Parameters_SomeParticles },
        { component: Parameters_RestartButtons },
        { component: Parameters_SelfForces },
        { component: Parameters_Friction },
        { component: Parameters_ColorProportions },
        { component: Parameters_ColorProportionsDynamic },
        { component: Parameters_AttractionTable },
        { component: Parameters_WorldSize },
        { component: Demos_Introduction, noSimulation: true },
        { component: Demos_Frontier }
    ];

    let currentIndex = 0;

    $: currentScreen = screens[currentIndex];
    $: showSimulation = !currentScreen.noSimulation;

    const prev = () => {
        if (currentIndex > 0) currentIndex--;
    };

    const next = () => {
        if (currentIndex < screens.length - 1) currentIndex++;
    };
</script>

<div class="story">
    <div class="narrative">
        <svelte:component this={currentScreen.component} {simulationComponent} />
    </div>

    {#if showSimulation}
        <div class="canvas-col">
            <Simulation bind:this={simulationComponent} hideTimeline={true} />
        </div>
    {/if}
</div>

<div class="nav-bar">
    <button class="nav-btn" on:click={prev} disabled={currentIndex === 0}>Previous</button>
    <span class="nav-counter">{currentIndex + 1} / {screens.length}</span>
    <button class="nav-btn" on:click={next} disabled={currentIndex === screens.length - 1}
        >Next</button
    >
</div>

<style>
    /* ── Layout ─────────────────────────────── */
    .story {
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 32px 24px 48px;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        .story {
            grid-template-columns: 1fr;
            padding: 16px 12px 48px;
            gap: 16px;
        }
    }

    /* ── Narrative column ────────────────────── */
    .narrative {
        display: flex;
        flex-direction: column;
        padding: 16px 0;
    }

    /* ── Canvas column ──────────────────────── */
    .canvas-col {
        min-width: 0;
    }

    /* ── Navigation bar ────────────────────── */
    .nav-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        padding: 12px 24px;
        background: #1a2327ee;
        border-top: 1px solid #37474f;
        backdrop-filter: blur(8px);
        z-index: 20;
    }

    .nav-counter {
        font-size: 0.85rem;
        color: #90a4ae;
        min-width: 48px;
        text-align: center;
    }

    .nav-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 8px 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
    }

    .nav-btn:hover:not(:disabled) {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .nav-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
</style>
