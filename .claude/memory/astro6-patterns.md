---
name: Astro 6 patterns and best practices
description: Authoritative Astro 6 reference for this project — breaking changes, correct APIs, performance, accessibility, and TypeScript patterns
type: project
---

# Astro 6 — Reference for Coffee Code landing

**Installed version**: 6.2.1 | **Node requirement**: ≥ 22 — this project runs on **Node 24** (`nvm use 24`, `.nvmrc` = `24`)

---

## Content collections

Config file is `src/content.config.ts` — NOT `src/content/config.ts` (legacy path is removed).

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';          // loader from astro/loaders
import { z } from 'zod';                        // zod directly, NOT from astro:content

const pricing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pricing' }),
  schema: z.object({
    title: z.string(),
    price: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { pricing };
```

**Reading collections:**
```astro
---
import { getCollection } from 'astro:content';
const tiers = await getCollection('pricing');
// entry.id = file path relative to base (e.g. "essential.md")
// entry.data = typed frontmatter
// entry.body = raw markdown (use render() to get HTML)
const { Content } = await entry.render();
---
```

---

## View Transitions / ClientRouter

`ViewTransitions` is renamed — always use `ClientRouter`:

```astro
---
import { ClientRouter } from 'astro:transitions';
---
<ClientRouter />
```

Named transitions (element matching across pages):
```astro
<img transition:name="hero-image" src={src} />
```

Opt a link out of client-side routing:
```html
<a href="/external" data-astro-reload>...</a>
```

---

## Component anatomy (this project's canonical form)

```astro
---
// 1. Shared style imports first (build-time, not injected at runtime)
import '@styles/page.css';

// 2. Astro utility imports
import { getCollection } from 'astro:content';
import OtherComponent from '@components/OtherComponent.astro';

// 3. Props interface — always explicit, never `any`
interface Props {
  title: string;
  featured?: boolean;         // optional props get ?
  variant?: 'default' | 'compact';  // union literals over loose string
}

// 4. Destructure with defaults inline
const { title, featured = false, variant = 'default' } = Astro.props;
---

<!-- 5. Semantic, accessible markup -->
<article class:list={['card', { 'card--featured': featured }, `card--${variant}`]}>
  <slot name="header" />       <!-- named slot when needed -->
  <slot />                     <!-- default slot -->
</article>

<style>
  /* 6. Scoped styles — use tokens, never hardcoded values */
  .card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: var(--space-6);
    gap: var(--space-4);
  }

  .card--featured {
    border-color: var(--coffee);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 719px) { /* mobile */ }
  @media (min-width: 720px) and (max-width: 1099px) { /* tablet */ }
  @media (min-width: 1100px) { /* desktop */ }
</style>
```

---

## Islands architecture (client-side JS)

**Default**: zero JS shipped. All Astro components render to static HTML.

Use `<script>` blocks for vanilla JS interactions (no framework needed for this site):

```astro
<button class="toggle" id="theme-btn">Toggle</button>

<script>
  // Runs in the browser. Has access to window, document, etc.
  document.getElementById('theme-btn')!.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  });
</script>
```

Pass frontmatter data into a `<script>` with `define:vars`:
```astro
---
const items = ['a', 'b', 'c'];
---
<script define:vars={{ items }}>
  console.log(items); // ['a', 'b', 'c'] available at runtime
</script>
```

Critical inline scripts (theme bootstrap, no bundling):
```astro
<script is:inline>
  // NOT bundled, NOT deferred. Runs synchronously. Use sparingly.
  (() => { document.documentElement.setAttribute('data-theme', 'light'); })();
</script>
```

---

## Image handling

Use Astro's built-in `<Image>` for any raster image — it outputs optimized WebP/AVIF:

```astro
---
import { Image } from 'astro:assets';
import heroImg from '@assets/hero.png';
---
<Image src={heroImg} alt="..." width={1200} height={630} />
```

For SVGs that need theme-aware color — inline them as markup (see `inline-svg-logo` skill):
```astro
<!-- Never use <img> for theme-responsive SVGs -->
<svg role="img" aria-label="Coffee Code" viewBox="0 0 200 40" fill="none">
  <path fill="currentColor" d="..." />
