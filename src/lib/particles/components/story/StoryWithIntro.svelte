<script lang="ts">
    import Infinite from '../Infinite.svelte';
    import Story from './Story.svelte';

    let showStory = $state(false);
</script>

{#if showStory}
    <Story />
{:else}
    <Infinite onStoryClick={() => (showStory = true)} />
{/if}
