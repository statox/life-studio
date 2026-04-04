import { getNewCells, largeCenterCellsInPlace, rainbowCellsInPlace } from './cells';
import type { ColorProportions, SimulationConfig, SimulationParams } from './types';
import type { InitialConfig, StoredUniverse } from '../universe';

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

/** Load a preset into SimulationParams, optionally overriding the spread config. */
export const loadPresetParams = (
    preset: StoredUniverse,
    spreadOverride?: InitialConfig
): SimulationParams =>
    generateSimulationParams({
        ...preset,
        initialSpreadConfig: spreadOverride ?? preset.preferredInitialConfig
    });

/** Re-spread particles using the current simulation's world/physics settings. */
export const respreadParams = (
    current: SimulationParams,
    spread: InitialConfig,
    nbParticles: number,
    colorWeights: ColorProportions
): SimulationParams => {
    const cells = getNewCells(current.worldSize, nbParticles, colorWeights);
    if (spread === 'center') largeCenterCellsInPlace(cells, current.worldSize);
    else if (spread === 'rainbow') rainbowCellsInPlace(cells, current.worldSize, colorWeights);
    return { ...current, cells };
};
