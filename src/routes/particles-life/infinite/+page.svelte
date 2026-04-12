<script lang="ts">
    import Infinite from '$lib/particles/components/Infinite.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life - Infinite' });
</script>

<Infinite disableStoryButton={true} />
