# Skill: Inline SVG logo for theme-aware rendering

Converts a logo `<img>` reference to an inline SVG so it inherits `currentColor` and responds to `data-theme`.

## Problem

`<img src="cc-wordmark-light.svg">` cannot change color based on CSS variables. The Nav and Footer currently use `<img>` tags — these need to become inline SVGs.

## Steps

1. Read the SVG source from `src/assets/cc-wordmark-light.svg` (or the dark variant)
2. Strip any hardcoded `fill="#..."` attributes that should respond to theme
3. Replace those fills with `fill="currentColor"` or `fill="var(--text-primary)"`
4. Embed the SVG markup directly inside the Astro component
5. For the Nav, the light/dark swap happens automatically via CSS variable cascade — no JS needed
6. Set `aria-label` and `role="img"` on the `<svg>` element
7. Control size via CSS (`height: 36px; width: auto;`) not SVG `width`/`height` attributes

## Example pattern

```astro
<a href="/" class="nav-logo" aria-label="Coffee Code">
  <svg class="nav-logo-wordmark" role="img" aria-label="Coffee Code wordmark" viewBox="0 0 200 40" fill="none">
    <!-- SVG paths here with fill="currentColor" -->
  </svg>
</a>
```
