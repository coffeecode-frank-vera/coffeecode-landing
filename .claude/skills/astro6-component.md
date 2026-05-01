# Skill: Build an Astro 6 component for Coffee Code

Comprehensive guide for implementing any new section or component in this project. Follow every step — don't skip the checklist.

## Before writing code

1. Read `src/styles/tokens.css` — verify the tokens you plan to use exist
2. Read `src/styles/page.css` — check for reusable layout patterns before writing new CSS
3. Read `CLAUDE.md` §Brand positioning — every copy string must match brand voice
4. If this is a design system showcase section (§04–§11), use the `implement-specimen-section` skill instead

## Component structure

### Frontmatter (build-time Node.js context)

```astro
---
// Style imports first — injected into the page's CSS bundle
import '@styles/page.css';

// Astro/content imports
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import OtherComponent from '@components/OtherComponent.astro';

// Props — always typed, never any
interface Props {
  title: string;
  entries: CollectionEntry<'pricing'>[];
  highlighted?: boolean;
}

const { title, entries, highlighted = false } = Astro.props;

// Data fetching, transforms — all at build time
const sorted = entries.sort((a, b) => a.data.order - b.data.order);
---
```

### Template patterns

**Conditional classes:**
```astro
<div class:list={['card', { 'card--highlighted': highlighted }, featured && 'card--featured']}>
```

**Loops:**
```astro
{sorted.map((entry) => (
  <article class="tier">
    <h3 class="tier__title">{entry.data.title}</h3>
  </article>
))}
```

**Named slots (container components):**
```astro
<!-- Definition -->
<section class="section-wrapper">
  <slot name="head" />
  <div class="section-wrapper__body">
    <slot />
  </div>
</section>

<!-- Usage -->
<SectionWrapper>
  <SectionHead slot="head" num="§01" title="Services" />
  <p>Content here</p>
</SectionWrapper>
```

**Pass frontmatter data to client JS:**
```astro
---
const navItems = ['Services', 'Pricing', 'Philosophy'];
---
<script define:vars={{ navItems }}>
  // navItems available here as a JS array
</script>
```

### CSS rules

```css
/* ✓ Always tokens */
.element { color: var(--text-primary); padding: var(--space-4); }

/* ✓ Responsive — mobile-first */
.grid { display: grid; grid-template-columns: 1fr; gap: var(--space-6); }
@media (min-width: 720px)  { .grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .grid { grid-template-columns: repeat(4, 1fr); } }

/* ✓ Theme-aware via CSS variables — no extra selectors needed */
/* tokens.css already maps --bg-surface etc. to light/dark via [data-theme] */

/* ✗ Never */
.element { color: #333; padding: 16px; font-family: 'IBM Plex Sans'; }
```

### Client-side behavior (vanilla JS, no framework)

```astro
<nav class="nav" id="site-nav">...</nav>

<script>
  // IntersectionObserver for scroll-based nav highlighting
  const nav = document.getElementById('site-nav')!;
  const sections = document.querySelectorAll('[data-section]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nav.dataset.active = entry.target.id;
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
</script>
```

### Accessibility requirements (non-negotiable)

```astro
<!-- Icon-only buttons -->
<button aria-label="Toggle dark mode">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- Meaningful SVGs -->
<svg role="img" aria-label="Coffee Code wordmark" viewBox="...">...</svg>

<!-- Section landmarks -->
<section aria-labelledby="section-pricing-title">
  <h2 id="section-pricing-title">Pricing</h2>
</section>

<!-- Links: descriptive, never "click here" -->
<a href="/scope">Ver scope completo</a>
```

## After writing the component

### Register in index.astro

Open `src/pages/index.astro` and import + place the component at the correct `§` position:

```astro
---
import NewSection from '@components/NewSection.astro';
---
<!-- at the correct scroll position -->
<NewSection />
```

### Run type check

```bash
~/.nvm/versions/node/v22.13.1/bin/node node_modules/.bin/astro check
```

Target: **0 errors, 0 warnings.** Hints are acceptable.

### Visual QA checklist

- [ ] Light mode (`data-theme="light"`) — no white-on-white, no invisible elements
- [ ] Dark mode (`data-theme="dark"`) — no black-on-black, correct contrast
- [ ] Mobile 375px — no horizontal scroll, legible text, tap targets ≥ 44px
- [ ] Tablet 768px — layout transitions sensibly
- [ ] Desktop 1280px — no orphaned text, grid fills correctly
- [ ] Keyboard navigation — focus visible on all interactive elements
- [ ] No JS disabled regression — content readable without scripts

## Token quick reference

| Want | Token |
|---|---|
| Page background | `var(--bg-base)` |
| Card background | `var(--bg-surface)` |
| Panel above card | `var(--bg-elevated)` |
| Primary accent (burnt orange) | `var(--coffee)` |
| Active/success accent (pine) | `var(--code)` |
| Main body text | `var(--text-primary)` |
| Supporting text | `var(--text-secondary)` |
| Metadata / placeholders | `var(--text-tertiary)` |
| Faint divider | `var(--border-subtle)` |
| Standard border | `var(--border-default)` |
| Emphasis border | `var(--border-strong)` |
| 4px unit | `var(--space-1)` |
| 8px | `var(--space-2)` |
| 16px | `var(--space-4)` |
| 24px | `var(--space-6)` |
| 32px | `var(--space-8)` |
| 48px | `var(--space-12)` |
| 64px | `var(--space-16)` |
| Fast animation | `var(--dur-fast)` |
| Standard animation | `var(--dur-base)` |
| Default easing | `var(--ease-out)` |
| Spring easing | `var(--ease-spring)` |
