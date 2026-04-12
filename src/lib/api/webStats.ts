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

export const recordNavigation = (path: string): void => {
    const payload = {
        clientTimestamp: Math.floor(Date.now() / 1000),
        app: 'particles-life',
        path,
        action: 'navigate',
        clientId: getOrCreateClientId()
    };

    if (dev) {
        console.log('[webStats] recordNavigation (dev mode, not sent)', payload);
        return;
    }

    apiClient.webStats.record(PUBLIC_WEB_STATS_API_KEY, payload).catch(() => {}); // fire-and-forget, ignore errors
};
