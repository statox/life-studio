<script lang="ts">
    import '$lib/particles/particles.css';

    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

{@render children?.()}
