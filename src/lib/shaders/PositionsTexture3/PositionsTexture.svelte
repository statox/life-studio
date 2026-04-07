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
        width: 100,
        height: 100
    };
    let steps = $state(1);
    let slowMo = $state(false);
    let pause = $state(true);
    function main() {
        const gl = webglUtils.getWebGLContext();
        webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

        const { ids, positions, colors } = getInitialData(texDimensions, {
            width: screenDimensions.width,
            height: screenDimensions.height
        });

        drawPositions.initProgram(gl, { ids, colors, texDimensions });
        let positionTex = updatePositions.initProgram(gl, { positions, texDimensions });

        function render() {
            webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

            if (!pause) {
                for (let _ = 0; _ < steps; _++) {
                    positionTex = updatePositions.runProgram({
                        gl,
                        texDimensions: texDimensions
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

<p>Same principle with a shader to update positions and a shader to draw particles.</p>
<p>
    This time the update shader iterate through the texture to compute the distance of the particle
    to each other particle and if they are too close it pushes them appart.
</p>
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
