<script lang="ts">
    import type {
        StoredUniverse,
        UniverseBehavior,
        UniverseStructure,
        EnergyLevel
    } from '$lib/particles/universe';

    export let universes: StoredUniverse[];
    export let selected: StoredUniverse | null = null;
    export let onSelect: (u: StoredUniverse) => void;

    // ── Filters ──────────────────────────────────────────────────────────────
    let fSearch = '';
    let fBehavior: UniverseBehavior | 'all' = 'all';
    let fStructure: UniverseStructure | 'all' = 'all';
    let fColors: 1 | 2 | 3 | 4 | 'all' = 'all';
    let fEnergy: EnergyLevel | 'all' = 'all';
    let fComplexity: 1 | 2 | 3 | 'all' = 'all';

    // ── Sort ─────────────────────────────────────────────────────────────────
    type SortKey = 'name' | 'behavior' | 'colors' | 'energy' | 'complexity';
    let sortKey: SortKey = 'name';
    let sortAsc = true;

    const BEHAVIOR_ORDER: Record<string, number> = { still: 0, converges: 1, cyclic: 2, chaotic: 3 };
    const ENERGY_ORDER: Record<string, number> = { low: 0, medium: 1, high: 2 };

    const toggleSort = (k: SortKey) => {
        if (sortKey === k) sortAsc = !sortAsc;
        else { sortKey = k; sortAsc = true; }
    };

    $: searchLower = fSearch.trim().toLowerCase();

    $: visible = [...universes]
        .filter(u =>
            (!searchLower || u.name.toLowerCase().includes(searchLower) || u.description.toLowerCase().includes(searchLower)) &&
            (fBehavior === 'all' || u.behavior === fBehavior) &&
            (fStructure === 'all' || u.structure === fStructure) &&
            (fColors === 'all' || u.activeColors === fColors) &&
            (fEnergy === 'all' || u.energyLevel === fEnergy) &&
            (fComplexity === 'all' || u.complexity === fComplexity)
        )
        .sort((a, b) => {
            let cmp = 0;
            if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
            else if (sortKey === 'behavior') cmp = (BEHAVIOR_ORDER[a.behavior] ?? 0) - (BEHAVIOR_ORDER[b.behavior] ?? 0);
            else if (sortKey === 'colors') cmp = a.activeColors - b.activeColors;
            else if (sortKey === 'energy') cmp = (ENERGY_ORDER[a.energyLevel] ?? 0) - (ENERGY_ORDER[b.energyLevel] ?? 0);
            else if (sortKey === 'complexity') cmp = a.complexity - b.complexity;
            return sortAsc ? cmp : -cmp;
        });

    // ── Helpers ──────────────────────────────────────────────────────────────
    const behaviorColor = (b: string): string => {
        if (b === 'still') return '#546e7a';
        if (b === 'converges') return '#1565c0';
        if (b === 'cyclic') return '#2e7d32';
        return '#e65100';
    };

    const energyColor = (e: string): string => {
        if (e === 'low') return '#78909c';
        if (e === 'medium') return '#c3e88d';
        return '#fc2a51';
    };

    const stars = (n: number): string => '★'.repeat(n) + '☆'.repeat(3 - n);

    const behaviors: Array<UniverseBehavior | 'all'> = ['all', 'still', 'converges', 'cyclic', 'chaotic'];
    const structures: Array<UniverseStructure | 'all'> = ['all', 'none', 'clusters', 'patterns', 'organisms'];
    const colorOptions: Array<1 | 2 | 3 | 4 | 'all'> = ['all', 1, 2, 3, 4];
    const energies: Array<EnergyLevel | 'all'> = ['all', 'low', 'medium', 'high'];
    const complexities: Array<1 | 2 | 3 | 'all'> = ['all', 1, 2, 3];

    const sortOptions: Array<{ key: SortKey; label: string }> = [
        { key: 'name', label: 'Name' },
        { key: 'behavior', label: 'Behavior' },
        { key: 'colors', label: 'Colors' },
        { key: 'energy', label: 'Energy' },
        { key: 'complexity', label: 'Complexity' }
    ];
