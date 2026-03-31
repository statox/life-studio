<script lang="ts">
    const MAX_PAST_FRAMES = 1000;
    const MAX_UPCOMING_FRAMES = 180;
    const RESUME_UPCOMING_THRESHOLD = 60;

    export let buffer: Float32Array[];
    export let displayIndex: number;
    export let absoluteFrameOffset: number;
    export let isFullscreen: boolean;
    export let onToggleFullscreen: () => void;
    export let onPauseEngine: () => void;
    export let onUnpauseEngine: () => void;

    let displayPaused = false;
    let enginePaused = false;
    let fps = 0;

    let fpsFrameCount = 0;
    let fpsLastSecond = 0;
    const tickFPS = () => {
        const now = Date.now();
        fpsFrameCount++;
        if (now - fpsLastSecond >= 1000) {
            fps = fpsFrameCount;
            fpsFrameCount = 0;
            fpsLastSecond = now;
        }
    };

    const manageEngine = () => {
        const upcomingCount = buffer.length - 1 - displayIndex;
        if (!enginePaused && upcomingCount >= MAX_UPCOMING_FRAMES) {
            enginePaused = true;
            onPauseEngine();
        } else if (enginePaused && upcomingCount < RESUME_UPCOMING_THRESHOLD) {
            enginePaused = false;
            onUnpauseEngine();
        }
    };

    export const updateFrame = () => {
        // Advance display cursor if playing and upcoming frames exist
        if (!displayPaused && displayIndex < buffer.length - 1) {
            displayIndex++;
            tickFPS();

            // Trim old frames
            if (displayIndex > MAX_PAST_FRAMES) {
                const trimCount = displayIndex - MAX_PAST_FRAMES;
                buffer.splice(0, trimCount);
                displayIndex -= trimCount;
                absoluteFrameOffset += trimCount;
            }
        }

        // Engine backpressure check
        manageEngine();

        // Trigger Svelte reactivity
        buffer = buffer;
    };

    let debounceTs = Date.now();
    const handleKeydown = (e: KeyboardEvent) => {
        const now = Date.now();
        if (now - debounceTs < 50) return;
        debounceTs = now;

        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
        if (e.key != ' ') return;
        e.preventDefault();
        togglePlayPause();
    };

    const frameNumberToTime = (frame: number) => {
        // Theoretical time at 60 fps
        const elapsedSeconds = frame * (1 / 60);
        const currentMinute = Math.floor(elapsedSeconds / 60)
            .toString()
            .padStart(2, '0');
        const currentSecond = Math.floor(elapsedSeconds % 60)
            .toFixed(0)
            .padStart(2, '0');

        return `${currentMinute}:${currentSecond}`;
    };

    const togglePlayPause = () => (displayPaused = !displayPaused);
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="timeline">
    <div class="tl-btns">
        <button class="icon-btn" on:click={() => (displayIndex = 0)} title="Go to start">⏮</button>
        <button class="icon-btn" on:click={togglePlayPause}>
            {displayPaused ? '▶' : '⏸'}
        </button>
        <button
            class="icon-btn"
            on:click={() => (displayIndex = Math.max(0, (buffer?.length || 1) - 1))}
            title="Catch up to latest">⏭</button
        >
    </div>
    <input
        type="range"
        class="tl-slider"
        min="0"
        max={buffer?.length ? buffer.length - 1 : 0}
        bind:value={displayIndex}
    />
    <button
        class="icon-btn"
        on:click={onToggleFullscreen}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
        {isFullscreen ? '⊡' : '⛶'}
    </button>
    <div class="tl-stats">
        <span class="stat">
            <span class="stat-label">Time</span>
            {frameNumberToTime(absoluteFrameOffset + displayIndex)}
        </span>
        <span class="stat">
            <span class="stat-label">upcoming</span>
            {Math.max(0, (buffer?.length || 0) - 1 - displayIndex)}
        </span>
        <span class="stat">{fps}<span class="stat-label">fps</span></span>
    </div>
</div>

<style>
    .timeline {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        padding: 8px 12px;
    }

    .tl-btns {
        display: flex;
        gap: 4px;
        flex-shrink: 0;
    }

    .tl-slider {
        flex: 1;
        min-width: 50px;
        accent-color: #c3e88d;
        cursor: pointer;
    }

    .tl-stats {
        display: flex;
        gap: 10px;
        font-size: 0.75rem;
        color: #eceff1;
        flex-shrink: 0;
        white-space: nowrap;
    }

    .stat {
        display: flex;
        align-items: baseline;
        gap: 3px;
    }

    .stat-label {
        font-size: 0.65rem;
        color: #546e7a;
    }

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

    .icon-btn {
        padding: 5px 9px;
        font-size: 0.88rem;
    }
</style>
