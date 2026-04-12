<script lang="ts">
    import Playground from '$lib/particles/components/Playground.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life - Playground' });
</script>

<Playground />
