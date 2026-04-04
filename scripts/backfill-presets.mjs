/**
 * One-time backfill script: adds `category`, `createdAt`, and missing `id` fields
 * to all preset JSON files.
 *
 * Usage: node scripts/backfill-presets.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { join, basename } from 'path';

const PRESETS_DIR = 'src/lib/particles/universe/presets';
const DRY_RUN = process.argv.includes('--dry-run');

// ── Category mapping ────────────────────────────────────────────────────────
// Review this before running! Based on filename patterns and existing metadata.
const CATEGORY_MAP = {
    // worms
    '4_colors_worms': 'worms',
    '4_colors_worms_single_stage': 'worms',
    slow_moving_worms: 'worms',
    wraping_bug_worm: 'worms',

    // islands
    '3_colors_stable_islands': 'islands',
    '4_colors_islands': 'islands',
    complex_islands: 'islands',
    complex_islands2: 'islands',
    blue_islands: 'islands',
    islands: 'islands',
    dynamic_islands: 'islands',
    stable_multi_stage_islands: 'islands',
    cellular_strips_inner_islands: 'islands',

    // clusters
    complexe_clusters: 'clusters',
    slowly_merging_clusters: 'clusters',
    slowly_merging_clusters2: 'clusters',
    '4_colors_slowly_merging2_colors_blobs': 'clusters',
    merging_circular_structures: 'clusters',
    three_layer_onion: 'clusters',
    bounded_territories: 'clusters',
    bubble_exclusion_zones: 'clusters',

    // waves
    '4_colors_waves': 'waves',
    rotation_cells: 'waves',

    // crystals
    crystal: 'crystals',
    crystal_stripes: 'crystals',
    faction_civil_war: 'crystals',
    spatial_repartition: 'crystals',

    // movers
    compact_moving_structures: 'movers',
    comple_moving_structures: 'movers',
    complexe_moving_structures: 'movers',
    complexe_moving_structures2: 'movers',
    complex_structures: 'movers',
    moving_structures: 'movers',
    moving_structures2: 'movers',
    single_compact_moving_structure: 'movers',
    various_moving_organisms: 'movers',
    fast_movers: 'movers',
    zoom4_stages_mover: 'movers',
    weakly_bounded_moving_structures: 'movers',
    moving_to_filaments: 'movers',
    '4_colors_inifnite_moving_low_cohesion_groups': 'movers',
    infinite_moving_mass: 'movers',
    spinning_structures: 'movers',

    // chase
    '2_colors_chase': 'chase',
    '2_colors_chase_white_attraction': 'chase',
    linear_predator_chain: 'chase',
    competing_predators: 'chase',
    rock_paper_scissors: 'chase',
    self_cohesive_rps: 'chase',
    two_independent_chase_pairs: 'chase',

    // chaos
    stable_chaos: 'chaos',

    // stripes
    cellular_strips: 'stripes',
    cellular_strips2: 'stripes',
    cellular_strips3: 'stripes',
    stripe_patterns: 'stripes',
    '4_colors_spreading_pattern': 'stripes',

    // other
    '1_color_repulsion': 'other',
    '1_color_still': 'other',
    '2_colors_own_attraction': 'other',
    '2_colors_own_repulsion': 'other',
    '2_colors_red_self_repulsion': 'other',
    '2_colors_white_self_repulsion': 'other',
    '2_colors_vessels': 'other',
    anthill: 'other',
    anthill_2: 'other',
    anthill_3: 'other'
};

// ── Main ────────────────────────────────────────────────────────────────────

const files = readdirSync(PRESETS_DIR).filter((f) => f.endsWith('.json'));
let modified = 0;
let errors = 0;

for (const file of files) {
    const filePath = join(PRESETS_DIR, file);
    const key = basename(file, '.json');

    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    let changed = false;

    // Add missing id
    if (!data.id) {
        data.id = key;
        console.log(`  [id] ${file}: added id="${key}"`);
        changed = true;
    }

    // Add category
    const category = CATEGORY_MAP[key];
    if (!category) {
        console.error(`  [ERROR] ${file}: no category mapping found, skipping`);
        errors++;
        continue;
    }
    if (!data.category) {
        data.category = category;
        console.log(`  [category] ${file}: ${category}`);
        changed = true;
    }

    // Add createdAt from git history
    if (!data.createdAt) {
        try {
            const date = execSync(`git log --diff-filter=A --format=%aI -- "${filePath}"`, {
                encoding: 'utf-8'
            }).trim();
            if (date) {
                // Keep only the date part (YYYY-MM-DD)
                data.createdAt = date.slice(0, 10);
                console.log(`  [createdAt] ${file}: ${data.createdAt}`);
                changed = true;
            } else {
                // File not yet committed (new/untracked)
                data.createdAt = new Date().toISOString().slice(0, 10);
                console.log(`  [createdAt] ${file}: ${data.createdAt} (not in git, using today)`);
                changed = true;
            }
        } catch {
            console.error(`  [WARN] ${file}: could not get git date`);
        }
    }

    if (changed) {
        if (DRY_RUN) {
            console.log(`  [DRY RUN] Would write ${file}`);
        } else {
            writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
        }
        modified++;
    }
}

console.log(`\nDone. Modified: ${modified}/${files.length}, Errors: ${errors}`);
if (DRY_RUN) console.log('(dry run — no files were written)');
