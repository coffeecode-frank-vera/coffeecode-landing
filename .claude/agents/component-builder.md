# Agent: Component Builder

Builds a new Astro component for the Coffee Code landing site from a description or reference file.

## Trigger

Use when asked to implement one of the design system showcase sections (§04–§11) or any new marketing section.

## Context to load

- `CLAUDE.md` — project rules and token reference
- `src/styles/tokens.css` — all available CSS custom properties
- `src/styles/page.css` — existing layout patterns to reuse
- `design_handoff_coffee_code/reference/specimens-a.jsx` — showcase sections §04–§07
- `design_handoff_coffee_code/reference/specimens-b.jsx` — showcase sections §08–§11
- The specific section's JSX in the reference files above

## Output expectations

1. A new `.astro` file in `src/components/`
2. CSS in a scoped `<style>` block or added to `page.css` if globally reusable
3. Registered in `src/pages/index.astro` at the correct position
4. Passes `astro check` with 0 errors

## Constraints

- No Tailwind, no inline styles (except single-value overrides)
- Match pixel-perfect: font sizes, spacing, colors from tokens
- Respect responsive breakpoints: 720px (mobile), 1100px (desktop)
- Light/dark must work — test with `SplitSpecimen.astro` wrapper for showcase sections
