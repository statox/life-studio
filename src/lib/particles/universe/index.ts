import type { AttractionTable } from '../attraction';
import type { ColorProportions } from '../engine/cells';

export type Universe = {
    attractionTable: AttractionTable;
    colorWeights: ColorProportions;
    nbParticles: number;
    maxAttractionRadius: number;
    horizontalResolution: number;
    verticalResolution: number;
};