</script>

<div class="selector">
    <!-- ── Sort + count ── -->
    <div class="sort-bar">
        <span class="count">{visible.length}/{universes.length}</span>
        <input
            class="search"
            type="search"
            placeholder="Search…"
            bind:value={fSearch}
        />
        <div class="sort-btns">
            {#each sortOptions as opt}
                <button
                    class="sort-btn"
                    class:active={sortKey === opt.key}
                    on:click={() => toggleSort(opt.key)}
                >
                    {opt.label}
                    {#if sortKey === opt.key}
                        <span class="sort-arrow">{sortAsc ? '↑' : '↓'}</span>
                    {/if}
                </button>
            {/each}
        </div>
    </div>

    <!-- ── List ── -->
    <ul class="list" role="listbox" aria-label="Universe selector">
        {#each visible as u (u.name)}
            {@const isSelected = selected?.name === u.name}
            <li
                class="item"
                class:active={isSelected}
                role="option"
                aria-selected={isSelected}
                tabindex="0"
                on:click={() => onSelect(u)}
                on:keydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect(u);
                    }
                }}
            >
                <div class="item-header">
                    <span class="item-name">{u.name}</span>
                    <div class="badges">
                        <span class="badge" style="background:{behaviorColor(u.behavior)}">{u.behavior}</span>
                        <span class="badge-outline">{u.activeColors}c</span>
                        <span class="energy-dot" style="background:{energyColor(u.energyLevel)}" title="Energy: {u.energyLevel}" />
                        <span class="stars">{stars(u.complexity)}</span>
                    </div>
                </div>
                <p class="item-desc">{u.description}</p>
            </li>
        {/each}
        {#if visible.length === 0}
            <li class="empty">No universes match the current filters.</li>
        {/if}
    </ul>

    <!-- ── Filters ── -->
    <div class="filters">
        <div class="filter-row">
            <span class="filter-label">Behavior</span>
            <div class="chips">
                {#each behaviors as b}
                    <button
                        class="chip"
                        class:active={fBehavior === b}
                        on:click={() => { fBehavior = b; }}
                        style={b !== 'all' && fBehavior === b ? `background:${behaviorColor(b)};border-color:${behaviorColor(b)}` : ''}
                    >{b === 'all' ? 'All' : b}</button>
                {/each}
            </div>
        </div>
        <div class="filter-row">
            <span class="filter-label">Structure</span>
            <div class="chips">
                {#each structures as s}
                    <button
                        class="chip"
                        class:active={fStructure === s}
                        on:click={() => { fStructure = s; }}
                    >{s === 'all' ? 'All' : s}</button>
                {/each}
            </div>
        </div>
        <div class="filter-row">
            <span class="filter-label">Colors</span>
            <div class="chips">
                {#each colorOptions as c}
                    <button
                        class="chip"
                        class:active={fColors === c}
                        on:click={() => { fColors = c; }}
                    >{c === 'all' ? 'All' : c}</button>
                {/each}
            </div>
        </div>
        <div class="filter-row">
            <span class="filter-label">Energy</span>
            <div class="chips">
                {#each energies as e}
                    <button
                        class="chip"
                        class:active={fEnergy === e}
                        on:click={() => { fEnergy = e; }}
                        style={e !== 'all' && fEnergy === e ? `color:${energyColor(e)}; border-color:${energyColor(e)}40` : ''}
                    >{e === 'all' ? 'All' : e}</button>
                {/each}
            </div>
        </div>
        <div class="filter-row">
            <span class="filter-label">Complexity</span>
            <div class="chips">
                {#each complexities as cx}
                    <button
                        class="chip"
                        class:active={fComplexity === cx}
                        on:click={() => { fComplexity = cx; }}
                    >{cx === 'all' ? 'All' : stars(cx)}</button>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .selector {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    /* ── Filters ──────────────────────────────── */
    .filters {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 12px 14px;
        background: #1e292f;
        border: 1px solid #37474f;
        border-radius: 0 0 8px 8px;
        border-top: none;
    }

    .filter-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    .filter-label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #546e7a;
        font-weight: 600;
        width: 68px;
        flex-shrink: 0;
        white-space: nowrap;
    }

    @media (max-width: 480px) {
        .filter-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
        }

        .filter-label {
            width: auto;
        }
    }

    .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .chip {
        font-size: 0.72rem;
        padding: 2px 9px;
        border-radius: 10px;
        border: 1px solid #37474f;
        background: transparent;
        color: #78909c;
        cursor: pointer;
        transition: background 0.12s, border-color 0.12s, color 0.12s;
        line-height: 1.6;
    }

    .chip:hover {
        background: #2e3c43;
        color: #b0bec5;
    }

    .chip.active {
        background: #2e3c43;
        border-color: #c3e88d55;
        color: #c3e88d;
    }

    /* ── Sort bar ─────────────────────────────── */
    .sort-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 7px 14px;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 8px 8px 0 0;
        border-bottom: none;
    }

    .count {
        font-size: 0.68rem;
        color: #546e7a;
        font-variant-numeric: tabular-nums;
        flex-shrink: 0;
    }

    .search {
        flex: 1;
        min-width: 0;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #eceff1;
        padding: 3px 8px;
        font-size: 0.78rem;
    }

    .search::placeholder {
        color: #546e7a;
    }

    .search:focus {
        outline: 1px solid #c3e88d55;
        border-color: #c3e88d55;
    }

    .sort-btns {
        display: flex;
        gap: 3px;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .sort-btn {
        font-size: 0.68rem;
        padding: 2px 8px;
        border-radius: 6px;
        border: 1px solid transparent;
        background: transparent;
        color: #546e7a;
        cursor: pointer;
        transition: color 0.12s, border-color 0.12s;
        display: flex;
        align-items: center;
        gap: 3px;
    }

    .sort-btn:hover {
        color: #90a4ae;
        border-color: #37474f;
    }

    .sort-btn.active {
        color: #c3e88d;
        border-color: #c3e88d33;
    }

    .sort-arrow {
        font-size: 0.6rem;
    }

    /* ── List ─────────────────────────────────── */
    .list {
        list-style: none;
        margin: 0;
        padding: 0;
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 0;
        border-top: none;
        border-bottom: none;
        overflow-y: auto;
        max-height: 480px;
    }

    .item {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 10px 14px;
        cursor: pointer;
        border-left: 3px solid transparent;
        transition: background 0.13s, border-color 0.13s;
    }

    .item + .item {
        border-top: 1px solid #1e2a2f;
    }

    .item:hover {
        background: #2e3c43;
    }

    .item.active {
        border-left-color: #c3e88d;
        background: #1e2e1a;
    }

    .item-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
    }

    .item-name {
        font-size: 0.85rem;
        font-weight: 700;
        color: #cfd8dc;
    }

    .item.active .item-name {
        color: #c3e88d;
    }

    .item-desc {
        font-size: 0.75rem;
        color: #78909c;
        line-height: 1.55;
        margin: 0;
    }

    .item.active .item-desc {
        color: #90a4ae;
    }

    /* ── Badges ───────────────────────────────── */
    .badges {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
    }

    .badge {
        font-size: 0.62rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        padding: 2px 6px;
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .badge-outline {
        font-size: 0.62rem;
        font-weight: 600;
        color: #78909c;
        padding: 1px 5px;
        border-radius: 10px;
        border: 1px solid #37474f;
    }

    .energy-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .stars {
        font-size: 0.72rem;
        color: #c3e88d;
        letter-spacing: 1px;
    }

    .empty {
        padding: 24px;
        text-align: center;
        font-size: 0.82rem;
        color: #546e7a;
    }
</style>
