<script lang="ts">
    import Simulation from '$lib/particles/components/Simulation.svelte';
    import Conclusion from './screens/Conclusion.svelte';
    import Introduction from './screens/Introduction.svelte';
    import Parameters_AttractionTable from './screens/parameters/AttractionTable.svelte';
    import Parameters_EmptyUniverse from './screens/parameters/EmptyUniverse.svelte';
    import Parameters_Friction from './screens/parameters/Friction.svelte';
    import Parameters_RestartButtons from './screens/parameters/RestartButtons.svelte';
    import Parameters_SelfForces from './screens/parameters/SelfForces.svelte';
    import Parameters_TwoSpecies from './screens/parameters/TwoSpecies.svelte';
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
    import type { Component } from 'svelte';
    import { base } from '$app/paths';
    import type { StoryScreenInstance } from './types';

    type ScreenConfig = {
        component: Component<any, StoryScreenInstance>;
        noSimulation?: boolean;
        cellSize?: number;
        // Number of narrative sections inside this screen component.
        // Each section advances the global progress slider by one step.
        // Defaults to 1 when omitted (single-section screens).
        sectionCount?: number;
    };

    let simulationComponent: Simulation | undefined = $state();
    let narrativeEl: HTMLDivElement | undefined = $state();
    let currentScreenComponent: StoryScreenInstance | undefined = $state();
    // Section index within the current screen, kept in sync via onSectionChange
    let currentSectionIndex = $state(0);

    const screens: ScreenConfig[] = [
        { component: Introduction, noSimulation: true },
        { component: Parameters_EmptyUniverse },
        { component: Parameters_RestartButtons, cellSize: 5, sectionCount: 2 },
        { component: Parameters_SelfForces, cellSize: 5, sectionCount: 3 },
        { component: Parameters_Friction, cellSize: 5, sectionCount: 5 },
        { component: Parameters_TwoSpecies, cellSize: 5, sectionCount: 1 },
        // { component: Parameters_ColorProportions, cellSize: 5, sectionCount: 2 },
        // { component: Parameters_ColorProportionsDynamic, sectionCount: 5 },
        { component: Parameters_AttractionTable, sectionCount: 3 },
        { component: Parameters_WorldSize, sectionCount: 3 },
        { component: Demos_Introduction, noSimulation: true },
        { component: Demos_SpacePaving, sectionCount: 4 },
        { component: Demos_Frontier },
        { component: Demos_Clusters, sectionCount: 6 },
        { component: Demos_ClustersDynamics, sectionCount: 3 },
        { component: Demos_DynamicWorlds, sectionCount: 4 },
        { component: Demos_DynamicWorldWithAttraction, sectionCount: 3 },
        { component: Demos_SpreadingPatterns, sectionCount: 4 },
        { component: Demos_MergingMovingOrganisms, sectionCount: 2 },
        { component: Demos_SmallerMovingOrganisms, sectionCount: 2 },
        { component: Demos_LargerMovingOrganisms, sectionCount: 5 },
        { component: Demos_FastMovingObjects, sectionCount: 2 },
        { component: Conclusion, noSimulation: true }
    ];

    let currentIndex = $state(0);

    let currentScreen = $derived(screens[currentIndex]);
    let showSimulation = $derived(!currentScreen.noSimulation);

    // Cumulative step offset for each screen: how many total steps precede it
    const screenOffsets = $derived.by(() => {
        const offsets: number[] = [];
        let offset = 0;
        for (const screen of screens) {
            offsets.push(offset);
            offset += screen.sectionCount ?? 1;
        }
        return offsets;
    });

    const totalSteps = $derived(screens.reduce((sum, s) => sum + (s.sectionCount ?? 1), 0));
    const currentStep = $derived(screenOffsets[currentIndex] + currentSectionIndex);

    const isAtStart = $derived(currentStep === 0);
    const isAtEnd = $derived(currentStep === totalSteps - 1);

    // Convert a flat global step to { screenIndex, sectionIdx }
    const stepToScreenSection = (step: number): { screenIndex: number; sectionIdx: number } => {
        for (let i = screens.length - 1; i >= 0; i--) {
            if (step >= screenOffsets[i]) {
                return { screenIndex: i, sectionIdx: step - screenOffsets[i] };
            }
        }
        return { screenIndex: 0, sectionIdx: 0 };
    };

    const scrollToTop = async () => {
        await tick();
        if (narrativeEl) narrativeEl.scrollTop = 0;
    };

    const onSectionChange = (idx: number) => {
        currentSectionIndex = idx;
    };

    const goToNextScreen = () => {
        if (currentIndex < screens.length - 1) {
            currentIndex++;
            currentSectionIndex = 0;
            scrollToTop();
        }
    };

    const goToPrevScreen = () => {
        if (currentIndex > 0) {
            currentIndex--;
            // Enter the previous screen at its last section
            const lastSection = (screens[currentIndex].sectionCount ?? 1) - 1;
            currentSectionIndex = lastSection;
            scrollToTop();
        }
    };

    const next = () => currentScreenComponent?.next();
    const prev = () => currentScreenComponent?.prev();
