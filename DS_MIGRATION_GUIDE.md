# Maple Design System Migration Guide

## Overview

This guide helps AI agents migrate from the old token system to the new 3-tier architecture. The new system uses consistent naming conventions and eliminates circular references.

---

## Step 1: Replace `global.css`

Replace the entire contents of your `global.css` (or `globals.css`) with the new `global-final.css` file.

---

## Step 2: Token Migration Reference

### Background Colors

| Old Token                   | New Token                | Tailwind Class      |
| --------------------------- | ------------------------ | ------------------- |
| `--color-bg-canvas`         | `--color-canvas`         | `bg-canvas`         |
| `--color-bg-surface`        | `--color-surface`        | `bg-surface`        |
| `--color-bg-surface-raised` | `--color-surface-raised` | `bg-surface-raised` |
| `--color-bg-primary`        | `--color-primary`        | `bg-primary`        |
| `--color-bg-secondary`      | `--color-secondary`      | `bg-secondary`      |
| `--color-bg-subtle`         | `--color-subtle`         | `bg-subtle`         |
| `--color-bg-muted`          | `--color-muted`          | `bg-muted`          |
| `--color-bg-strong`         | `--color-strong`         | `bg-strong`         |
| `--color-bg-inverse`        | `--color-inverse`        | `bg-inverse`        |

### Foreground/Text Colors

| Old Token              | New Token              | Tailwind Class      |
| ---------------------- | ---------------------- | ------------------- |
| `--color-fg-primary`   | `--color-primary-fg`   | `text-primary-fg`   |
| `--color-fg-secondary` | `--color-secondary-fg` | `text-secondary-fg` |
| `--color-fg-tertiary`  | `--color-tertiary-fg`  | `text-tertiary-fg`  |
| `--color-fg-muted`     | `--color-muted-fg`     | `text-muted-fg`     |
| `--color-fg-subtle`    | `--color-subtle-fg`    | `text-subtle-fg`    |
| `--color-fg-inverse`   | `--color-inverse-fg`   | `text-inverse-fg`   |
| `--color-fg-on-brand`  | `--color-on-brand-fg`  | `text-on-brand-fg`  |
| `--color-fg-on-accent` | `--color-on-accent-fg` | `text-on-accent-fg` |

### Border Colors

| Old Token                | New Token                | Tailwind Class          |
| ------------------------ | ------------------------ | ----------------------- |
| `--color-border-weak`    | `--color-border-weak`    | `border-border-weak`    |
| `--color-border-subtle`  | `--color-border-subtle`  | `border-border-subtle`  |
| `--color-border-strong`  | `--color-border-strong`  | `border-border-strong`  |
| `--color-border-inverse` | `--color-border-inverse` | `border-border-inverse` |

### Brand Colors

| Old Token                | New Token                | Tailwind Class                           |
| ------------------------ | ------------------------ | ---------------------------------------- |
| `--color-brand-primary`  | `--color-brand`          | `bg-brand`, `text-brand`, `border-brand` |
| `--color-brand-strong`   | `--color-brand-strong`   | `bg-brand-strong`                        |
| `--color-brand-emphasis` | `--color-brand-emphasis` | `bg-brand-emphasis`                      |
| `--color-brand-muted`    | `--color-brand-muted`    | `bg-brand-muted`                         |
| `--color-brand-subtle`   | `--color-brand-subtle`   | `bg-brand-subtle`                        |
| `--color-brand-weak`     | `--color-brand-weak`     | `bg-brand-weak`                          |
| `--color-brand-on-weak`  | `--color-brand-on-weak`  | `text-brand-on-weak`                     |

### Status Colors (Positive, Negative, Warning, Info)

Pattern for all status colors:

| Old Pattern                 | New Pattern                 | Usage                          |
| --------------------------- | --------------------------- | ------------------------------ |
| `--color-{status}-primary`  | `--color-{status}`          | `bg-positive`, `text-negative` |
| `--color-{status}-strong`   | `--color-{status}-strong`   | `bg-positive-strong`           |
| `--color-{status}-emphasis` | `--color-{status}-emphasis` | `bg-positive-emphasis`         |
| `--color-{status}-muted`    | `--color-{status}-muted`    | `bg-positive-muted`            |
| `--color-{status}-subtle`   | `--color-{status}-subtle`   | `bg-positive-subtle`           |
| `--color-{status}-weak`     | `--color-{status}-weak`     | `bg-positive-weak`             |
| `--color-{status}-on-weak`  | `--color-{status}-on-weak`  | `text-positive-on-weak`        |

Where `{status}` = `positive`, `negative`, `warning`, `info`

