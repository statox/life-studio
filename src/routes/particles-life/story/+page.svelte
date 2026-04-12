<script lang="ts">
    import { onMount } from 'svelte';
    import Story from '$lib/particles/components/story/StoryWithIntro.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';
    import { recordNavigation } from '$lib/api/webStats';

    pageMetadataStore.set({ name: 'Particle Life - Story' });

    onMount(() => {
        recordNavigation('/particles-life/story');
    });
</script>

<Story />
