---
name: Coffee Code project context
description: Core project facts, brand voice, client decisions, and open questions for the landing site
type: project
---

# Coffee Code — Project Context

**What it is**: Public marketing site + design system showcase for Coffee Code, a software studio.

**URL target**: coffeecode.studio

**Framework**: Astro 6 (static output). Requires Node ≥ 22 — use `nvm use 22`.

**Brand voice**: "madurez sin nostalgia, criterio antes que velocidad, craft real, confianza tranquila"

**Design philosophy**: Timeless decisions. No glassmorphism. No gradient backgrounds. No backdrop-filter blur. Whiskey + pine + monospace. No AI-slop visual tropes.

**Why:** This is a studio portfolio/marketing site. It must embody the same craft and restraint the studio sells to clients.

## Locked decisions

- Default light palette: `arriesgado` (warm beige)
- Fonts: IBM Plex Sans + IBM Plex Mono (Google Fonts), weights 400/500/600
- No Tailwind — tokens.css is the system
- Static output — no SSR
- Copy is bilingual (Spanish + English mix) — intentional, do not translate

## Open questions (unresolved with client)

- Contact section: real form or `mailto:` for now?
- Hosting provider: Cloudflare Pages, Vercel, or Netlify?
- Pricing CTAs: direct "Empezar proyecto" or behind a "Request quote" flow?
- Sub-brand section in footer: when does the first sub-brand ship?

## Implementation status (as of 2026-04-30)

- Astro 6 scaffold: done
- Design tokens: done (`src/styles/tokens.css`)
- Base layout with theme bootstrap + ClientRouter: done
- Content collection for pricing: done (4 tiers in `src/content/pricing/`)
- Core sections: Nav (stub), Hero (stub), Ribbon (done), ScopeLadder (done), Pricing (done), Philosophy (done), Footer (stub)
- Design system showcase §04–§11: not started — see `design_handoff_coffee_code/reference/specimens-a.jsx` and `specimens-b.jsx`
- Contact section: not started — pending client decision on form vs mailto
