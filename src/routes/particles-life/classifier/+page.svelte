<script>
    import Classifier from '$lib/particles/components/Classifier.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life - Classifier' });
</script>

<Classifier />
