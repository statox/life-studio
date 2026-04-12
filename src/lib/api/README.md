# API client

## SDK

The SDK is vendored from the statox monorepo and lives at `src/vendor/statox-api/index.ts`.
It is auto-generated — do not edit it manually. To update it, copy the latest version from the monorepo:

```sh
cp /path/to/monorepo/front/src/vendor/statox-api/index.ts src/vendor/statox-api/index.ts
```

The SDK requires `ajv` (runtime) and `json-schema-to-ts` (dev, types only) as dependencies.

## Client

`client.ts` instantiates a single shared `APIClient` pointed at the production API:

```ts
import { apiClient } from '$lib/api/client';
```

The base URL is read from the `PUBLIC_API_URL` environment variable (defined in `.env`).
`credentials: 'include'` is required so the browser sends cookies on cross-origin requests,
matching the API's CORS policy (`Access-Control-Allow-Credentials: true`).

## Environment variables

| Variable                   | Description                                   |
| -------------------------- | --------------------------------------------- |
| `PUBLIC_API_URL`           | Base URL of the API (`https://api.statox.fr`) |
| `PUBLIC_WEB_STATS_API_KEY` | API key used to authenticate web-stats calls  |

Both variables must be prefixed with `PUBLIC_` so SvelteKit exposes them to the client bundle
via `$env/static/public`.

### Local development

Create a `.env` file at the project root (gitignored):

```sh
PUBLIC_API_URL=https://api.statox.fr
PUBLIC_WEB_STATS_API_KEY=<key>
```

### Production (GitHub Pages)

The `.env` file is not committed. Instead, the CI build receives the variables as process
environment variables, which SvelteKit inlines at build time.

In the GitHub repository go to **Settings → Secrets and variables → Actions** and add:

| Type     | Name                       | Value                   |
| -------- | -------------------------- | ----------------------- |
| Variable | `PUBLIC_API_URL`           | `https://api.statox.fr` |
| Secret   | `PUBLIC_WEB_STATS_API_KEY` | `<key>`                 |

The deploy workflow (`.github/workflows/deploy.yml`) then passes them to the build step:

```yaml
env:
    ENV: prod
    PUBLIC_API_URL: ${{ vars.PUBLIC_API_URL }}
    PUBLIC_WEB_STATS_API_KEY: ${{ secrets.PUBLIC_WEB_STATS_API_KEY }}
```

## webStats

`webStats.ts` exposes a `recordNavigation(path)` helper that sends a page-view event.

```ts
import { recordNavigation } from '$lib/api/webStats';

onMount(() => {
    recordNavigation('/particles-life/story');
});
```

In **dev mode** (`dev` from `$app/environment` is `true`) the call is replaced by a
`console.log` to avoid CORS failures against the production API.

In production the call is fire-and-forget — failures are silently swallowed so that analytics
never breaks the page.
