<script lang="ts">
    import { getAllUniverses, type StoredUniverse } from '$lib/particles/universe';

    export let onSelect: (universe: StoredUniverse) => void;

    const universes = getAllUniverses();
    let selectedIndex = '';

    const handleChange = () => {
        const idx = parseInt(selectedIndex);
        if (!isNaN(idx)) onSelect(universes[idx]);
    };
</script>

<div class="preset-selector">
    <select bind:value={selectedIndex} on:change={handleChange}>
        <option value="" disabled>Load a preset…</option>
        {#each universes as u, i}
            <option value={String(i)}>{u.name}</option>
        {/each}
    </select>
</div>

<style>
    .preset-selector {
        display: flex;
    }

    select {
        flex: 1;
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 28px 6px 10px;
        font-size: 0.82rem;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%2390a4ae' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 10px center;
        transition: border-color 0.13s;
    }

    select:hover {
        border-color: #546e7a;
        color: #eceff1;
    }

    select:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
    }
</style>