### Support Colors (Pink, Fuchsia, Violet, Teal, Lime)

| Old Pattern                        | New Pattern                | Usage                    |
| ---------------------------------- | -------------------------- | ------------------------ |
| `--color-support-{color}-primary`  | `--color-{color}`          | `bg-pink`, `text-violet` |
| `--color-support-{color}-strong`   | `--color-{color}-strong`   | `bg-pink-strong`         |
| `--color-support-{color}-emphasis` | `--color-{color}-emphasis` | `bg-pink-emphasis`       |
| `--color-support-{color}-muted`    | `--color-{color}-muted`    | `bg-pink-muted`          |
| `--color-support-{color}-subtle`   | `--color-{color}-subtle`   | `bg-pink-subtle`         |
| `--color-support-{color}-weak`     | `--color-{color}-weak`     | `bg-pink-weak`           |
| `--color-support-{color}-on-weak`  | `--color-{color}-on-weak`  | `text-pink-on-weak`      |

Where `{color}` = `pink`, `fuchsia`, `violet`, `teal`, `lime`

### Partner Colors

| Old Pattern                        | New Pattern                       | Usage                       |
| ---------------------------------- | --------------------------------- | --------------------------- |
| `--color-partners-{name}-primary`  | `--color-partner-{name}`          | `bg-partner-aave`           |
| `--color-partners-{name}-strong`   | `--color-partner-{name}-strong`   | `bg-partner-aave-strong`    |
| `--color-partners-{name}-emphasis` | `--color-partner-{name}-emphasis` | `bg-partner-aave-emphasis`  |
| `--color-partners-{name}-muted`    | `--color-partner-{name}-muted`    | `bg-partner-aave-muted`     |
| `--color-partners-{name}-subtle`   | `--color-partner-{name}-subtle`   | `bg-partner-aave-subtle`    |
| `--color-partners-{name}-weak`     | `--color-partner-{name}-weak`     | `bg-partner-aave-weak`      |
| `--color-partners-{name}-on-weak`  | `--color-partner-{name}-on-weak`  | `text-partner-aave-on-weak` |

Where `{name}` = `aave`, `cowswap`, `fluid`

### Spacing

| Old Token        | New Token        | Tailwind Class                 |
| ---------------- | ---------------- | ------------------------------ |
| `--spacing-0`    | `--spacing-0`    | `p-0`, `m-0`, `gap-0`          |
| `--spacing-50`   | `--spacing-50`   | `p-50`, `m-50`, `gap-50`       |
| `--spacing-100`  | `--spacing-100`  | `p-100`, `m-100`, `gap-100`    |
| ...              | ...              | ...                            |
| `--spacing-1200` | `--spacing-1200` | `p-1200`, `m-1200`, `gap-1200` |

Full scale: `0, 6, 12, 25, 37, 50, 67, 75, 87, 100, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1100, 1200`

### Component/Control Sizes

| Old Token       | New Token               | Tailwind Class         |
| --------------- | ----------------------- | ---------------------- |
| `--size-ui-3xs` | `--spacing-control-3xs` | `h-control-3xs` (16px) |
| `--size-ui-2xs` | `--spacing-control-2xs` | `h-control-2xs` (20px) |
| `--size-ui-xs`  | `--spacing-control-xs`  | `h-control-xs` (24px)  |
| `--size-ui-sm`  | `--spacing-control-sm`  | `h-control-sm` (32px)  |
| `--size-ui-md`  | `--spacing-control-md`  | `h-control-md` (36px)  |
| `--size-ui-lg`  | `--spacing-control-lg`  | `h-control-lg` (40px)  |
| `--size-ui-xl`  | `--spacing-control-xl`  | `h-control-xl` (48px)  |
| `--size-ui-2xl` | `--spacing-control-2xl` | `h-control-2xl` (56px) |

Also works with `w-control-*` and `size-control-*`

### Icon Sizes

| Old Token         | New Token            | Tailwind Class         |
| ----------------- | -------------------- | ---------------------- |
| `--size-icon-sm`  | `--spacing-icon-sm`  | `size-icon-sm` (12px)  |
| `--size-icon-md`  | `--spacing-icon-md`  | `size-icon-md` (14px)  |
| `--size-icon-lg`  | `--spacing-icon-lg`  | `size-icon-lg` (16px)  |
| `--size-icon-xl`  | `--spacing-icon-xl`  | `size-icon-xl` (18px)  |
| `--size-icon-2xl` | `--spacing-icon-2xl` | `size-icon-2xl` (20px) |
| `--size-icon-3xl` | `--spacing-icon-3xl` | `size-icon-3xl` (24px) |

