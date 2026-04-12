<script lang="ts">
    import Story from '$lib/particles/components/story/StoryWithIntro.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life - Story' });
</script>

<Story />
