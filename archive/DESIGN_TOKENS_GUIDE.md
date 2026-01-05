# Design System Utility Class Guide (Tailwind v4)

This guide lists the clean utility classes mapped from our design tokens. Use these instead of arbitrary CSS variables.

## 1. Colors

Available for `bg-*`, `text-*`, and `border-*`.

### Brand

| Class Suffix     | CSS Variable             | Usage Example              |
| :--------------- | :----------------------- | :------------------------- |
| `brand-primary`  | `--color-brand-primary`  | `bg-brand-primary`         |
| `brand-strong`   | `--color-brand-strong`   | `hover:bg-brand-strong`    |
| `brand-emphasis` | `--color-brand-emphasis` | `active:bg-brand-emphasis` |

### Core Aliases (Short names)

| Class Suffix      | Target Variable                  | Usage Example                |
| :---------------- | :------------------------------- | :--------------------------- |
| `primary`         | `--bg-color-primary`             | `bg-primary`, `text-primary` |
| `primary-inverse` | `--bg-color-inverse-primary`     | `bg-primary-inverse`         |
| `secondary`       | `--bg-color-secondary`           | `bg-secondary`               |
| `fg-inverse`      | `--color-fg-inverse-primary`     | `text-fg-inverse`            |
| `border-inverse`  | `--border-color-inverse-primary` | `border-border-inverse`      |

### Backgrounds

| Class Suffix   | CSS Variable           | Usage Example     |
| :------------- | :--------------------- | :---------------- |
| `bg-primary`   | `--bg-color-primary`   | `bg-bg-primary`   |
| `bg-secondary` | `--bg-color-secondary` | `bg-bg-secondary` |
| `bg-canvas`    | `--bg-color-canvas`    | `bg-bg-canvas`    |
| `bg-subtle`    | `--bg-color-subtle`    | `bg-bg-subtle`    |
| `bg-muted`     | `--bg-color-muted`     | `bg-bg-muted`     |
| `bg-strong`    | `--bg-color-strong`    | `bg-bg-strong`    |

### Foreground (Text)

| Class Suffix   | CSS Variable           | Usage Example       |
| :------------- | :--------------------- | :------------------ |
| `fg-primary`   | `--color-fg-primary`   | `text-fg-primary`   |
| `fg-secondary` | `--color-fg-secondary` | `text-fg-secondary` |
| `fg-tertiary`  | `--color-fg-tertiary`  | `text-fg-tertiary`  |
| `fg-on-brand`  | `--color-fg-on-brand`  | `text-fg-on-brand`  |
| `fg-on-accent` | `--color-fg-on-accent` | `text-fg-on-accent` |

### Borders

| Class Suffix    | CSS Variable            | Usage Example          |
| :-------------- | :---------------------- | :--------------------- |
| `border-subtle` | `--border-color-subtle` | `border-border-subtle` |
| `border-strong` | `--border-color-strong` | `border-border-strong` |

### Semantic

Available for `positive-*`, `negative-*`, `warning-*`, and `info-*`.

- Example: `bg-positive-primary`, `text-negative-strong`, `border-warning-emphasis`.

---

## 2. Spacing & Sizes

Available for `p-*`, `m-*`, `gap-*`, `w-*`, `h-*`.

### Standard Spacing

Use these for padding, margin, and gaps:
`0`, `6`, `12`, `25`, `37`, `50`, `67`, `75`, `87`, `100`, `125`, `150`, `175`, `200`, `225`, `250`, `300`, `350`, `400`

- Example: `p-100`, `pt-50`, `gap-75`, `space-y-200`.

### Component Sizes

Specifically for fixed heights or widths (like buttons/inputs):
`size-3xs`, `size-2xs`, `size-xs`, `size-sm`, `size-md`, `size-lg`, `size-xl`

- Example: `h-size-sm`, `w-size-xl`.

---

## 3. Border Radius

Available for `rounded-*`.

| Class Suffix | CSS Variable                  |
| :----------- | :---------------------------- |
| `none`       | `--radius-border-radius-none` |
| `xs`         | `--radius-border-radius-xxs`  |
| `sm`         | `--radius-border-radius-xs`   |
| `md`         | `--radius-border-radius-sm`   |
| `lg`         | `--radius-border-radius-md`   |
| `xl`         | `--radius-border-radius-lg`   |
| `pill`       | `--radius-border-radius-pill` |

---

## 4. Typography (Composite Classes)

Since these classes include font-size, line-height, weight, and letter-spacing, **apply them directly as class names**.

### Labels (Fixed)

- `label-fixed-x-small` (12px)
- `label-fixed-small` (14px)
- `label-fixed-medium` (16px)
- `label-fixed-large` (18px)
- `label-fixed-x-large` (20px)

### Body (Fixed)

- `body-fixed-small` (14px)
- `body-fixed-base` (15px)
- `body-fixed-medium` (16px)
- `body-fixed-large` (18px)

### Headings

- `heading-h1` through `heading-h6`

---

## Quick Usage Tips

1.  **Don't use `var()`**: Instead of `bg-[var(--color-brand-primary)]`, use `bg-brand-primary`.
2.  **Combine Typography**: Use `label-fixed-small` instead of `text-label-sm leading-label-sm`.
3.  **IntelliSense**: These names will automatically appear in your IDE's autocomplete if you have the Tailwind extension installed.
