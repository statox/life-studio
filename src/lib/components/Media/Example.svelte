<!--
    Example parent component demonstrating Media in different layouts.
    Not meant to be used in production — copy and adapt as needed.
-->
<script>
    import { Media } from '$lib/components/Media';
</script>

<div class="container">
    <!-- Constrained width -->
    <section>
        <h3>Small (max 300px)</h3>
        <div class="constrained">
            <Media
                path="/media_component/small_square.png"
                title="Thumbnail"
                showDescription={false}
            />
        </div>
    </section>

    <!-- Video -->
    <section>
        <h3>Video</h3>
        <div class="constrained-lg">
            <Media
                path="/media_component/small_square.gif"
                title="Video demo"
                description="A short recording."
            />
        </div>
    </section>

    <!-- Side-by-side (2 columns) -->
    <section>
        <h3>Two columns</h3>
        <div class="grid-2">
            <Media path="/media_component/rectangle.png" title="Left" />
            <Media path="/media_component/vertical_rectangle.png" title="Right" />
        </div>
    </section>

    <!-- Three-column grid -->
    <section>
        <h3>Three columns</h3>
        <div class="grid-3">
            <Media path="/media_component/small_square.png" title="One" />
            <Media path="/media_component/rectangle.png" title="Two" />
            <Media path="/media_component/large_vertical_square.png" title="Three" />
        </div>
    </section>

    <!-- Single full-width image -->
    <section>
        <h3>Full width</h3>
        <Media
            path="/media_component/large_rectangle.png"
            title="Large Rectangle"
            description="Full-width layout."
        />
    </section>
</div>

<style>
    .container {
        margin: 20px 30px;
    }

    section {
        margin-bottom: 2rem;
    }

    .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .constrained {
        max-width: 300px;
    }

    .constrained-lg {
        max-width: 600px;
    }
</style>
