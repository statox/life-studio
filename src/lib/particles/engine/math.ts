import type { Cell, Coordinates } from './types';

export const distanceSqrd = (worldSize: Coordinates, a: Coordinates, b: Coordinates) => {
    // Take into consideration the fact that the map is wrapping
    // https://stackoverflow.com/a/3041398
    let dx = Math.abs(b.x - a.x);
    if (dx > worldSize.x / 2) {
        dx = worldSize.x - dx;
    }
    let dy = Math.abs(b.y - a.y);
    if (dy > worldSize.y / 2) {
        dy = worldSize.y - dy;
    }
    return dx * dx + dy * dy;
};

export const distanceSqaredNoWrap = (a: Coordinates, b: Coordinates) => {
    const dx = Math.abs(b.x - a.x);
    const dy = Math.abs(b.y - a.y);
    return dx * dx + dy * dy;
};

// Determines the effective squared distance between two points, detecting
// whether the shortest path wraps around the world boundary.
export const wrappedDistance = (
    worldSize: Coordinates,
    a: Coordinates,
    b: Coordinates,
    halfWorldDistance: number
): { distSqrd: number; wrapped: boolean } => {
    const noWrap = distanceSqaredNoWrap(a, b);
    if (noWrap <= halfWorldDistance) {
        return { distSqrd: noWrap, wrapped: false };
    }
    return { distSqrd: distanceSqrd(worldSize, a, b), wrapped: true };
};

export const updateCellPos = (worldSize: Coordinates, cell: Cell) => {
    cell.pos.x += cell.vel.x;
    cell.pos.y += cell.vel.y;
    if (cell.pos.x <= 0) {
        cell.pos.x = worldSize.x + cell.pos.x;
    } else if (cell.pos.x >= worldSize.x) {
        cell.pos.x = cell.pos.x - worldSize.x;
    }
    if (cell.pos.y <= 0) {
        cell.pos.y = worldSize.y + cell.pos.y;
    } else if (cell.pos.y >= worldSize.y) {
        cell.pos.y = cell.pos.y - worldSize.y;
    }
};
