<script lang="ts">
    import { base } from '$app/paths';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';
    import { recordCardClick } from '$lib/api/webStats';

    pageMetadataStore.set({ name: 'Life Studio' });
</script>

<div class="landing">
    <section class="hero">
        <p>Experiments with simple rules producing complex patterns.</p>
    </section>

    <div class="cards">
        <a
            class="card"
            href="{base}/particles-life"
            onclick={() => recordCardClick('/particles-life')}
        >
            <h2>Particle Life</h2>
            <p>
                Colored particles attract or repel each other based on simple rules. Clusters,
                waves, and lifelike structures emerge from minimal interactions, all running in web
                workers.
            </p>
            <span class="card-cta">Explore →</span>
        </a>

        <a class="card" href="{base}/gameoflife" onclick={() => recordCardClick('/gameoflife')}>
            <h2>Game of Life</h2>
            <p>
                Conway's classic cellular automaton running on the GPU. Cells live, die, or are born
                based on their neighbors, creating gliders, oscillators, and endless complexity.
            </p>
            <span class="card-cta">Explore →</span>
        </a>

        <a
            class="card"
            href="{base}/reaction-diffusion"
            onclick={() => recordCardClick('/reaction-diffusion')}
        >
            <h2>Reaction-Diffusion</h2>
            <p>
                The Gray-Scott model simulates two chemicals reacting and diffusing across a
                surface, producing spots, stripes, and labyrinthine patterns.
            </p>
            <span class="card-cta">Explore →</span>
        </a>

        <a class="card" href="{base}/soft-bodies" onclick={() => recordCardClick('/soft-bodies')}>
            <h2>Soft bodies</h2>
            <p>A never completed -and really never started- project around soft bodies physics..</p>
            <span class="card-cta">Expect nothing, still get disappointed →</span>
        </a>
    </div>
    <br />
    <div class="cards">
        <a class="card" href="{base}/shaders" onclick={() => recordCardClick('/shaders')}>
            <h2>Shader tests</h2>
            <p>Me messing up with shaders and webgl before implementing Game of Life on the GPU.</p>
            <span class="card-cta">Explore →</span>
        </a>
    </div>
</div>

<style>
    .landing {
        max-width: 900px;
        margin: 0 auto;
        padding: 48px 24px 80px;
        box-sizing: border-box;
    }

    .hero {
        margin-bottom: 48px;
    }

    .hero p {
        font-size: 1rem;
        color: #90a4ae;
        line-height: 1.7;
        margin: 0;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .card {
        display: flex;
        flex-direction: column;
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 10px;
        padding: 24px 28px;
        text-decoration: none;
        transition:
            border-color 0.15s,
            background 0.15s;
    }

    .card:hover {
        background: #2e3c43;
        border-color: #546e7a;
    }

    .card h2 {
        font-size: 1.15rem;
        font-weight: 600;
        color: #eceff1;
        margin: 0 0 12px;
    }

    .card p {
        font-size: 0.88rem;
        color: #90a4ae;
        line-height: 1.6;
        margin: 0;
        flex: 1;
    }

    .card-cta {
        display: block;
        margin-top: 20px;
        font-size: 0.82rem;
        color: #78909c;
        transition: color 0.15s;
    }

    .card:hover .card-cta {
        color: #b0bec5;
    }

    @media (max-width: 600px) {
        .landing {
            padding: 32px 16px 64px;
        }

        .cards {
            grid-template-columns: 1fr;
        }
    }
</style>
