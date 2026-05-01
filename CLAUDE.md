# Coffee Code — Landing Site

## Project overview

Public marketing site for **Coffee Code** (coffeecode.studio) — a software studio run by experienced developers who build end-to-end software, technical consulting, and product brands.

This landing page is the primary sales surface. Its job is to project capability and earn trust — not to explain, not to educate, not to impress with buzzwords. The ideal visitor is a CTO or technical lead who has been burned before and needs someone who genuinely knows what they're doing.

Single-page landing with anchor-scrolled sections. Planned routes as the site grows: `/scope`, `/pricing`, `/philosophy`, `/system`, `/contact`.

## Services offered

Three core lines (the landing must make all three legible):

1. **Landing pages** — fixed price, scoped by complexity. Fast, polished, done right.
2. **Custom applications** — from simple ecommerce to robust enterprise apps. Full stack, end to end.
3. **Consulting** — uplifts, advisory, or fractional expert rental in a specific technology.

Future surface: **products** — libraries, tools, or packaged software built by the studio. The landing should leave room for this without being explicit yet.

## Brand positioning

Coffee Code is not a marketing brand. It is a craft brand. Every copy decision, layout choice, and design token must serve that truth.

### Brand pillars

**Madurez sin nostalgia** — They've been doing this for years, and it shows — but they haven't stayed stuck in 2015. Evolved with the industry without losing what was learned.

**Criterio antes que velocidad** — Not the fastest for the sake of it. Fast because they know: what to build, what not to build, when to use AI and when not to. Speed is a consequence of judgment, not a substitute for it.

**Craft real, no estética de craft** — Not a brand that *looks* artisanal with nice typography and the word "thoughtful". Actually ships software from ground to production. The difference matters.

**AI como herramienta, no como identidad** — Uses AI fluently but is not "an AI company". Serious developers who leverage AI when it adds value. Differentiated from both extremes: those who pretend not to use AI out of pride, and those who sell themselves as "AI-native" because it's all they have.

**Anti-bootcamp, anti-vibecoder** — The ones your client calls when the bootcamp-graduate team broke production and someone needs to understand the full system. No drama, no hand-holding on fundamentals.

**Confianza tranquila** — Doesn't need to shout. Projects "we know what we're doing, we've been doing it for years, no drama." The opposite of Y Combinator pitch-deck energy.

**Cool sin esfuerzo aparente** — Modern but not trendy. If a trend dies tomorrow, the brand survives. Chromatic and typographic decisions built on timeless principles (whiskey, pine, technical monospace) — not on the aesthetic meme of the moment.

### Ideal client

The CTO or technical lead who already got burned by a team that overpromised and underdelivered. Needs someone who understands what they're doing and does it well — without needing to explain the fundamentals. Coffee Code is the antithesis of risk, without being boring.

### What to avoid in copy and UI

- AI-slop phrases ("unleash", "harness the power of", "cutting-edge", "innovative solutions")
- Glassmorphism, gradient backgrounds, backdrop-filter blur
- Overexplaining — if the visitor needs convincing on whether developers write code, they're not the client
- Trendy layout patterns that will look dated in 18 months
- Energy of desperation or overselling — quiet confidence only

## Tech stack

- **Astro 6** (static output) — `npm run dev` requires **Node ≥ 22**; this project runs on **Node 24** (`nvm use 24`)
- **TypeScript** (strict mode)
- **No CSS framework** — design tokens in `src/styles/tokens.css` are the system
- **No Tailwind** — use CSS custom properties + scoped `<style>` blocks
- IBM Plex Sans + IBM Plex Mono via Google Fonts

## Directory structure

```
src/
├── assets/          SVG logos (wordmark, horizontal, vertical — light + dark)
├── components/      Astro components (one per section)
├── content/
│   └── pricing/     Markdown files for pricing tiers (Essential, Studio, Production, Custom)
├── content.config.ts  Astro 6 content collections config (glob loader + zod)
├── layouts/
│   └── Base.astro   HTML shell, Google Fonts, theme bootstrap, ClientRouter
├── pages/
│   └── index.astro  Single landing page
└── styles/
    ├── tokens.css   Design system tokens — DO NOT modify arbitrarily
    ├── global.css   Reset + container utility
    ├── page.css     Page-level layout + component styles
    └── pricing.css  Scope ladder + pricing card styles
```

