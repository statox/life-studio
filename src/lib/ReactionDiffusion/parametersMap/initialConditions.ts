export type InitialConditionsMode =
    | 'empty'
    | 'randomSpots'
    | 'middleCircleAndRandomSpots'
    | 'empty'
    | 'full';

export const getInitialConditions = (mode: InitialConditionsMode, radius: number) => {
    if (mode === 'randomSpots') {
        return randomSpots(radius, 0.001);
    }
    if (mode === 'middleCircleAndRandomSpots') {
        return middleCircleAndRandomSpots(radius, 0.005, 0.05);
    }
    if (mode === 'empty') {
        return empty(radius);
    }
    if (mode === 'full') {
        return empty(radius);
    }
    return middleSpot(radius, 0.02);
};

const middleCircleAndRandomSpots = (
    radius: number,
    birthChance: number,
    middleSpotRadius: number
) => {
    const seedRadius = radius * middleSpotRadius;
    return Array(radius * radius)
        .fill(0)
        .map((_, index) => {
            const y = Math.floor(index / radius);
            const x = index % radius;
            const dist = Math.hypot(radius / 2 - x, radius / 2 - y);
            if (dist < seedRadius) {
                return [0, 1, 0, 1];
            }

            if (Math.random() < birthChance) {
                return [0, 1, 0, 1];
            }
            return [1, 0, 0, 1];
        })
        .flat();
};

const empty = (radius: number) => {
    return Array(radius * radius)
        .fill(0)
        .map(() => {
            return [0, 0, 0, 1];
        })
        .flat();
};

const randomSpots = (radius: number, birthChance: number) => {
    return Array(radius * radius)
        .fill(0)
        .map(() => {
            if (Math.random() < birthChance) {
                return [0, 1, 0, 1];
            }
            return [1, 0, 0, 1];
        })
        .flat();
};

const middleSpot = (radius: number, spotRadius: number) => {
    return Array(radius * radius)
        .fill(0)
        .map((_, index) => {
            const y = Math.floor(index / radius);
            const x = index % radius;
            const dist = Math.hypot(radius / 2 - x, radius / 2 - y);
            if (dist < spotRadius * radius) {
                return [0, 1, 0, 1];
            }

            return [1, 0, 0, 1];
        })
        .flat();
};
