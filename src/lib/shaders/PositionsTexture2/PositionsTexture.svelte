<script lang="ts">
    import { onMount } from 'svelte';
    import * as webglUtils from '../webglUtils';
    import * as drawPositions from './drawPositionsTexture';
    import { getInitialData } from './simulationUtils';
    import * as updatePositions from './updatePositionsTexture';

    const screenWidth = 800;
    const screenHeight = 600;
    function main() {
        const gl = webglUtils.getWebGLContext();
        webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

        const { ids, positions, texDimensions } = getInitialData(100, {
            width: screenWidth,
            height: screenHeight
        });

        drawPositions.initProgram(gl, ids);
        updatePositions.initProgram(gl, { positions, texDimensions });

        function render() {
            webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

            const positionTex = updatePositions.runProgram({
                gl,
                texDimensions: texDimensions
            });

            drawPositions.runProgram({
                gl,
                positionTex,
                textureDimension: texDimensions,
                ids
            });

            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    onMount(() => main());
</script>

<p>Create an array of render-size positions. Store this array in a texture.</p>
<p>
    Create 2 textures which will be used to update the positions with a shader. In each <code>
        requestAnimationFrame</code
    > update the positions with the simple shader reading from the first texture and writing to the new
    one. Then use the drawing shader to render the new texture to the canvas.
</p>
<p>Finally switch the two textures to read and write in the updated textures</p>
<canvas id="canvas" style="background-color: black" width={screenWidth} height={screenHeight}></canvas>
