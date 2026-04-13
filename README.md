# Life Studio

A SvelteKit app for interactive simulations (Game of Life, Reaction-Diffusion, particle systems, WebGL shaders), deployed to GitHub Pages.

## Dev setup

**Prerequisites:** Node.js (latest LTS)

```bash
# Install dependencies
npm install

# Copy the example env file and adjust values as needed
cp .env.example .env

# Start the dev server
npm run dev
```

The app runs at http://localhost:8080.

### Available commands

| Command          | Description               |
| ---------------- | ------------------------- |
| `npm run dev`    | Start dev server          |
| `npm run build`  | Build for production      |
| `npm run check`  | Svelte type-check         |
| `npm run lint`   | Prettier + ESLint check   |
| `npm run format` | Auto-format with Prettier |

### Environment variables

Copy `.env.example` to `.env`. The following variables are required at build time but not used

| Variable                   | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `PUBLIC_API_URL`           | Base URL of the backend API                                    |
| `PUBLIC_WEB_STATS_API_KEY` | API key for statox API web-stats (a dummy value works locally) |

---

# Readings

## WebGL and glsl

- https://github.com/9ballsyndrome/WebGL_Compute_shader
- http://www.bantherewind.com/wrap-your-mind-around-your-gpu
- https://webgl2fundamentals.org/
- https://stackoverflow.com/questions/53163241/2d-zoom-to-point-in-webgl
- https://github.com/regl-project/regl

- Game of life in pure WASM [part 1](https://ashen.earth/wasm-game-of-life-1) [part 2](https://ashen.earth/wasm-game-of-life-2)
