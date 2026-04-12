<script lang="ts">
    import Page from '$lib/shaders/components/TestShaders.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Shader Tests' });
</script>

<Page />
