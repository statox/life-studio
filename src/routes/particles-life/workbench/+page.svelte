<script>
    import WorkBench from '$lib/particles/components/WorkBench.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life - Workbench' });
</script>

<WorkBench />
