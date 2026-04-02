<script lang="ts">
    import Simulation from '$lib/particles/components/Simulation.svelte';
    import EmptyUniverse from './screens/EmptyUniverse.svelte';
    import SomeParticles from './screens/SomeParticles.svelte';
    import RestartButtons from './screens/RestartButtons.svelte';
    import SelfForces from './screens/SelfForces.svelte';
    import Friction from './screens/Friction.svelte';
    import AttractionTable from './screens/AttractionTable.svelte';
    import ColorProportions from './screens/ColorProportions.svelte';
    import WorldSize from './screens/WorldSize.svelte';

    let simulationComponent: Simulation;

    const screens = [
        EmptyUniverse,
        SomeParticles,
        RestartButtons,
        SelfForces,
        Friction,
        ColorProportions,
        AttractionTable,
        WorldSize
    ];

    let currentIndex = 0;

    $: currentScreen = screens[currentIndex];

    const prev = () => {
        if (currentIndex > 0) currentIndex--;
    };

    const next = () => {
        if (currentIndex < screens.length - 1) currentIndex++;
    };
</script>

<div class="story">
    <div class="narrative">
        <svelte:component this={currentScreen} {simulationComponent} />
    </div>

    <div class="canvas-col">
        <div class="canvas-sticky">
            <Simulation bind:this={simulationComponent} />
        </div>
    </div>
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
