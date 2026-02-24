import * as webglUtils from '../webglUtils';
import drawZoomVS from './drawZoom.vert.glsl';
import drawZoomFS from './drawZoom.frag.glsl';

type ProgramInfo = {
    positionLocation: number;
    textureLocation: WebGLUniformLocation | null;
    zoomLocation: WebGLUniformLocation | null;
    zoomPointLocation: WebGLUniformLocation | null;
};

let programInfo: ProgramInfo;
let program: WebGLProgram;
let positionBuffer: WebGLBuffer;

export const initProgram = (
    gl: WebGLRenderingContext,
    params: { screenDimensions: { width: number; height: number } }
) => {
    const { screenDimensions } = params;
    const { height, width } = screenDimensions;
    program = webglUtils.createProgramFromSources(gl, [drawZoomVS, drawZoomFS]);
    programInfo = {
        positionLocation: gl.getAttribLocation(program, 'a_position'),
        textureLocation: gl.getUniformLocation(program, 'u_texture'),
        zoomLocation: gl.getUniformLocation(program, 'u_zoom'),
        zoomPointLocation: gl.getUniformLocation(program, 'u_zoomPoint')
    };

    // Create a buffer to hold the vertex data
    positionBuffer = gl.createBuffer() as WebGLBuffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 0, 0, height, width, 0, width, 0, 0, height, width, height]),
        gl.STATIC_DRAW
    );
};

export const runProgram = (params: {
    gl: WebGLRenderingContext;
    screenTex: WebGLTexture;
    worldDimensions: { width: number; height: number };
    zoom: number;
    zoomPoint: { x: number; y: number };
}) => {
    const { gl, screenTex, zoom, zoomPoint } = params;

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, screenTex);

    // Bind the program and set the attribute and uniform values
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(programInfo.positionLocation);
    gl.vertexAttribPointer(programInfo.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1i(programInfo.textureLocation, 0);
    gl.uniform1f(programInfo.zoomLocation, zoom);
    gl.uniform2f(programInfo.zoomPointLocation, zoomPoint.x, zoomPoint.y);

    // Draw the texture
    gl.drawArrays(gl.TRIANGLES, 0, 6);
};
