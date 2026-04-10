<script lang="ts">
    import { base } from '$app/paths';

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
    <h1>Particle Life</h1>
    <p>
        Together we are going to create small universes running in your browser. Let me guide you
        through that.
    </p>
    <p>Click the "Next" (→) button at the bottom of each page.</p>
    <br />
    <p>
        If you haven't already, you should check out <a href={base + '/particles-life/infinite'}
            >this page</a
        >.
    </p>
</div>
