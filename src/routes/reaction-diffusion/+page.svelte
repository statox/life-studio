<script>
    import ReactionDiffusion from '$lib/ReactionDiffusion/ReactionDiffusion.svelte';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Reaction-Diffusion' });
</script>

<ReactionDiffusion />
