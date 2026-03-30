import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const PRESETS_DIR = 'src/lib/particles/universe/presets';
const SAFE_ID = /^[a-z0-9_]+$/;

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname === '/api/presets' && event.request.method === 'POST') {
        if (!dev) {
            return json({ error: 'Only available in dev mode' }, { status: 403 });
        }

        const body = await event.request.json();
        const id = body?.id;

        if (!id || typeof id !== 'string' || !SAFE_ID.test(id)) {
            return json({ error: 'Invalid or missing id' }, { status: 400 });
        }

        const filePath = join(process.cwd(), PRESETS_DIR, `${id}.json`);

        try {
            await writeFile(filePath, JSON.stringify(body, null, 2) + '\n', 'utf-8');
            return json({ ok: true });
        } catch (err) {
            return json({ error: String(err) }, { status: 500 });
        }
    }

    return resolve(event);
};
