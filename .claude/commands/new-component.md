# /new-component — Scaffold a new Astro component

Creates a new `.astro` component in `src/components/` following project conventions (Astro 6, strict TypeScript, tokens-only CSS).

## Argument

Provide the component name and brief description of its purpose.
Example: `/new-component ServiceCard — card for a single service in the Ribbon`

## Rules

- Props interface is always explicit and typed — no `any`, no loose `string` where a union is better
- Import shared stylesheets in the frontmatter fence: `import '@styles/page.css'`
- Scoped `<style>` block for component-specific styles — no inline `style=` attributes except for single dynamic CSS custom property overrides
- Never hardcode values that have design tokens — always `var(--token-name)`
- Use `class:list` for conditional/dynamic classes — never string concatenation
- Named slots for structural positions; default `<slot />` for content
- Client-side JS goes in a `<script>` block — no framework, vanilla JS only
- Breakpoints: mobile base, `min-width: 720px` tablet, `min-width: 1100px` desktop
- Every interactive element needs an accessible label; decorative SVGs get `aria-hidden="true"`

## Canonical template

```astro
---
import '@styles/page.css';
// import other components or assets here

interface Props {
  title: string;
  subtitle?: string;
  variant?: 'default' | 'featured';
}

const { title, subtitle, variant = 'default' } = Astro.props;
---

<div class:list={['component-name', `component-name--${variant}`]}>
  <slot name="header" />
  <p class="component-name__title">{title}</p>
  {subtitle && <p class="component-name__subtitle">{subtitle}</p>}
  <slot />
</div>

<style>
  .component-name {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: var(--space-6);
  }

  .component-name--featured {
    border-color: var(--coffee);
  }

  .component-name__title {
    font-family: var(--font-sans);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--text-primary);
  }

  .component-name__subtitle {
    color: var(--text-secondary);
    margin-top: var(--space-2);
  }

  @media (min-width: 1100px) {
    .component-name {
      padding: var(--space-8);
    }
  }
</style>
```

## Checklist before done

- [ ] `astro check` passes with 0 errors
- [ ] Works in both `data-theme="light"` and `data-theme="dark"`
- [ ] Mobile layout not broken (test at 375px width)
- [ ] No hardcoded colors, sizes, or font stacks
- [ ] Imported and positioned correctly in `src/pages/index.astro`
