import type { AttractionTable } from '../attraction';
import type { ColorProportions } from '../engine/cells';
import presets from './presets.json';

export type Universe = {
    attractionTable: AttractionTable;
    colorWeights: ColorProportions;
    nbParticles: number;
    maxAttractionRadius: number;
    horizontalResolution: number;
    verticalResolution: number;
};

export type InitialConfig = 'uniform' | 'center' | 'rainbow';

export type StoredUniverse = Universe & {
    name: string;
    description: string;
    preferredInitialConfig: InitialConfig;
};

export const getAllUniverses = (): StoredUniverse[] => presets as StoredUniverse[];
