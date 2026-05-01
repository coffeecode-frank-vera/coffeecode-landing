# Public Asset Requirements

These files need to be generated from brand assets and placed in this directory:

## og-image.png
- Dimensions: 1200 × 630 px
- Used for Open Graph (Facebook, LinkedIn, Slack) and Twitter/X social previews
- Should show the Coffee Code wordmark + tagline against a dark background using brand tokens
- Background: `#1a1410` (--bg-base dark)
- Accent colors: `#ED8632` (--coffee) and `#3FBA70` (--code)

## apple-touch-icon.png
- Dimensions: 180 × 180 px
- Used when users add the site to their iOS home screen
- Should be the `{ cc }` mark centered on a dark background
- Background: `#1a1410`

Both can be generated from the SVG assets in `src/assets/` using a tool like
Satori, Puppeteer, or Figma export.
