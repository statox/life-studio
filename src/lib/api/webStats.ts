import { dev } from '$app/environment';
import { apiClient } from './client';
import { PUBLIC_WEB_STATS_API_KEY } from '$env/static/public';

const getOrCreateClientId = (): string => {
    const key = 'particles-life-client-id';
    let id = localStorage.getItem(key);
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(key, id);
    }
    return id;
};

const record = (path: string, action: string): void => {
    const payload = {
        clientTimestamp: Math.floor(Date.now() / 1000),
        app: 'particles-life',
        path,
        action,
        clientId: getOrCreateClientId()
    };

    if (dev) {
        console.log('[webStats] record (dev mode, not sent)', payload);
        return;
    }

    apiClient.webStats.record(PUBLIC_WEB_STATS_API_KEY, payload).catch(() => {});
};

export const recordNavigation = (path: string): void => {
    record(path, 'navigate');
};

// Tracks the current story position so interactions can be associated with it.
let currentStoryPath = '/particles-life/story';

export const recordStoryStep = (screenIndex: number, sectionIndex: number): void => {
    currentStoryPath = `/particles-life/story/${screenIndex}/${sectionIndex}`;
    record(currentStoryPath, 'story-step');
};

export const recordStoryInteraction = (action: string, value?: string | number): void => {
    const fullAction = value !== undefined ? `${action}:${value}` : action;
    record(currentStoryPath, fullAction);
};