## Design system rules

- **tokens.css is final** — every color, font size, spacing, radius, shadow is locked
- **Default palette**: `arriesgado` (warm beige) — set via `data-palette="arriesgado"` on `<html>`
- **Theming**: `data-theme="light"` or `data-theme="dark"` on `<html>`; theme toggle persists to `localStorage`
- **No glassmorphism**, no gradient backgrounds, no backdrop-filter blur on nav
- Fonts: `--font-sans` (IBM Plex Sans, 400/500/600) and `--font-mono` (IBM Plex Mono, 400/500/600)

## Key tokens reference

| Token | Purpose |
|---|---|
| `--coffee` | Primary accent (whiskey/burnt orange) |
| `--code` | Success/active accent (pine green) |
| `--bg-base` | Page background |
| `--bg-surface` | Cards, secondary surfaces |
| `--bg-elevated` | Panels above surface |
| `--text-primary/secondary/tertiary` | Text hierarchy |
| `--border-subtle/default/strong` | Border hierarchy |
| `--space-1` … `--space-32` | Spacing scale (4px base) |
| `--radius-sm` … `--radius-full` | Radius scale |
| `--shadow-xs` … `--shadow-xl` | Shadow tiers |
| `--dur-fast/base/slow` | Animation durations |
| `--ease-out/spring/in-out` | Easing curves |

## Components

| Component | Status | Notes |
|---|---|---|
| `Nav.astro` | Stub | Needs inline SVG wordmark; IntersectionObserver nav highlighting wired |
| `Hero.astro` | Stub | 2-col grid: statement left, meta sidebar right |
| `Ribbon.astro` | Done | 4 service cells, data inline |
| `ScopeLadder.astro` | Done | L0–L3 tiers, data inline |
| `Pricing.astro` | Done | Reads from content collection |
| `PriceCard.astro` | Done | Featured = Studio tier |
| `Philosophy.astro` | Done | 4 principles, 2×2 grid |
| `SplitSpecimen.astro` | Done | Light/dark side-by-side showcase wrapper |
| `ThemeToggle.astro` | Done | Swaps `data-theme`, persists to localStorage |
| `Footer.astro` | Stub | 3-col: brand block, links, brands placeholder |
| `SectionHead.astro` | Done | §num + title + lede pattern |

## Remaining work (implementation order)

1. Inline SVG wordmark in `Nav.astro` — strip fixed fills, use `currentColor`
2. Design system showcase: §04 Brand mark → §11 Motion (see `reference/specimens-a.jsx` and `reference/specimens-b.jsx`)
3. Contact section (mailto: or form — pending client decision)
4. Light/dark testing at all breakpoints (mobile 720px, tablet 720–1099px, desktop ≥1100px)
5. Asset optimization (SVG inlining via Astro component)

## Content collections

Pricing tiers live in `src/content/pricing/*.md`. Schema is defined in `src/content.config.ts`. To edit prices or features, edit the markdown frontmatter — no component changes needed.

## Running the project

```bash
nvm use 24        # project runs on Node 24 (LTS); Astro 6 requires Node ≥ 22
npm run dev       # http://localhost:4321
npm run build     # static output → dist/
npm run preview   # preview the build
```

## Brand voice

> madurez sin nostalgia, criterio antes que velocidad, craft real, confianza tranquila

Copy is direct, unhurried, and specific. No AI-slop tropes. No glassmorphism for decoration. Whiskey + pine + monospace. Statements over adjectives. Proof over claims.

## Open questions (pending client)

- Contact form: real form or `mailto:` for now?
- Hosting: Cloudflare Pages, Vercel, or Netlify?
- Pricing CTAs: direct or behind "Request quote" form?
- Sub-brand lockups: when does the first sub-brand ship?