### Border Radius

| Old Token       | New Token       | Tailwind Class          |
| --------------- | --------------- | ----------------------- |
| `--radius-none` | `--radius-none` | `rounded-none`          |
| `--radius-xs`   | `--radius-xs`   | `rounded-xs` (4px)      |
| `--radius-sm`   | `--radius-sm`   | `rounded-sm` (6px)      |
| `--radius-md`   | `--radius-md`   | `rounded-md` (8px)      |
| `--radius-lg`   | `--radius-lg`   | `rounded-lg` (10px)     |
| `--radius-xl`   | `--radius-xl`   | `rounded-xl` (12px)     |
| `--radius-2xl`  | `--radius-2xl`  | `rounded-2xl` (16px)    |
| `--radius-3xl`  | `--radius-3xl`  | `rounded-3xl` (20px)    |
| `--radius-4xl`  | `--radius-4xl`  | `rounded-4xl` (24px)    |
| `--radius-5xl`  | `--radius-5xl`  | `rounded-5xl` (32px)    |
| `--radius-pill` | `--radius-pill` | `rounded-pill` (1000px) |

### Shadows

| Old Token      | New Token      | Tailwind Class |
| -------------- | -------------- | -------------- |
| `--shadow-100` | `--shadow-100` | `shadow-100`   |
| `--shadow-200` | `--shadow-200` | `shadow-200`   |
| `--shadow-300` | `--shadow-300` | `shadow-300`   |
| `--shadow-400` | `--shadow-400` | `shadow-400`   |
| `--shadow-500` | `--shadow-500` | `shadow-500`   |

### Typography

#### Option A: Component Classes (Recommended for consistency)

| Type       | Class              | Includes                                         |
| ---------- | ------------------ | ------------------------------------------------ |
| Heading H1 | `.text-heading-h1` | 56px, semibold, 64px line-height, tight tracking |
| Heading H2 | `.text-heading-h2` | 48px, semibold, 56px line-height, tight tracking |
| Heading H3 | `.text-heading-h3` | 40px, semibold, 48px line-height, tight tracking |
| Heading H4 | `.text-heading-h4` | 32px, semibold, 40px line-height, tight tracking |
| Heading H5 | `.text-heading-h5` | 24px, semibold, 32px line-height, tight tracking |
| Heading H6 | `.text-heading-h6` | 20px, semibold, 24px line-height, tight tracking |
| Heading H7 | `.text-heading-h7` | 16px, semibold, 20px line-height, tight tracking |
| Body XL    | `.text-body-xl`    | 24px, regular, 32px line-height, wide tracking   |
| Body LG    | `.text-body-lg`    | 18px, regular, 24px line-height, wide tracking   |
| Body MD    | `.text-body-md`    | 16px, regular, 24px line-height, wide tracking   |
| Body Base  | `.text-body-base`  | 15px, regular, 20px line-height, wide tracking   |
| Body SM    | `.text-body-sm`    | 14px, regular, 20px line-height, wide tracking   |
| Body XS    | `.text-body-xs`    | 12px, regular, 16px line-height, wide tracking   |
| Label 4XL  | `.text-label-4xl`  | 38px, medium, 48px line-height, normal tracking  |
| Label 3XL  | `.text-label-3xl`  | 32px, medium, 40px line-height, normal tracking  |
| Label 2XL  | `.text-label-2xl`  | 24px, medium, 32px line-height, normal tracking  |
| Label XL   | `.text-label-xl`   | 20px, medium, 28px line-height, normal tracking  |
| Label LG   | `.text-label-lg`   | 18px, medium, 24px line-height, normal tracking  |
| Label MD   | `.text-label-md`   | 16px, medium, 24px line-height, normal tracking  |
| Label SM   | `.text-label-sm`   | 14px, medium, 20px line-height, normal tracking  |
| Label XS   | `.text-label-xs`   | 12px, medium, 16px line-height, normal tracking  |
| Label 2XS  | `.text-label-2xs`  | 10px, medium, 13px line-height, normal tracking  |

#### Option B: Utility Classes (For custom combinations)

| Property       | Classes                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Font Size      | `text-h1` to `text-h7`, `text-body-xl` to `text-body-xs`, `text-label-4xl` to `text-label-2xs`                   |
| Line Height    | `leading-h1` to `leading-h7`, `leading-body-xl` to `leading-body-xs`, `leading-label-4xl` to `leading-label-2xs` |
| Letter Spacing | `tracking-tight`, `tracking-normal`, `tracking-wide`                                                             |
| Font Weight    | `font-regular` (400), `font-medium` (500), `font-semibold` (600)                                                 |

