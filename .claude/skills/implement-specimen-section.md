# Skill: Implement a design system specimen section (§04–§11)

Converts a specimen section from the JSX reference into an Astro component wrapped in `SplitSpecimen`.

## Steps

1. Identify the target section number (§04 Brand mark → §11 Motion)
2. Read the relevant JSX from:
   - `design_handoff_coffee_code/reference/specimens-a.jsx` (§04–§07)
   - `design_handoff_coffee_code/reference/specimens-b.jsx` (§08–§11)
3. Read existing CSS patterns from `design_handoff_coffee_code/reference/page.css`
4. Create `src/components/<SectionName>.astro`
5. Wrap the section content in `<SplitSpecimen>` for the dual light/dark preview
6. Port all styles as scoped `<style>` or into `page.css` if reusable
7. Import and add the component to `src/pages/index.astro` at the correct §position
8. Run `astro check` — must pass 0 errors

## JSX → Astro conversion rules

| JSX | Astro |
|---|---|
| `className=` | `class=` |
| `style={{ key: val }}` | `style="key: val"` or use a CSS class |
| `{arr.map(...)}` | `{arr.map(...)}` (same) |
| React state/hooks | Use `<script>` block for client behavior |
| `data-*` attributes | Same in Astro |

## Section list

| § | Component | Reference |
|---|---|---|
| §04 | `BrandMark.astro` | specimens-a.jsx |
| §05 | `ColorPalette.astro` | specimens-a.jsx |
| §06 | `Typography.astro` | specimens-a.jsx |
| §07 | `Components.astro` | specimens-a.jsx |
| §08 | `SpacingRadius.astro` | specimens-b.jsx |
| §09 | `Elevation.astro` | specimens-b.jsx |
| §10 | `Iconography.astro` | specimens-b.jsx |
| §11 | `Motion.astro` | specimens-b.jsx |