</script>

<div class="page" class:with-simulation={showSimulation}>
    <div class="narrative" bind:this={narrativeEl}>
        {#key currentIndex}
            <currentScreen.component
                bind:this={currentScreenComponent}
                {simulationComponent}
                {onSectionChange}
                onNextScreen={goToNextScreen}
                onPrevScreen={goToPrevScreen}
            />
        {/key}
    </div>

    <div class="sim-area" class:hidden={!showSimulation}>
        <Simulation
            bind:this={simulationComponent}
            fillContainer
            hideTimeline={true}
            cellSize={currentScreen.cellSize}
        />
    </div>
</div>

<div class="nav-bar">
    <a class="nav-btn home-btn" href="{base}/particles-life" title="Home">
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
    <input
        class="nav-slider"
        type="range"
        min="0"
        max={totalSteps - 1}
        value={currentStep}
        oninput={(e) => {
            const step = parseInt(e.currentTarget.value);
            const { screenIndex, sectionIdx } = stepToScreenSection(step);
            if (screenIndex === currentIndex) {
                // Same screen: jump directly to the target section
                currentScreenComponent?.jumpToSection?.(sectionIdx);
                currentSectionIndex = sectionIdx;
            } else {
                // Different screen: remount at the target section
                currentSectionIndex = sectionIdx;
                currentIndex = screenIndex;
                scrollToTop();
            }
        }}
    />
    <button class="nav-btn" disabled={isAtStart} onclick={prev}>
        <span class="nav-label-full">Previous</span>
        <span class="nav-label-short">←</span>
    </button>
    <button class="nav-btn" disabled={isAtEnd} onclick={next}>
        <span class="nav-label-full">Next</span>
        <span class="nav-label-short">→</span>
    </button>
</div>

<style>
    /* ── Page shell ─────────────────────────── */
    .page {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 48px); /* 48px = nav-bar height */
        overflow: hidden;
        box-sizing: border-box;
    }

    /* ── Narrative strip (top ~1/3) ─────────── */
    .narrative {
        flex: 0 0 auto;
        height: clamp(200px, 33vh, 400px);
        overflow-y: auto;
        padding: 14px 20px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #263238;
        /* Subtle scrollbar */
        scrollbar-width: thin;
        scrollbar-color: #37474f transparent;
    }

    /* Text-only screens: center content vertically in full page height */
    .page:not(.with-simulation) .narrative {
        height: auto;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: none;
        padding: 24px;
    }

    /* Inner wrapper for centering on text-only screens */
    .page:not(.with-simulation) .narrative :global(.screen),
    .page:not(.with-simulation) .narrative :global(div) {
        max-width: 760px;
        width: 100%;
    }

    .narrative :global(h1),
    .narrative :global(h2) {
        text-align: center;
    }

    /* ── Simulation area (bottom ~2/3) ──────── */
    .sim-area {
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }

    .sim-area.hidden {
        display: none;
    }

    .sim-area :global(.sim) {
        height: 100%;
    }

    .sim-area :global(.canvas-wrap) {
        flex: 1;
        min-height: 0;
        display: flex;
    }

    .sim-area :global(canvas) {
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        aspect-ratio: unset !important;
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
        gap: 8px;
        padding: 12px 16px;
        background: #1a2327ee;
        border-top: 1px solid #37474f;
        backdrop-filter: blur(8px);
        z-index: 20;
    }

    .nav-slider {
        flex: 1;
        -webkit-appearance: none;
        appearance: none;
        height: 3px;
        border-radius: 2px;
        background: #37474f;
        outline: none;
        cursor: pointer;
        margin: 0 4px;
    }

    .nav-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #c3e88d;
        cursor: pointer;
        transition: transform 0.1s;
    }

    .nav-slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
    }

    .nav-slider::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #c3e88d;
        border: none;
        cursor: pointer;
    }

    .nav-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 8px 20px;
        font-size: 0.85rem;
        cursor: pointer;
        transition:
            background 0.13s,
            border-color 0.13s;
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
        left: 16px;
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
