// Parse pattern files encoded with RLE algorithm as described in the wiki
// https://conwaylife.com/wiki/Run_Length_Encoded

// Transforms 33ob$ to ['33', 'o', 'b', '$']
export const lineToLineItems = (line: string) => {
    return line.split('').reduce((items, char) => {
        if (items.length === 0) {
            items.push(char);
            return items;
        }
        if (char.match(/\d/) && items[items.length - 1]?.match(/\d/)) {
            items[items.length - 1] = items[items.length - 1] + char;
        } else {
            items.push(char);
        }
        return items;
    }, [] as string[]);
};

const TAGS = ['o', 'b', '$', '!'] as const;
type TagTuple = typeof TAGS;
type Tag = TagTuple[number];
type Token = {
    count: number;
    tag: Tag;
};
export const lineItemsToTokens = (lineItems: string[]): Token[] => {
    const tokens: Token[] = [];

    if (!lineItems.length) {
        throw new Error('No line items to tokenize');
    }

    let currentData: {
        count?: number;
        tag?: string;
    } = {};
    for (let i = 0; i < lineItems.length; i++) {
        const currentItem = lineItems[i];
        const isNumber = currentItem.match(/^\d+$/);
        if (!isNumber && !['o', 'b', '$', '!'].includes(currentItem)) {
            throw new Error(`Invalid configuration item ${currentItem}`);
        }

        if (isNumber) {
            if (currentData.count) {
                throw new Error(
                    `Invalid configuration. Two consecutive numbers ${currentData.count}, ${currentItem}`
                );
            }
            currentData.count = Number(currentItem);
        } else {
            if (currentData.tag) {
                throw new Error(
                    `Invalid configuration. Something went wrong with tokenization at item ${currentItem}, index ${i}`
                );
            }
            if (!currentData.count) {
                currentData.count = 1;
            }
            if (currentItem === '!') {
                return tokens;
            }
            currentData.tag = currentItem;
            tokens.push(currentData as Token);
            currentData = {};
        }
    }

    throw new Error('Invalid configuration. No ending character');
};

export const tokensToMatrix = (params: {
    properties: { x: number; y: number };
    tokens: Token[];
}): number[][] => {
    const { properties, tokens } = params;
    const mat: number[][] = [[]];

    while (tokens.length) {
        const token = tokens.shift();
        if (!token) break;
        const { count, tag } = token;

        if (tag === '!') {
            throw new Error('Invalid token. ! should not have been sent here');
        }
        if (tag === '$') {
            for (let i = 0; i < count; i++) {
                mat.push([]);

                if (mat.length > properties.y) {
                    throw new Error('Invalid token. Vertical dimensions mismatch');
                }
            }
        } else {
            for (let i = 0; i < count; i++) {
                mat[mat.length - 1].push(tag === 'b' ? 0 : 1);
            }
        }
    }

    // Fill missing lines
    while (mat.length < properties.y) {
        mat.push(new Array(properties.x).fill(0));
    }

    // Fill missing columns
    for (let i = 0; i < mat.length; i++) {
        while (mat[i].length < properties.x) {
            mat[i].push(0);
        }
    }

    return mat;
};

type Properties = {
    x: number;
    y: number;
    [k: string]: number | string;
};
export const parsePropertiesLines = (line: string): Properties => {
    const properties = line
        .replaceAll(' ', '')
        .split(',')
        .reduce(
            (properties: Properties, chunk) => {
                const [name, value] = chunk.split('=');
                if (value.match(/^\d+$/)) {
                    properties[name] = Number(value);
                } else {
                    properties[name] = value;
                }
                return properties;
            },
            { x: 0, y: 0 }
        );

    if (!properties.x || !properties.y) {
        throw new Error('Invalid pattern file: no dimensions');
    }

    return properties;
};

export const parseConfigurationString = (fileAsString: string) => {
    const lines = fileAsString
        .replaceAll('\r\n', '\n')
        .split('\n')
        .filter((l) => l !== '')
        .filter((l) => !l.match(/^#/));
    const propertiesLine = lines.shift();
    const patternLines = lines.join('');

    if (!propertiesLine || !lines) {
        throw new Error('Invalid pattern file');
    }

    const properties = parsePropertiesLines(propertiesLine);

    const items = lineToLineItems(patternLines);
    const tokens = lineItemsToTokens(items);
    const pattern = tokensToMatrix({ properties, tokens });

    return {
        width: properties.x,
        height: properties.y,
        pattern
    };
};
