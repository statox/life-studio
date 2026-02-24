import type REGL from 'regl';

import updateFS from './glsl/update.frag.glsl';
import updateVS from './glsl/update.vert.glsl';
import type { MouseState, SimulationParameters } from '../../types';

interface SimulationProps {
    outputBuffer: REGL.Framebuffer2D | null;
    inputBuffer: REGL.Framebuffer2D;
    f: number;
    k: number;
    pauseSimulation: boolean;
    mousePosition: [number, number];
    penRadius: number;
    penDensity: number;
    penIsActive: boolean;
    eraserIsActive: boolean;
    zoomLevel: number;
    pan: [number, number];
}

let command: REGL.DrawCommand;
export const initSimulationUpdate = (regl: REGL.Regl, radius: number) => {
    const prop = <K extends keyof SimulationProps>(name: K) => regl.prop<SimulationProps, K>(name);
    command = regl({
        frag: updateFS,
        vert: updateVS,

        attributes: {
            position: [-4, -4, 4, -4, 0, 4]
        },
        count: 3,

        framebuffer: prop('outputBuffer'),
        uniforms: {
            prevState: prop('inputBuffer'),
            Da: 1,
            Db: 0.5,
            f: prop('f'),
            k: prop('k'),
            radius,
            pauseSimulation: prop('pauseSimulation'),
            mousePosition: prop('mousePosition'),
            penRadius: prop('penRadius'),
            penDensity: prop('penDensity'),
            penIsActive: prop('penIsActive'),
            eraserIsActive: prop('eraserIsActive'),
            zoomLevel: prop('zoomLevel'),
            pan: prop('pan')
        }
    });
};

export const doSimulationUpdate = (params: {
    inputBuffer: REGL.Framebuffer2D;
    mouseState: MouseState;
    outputBuffer: REGL.Framebuffer2D | null;
    pauseSimulation: boolean;
    simulationParameters: SimulationParameters;
    worldSize: number;
}) => {
    const {
        inputBuffer,
        outputBuffer,
        pauseSimulation,
        mouseState,
        simulationParameters,
        worldSize
    } = params;
    command({
        inputBuffer,
        outputBuffer,
        pauseSimulation,
        zoomLevel: mouseState.zoomLevel,
        pan: [mouseState.panX, mouseState.panY],
        mousePosition: [mouseState.x, mouseState.y],
        penRadius: 1 / 2 ** (worldSize - mouseState.penSize),
        penDensity: mouseState.penDensity,
        penIsActive: mouseState.pressedLeft,
        eraserIsActive: mouseState.pressedRight,
        ...simulationParameters
    });
};
