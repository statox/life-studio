<script>
    import { base } from '$app/paths';
</script>

<header>
    <h1>Particles Life</h1>

    <nav>
        <a href="{base}/particles">Particles life</a> |
        <a href="{base}/gameoflife">Game Of Life</a> |
        <a href="{base}/reaction-diffusion">Reaction-diffusion</a> |
        <a href="{base}/shaders">Test shaders</a> |
        <a href="{base}/soft-bodies">Soft bodies</a> |
    </nav>
</header>

<slot />

<style>
    :global(.svelte-tabs li.svelte-tabs__tab) {
        background-color: #bfbec6;
        margin-right: 4px;
    }

    header {
        max-width: 1200px;
        margin: 0 auto;
        padding: 8px 16px;
        box-sizing: border-box;
    }
</style>
