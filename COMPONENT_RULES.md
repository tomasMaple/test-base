# Component Library Rules

> **You are building styled components using Base UI primitives with Tailwind CSS v4 and Supernova.io design tokens.**

---

## Core Principles

1. **Base UI for behavior** — All interactive components use `@base-ui/react` primitives
2. **Tailwind for styling** — Use only Tailwind classes with design tokens
3. **Design tokens only** — NEVER use arbitrary values; always use configured theme variables
4. **CVA for variants** — All component variants managed via `class-variance-authority`

---

## Required Imports

```tsx
// Base UI - import specific components
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { Select } from "@base-ui/react/select";

// Styling utilities
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
```

---

## Component Template

Every component MUST follow this structure:

```tsx
"use client";

import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center",
    "font-medium rounded-[--radius-border-radius-sm]",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-[--color-brand-primary] text-[--color-fg-on-brand] hover:bg-[--color-brand-strong]",
        secondary:
          "bg-[--bg-color-secondary] text-[--color-fg-primary] hover:bg-[--bg-color-muted]",
        ghost: "bg-transparent hover:bg-[--bg-color-subtle]",
        positive:
          "bg-[--color-positive-primary] text-[--color-fg-on-accent] hover:bg-[--color-positive-strong]",
        negative:
          "bg-[--color-negative-primary] text-[--color-fg-on-accent] hover:bg-[--color-negative-strong]",
      },
      size: {
        xs: "h-[--spacing-size-3-xs] px-[--spacing-space-50] text-[length:--text-label-fixed-x-small]",
        sm: "h-[--spacing-size-xs] px-[--spacing-space-75] text-[length:--text-label-fixed-small]",
        md: "h-[--spacing-size-sm] px-[--spacing-space-100] text-[length:--text-label-fixed-medium]",
        lg: "h-[--spacing-size-lg] px-[--spacing-space-125] text-[length:--text-label-fixed-large]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <BaseButton
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
```

---

## Design Token Reference

### Colors (from `tailwind.colors.css`)

| Category       | Token                      | Use For              |
| -------------- | -------------------------- | -------------------- |
| **Brand**      | `--color-brand-primary`    | Primary actions      |
|                | `--color-brand-strong`     | Hover states         |
|                | `--color-brand-emphasis`   | Active states        |
|                | `--color-brand-weak`       | Subtle backgrounds   |
| **Positive**   | `--color-positive-primary` | Success states       |
| **Negative**   | `--color-negative-primary` | Error states         |
| **Warning**    | `--color-warning-primary`  | Warning states       |
| **Info**       | `--color-info-primary`     | Informational        |
| **Foreground** | `--color-fg-primary`       | Primary text         |
|                | `--color-fg-secondary`     | Secondary text       |
|                | `--color-fg-tertiary`      | Muted text           |
|                | `--color-fg-on-brand`      | Text on brand colors |
| **Background** | `--bg-color-surface`       | Card backgrounds     |
|                | `--bg-color-canvas`        | Page background      |
|                | `--bg-color-subtle`        | Hover backgrounds    |
| **Border**     | `--border-color-subtle`    | Default borders      |
|                | `--border-color-strong`    | Emphasis borders     |

### Spacing (from `tailwind.desktop.css`)

| Token                 | Value | Common Use       |
| --------------------- | ----- | ---------------- |
| `--spacing-space-25`  | 4px   | Tight gaps       |
| `--spacing-space-50`  | 8px   | Small padding    |
| `--spacing-space-75`  | 12px  | Default gap      |
| `--spacing-space-100` | 16px  | Standard padding |
| `--spacing-space-125` | 20px  | Medium padding   |
| `--spacing-space-150` | 24px  | Large padding    |
| `--spacing-space-200` | 32px  | Section spacing  |

### Component Sizes

| Token                 | Value | Use For          |
| --------------------- | ----- | ---------------- |
| `--spacing-size-3-xs` | 16px  | XS components    |
| `--spacing-size-2-xs` | 20px  | 2XS components   |
| `--spacing-size-xs`   | 24px  | Small components |
| `--spacing-size-sm`   | 32px  | Default size     |
| `--spacing-size-md`   | 36px  | Medium size      |
| `--spacing-size-lg`   | 40px  | Large size       |
| `--spacing-size-xl`   | 48px  | XL components    |

### Border Radius

| Token                         | Value  | Use For          |
| ----------------------------- | ------ | ---------------- |
| `--radius-border-radius-xxs`  | 4px    | Small elements   |
| `--radius-border-radius-xs`   | 6px    | Buttons, inputs  |
| `--radius-border-radius-sm`   | 8px    | Cards            |
| `--radius-border-radius-md`   | 10px   | Modals           |
| `--radius-border-radius-lg`   | 12px   | Large containers |
| `--radius-border-radius-pill` | 1000px | Pills, badges    |

### Typography Classes

Use these pre-built classes from `tailwind.desktop.css`:

```tsx
// Headings
className = "heading-h1"; // 56px, semibold
className = "heading-h2"; // 48px
className = "heading-h3"; // 40px
className = "heading-h4"; // 32px
className = "heading-h5"; // 24px
className = "heading-h6"; // 20px

// Labels (for buttons, form labels)
className = "label-fixed-small"; // 14px, medium weight
className = "label-fixed-medium"; // 16px
className = "label-fixed-large"; // 18px

// Body text
className = "body-fixed-small"; // 14px, regular
className = "body-fixed-base"; // 15px
className = "body-fixed-medium"; // 16px
```

---

## Styling States with Data Attributes

Base UI exposes state via `data-*` attributes. Use Tailwind's data modifier:

```tsx
className={cn(
  'bg-[--bg-color-subtle]',
  'data-[checked]:bg-[--color-brand-primary]',
  'data-[disabled]:opacity-50',
  'data-[highlighted]:bg-[--bg-color-muted]',
  'data-[open]:bg-[--bg-color-secondary]',
  'data-[focus-visible]:ring-2 data-[focus-visible]:ring-[--color-brand-primary]',
)}
```

**Common data attributes:**

- `data-checked` / `data-unchecked`
- `data-disabled`
- `data-highlighted`
- `data-open` / `data-closed`
- `data-focus-visible`
- `data-starting-style` / `data-ending-style` (animations)

---

## Required Practices

1. **Always use `cn()` for className merging**
2. **Always forward refs with `React.forwardRef`**
3. **Always set `displayName`**
4. **Always export TypeScript interface**
5. **Always use Base UI for interactive elements**

---

## Forbidden

| ❌ Never Do                     | ✅ Instead                    |
| ------------------------------- | ----------------------------- |
| `h-[32px]` arbitrary values     | `h-[--spacing-size-sm]` token |
| `bg-blue-500` Tailwind defaults | `bg-[--color-info-primary]`   |
| `style={{ ... }}` inline        | Tailwind classes              |
| `` className={`${a} ${b}`} ``   | `cn(a, b)`                    |
| `<button>` native elements      | `<Button>` from Base UI       |
| Missing `displayName`           | Always set after forwardRef   |

---

## File Structure

```
src/components/ui/
├── button.tsx
├── input.tsx
├── checkbox.tsx
├── select.tsx
├── dialog.tsx
└── index.ts          # barrel export
```

---

## Reference

- [Base UI Docs](https://base-ui.com/react/overview/quick-start)
- [Base UI Styling](https://base-ui.com/react/handbook/styling)
- [Base UI for LLMs](https://base-ui.com/llms.txt)
- [CVA Docs](https://cva.style/docs)
