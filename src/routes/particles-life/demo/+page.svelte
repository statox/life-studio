<script>
    import Demonstration from '$lib/particles/components/Demonstration.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life - Demonstration' });
</script>

<Demonstration />
