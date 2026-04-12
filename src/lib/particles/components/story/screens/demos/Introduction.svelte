<script lang="ts">
    interface Props {
        simulationComponent?: unknown;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
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
    <h1>Now, the good stuff</h1>
    <p>You have seen all of the parameters ruling our universes. They are pretty simple.</p>
    <p>
        But they can produce very diverse and unexpected results. In the following screen we are
        going to see the result of different combinations of these parameters.
    </p>
    <p>Let's explore them!</p>
    <br />
    <p>
        <em
            ><b>Note</b> All the pages of this website run simulations directly on your device and the
            upcoming pages sometimes run heavy simulations. Depending on the processing power of your
            device you might experience some slowdowns.</em
        >
    </p>
</div>