---

## Step 3: Search & Replace Patterns

Run these replacements across your codebase:

### 3.1 Background Classes

```
FIND: bg-bg-canvas → REPLACE: bg-canvas
FIND: bg-bg-surface → REPLACE: bg-surface
FIND: bg-bg-primary → REPLACE: bg-primary
FIND: bg-bg-secondary → REPLACE: bg-secondary
FIND: bg-bg-subtle → REPLACE: bg-subtle
FIND: bg-bg-muted → REPLACE: bg-muted
FIND: bg-bg-strong → REPLACE: bg-strong
FIND: bg-bg-inverse → REPLACE: bg-inverse
```

### 3.2 Text/Foreground Classes

```
FIND: text-fg-primary → REPLACE: text-primary-fg
FIND: text-fg-secondary → REPLACE: text-secondary-fg
FIND: text-fg-tertiary → REPLACE: text-tertiary-fg
FIND: text-fg-muted → REPLACE: text-muted-fg
FIND: text-fg-subtle → REPLACE: text-subtle-fg
FIND: text-fg-inverse → REPLACE: text-inverse-fg
FIND: text-fg-on-brand → REPLACE: text-on-brand-fg
FIND: text-fg-on-accent → REPLACE: text-on-accent-fg
```

### 3.3 Brand Classes

```
FIND: bg-brand-primary → REPLACE: bg-brand
FIND: text-brand-primary → REPLACE: text-brand
FIND: border-brand-primary → REPLACE: border-brand
```

### 3.4 Status Classes

```
FIND: bg-positive-primary → REPLACE: bg-positive
FIND: text-positive-primary → REPLACE: text-positive
FIND: bg-negative-primary → REPLACE: bg-negative
FIND: text-negative-primary → REPLACE: text-negative
FIND: bg-warning-primary → REPLACE: bg-warning
FIND: text-warning-primary → REPLACE: text-warning
FIND: bg-info-primary → REPLACE: bg-info
FIND: text-info-primary → REPLACE: text-info
```

### 3.5 Support Color Classes

```
FIND: bg-support-pink-primary → REPLACE: bg-pink
FIND: text-support-pink-primary → REPLACE: text-pink
FIND: bg-support-pink-weak → REPLACE: bg-pink-weak
FIND: text-support-pink-on-weak → REPLACE: text-pink-on-weak
(repeat for fuchsia, violet, teal, lime)
```

### 3.6 Partner Classes

```
FIND: bg-partners-aave-primary → REPLACE: bg-partner-aave
FIND: text-partners-aave-primary → REPLACE: text-partner-aave
FIND: bg-partners-aave-weak → REPLACE: bg-partner-aave-weak
FIND: text-partners-aave-on-weak → REPLACE: text-partner-aave-on-weak
(repeat for cowswap, fluid)
```

### 3.7 Size/Height Classes

```
FIND: h-ui-3xs → REPLACE: h-control-3xs
FIND: h-ui-2xs → REPLACE: h-control-2xs
FIND: h-ui-xs → REPLACE: h-control-xs
FIND: h-ui-sm → REPLACE: h-control-sm
FIND: h-ui-md → REPLACE: h-control-md
FIND: h-ui-lg → REPLACE: h-control-lg
FIND: h-ui-xl → REPLACE: h-control-xl
FIND: h-ui-2xl → REPLACE: h-control-2xl
(also check for w-ui-* and size-ui-*)
```

### 3.8 CSS Variable References

If components use CSS variables directly:

```
FIND: var(--color-bg-canvas) → REPLACE: var(--sem-bg-canvas)
FIND: var(--color-fg-primary) → REPLACE: var(--sem-fg-primary)
FIND: var(--color-brand-primary) → REPLACE: var(--sem-brand)
(etc.)
```

---

## Step 4: Component Migration Examples

### Before & After: Button

```jsx
// ❌ OLD
<button className="h-ui-md px-4 bg-brand-primary text-fg-on-brand rounded-md">
  Click me
</button>

// ✅ NEW
<button className="h-control-md px-100 bg-brand text-on-brand-fg rounded-md text-label-sm">
  Click me
</button>
```

### Before & After: Card

```jsx
// ❌ OLD
<div className="bg-bg-surface border border-border-subtle rounded-lg p-4 shadow-md">
  <h3 className="text-lg font-semibold text-fg-primary">Title</h3>
  <p className="text-sm text-fg-secondary">Description</p>
</div>

// ✅ NEW
<div className="bg-surface border border-border-subtle rounded-lg p-100 shadow-200">
  <h3 className="text-heading-h6 text-primary-fg">Title</h3>
  <p className="text-body-sm text-secondary-fg">Description</p>
</div>
```

