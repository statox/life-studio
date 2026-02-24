import type REGL from 'regl';

import updateFS from './glsl/update.frag.glsl';
import updateVS from './glsl/update.vert.glsl';
import type { MouseState, ParametersMapParameters } from '../../types';

interface SimulationProps {
    outputBuffer: REGL.Framebuffer2D | null;
    inputBuffer: REGL.Framebuffer2D;
    pauseSimulation: boolean;
    mousePosition: [number, number];
    penRadius: number;
    penDensity: number;
    penIsActive: boolean;
    simulationParameters: ParametersMapParameters;
}

let command: REGL.DrawCommand;
export const initSimulationUpdate = (regl: REGL.Regl, radius: number) => {
    const prop = <K extends keyof SimulationProps>(name: K) => regl.prop<SimulationProps, K>(name);
    command = regl({
        frag: updateFS,
        vert: updateVS,

        attributes: {
            position: [
                [1, -1], // Top right
                [-1, -1], // Top left
                [1, 1], // bottom right
                [1, 1], // bottom right
                [-1, -1], // Top left
                [-1, 1] // bottom left
            ],
            fk: (_, params: SimulationProps) => {
                const { maxF, minF, maxK, minK } = params.simulationParameters;
                return [
                    [minF, maxK],
                    [minF, minK],

                    [maxF, maxK],
                    [maxF, maxK],

                    [minF, minK],

                    [maxF, minK]
                ];
            }
        },
        count: 6,

        framebuffer: prop('outputBuffer'),
        uniforms: {
            prevState: prop('inputBuffer'),
            Da: 1,
            Db: 0.5,
            radius,
            pauseSimulation: prop('pauseSimulation'),
            mousePosition: prop('mousePosition'),
            penRadius: prop('penRadius'),
            penDensity: prop('penDensity'),
            penIsActive: prop('penIsActive')
        }
    });
};

export const doSimulationUpdate = (params: {
    inputBuffer: REGL.Framebuffer2D;
    mouseState: MouseState;
    outputBuffer: REGL.Framebuffer2D | null;
    pauseSimulation: boolean;
    worldSize: number;
    simulationParameters: ParametersMapParameters;
}) => {
    const {
        inputBuffer,
        outputBuffer,
        simulationParameters,
        pauseSimulation,
        mouseState,
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
        simulationParameters
    });
};
