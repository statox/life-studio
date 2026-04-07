<script lang="ts">
    import { onMount } from 'svelte';
    import * as webglUtils from '../webglUtils';
    import * as drawPositions from './drawPositionsTexture';
    import { getInitialData } from './simulationUtils';
    import * as updatePositions from './updatePositionsTexture';

    const screenDimensions = {
        width: 800,
        height: 600
    };
    const texDimensions = {
        width: 500,
        height: 20
    };
    let steps = $state(1);
    let slowMo = $state(false);
    let pause = $state(true);

    const simulationParams = $state({
        interactionRange: 6,
        drag: 5,
        timeStep: 10
    });
    function main() {
        const gl = webglUtils.getWebGLContext();
        webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

        const { ids, positions, colors } = getInitialData({
            texDimensions,
            screenDimensions: {
                width: screenDimensions.width,
                height: screenDimensions.height
            },
            mode: 'disk'
        });

        drawPositions.initProgram(gl, { ids, colors, texDimensions });
        let positionTex = updatePositions.initProgram(gl, { positions, texDimensions });

        function render() {
            webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

            if (!pause) {
                for (let _ = 0; _ < steps; _++) {
                    positionTex = updatePositions.runProgram({
                        gl,
                        texDimensions: texDimensions,
                        interactionRange: simulationParams.interactionRange,
                        drag: simulationParams.drag,
                        deltaTime: simulationParams.timeStep
                    });
                }
            }

            drawPositions.runProgram({
                gl,
                positionTex,
                textureDimension: texDimensions,
                ids
            });

            if (pause) {
                return requestAnimationFrame(render);
            }
            if (slowMo) {
                return setTimeout(() => requestAnimationFrame(render), 1000);
            }
            return requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    onMount(() => main());
</script>

<p>This could be a kind of water simulation.</p>
<p>
    Here we added a gravity force to the shader which pulls cells apart and we can experiment with
    different values of the parameters.
</p>
<p>For now creating vertical walls create a bug so we warp the horizontal coordinates.</p>
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
        <ul></ul>
    </ul>
</div>
