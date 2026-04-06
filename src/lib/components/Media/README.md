# Media Component

A self-contained component for displaying images and videos from the `static/` directory. Supports lazy loading, preserves original aspect ratio, and expands to a fullscreen overlay on click.

## Props

| Prop              | Type                  | Default     | Description                                      |
| ----------------- | --------------------- | ----------- | ------------------------------------------------ |
| `path`            | `string`              | **required**| Path relative to `static/`, e.g. `"/my-img.png"` |
| `title`           | `string \| undefined` | `undefined` | Optional title shown below the media             |
| `description`     | `string \| undefined` | `undefined` | Optional description shown below the title       |
| `showTitle`       | `boolean`             | `true`      | Set to `false` to hide the title                 |
| `showDescription` | `boolean`             | `true`      | Set to `false` to hide the description           |
| `alt`             | `string`              | `''`        | Alt text for images (falls back to `title`)      |

## Supported formats

- **Images**: any format the browser supports (png, jpg, webp, gif, svg, ...)
- **Video**: `.mp4`, `.webm`, `.ogg` — detected by file extension, rendered with `<video controls loop muted>`

## Examples

### Basic image

```svelte
<script>
    import { Media } from '$lib/components/Media';
</script>

<Media path="/parameters_map.png" />
```

### Image with title and description

```svelte
<Media
    path="/parameters_map.png"
    title="Parameter Map"
    description="Overview of the Gray-Scott parameter space."
/>
```

### Hide title, show only description

```svelte
<Media
    path="/pearson-tags.jpg"
    title="Pearson Tags"
    description="Classification of reaction-diffusion patterns."
    showTitle={false}
/>
```

### Control size from the parent

The component fills 100% of its container width while preserving aspect ratio. Control the size with standard CSS on the parent:

```svelte
<div style="max-width: 400px;">
    <Media path="/parameters_map.png" title="Small" />
</div>
```

Inside a flex layout:

```svelte
<div style="display: flex; gap: 16px;">
    <div style="flex: 1;"><Media path="/parameters_map.png" /></div>
    <div style="flex: 1;"><Media path="/pearson-tags.jpg" /></div>
</div>
```

### Video

```svelte
<Media
    path="/demo.mp4"
    title="Simulation demo"
    description="A short recording of the particle life simulation."
/>
```

## Fullscreen overlay

Clicking the media opens a fullscreen overlay showing the image/video at its original size (constrained to 90vw/80vh). Close by:

- Clicking the backdrop
- Clicking the **✕** button
- Pressing **Escape**
