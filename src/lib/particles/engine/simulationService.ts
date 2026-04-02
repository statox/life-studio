import { getNewCells, largeCenterCellsInPlace, rainbowCellsInPlace } from './cells';
import type { SimulationConfig, SimulationParams } from './types';

export const generateSimulationParams = (config: SimulationConfig): SimulationParams => {
    const {
        horizontalResolution,
        verticalResolution,
        colorWeights,
        nbParticles,
        maxAttractionRadius,
        attractionTable,
        initialSpreadConfig,
        friction
    } = config;

    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };

    const cells = getNewCells(worldSize, nbParticles, colorWeights);

    if (initialSpreadConfig === 'center') {
        largeCenterCellsInPlace(cells, worldSize);
    } else if (initialSpreadConfig === 'rainbow') {
        rainbowCellsInPlace(cells, worldSize, colorWeights);
    }

    return {
        cells,
        worldSize,
        maxAttractionRadius,
        attractionTable,
        friction
    };
};
