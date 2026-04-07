<script lang="ts">
    import { base } from '$app/paths';
    import { pageMetadataStore } from '$lib/stores/pageMetadata';

    pageMetadataStore.set({ name: 'Particle Life' });
</script>

<div class="landing">
    <section class="hero">
        <p>
            A few thousand colored particles, each following a single rule: move toward or away from
            neighboring particles depending on their color. That's it. Yet from these minimal rules
            emerge clusters, waves, worms, crystals, and structures that look almost alive.
        </p>
        <p>
            This is a simulation of emergent complexity: many agent following simple local rules
            create complex patterns appearing at large scale.
        </p>
    </section>

    <div class="cards">
        <a class="card featured" href="{base}/particles-life/story">
            <div class="card-label">Start here</div>
            <h2>Story</h2>
            <p>Let me show you the universes through an guided demonstration</p>
            <span class="card-cta">Read Story →</span>
        </a>

        <a class="card" href="{base}/particles-life/playground">
            <h2>Playground</h2>
            <p>
                An interactive interface allowing you to load preset universes and manipulate them
                to find new dynamics. <em>Works best on desktop.</em>
            </p>
            <span class="card-cta">Go play →</span>
        </a>

        <a class="card" href="{base}/particles-life/demo">
            <h2>Demonstration</h2>
            <p>
                A detailed walkthrough of how the simulation works. Explains the mechanics step by
                step with interactive examples you can run as you read. <em>Work in progress.</em>
            </p>
            <span class="card-cta">Read the guide →</span>
        </a>

        <a class="card" href="{base}/particles-life/gallery">
            <h2>Gallery</h2>
            <p>
                Browse all named universes in one place. Each entry is a specific set of rules that
                produces a distinct, reproducible behavior. A good way to explore the range of
                what's possible.
            </p>
            <span class="card-cta">Browse universes →</span>
        </a>

        <a class="card" href="{base}/particles-life/workbench">
            <h2>Workbench</h2>
            <p>
                A free-form sandbox. Adjust the attraction table, tweak color proportions, change
                particle counts, and mutate or randomize the rules to discover new behaviors on your
                own.
            </p>
            <p>
                I tailor the UI to my specific needs as I work on this project so the interface is
                rough around the edges and might break often.
            </p>
            <span class="card-cta">Open sandbox →</span>
        </a>

        <a class="card" href="{base}/particles-life/classifier">
            <h2>Classifier</h2>
            <p>
                Review and tag universe presets. Load each universe, watch it simulate, then edit
                its metadata -behavior, structure, energy level- and save changes back to the source
                files. <em>Dev mode only.</em>
            </p>
            <span class="card-cta">Classify presets →</span>
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

    /* ── Hero ────────────────────────────────── */
    .hero {
        margin-bottom: 48px;
    }

    .hero p {
        font-size: 1rem;
        color: #90a4ae;
        line-height: 1.7;
        margin: 0 0 12px;
        /* max-width: 620px; */
    }

    /* ── Cards ───────────────────────────────── */
    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        gap: 16px;
    }

    .card.featured {
        grid-column: 1 / -1;
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

    .card.featured {
        border-color: #c3e88d44;
    }

    .card.featured:hover {
        border-color: #c3e88d99;
        background: #2a3a2e;
    }

    .card-label {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #c3e88d;
        font-weight: 600;
        margin-bottom: 8px;
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

    .card p em {
        color: #78909c;
        font-size: 0.82rem;
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

    .card.featured .card-cta {
        color: #c3e88daa;
    }

    .card.featured:hover .card-cta {
        color: #c3e88d;
    }

    /* ── Responsive ──────────────────────────── */
    @media (max-width: 600px) {
        .landing {
            padding: 32px 16px 64px;
        }

        .cards {
            grid-template-columns: 1fr;
        }

        .card.featured {
            grid-column: 1;
        }
    }
</style>
