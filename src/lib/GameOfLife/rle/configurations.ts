import { parseConfigurationString } from './parser';
import BigGlider from './patterns/bigglider.rle';
import Candelabra from './patterns/candelabra.rle';
import Climber131c31 from './patterns/131c31climber.rle';
import Eheptomino from './patterns/eheptomino.rle';
import GardenOfEden5x45 from './patterns/gardenofeden5x45.rle';
import Glider from './patterns/glider.rle';
import GlidersByTheDozen from './patterns/glidersbythedozen.rle';
import GliderLoop from './patterns/gliderloop.rle';
import Laputa from './patterns/laputa.rle';

const _CONFIGURATION_NAMES = [
    'bigglider',
    'candelabra',
    'climber131c31',
    'eheptomino',
    'gardenofeden5x45',
    'glider',
    'glidersbythedozen',
    'gliderLoop',
    'laputa'
] as const;
type ConfigurationNamesTuple = typeof _CONFIGURATION_NAMES;
export type ConfigurationName = ConfigurationNamesTuple[number];

const configurations: {
    [configName in ConfigurationName]: string;
} = {
    bigglider: BigGlider,
    candelabra: Candelabra,
    climber131c31: Climber131c31,
    eheptomino: Eheptomino,
    gardenofeden5x45: GardenOfEden5x45,
    glider: Glider,
    glidersbythedozen: GlidersByTheDozen,
    gliderLoop: GliderLoop,
    laputa: Laputa
};

export const getConfiguration = (name: ConfigurationName) => {
    if (!configurations[name]) {
        throw new Error(`Invalid configuration name ${name}`);
    }

    return parseConfigurationString(configurations[name]);
};
