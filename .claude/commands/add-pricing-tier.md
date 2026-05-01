# /add-pricing-tier — Add a new pricing tier

Creates a new markdown file in `src/content/pricing/` with the correct frontmatter schema.

After adding the file, no component changes are needed — `Pricing.astro` reads the collection sorted by `order`.

## Schema

```yaml
---
id: string           # unique identifier, kebab-case (must be unique across all tiers)
order: number        # sort order in the grid (1-based, no gaps)
name: string         # display name shown on the card
sub: string          # subtitle — format: "Type · Payment structure · delivery time"
price: string        # e.g. "USD 5.8k" or "A medida" (for isCustom tiers)
priceNote: string    # short payment structure note, e.g. "Pago único" or "Pago en 2 hitos"
featured: boolean    # true = coffee-accent border + "Más elegido" badge (only one tier)
isCustom: boolean    # true = shows body text instead of price amount
cta: string          # button label, e.g. "Empezar proyecto" or "Agendar discovery"
body: string         # OPTIONAL — only required when isCustom: true
features: string[]   # bullet list of included items
---
```

## Example — standard tier

```yaml
---
id: essential
order: 1
name: Essential
sub: "Landing one-pager · Pago único · entrega 2 semanas"
price: "USD 2.4k"
priceNote: "Pago único"
featured: false
isCustom: false
cta: "Empezar proyecto"
features:
  - "Una página, hasta 6 secciones"
  - "Responsive · light/dark · accesibilidad AA"
  - "Deploy en tu hosting o el nuestro"
---
```

## Example — custom (no fixed price) tier

```yaml
---
id: custom
order: 4
name: Custom
sub: "Web apps · e-commerce · sistemas empresariales · Cotización después de discovery"
price: "A medida"
priceNote: "Cotización después de discovery"
featured: false
isCustom: true
cta: "Agendar discovery"
body: "Todo lo que no es una landing. Empezamos con una sesión de discovery gratuita para entender alcance, restricciones y stack."
features:
  - "Discovery + propuesta sin costo"
  - "Equipo dedicado · no contractors rotativos"
---
```

## Rules

- Only one tier can have `featured: true` at a time — check existing tiers before setting it
- `body` is only read by `PriceCard.astro` when `isCustom: true`; omit it for standard tiers
- `order` values must be contiguous — reorder existing tiers if inserting between them
