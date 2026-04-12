<script lang="ts">
    import GameOfLife from '$lib/GameOfLife/GameOfLife.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Game of Life' });
</script>

<GameOfLife />
