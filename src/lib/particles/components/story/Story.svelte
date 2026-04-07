<script lang="ts">
    import Simulation from '$lib/particles/components/Simulation.svelte';
    import Conclusion from './screens/Conclusion.svelte';
    import Introduction from './screens/Introduction.svelte';
    import Parameters_AttractionTable from './screens/parameters/AttractionTable.svelte';
    import Parameters_ColorProportions from './screens/parameters/ColorProportions.svelte';
    import Parameters_ColorProportionsDynamic from './screens/parameters/ColorProportionsDynamic.svelte';
    import Parameters_EmptyUniverse from './screens/parameters/EmptyUniverse.svelte';
    import Parameters_Friction from './screens/parameters/Friction.svelte';
    import Parameters_RestartButtons from './screens/parameters/RestartButtons.svelte';
    import Parameters_SelfForces from './screens/parameters/SelfForces.svelte';
    import Parameters_WorldSize from './screens/parameters/WorldSize.svelte';
    import Demos_Introduction from './screens/demos/Introduction.svelte';
    import Demos_Frontier from './screens/demos/Frontier.svelte';
    import Demos_Clusters from './screens/demos/Clusters.svelte';
    import Demos_ClustersDynamics from './screens/demos/ClustersDynamics.svelte';
    import Demos_DynamicWorlds from './screens/demos/DynamicWorlds.svelte';
    import Demos_DynamicWorldWithAttraction from './screens/demos/DynamicWorldWithAttraction.svelte';
    import Demos_SpreadingPatterns from './screens/demos/SpreadingPatterns.svelte';
    import Demos_MergingMovingOrganisms from './screens/demos/MergingMovingOrganisms.svelte';
    import Demos_LargerMovingOrganisms from './screens/demos/LargerMovingOrganisms.svelte';
    import Demos_SmallerMovingOrganisms from './screens/demos/SmallerMovingOrganisms.svelte';
    import Demos_FastMovingObjects from './screens/demos/FastMovingObjects.svelte';
    import Demos_SpacePaving from './screens/demos/SpacePaving.svelte';
    import './screens/shared.css';
    import '../species.css';

    import { tick } from 'svelte';
    import type { SvelteComponent } from 'svelte';
    import { base } from '$app/paths';

    type ScreenConfig = {
        component: typeof SvelteComponent<any>;
        noSimulation?: boolean;
        cellSize?: number;
    };

    let simulationComponent: Simulation;

    const screens: ScreenConfig[] = [
        { component: Introduction, noSimulation: true },
        { component: Parameters_EmptyUniverse },
        { component: Parameters_RestartButtons, cellSize: 5 },
        { component: Parameters_SelfForces, cellSize: 5 },
        { component: Parameters_Friction, cellSize: 20 },
        { component: Parameters_ColorProportions, cellSize: 5 },
        { component: Parameters_ColorProportionsDynamic },
        { component: Parameters_AttractionTable },
        { component: Parameters_WorldSize },
        { component: Demos_Introduction, noSimulation: true },
        { component: Demos_SpacePaving },
        { component: Demos_Frontier },
        { component: Demos_Clusters },
        { component: Demos_ClustersDynamics },
        { component: Demos_DynamicWorlds },
        { component: Demos_DynamicWorldWithAttraction },
        { component: Demos_SpreadingPatterns },
        { component: Demos_MergingMovingOrganisms },
        { component: Demos_SmallerMovingOrganisms },
        { component: Demos_LargerMovingOrganisms },
        { component: Demos_FastMovingObjects },
        { component: Conclusion, noSimulation: true }
    ];

    let currentIndex = 0;

    $: currentScreen = screens[currentIndex];
    $: showSimulation = !currentScreen.noSimulation;
    $: isOnLastScreen = currentIndex === screens.length - 1;
    $: isOnFirstScreen = currentIndex === 0;

    const scrollToTop = async () => {
        await tick();
        window.scrollTo({ top: 0 });
    };

    const prev = () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToTop();
        }
    };

    const next = () => {
        if (currentIndex < screens.length - 1) {
            currentIndex++;
            scrollToTop();
        }
    };
</script>

<div class="story" class:text-only={!showSimulation}>
    <div class="narrative">
        <svelte:component this={currentScreen.component} {simulationComponent} />
    </div>

    {#if showSimulation}
        <div class="canvas-col">
            <Simulation
                bind:this={simulationComponent}
                hideTimeline={true}
                cellSize={currentScreen.cellSize}
            />
        </div>
    {/if}
</div>

<div class="nav-bar">
    <a class="nav-btn home-btn" href="{base}/particles-life">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
                points="9 22 9 12 15 12 15 22"
            /></svg
        >
    </a>
    {#if !isOnFirstScreen}
        <button class="nav-btn" on:click={prev}>
            <span class="nav-label-full">Previous</span>
            <span class="nav-label-short">←</span>
        </button>
    {/if}
    <span class="nav-counter">{currentIndex + 1} / {screens.length}</span>
    {#if !isOnLastScreen}
        <button class="nav-btn" on:click={next}>
            <span class="nav-label-full">Next</span>
            <span class="nav-label-short">→</span>
        </button>
    {/if}
</div>

<style>
    /* ── Layout ─────────────────────────────── */
    .story {
        display: flex;
        flex-direction: column;
        gap: 6px;
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
        align-self: center;
        text-align: justify;
        max-width: 900px;
    }

    .narrative :global(h1),
    .narrative :global(h2) {
        text-align: center;
    }

    /* ── Text-only screens: also center vertically ── */
    .story.text-only {
        min-height: calc(100vh - 60px);
        justify-content: center;
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

    .home-btn {
        position: absolute;
        left: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    .nav-label-short {
        display: none;
    }

    @media (max-width: 480px) {
        .nav-label-full {
            display: none;
        }

        .nav-label-short {
            display: inline;
            font-size: 1.1rem;
        }

        .nav-btn {
            padding: 8px 14px;
        }
    }
</style>
