<script lang="ts">
    import Gallery from '$lib/particles/components/Gallery.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life - Gallery' });
</script>

<Gallery />
