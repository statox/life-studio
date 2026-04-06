<script>
    import Story from '$lib/particles/components/story/Story.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life - Story' });
</script>

<Story />
