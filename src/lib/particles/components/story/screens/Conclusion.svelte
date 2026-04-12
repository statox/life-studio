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
    <h1>Now it's your turn</h1>
    <p>
        Now that you got a first taste of what our universes can do it's your turn to play with
        them!
    </p>
    <p>
        I created several tools to explore this simulation. <b
            >Start with the <a href="{base}/particles-life/infinie">Infinite universes</a></b
        >
        it shows random universes and it's a good way to discover many different patterns. Then you should
        try the

        <a href="{base}/particles-life/playground">Playground</a>

        to find all the interesting universes I have compiled and interact with them. The
        <a href="{base}/particles-life/demo">Demonstration</a> introduces the settings with more details
        and allows you to see their effects on different universes (This is still a work in progress).
    </p>
    <p>You can find all of these tools <a href="{base}/particles-life">on this page</a>.</p>
    <p>
        I hope this short demo made you want to learn more about Particles Life and its mini
        universes which create moving patterns born in your CPU.
    </p>
    <p>
        I enjoy spending time tweaking the parameters of these universes until I see something
        interesting happen. I am currently in the process of creating an inventory of the families
        of patterns I find in my simulations. I found a very simple organism composed of only 15
        particles and this is pushing me to find more small but complex patterns. If this is of any
        interest to you feel free to drop me a message!
    </p>
</div>
