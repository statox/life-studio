<script lang="ts">
    interface Props {
        simulationComponent?: unknown;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        initialSectionIndex?: number;
    }

    let { onNextScreen, onPrevScreen }: Props = $props();

    export function next() {
        onNextScreen?.();
    }

    export function prev() {
        onPrevScreen?.();
    }
</script>

<div class="screen">
    <h1>Welcome to Particle Life</h1>
    <p>Let me show you how this simulation works.</p>
    <br />
    <p>
        <em>Click the "</em>
        <i class="nav-label-full">Next</i>
        <i class="nav-label-short">→</i>
        <em>" button at the bottom of the page.</em>
    </p>
</div>

<style>
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
    }
</style>