</svg>
```

---

## TypeScript patterns

Strict mode is on (`astro/tsconfigs/strict`). Key rules:

```ts
// ✓ Union literals over loose strings
type Variant = 'default' | 'compact' | 'featured';

// ✓ Infer collection entry types
import type { CollectionEntry } from 'astro:content';
type PricingEntry = CollectionEntry<'pricing'>;

// ✓ Non-null assertion only when you're certain the element exists
const el = document.getElementById('nav')!;

// ✗ Never use `any`
// ✗ Never use `as unknown as X` to bypass type errors — fix the type
```

Path aliases (configured in `tsconfig.json`):
```ts
import Nav from '@components/Nav.astro';
import '@styles/page.css';
import logo from '@assets/cc-wordmark.svg?raw';   // ?raw = inline SVG string
```

---

## CSS architecture rules

**Never touch `tokens.css` arbitrarily** — it is the locked design system.

```css
/* ✓ Use tokens */
.element {
  color: var(--text-primary);
  background: var(--bg-surface);
  padding: var(--space-4) var(--space-6);    /* 16px 24px */
  border-radius: var(--radius-md);
  transition: color var(--dur-fast) var(--ease-out);
}

/* ✗ Never hardcode values that have tokens */
.element { color: #1a1a1a; padding: 16px; }

/* ✓ class:list for conditional classes */
<div class:list={['base', { active: isActive }, condition && 'modifier']}>

/* ✗ Never use style= attribute except for single dynamic values (e.g. CSS custom property override) */
<div style={`--offset: ${offset}px`}>   /* ✓ only when token doesn't cover it */
```

LightningCSS is the transformer (configured in `astro.config.mjs`). Nesting and modern CSS work natively — no PostCSS needed.

---

## Accessibility baseline

Every component must meet these without exception:

```astro
<!-- Interactive elements need accessible labels -->
<button aria-label="Toggle dark mode">
  <svg aria-hidden="true">...</svg>   <!-- decorative SVG: hidden from AT -->
</button>

<!-- Meaningful SVGs need labels -->
<svg role="img" aria-label="Coffee Code wordmark">...</svg>

<!-- Nav landmark -->
<nav aria-label="Main navigation">...</nav>

<!-- Skip link (in Base.astro) -->
<a href="#main-content" class="skip-link">Skip to content</a>

<!-- Headings: one h1 per page, logical hierarchy -->
<!-- h1 → h2 (section titles) → h3 (card titles) — never skip levels -->
```

---

## Performance rules

- `build.inlineStylesheets: 'auto'` — small CSS files are inlined (configured)
- `output: 'static'` — no server, pure CDN-ready HTML
- No unused JS — every `<script>` block must justify its existence
- Fonts: loaded via Google Fonts with `display=swap` + preconnect headers (in Base.astro)
- LightningCSS handles minification and dead-code elimination automatically

---

## Astro config reference (current)

```js
// astro.config.mjs
export default defineConfig({
  output: 'static',
  site: 'https://coffeecode.studio',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
});
```

---

## Breakpoints (project-standard)

```css
/* Mobile-first. Add up. */
/* base styles: mobile (< 720px) */

@media (min-width: 720px) {  /* tablet */
  ...
}

@media (min-width: 1100px) { /* desktop */
  ...
}
```

---

## Common pitfalls

| Wrong | Right |
|---|---|
| `import { z } from 'astro:content'` | `import { z } from 'zod'` |
| `src/content/config.ts` | `src/content.config.ts` |
| `import { ViewTransitions }` | `import { ClientRouter } from 'astro:transitions'` |
| `type: 'content'` in collection | `loader: glob(...)` |
| `className=` in templates | `class=` |
| `style={{ ... }}` | `class:list` + CSS class or `style="..."` string |
| `<img src="logo.svg">` for themed SVG | Inline SVG with `fill="currentColor"` |
| Hardcoded `fill="#333"` in SVG | `fill="currentColor"` or `fill="var(--text-primary)"` |
| Framework component for interaction | `<script>` block with vanilla JS |
