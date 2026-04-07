<script lang="ts">
    import { onMount } from 'svelte';
    import * as webglUtils from '../webglUtils';
    import * as drawPositions from './drawPositionsTexture';
    import { setupFullscreenElement } from './fullscreen';
    import { getInitialData } from './simulationUtils';
    import * as updatePositions from './updatePositionsTexture';

    const screenDimensions = {
        width: 800,
        height: 600
    };
    const worldDimensions = $state({
        width: 800,
        height: 600
    });
    const texDimensions = {
        width: 500,
        height: 10
    };
    let steps = $state(10);
    let slowMo = $state(false);
    let pause = $state(true);

    const simulationParams = $state({
        interactionRange: 6,
        drag: 5,
        timeStep: 10,
        particlesSize: 4
    });
    let gl: WebGLRenderingContext;
    let animationFrameRequest: number;
    function main() {
        cancelAnimationFrame(animationFrameRequest);

        gl = webglUtils.getWebGLContext();

        webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

        const { ids, positions, colors } = getInitialData({
            texDimensions,
            worldDimensions,
            mode: 'disk'
        });

        drawPositions.initProgram(gl, { ids, colors, texDimensions });
        let positionTex = updatePositions.initProgram(gl, { positions, colors, texDimensions });

        function render() {
            if (!pause) {
                for (let _ = 0; _ < steps; _++) {
                    positionTex = updatePositions.runProgram({
                        gl,
                        texDimensions,
                        worldDimensions,
                        interactionRange: simulationParams.interactionRange,
                        drag: simulationParams.drag,
                        deltaTime: simulationParams.timeStep
                    });
                }
            }

            drawPositions.runProgram({
                gl,
                positionTex,
                texDimensions,
                worldDimensions,
                particlesSize: simulationParams.particlesSize,
                ids
            });

            if (slowMo) {
                return setTimeout(
                    () => (animationFrameRequest = requestAnimationFrame(render)),
                    1000
                );
            }
            return (animationFrameRequest = requestAnimationFrame(render));
        }
        animationFrameRequest = requestAnimationFrame(render);
    }

    const { enableFullscreen } = setupFullscreenElement(document, 'canvas', screenDimensions);

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            // Space bar was pressed
            pause = !pause;
            event.preventDefault();
        }
    });

    onMount(() => main());
</script>

<canvas
    id="canvas"
    style="background-color: black"
    width={screenDimensions.width}
    height={screenDimensions.height}
></canvas>

<div>
    <button onclick={() => (pause = !pause)}>{pause ? 'Play' : 'Pause'}</button>
    <button onclick={() => (slowMo = !slowMo)}>{slowMo ? 'Normal Speed' : 'Slow Mo'}</button>
    <span>particles: {texDimensions.width * texDimensions.height}</span>
    <label for="steps">Smooth steps</label>
    <input bind:value={steps} type="number" min={0} />
    <button onclick={() => main()}>Reset</button>
    <button onclick={enableFullscreen}>Fullscreen</button>
</div>
<div>
    <ul>
        <li>
            <label for="interactionRange">Interaction Range</label>
            <input
                id="interactionRange"
                bind:value={simulationParams.interactionRange}
                type="number"
                min={0}
            />
        </li>

        <li>
            <label for="drag">Drag</label>
            <input id="drag" bind:value={simulationParams.drag} type="number" min={0} />
        </li>

        <li>
            <label for="deltaTime">Time step</label>
            <input id="deltaTime" bind:value={simulationParams.timeStep} type="number" min={0} />
        </li>

        <li>
            <label for="particlesSize">Particles size</label>
            <input
                id="particlesSize"
                bind:value={simulationParams.particlesSize}
                type="number"
                min={0}
            />
        </li>

        <li>
            <label for="worldWidth">World: width</label>
            <input id="worldWidth" bind:value={worldDimensions.width} type="number" min={0} />

            <label for="worldHeight">height</label>
            <input id="worldHeight" bind:value={worldDimensions.height} type="number" min={0} />
        </li>
        <ul></ul>
    </ul>
</div>
