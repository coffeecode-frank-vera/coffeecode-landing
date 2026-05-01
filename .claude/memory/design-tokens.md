---
name: Design token reference
description: Quick lookup for all CSS custom properties in the Coffee Code design system
type: project
---

# Design Token Reference

All tokens defined in `src/styles/tokens.css`. Values are final — match pixel-perfect.

## Typography

| Token | Value |
|---|---|
| `--font-sans` | `'IBM Plex Sans', system-ui, sans-serif` |
| `--font-mono` | `'IBM Plex Mono', ui-monospace, monospace` |

### Type scale classes

| Class | Spec |
|---|---|
| `.t-display` | 600 64px/1.05, -0.025em |
| `.t-h1` | 600 44px/1.15, -0.02em |
| `.t-h2` | 600 30px/1.25, -0.015em |
| `.t-h3` | 500 20px/1.4, -0.005em |
| `.t-body-lg` | 400 18px/1.6 |
| `.t-body` | 400 15px/1.6 |
| `.t-caption` | 400 13px/1.5, tertiary |
| `.t-mono` | 400 13px/1.6 mono, -0.01em |
| `.t-mono-sm` | 400 11px/1.5 mono, uppercase |

## Color — Light (arriesgado)

| Token | Value |
|---|---|
| `--bg-base` | `#F2EEE5` |
| `--bg-surface` | `#FAF7F0` |
| `--bg-elevated` | `#FFFFFF` |
| `--text-primary` | `#1A1410` |
| `--text-secondary` | `#5C5448` |
| `--text-tertiary` | `#8E867A` |
| `--border-subtle` | `#E8E0D4` |
| `--border-default` | `#DDD3C2` |
| `--border-strong` | `#C5B9A4` |
| `--coffee` | `#B85015` |
| `--code` | `#15803D` |

## Color — Dark (arriesgado)

| Token | Value |
|---|---|
| `--bg-base` | `#0E0D0C` |
| `--bg-surface` | `#1A1716` |
| `--bg-elevated` | `#25201E` |
| `--text-primary` | `#F4EEE0` |
| `--text-secondary` | `#B8AC9E` |
| `--text-tertiary` | `#6B6359` |
| `--coffee` | `#ED8632` |
| `--code` | `#3FBA70` |

## Spacing (4px base)

`--space-1: 4px` `--space-2: 8px` `--space-3: 12px` `--space-4: 16px` `--space-5: 20px` `--space-6: 24px` `--space-8: 32px` `--space-10: 40px` `--space-12: 48px` `--space-16: 64px` `--space-20: 80px` `--space-24: 96px` `--space-32: 128px`

## Radius

`--radius-sm: 4px` `--radius-md: 6px` `--radius-lg: 10px` `--radius-xl: 16px` `--radius-2xl: 24px` `--radius-full: 9999px`

## Motion

| Token | Value |
|---|---|
| `--dur-fast` | `120ms` |
| `--dur-base` | `200ms` |
| `--dur-slow` | `360ms` |
| `--ease-out` | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

## Button classes

`.btn` base → `.btn-primary` `.btn-secondary` `.btn-ghost` `.btn-coffee`

## Component classes

`.card` `.badge` `.badge-coffee` `.badge-code` `.input` `.code-block` `.hr-dashed`
