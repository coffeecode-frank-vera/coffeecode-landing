# /build — Build static site

Type-checks then builds the static output to `dist/`.

```bash
nvm use 24 && node_modules/.bin/astro check && npm run build
```

Output goes to `dist/`. The site is fully static (`output: 'static'`), deployable to Cloudflare Pages, Vercel, Netlify, or any static host.

> Always run type check before building — a passing build with type errors is a broken build.
