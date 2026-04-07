<script lang="ts">
    import { onMount } from 'svelte';
    import * as webglUtils from '../webglUtils';
    import * as m4 from '../m4';
    import { getArrays } from './simulationUtils';

    import updatePositionVS from './glsl/updatePosition.vert.glsl';
    import updatePositionFS from './glsl/updatePosition.frag.glsl';
    import drawParticlesVS from './glsl/drawParticles.vert.glsl';
    import drawParticlesFS from './glsl/drawParticles.frag.glsl';

    type PositionsInfo = {
        fb: WebGLFramebuffer;
        tex: WebGLTexture;
    };

    type ProgLocs = { [name: string]: number | WebGLUniformLocation | null };

    function main() {
        // Get A WebGL context
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw 'canvas undefined';
        }
        const gl = canvas.getContext('webgl');
        if (!gl) {
            throw 'gl undefined';
        }
        webglUtils.checkWebGlCapabilities(gl);

        const updatePositionProgram = webglUtils.createProgramFromSources(gl, [
            updatePositionVS,
            updatePositionFS
        ]);
        const drawParticlesProgram = webglUtils.createProgramFromSources(gl, [
            drawParticlesVS,
            drawParticlesFS
        ]);

        const updatePositionPrgLocs = {
            position: gl.getAttribLocation(updatePositionProgram, 'position'),
            positionTex: gl.getUniformLocation(updatePositionProgram, 'positionTex'),
            velocityTex: gl.getUniformLocation(updatePositionProgram, 'velocityTex'),
            texDimensions: gl.getUniformLocation(updatePositionProgram, 'texDimensions'),
            canvasDimensions: gl.getUniformLocation(updatePositionProgram, 'canvasDimensions'),
            deltaTime: gl.getUniformLocation(updatePositionProgram, 'deltaTime')
        };

        const drawParticlesProgLocs = {
            id: gl.getAttribLocation(drawParticlesProgram, 'id'),
            positionTex: gl.getUniformLocation(drawParticlesProgram, 'positionTex'),
            texDimensions: gl.getUniformLocation(drawParticlesProgram, 'texDimensions'),
            matrix: gl.getUniformLocation(drawParticlesProgram, 'matrix')
        };

        // setup a full canvas clip space quad
        const updatePositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, updatePositionBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
        );

        // setup an id buffer
        const particleTexWidth = 300;
        const particleTexHeight = 20;
        const { numParticles, ids, positions, velocities } = getArrays(
            particleTexWidth,
            particleTexHeight,
            canvas.width,
            canvas.height
        );
        const idBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ids), gl.STATIC_DRAW);

        // we're going to base the initial positions on the size
        // of the canvas so lets update the size of the canvas
        // to the initial size we want
        webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

        // create a texture for the velocity and 2 textures for the positions.
        const velocityTex = webglUtils.createTexture(
            gl,
            velocities,
            particleTexWidth,
            particleTexHeight
        );
        const positionTex1 = webglUtils.createTexture(
            gl,
            positions,
            particleTexWidth,
            particleTexHeight
        );
        const positionTex2 = webglUtils.createTexture(
            gl,
            null,
            particleTexWidth,
            particleTexHeight
        );

        // create 2 framebuffers. One that renders to positionTex1
        // and another that renders to positionTex2
        const positionsFB1 = webglUtils.createFramebuffer(gl, positionTex1);
        const positionsFB2 = webglUtils.createFramebuffer(gl, positionTex2);

        let oldPositionsInfo = {
            fb: positionsFB1,
            tex: positionTex1
        };
        let newPositionsInfo = {
            fb: positionsFB2,
            tex: positionTex2
        };

        let then = 0;
        function render(time: number) {
            if (!gl || !updatePositionBuffer || !idBuffer) {
                throw 'Undefined params to render';
            }
            // convert to seconds
            time *= 0.001;
            const deltaTime = time - then;
            then = time;

            webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

            runUpdatePositions(
                gl,
                newPositionsInfo,
                particleTexWidth,
                particleTexHeight,
                updatePositionBuffer,
                updatePositionPrgLocs,
                oldPositionsInfo,
                velocityTex,
                updatePositionProgram,
                deltaTime
            );

            runDrawParticles(
                gl,
                particleTexWidth,
                idBuffer,
                drawParticlesProgLocs,
                newPositionsInfo,
                drawParticlesProgram,
                numParticles
            );

            // swap which texture we will read from
            // and which one we will write to
            {
                const temp = oldPositionsInfo;
                oldPositionsInfo = newPositionsInfo;
                newPositionsInfo = temp;
            }

            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    const runDrawParticles = (
        gl: WebGLRenderingContext,
        particleTexWidth: number,
        idBuffer: WebGLBuffer,
        drawParticlesProgLocs: ProgLocs,
        newPositionsInfo: PositionsInfo,
        drawParticlesProgram: WebGLProgram,
        numParticles: number
    ) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // setup our attributes to tell WebGL how to pull
        // the data from the buffer above to the id attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, idBuffer);
        gl.enableVertexAttribArray(drawParticlesProgLocs.id as number);
        gl.vertexAttribPointer(
            drawParticlesProgLocs.id as number,
            1, // size (num components)
            gl.FLOAT, // type of data in buffer
            false, // normalize
            0, // stride (0 = auto)
            0 // offset
        );

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, newPositionsInfo.tex);

        gl.useProgram(drawParticlesProgram);
        gl.uniform2f(drawParticlesProgLocs.texDimensions, particleTexWidth, particleTexWidth);
        gl.uniform1i(drawParticlesProgLocs.positionTex, 0); // tell the shader the position texture is on texture unit 0
        gl.uniformMatrix4fv(
            drawParticlesProgLocs.matrix,
            false,
            m4.orthographic(0, gl.canvas.width, 0, gl.canvas.height, -1, 1)
        );

        gl.drawArrays(gl.POINTS, 0, numParticles);
    };

    const runUpdatePositions = (
        gl: WebGLRenderingContext,
        newPositionsInfo: PositionsInfo,
        particleTexWidth: number,
        particleTexHeight: number,
        updatePositionBuffer: WebGLBuffer,
        updatePositionPrgLocs: ProgLocs,
        oldPositionsInfo: PositionsInfo,
        velocityTex: WebGLTexture,
        updatePositionProgram: WebGLProgram,
        deltaTime: number
    ) => {
        // render to the new positions
        gl.bindFramebuffer(gl.FRAMEBUFFER, newPositionsInfo.fb);
        gl.viewport(0, 0, particleTexWidth, particleTexHeight);

        // setup our attributes to tell WebGL how to pull
        // the data from the buffer above to the position attribute
        // this buffer just contains a -1 to +1 quad for rendering
        // to every pixel
        gl.bindBuffer(gl.ARRAY_BUFFER, updatePositionBuffer);
        gl.enableVertexAttribArray(updatePositionPrgLocs.position as number);
        gl.vertexAttribPointer(
            updatePositionPrgLocs.position as number,
            2, // size (num components)
            gl.FLOAT, // type of data in buffer
            false, // normalize
            0, // stride (0 = auto)
            0 // offset
        );

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, oldPositionsInfo.tex);
        gl.activeTexture(gl.TEXTURE0 + 1);
        gl.bindTexture(gl.TEXTURE_2D, velocityTex);

        gl.useProgram(updatePositionProgram);
        gl.uniform1i(updatePositionPrgLocs.positionTex, 0); // tell the shader the position texture is on texture unit 0
        gl.uniform1i(updatePositionPrgLocs.velocityTex, 1); // tell the shader the position texture is on texture unit 1
        gl.uniform2f(updatePositionPrgLocs.texDimensions, particleTexWidth, particleTexHeight);
        gl.uniform2f(updatePositionPrgLocs.canvasDimensions, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(updatePositionPrgLocs.deltaTime, deltaTime);

        gl.drawArrays(gl.TRIANGLES, 0, 6); // draw 2 triangles (6 vertices)
    };

    onMount(() => main());
</script>

<p>
    This is the simple particles simulation from
    <a target="none" href="https://webglfundamentals.org/webgl/lessons/webgl-gpgpu.html">
        webglfundamentals
    </a> with the shader code extracted into separate files.
</p>
<canvas id="canvas" style="background-color: black" width="800" height="600"></canvas>
