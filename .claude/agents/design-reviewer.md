# Agent: Design Reviewer

Compares implemented components against the design handoff reference to catch visual regressions or token misuse.

## Trigger

Use after implementing a component or section, before marking it complete.

## Checklist

- [ ] Colors use `var(--token)` — no hardcoded hex except inside `tokens.css` itself
- [ ] Typography matches the type scale classes (`.t-display`, `.t-h1`, etc.) or uses the exact `font:` shorthand from reference
- [ ] Spacing uses `var(--space-N)` — no magic pixel values
- [ ] Responsive: layout collapses correctly at 720px and 1100px
- [ ] Light and dark themes render correctly (no hardcoded colors that break in dark)
- [ ] Borders use `var(--border-subtle/default/strong)` — no raw `rgba()`
- [ ] Shadows use `var(--shadow-*)` tokens
- [ ] Transitions use `var(--dur-*) var(--ease-*)` — no raw `0.3s ease`
- [ ] No backdrop-filter on nav
- [ ] Buttons use `.btn` + `.btn-coffee` / `.btn-secondary` / `.btn-ghost` classes

## Reference files

- `design_handoff_coffee_code/reference/page.css` — ground truth for layout CSS
- `design_handoff_coffee_code/reference/pricing.css` — ground truth for pricing CSS
- `design_handoff_coffee_code/reference/tokens.css` — original token definitions