### Before & After: Alert

```jsx
// ❌ OLD
<div className="bg-positive-weak text-positive-primary p-3 rounded-md">
  Success message
</div>

// ✅ NEW
<div className="bg-positive-weak text-positive-on-weak p-75 rounded-md text-body-sm">
  Success message
</div>
```

### Before & After: Badge/Tag

```jsx
// ❌ OLD
<span className="bg-support-violet-weak text-support-violet-primary px-2 py-1 rounded text-xs">
  DeFi
</span>

// ✅ NEW
<span className="bg-violet-weak text-violet-on-weak px-50 py-25 rounded-sm text-label-xs">
  DeFi
</span>
```

### Before & After: Input

```jsx
// ❌ OLD
<input
  className="h-ui-md w-full px-3 bg-bg-surface border border-border-subtle rounded-md text-fg-primary placeholder:text-fg-muted"
/>

// ✅ NEW
<input
  className="h-control-md w-full px-75 bg-surface border border-border-subtle rounded-md text-primary-fg placeholder:text-muted-fg text-body-sm"
/>
```

### Before & After: Partner Integration

```jsx
// ❌ OLD
<div className="bg-partners-aave-weak text-partners-aave-on-weak p-4 rounded-lg">
  <img src="/aave-logo.svg" className="w-6 h-6" />
  <span>Powered by Aave</span>
</div>

// ✅ NEW
<div className="bg-partner-aave-weak text-partner-aave-on-weak p-100 rounded-lg">
  <img src="/aave-logo.svg" className="size-icon-3xl" />
  <span className="text-label-sm">Powered by Aave</span>
</div>
```

---

## Step 5: Verification Checklist

After migration, verify:

- [ ] No references to old `--color-bg-*` tokens remain
- [ ] No references to old `--color-fg-*` tokens remain
- [ ] No references to old `--size-ui-*` tokens remain
- [ ] No references to old `--color-support-*` tokens remain
- [ ] No references to old `--color-partners-*` tokens remain
- [ ] All `bg-bg-*` classes replaced with `bg-*`
- [ ] All `text-fg-*` classes replaced with `text-*-fg`
- [ ] All status color `-primary` suffixes removed where appropriate
- [ ] Typography uses new component classes or utility classes
- [ ] Spacing uses numeric scale (e.g., `p-100` not `p-4`)
- [ ] Component heights use `h-control-*` pattern
- [ ] Icons use `size-icon-*` pattern
- [ ] Dark mode still works correctly

---

## Quick Reference Card

### Backgrounds

`bg-canvas` | `bg-surface` | `bg-primary` | `bg-secondary` | `bg-muted` | `bg-strong` | `bg-inverse`

### Text

`text-primary-fg` | `text-secondary-fg` | `text-tertiary-fg` | `text-muted-fg` | `text-subtle-fg` | `text-inverse-fg` | `text-on-brand-fg`

### Borders

`border-border-weak` | `border-border-subtle` | `border-border-strong`

### Brand

`bg-brand` | `bg-brand-weak` | `text-brand` | `text-brand-on-weak`

### Status (positive, negative, warning, info)

`bg-{status}` | `bg-{status}-weak` | `text-{status}` | `text-{status}-on-weak`

### Support (pink, fuchsia, violet, teal, lime)

`bg-{color}` | `bg-{color}-weak` | `text-{color}` | `text-{color}-on-weak`

### Partners (aave, cowswap, fluid)

`bg-partner-{name}` | `bg-partner-{name}-weak` | `text-partner-{name}` | `text-partner-{name}-on-weak`

### Spacing

`p-50` (8px) | `p-75` (12px) | `p-100` (16px) | `p-150` (24px) | `p-200` (32px) | `p-300` (48px)

### Control Heights

`h-control-sm` (32px) | `h-control-md` (36px) | `h-control-lg` (40px) | `h-control-xl` (48px)

### Icons

`size-icon-sm` (12px) | `size-icon-md` (14px) | `size-icon-lg` (16px) | `size-icon-xl` (18px)

### Typography

`.text-heading-h1` to `.text-heading-h7` | `.text-body-xl` to `.text-body-xs` | `.text-label-4xl` to `.text-label-2xs`

### Radius

`rounded-xs` (4px) | `rounded-sm` (6px) | `rounded-md` (8px) | `rounded-lg` (10px) | `rounded-xl` (12px) | `rounded-pill`

### Shadows

`shadow-100` | `shadow-200` | `shadow-300` | `shadow-400` | `shadow-500`
