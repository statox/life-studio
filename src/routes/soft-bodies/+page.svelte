<script>
    import Page from '$lib/SoftBodies/SoftBodies.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Soft Bodies' });
</script>

<Page />
