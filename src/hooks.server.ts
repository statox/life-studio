import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { writeFile, readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { UNIVERSE_CATEGORIES } from '$lib/particles/universe';

const PRESETS_DIR = 'src/lib/particles/universe/presets';
const SAFE_ID = /^[a-z0-9_]+$/;

/** Find an existing preset file by id across all category subdirectories. */
async function findExistingPreset(id: string): Promise<string | null> {
    for (const cat of UNIVERSE_CATEGORIES) {
        const dir = join(process.cwd(), PRESETS_DIR, cat);
        try {
            const files = await readdir(dir);
            if (files.includes(`${id}.json`)) {
                return join(dir, `${id}.json`);
            }
        } catch {
            // Directory may not exist yet
        }
    }
    return null;
}

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname === '/api/presets' && event.request.method === 'POST') {
        if (!dev) {
            return json({ error: 'Only available in dev mode' }, { status: 403 });
        }

        const body = await event.request.json();
        const id = body?.id;
        const category = body?.category;

        if (!id || typeof id !== 'string' || !SAFE_ID.test(id)) {
            return json({ error: 'Invalid or missing id' }, { status: 400 });
        }

        if (!category || !UNIVERSE_CATEGORIES.includes(category)) {
            return json({ error: 'Invalid or missing category' }, { status: 400 });
        }

        const filePath = join(process.cwd(), PRESETS_DIR, category, `${id}.json`);

        try {
            // If the preset existed in a different category, remove the old file
            const oldPath = await findExistingPreset(id);
            if (oldPath && oldPath !== filePath) {
                await unlink(oldPath);
            }

            await writeFile(filePath, JSON.stringify(body, null, 2) + '\n', 'utf-8');
            return json({ ok: true });
        } catch (err) {
            return json({ error: String(err) }, { status: 500 });
        }
    }

    return resolve(event);
};
