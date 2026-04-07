<script lang="ts">
    import Example from '$lib/components/Media/Example.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Tests' });
</script>

<Example />
