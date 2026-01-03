# Maple Component Library Rules

> **Rules for AI agents building styled components using Base UI primitives with Tailwind CSS v4 and Maple design tokens.**

---

## Core Principles

1. **Base UI for behavior** — All interactive components use `@base-ui-components/react` primitives
2. **Tailwind for styling** — Use only Tailwind utility classes with design tokens
3. **Design tokens only** — NEVER use arbitrary values; always use configured theme tokens
4. **Tailwind Variants for variants** — All component variants managed via `tailwind-variants`
5. **No Tailwind Merge** — We don't use `tailwind-merge`; classes pass through as-is

---

## Required Setup

### Imports

```tsx
"use client";

import * as React from "react";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { type VariantProps } from "tailwind-variants";
import { cn, tv } from "@/lib/utils";
```

### Utils Configuration

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { createTV } from "tailwind-variants";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const tv = createTV({
  twMerge: false,
});
```

---

## Component Size Reference

Use these size scales based on component type:

| Component Type                                                                                                                                                                 | Sizes                                      | Default | Height Token                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ------- | ---------------------------------- |
| Button, Input, Select, Autocomplete, Combobox, Field, Tabs, Toggle, Toggle Group, Menubar, Navigation Menu, Number Field, Accordion Item, Collapsible, Meter, Progress, Slider | `xs`, `sm`, `md`, `lg`, `xl`               | `md`    | `h-control-{size}`                 |
| Avatar                                                                                                                                                                         | `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl` | `md`    | `size-control-{size}`              |
| Checkbox, Radio                                                                                                                                                                | `3xs`, `2xs`                               | `3xs`   | `size-control-{size}`              |
| Switch                                                                                                                                                                         | `2xs`, `xs`, `sm`, `md`                    | `sm`    | `h-control-{size}`                 |
| Alert Dialog, Accordion, Context Menu, Dialog, Menu, Popover, Scroll Area, Toast, Tooltip                                                                                      | `auto` (content-based)                     | —       | Use padding + max-width/max-height |

### Control Height Values

| Token           | Value | Use For                  |
| --------------- | ----- | ------------------------ |
| `h-control-3xs` | 16px  | Tiny indicators          |
| `h-control-2xs` | 20px  | Small checkboxes, radios |
| `h-control-xs`  | 24px  | Compact buttons          |
| `h-control-sm`  | 32px  | Small buttons, inputs    |
| `h-control-md`  | 36px  | Default size             |
| `h-control-lg`  | 40px  | Large buttons            |
| `h-control-xl`  | 48px  | Hero buttons             |
| `h-control-2xl` | 56px  | Extra large              |

---

## Variant State Mapping

When creating component variants, follow these state progressions:

### Primary (Brand Inverse)

| Property   | Default           | Hover              | Active/Focus        | Disabled         |
| ---------- | ----------------- | ------------------ | ------------------- | ---------------- |
| Background | `bg-inverse`      | `bg-brand`         | `bg-brand-emphasis` | `bg-muted`       |
| Text       | `text-fg-inverse` | `text-fg-on-brand` | `text-fg-on-brand`  | `text-fg-subtle` |

### Secondary (Surface)

| Property   | Default                | Hover                  | Active/Focus           | Disabled               |
| ---------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| Background | `bg-surface`           | `bg-primary`           | `bg-secondary`         | `bg-primary`           |
| Text       | `text-fg-primary`      | `text-fg-primary`      | `text-fg-primary`      | `text-fg-subtle`       |
| Border     | `border-border-subtle` | `border-border-subtle` | `border-border-strong` | `border-border-subtle` |

### Tertiary (Subtle)

| Property   | Default           | Hover             | Active/Focus      | Disabled         |
| ---------- | ----------------- | ----------------- | ----------------- | ---------------- |
| Background | `bg-primary`      | `bg-secondary`    | `bg-muted`        | `bg-primary`     |
| Text       | `text-fg-primary` | `text-fg-primary` | `text-fg-primary` | `text-fg-subtle` |

### Ghost (Transparent)

| Property   | Default           | Hover             | Active/Focus      | Disabled         |
| ---------- | ----------------- | ----------------- | ----------------- | ---------------- |
| Background | `bg-transparent`  | `bg-primary`      | `bg-secondary`    | `bg-primary`     |
| Text       | `text-fg-primary` | `text-fg-primary` | `text-fg-primary` | `text-fg-subtle` |

### Brand

| Property   | Default            | Hover              | Active/Focus        | Disabled         |
| ---------- | ------------------ | ------------------ | ------------------- | ---------------- |
| Background | `bg-brand`         | `bg-brand-strong`  | `bg-brand-emphasis` | `bg-muted`       |
| Text       | `text-fg-on-brand` | `text-fg-on-brand` | `text-fg-on-brand`  | `text-fg-subtle` |

### Negative (Destructive)

| Property   | Default             | Hover                | Active/Focus           | Disabled         |
| ---------- | ------------------- | -------------------- | ---------------------- | ---------------- |
| Background | `bg-negative`       | `bg-negative-strong` | `bg-negative-emphasis` | `bg-primary`     |
| Text       | `text-fg-on-accent` | `text-fg-on-accent`  | `text-fg-on-accent`    | `text-fg-subtle` |

---

## Component Template

Every component MUST follow this structure:

```tsx
"use client";

import * as React from "react";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { type VariantProps } from "tailwind-variants";
import { cn, tv } from "@/lib/utils";

/**
 * Button variants using Tailwind Variants with Maple design tokens
 */
const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center",
    "rounded-pill font-medium",
    "transition-colors duration-standard ease-default",
    "cursor-pointer",
    "focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)]",
    "disabled:pointer-events-none disabled:opacity-disabled",
  ],
  variants: {
    variant: {
      primary: [
        "bg-inverse text-fg-inverse",
        "hover:bg-brand hover:text-fg-on-brand",
        "active:bg-brand-emphasis",
        "focus-visible:outline-inverse",
      ],
      secondary: [
        "bg-surface text-fg-primary",
        "border border-border-subtle",
        "hover:bg-primary",
        "active:bg-secondary",
      ],
      tertiary: [
        "bg-primary text-fg-primary",
        "hover:bg-secondary",
        "active:bg-muted",
      ],
      ghost: [
        "bg-transparent text-fg-primary",
        "hover:bg-primary",
        "active:bg-secondary",
      ],
      negative: [
        "bg-negative text-fg-on-accent",
        "hover:bg-negative-strong",
        "active:bg-negative-emphasis",
        "focus-visible:outline-negative",
      ],
    },
    size: {
      xs: ["h-control-xs", "px-50", "gap-25", "text-label-xs"],
      sm: ["h-control-sm", "px-75", "gap-25", "text-label-xs"],
      md: ["h-control-md", "px-75", "gap-50", "text-label-sm"],
      lg: ["h-control-lg", "px-100", "gap-50", "text-label-sm"],
      xl: ["h-control-xl", "px-100", "gap-75", "text-label-md"],
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
});

export type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> &
  VariantProps<typeof buttonVariants> & {
    beforeIcon?: React.ReactNode;
    afterIcon?: React.ReactNode;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      children,
      beforeIcon,
      afterIcon,
      ...props
    },
    ref
  ) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {beforeIcon && <span className="shrink-0">{beforeIcon}</span>}
        {children}
        {afterIcon && <span className="shrink-0">{afterIcon}</span>}
      </BaseButton>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
```

---

## Compound Components

For complex Base UI components with multiple parts (Select, Dialog, Menu, etc.), export **both** a simplified wrapper AND individual parts:

### File Structure

```tsx
// components/ui/select.tsx

'use client'

import * as React from 'react'
import { Select as BaseSelect } from '@base-ui-components/react/select'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const selectTriggerVariants = tv({
  base: [...],
  variants: {
    variant: {...},
    size: {...},
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
})

const selectOptionVariants = tv({
  base: [...],
  variants: {
    size: {...},
  },
})

// =============================================================================
// COMPOUND PARTS (for complex/custom usage)
// =============================================================================

const SelectRoot = BaseSelect.Root
const SelectValue = BaseSelect.Value
const SelectPortal = BaseSelect.Portal
const SelectPositioner = BaseSelect.Positioner

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> &
    VariantProps<typeof selectTriggerVariants>
>(({ className, variant, size, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  />
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectPopup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>
>(({ className, ...props }, ref) => (
  <BaseSelect.Popup
    ref={ref}
    className={cn(
      'bg-surface border border-border-subtle rounded-md shadow-300',
      'p-25',
      className
    )}
    {...props}
  />
))
SelectPopup.displayName = 'SelectPopup'

const SelectOption = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Option> &
    VariantProps<typeof selectOptionVariants>
>(({ className, size, ...props }, ref) => (
  <BaseSelect.Option
    ref={ref}
    className={cn(selectOptionVariants({ size }), className)}
    {...props}
  />
))
SelectOption.displayName = 'SelectOption'

// =============================================================================
// SIMPLIFIED WRAPPER (for simple/common usage)
// =============================================================================

export interface SelectProps extends VariantProps<typeof selectTriggerVariants> {
  options: Array<{ value: string; label: string; disabled?: boolean }>
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, placeholder, variant, size, className, ...props }, ref) => {
    return (
      <SelectRoot {...props}>
        <SelectTrigger ref={ref} variant={variant} size={size} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner>
            <SelectPopup>
              {options.map((option) => (
                <SelectOption
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  size={size}
                >
                  {option.label}
                </SelectOption>
              ))}
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </SelectRoot>
    )
  }
)
Select.displayName = 'Select'

// =============================================================================
// EXPORTS
// =============================================================================

export {
  // Simplified wrapper
  Select,

  // Compound parts
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectOption,

  // Variants (for extending)
  selectTriggerVariants,
  selectOptionVariants,
}
```

### Usage

```tsx
// Simple usage
<Select
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  placeholder="Select..."
  size="md"
/>

// Complex/custom usage
<SelectRoot>
  <SelectTrigger size="lg" variant="secondary">
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectPortal>
    <SelectPositioner>
      <SelectPopup>
        <div className="text-fg-muted text-label-xs px-75 py-25">Group Label</div>
        <SelectOption value="a" size="lg">Option A</SelectOption>
        <SelectOption value="b" size="lg">Option B</SelectOption>
      </SelectPopup>
    </SelectPositioner>
  </SelectPortal>
</SelectRoot>
```

---

## Icon Handling

### Icon Size Mapping

Icons should scale with component size:

| Component Size | Icon Token      | Value |
| -------------- | --------------- | ----- |
| `xs`           | `size-icon-sm`  | 12px  |
| `sm`           | `size-icon-md`  | 14px  |
| `md`           | `size-icon-lg`  | 16px  |
| `lg`           | `size-icon-xl`  | 18px  |
| `xl`           | `size-icon-2xl` | 20px  |
| `2xl`          | `size-icon-3xl` | 24px  |

### Implementation

```tsx
const iconSizeMap = {
  xs: "size-icon-sm",
  sm: "size-icon-md",
  md: "size-icon-lg",
  lg: "size-icon-xl",
  xl: "size-icon-2xl",
  "2xl": "size-icon-3xl",
} as const;

// In component
const iconSize = iconSizeMap[size ?? "md"];

{
  beforeIcon && (
    <span className={cn(iconSize, "shrink-0 flex items-center justify-center")}>
      {beforeIcon}
    </span>
  );
}
```

---

## Design Token Reference

### Colors

| Category        | Token                    | Tailwind Class                 |
| --------------- | ------------------------ | ------------------------------ |
| **Backgrounds** |                          |                                |
| Canvas          | `--color-canvas`         | `bg-canvas`                    |
| Surface         | `--color-surface`        | `bg-surface`                   |
| Primary         | `--color-primary`        | `bg-primary`                   |
| Secondary       | `--color-secondary`      | `bg-secondary`                 |
| Muted           | `--color-muted`          | `bg-muted`                     |
| Strong          | `--color-strong`         | `bg-strong`                    |
| Inverse         | `--color-inverse`        | `bg-inverse`                   |
| **Foregrounds** |                          |                                |
| Primary         | `--color-fg-primary`     | `text-fg-primary`              |
| Secondary       | `--color-fg-secondary`   | `text-fg-secondary`            |
| Tertiary        | `--color-fg-tertiary`    | `text-fg-tertiary`             |
| Muted           | `--color-fg-muted`       | `text-fg-muted`                |
| Subtle          | `--color-fg-subtle`      | `text-fg-subtle`               |
| Inverse         | `--color-fg-inverse`     | `text-fg-inverse`              |
| On Brand        | `--color-fg-on-brand`    | `text-fg-on-brand`             |
| On Accent       | `--color-fg-on-accent`   | `text-fg-on-accent`            |
| **Borders**     |                          |                                |
| Weak            | `--color-border-weak`    | `border-border-weak`           |
| Subtle          | `--color-border-subtle`  | `border-border-subtle`         |
| Strong          | `--color-border-strong`  | `border-border-strong`         |
| **Brand**       |                          |                                |
| Primary         | `--color-brand`          | `bg-brand`, `text-brand`       |
| Strong          | `--color-brand-strong`   | `bg-brand-strong`              |
| Emphasis        | `--color-brand-emphasis` | `bg-brand-emphasis`            |
| Weak            | `--color-brand-weak`     | `bg-brand-weak`                |
| **Status**      |                          |                                |
| Positive        | `--color-positive`       | `bg-positive`, `text-positive` |
| Negative        | `--color-negative`       | `bg-negative`, `text-negative` |
| Warning         | `--color-warning`        | `bg-warning`, `text-warning`   |
| Info            | `--color-info`           | `bg-info`, `text-info`         |

### Spacing

| Token               | Value | Use For          |
| ------------------- | ----- | ---------------- |
| `p-25` / `gap-25`   | 4px   | Tight spacing    |
| `p-50` / `gap-50`   | 8px   | Small spacing    |
| `p-75` / `gap-75`   | 12px  | Default gap      |
| `p-100` / `gap-100` | 16px  | Standard spacing |
| `p-150` / `gap-150` | 24px  | Large spacing    |
| `p-200` / `gap-200` | 32px  | Section spacing  |

### Border Radius

| Token          | Value  | Use For               |
| -------------- | ------ | --------------------- |
| `rounded-xs`   | 4px    | Small elements        |
| `rounded-sm`   | 6px    | Inputs, small buttons |
| `rounded-md`   | 8px    | Cards, dropdowns      |
| `rounded-lg`   | 10px   | Modals                |
| `rounded-xl`   | 12px   | Large containers      |
| `rounded-pill` | 1000px | Pills, buttons        |

### Typography

| Class              | Size | Weight   | Use For        |
| ------------------ | ---- | -------- | -------------- |
| `.text-heading-h1` | 56px | Semibold | Page titles    |
| `.text-heading-h2` | 48px | Semibold | Section titles |
| `.text-heading-h3` | 40px | Semibold | Subsections    |
| `.text-heading-h4` | 32px | Semibold | Card titles    |
| `.text-heading-h5` | 24px | Semibold | Widget titles  |
| `.text-heading-h6` | 20px | Semibold | Small headers  |
| `.text-heading-h7` | 16px | Semibold | Mini headers   |
| `.text-body-base`  | 15px | Regular  | Body text      |
| `.text-body-sm`    | 14px | Regular  | Secondary text |
| `.text-body-xs`    | 12px | Regular  | Captions       |
| `.text-label-md`   | 16px | Medium   | Large labels   |
| `.text-label-sm`   | 14px | Medium   | Default labels |
| `.text-label-xs`   | 12px | Medium   | Small labels   |

---

## Required Practices

1. **Always use `cn()` for className composition**
2. **Always use `tv()` from `@/lib/utils`** (not directly from `tailwind-variants`)
3. **Always forward refs with `React.forwardRef`**
4. **Always set `displayName`**
5. **Always export TypeScript types**
6. **Always use Base UI for interactive elements**
7. **Always include disabled styles**
8. **Always use design tokens** — never arbitrary values
9. **One component per file**

---

## Forbidden

| ❌ Never Do                              | ✅ Instead                              |
| ---------------------------------------- | --------------------------------------- |
| `h-[32px]` arbitrary values              | `h-control-sm` token                    |
| `bg-blue-500` Tailwind defaults          | `bg-info` or `bg-brand`                 |
| `text-white` Tailwind defaults           | `text-fg-inverse` or `text-fg-on-brand` |
| `style={{ ... }}` inline styles          | Tailwind classes                        |
| `import { tv } from 'tailwind-variants'` | `import { tv } from '@/lib/utils'`      |
| `import { twMerge }`                     | Don't use tailwind-merge                |
| `<button>` native elements               | `<Button>` from Base UI                 |
| Missing `displayName`                    | Always set after forwardRef             |
| Missing disabled styles                  | Always include `disabled:` states       |

---

## File Structure

```
src/
├── lib/
│   └── utils.ts              # cn() and tv() exports
└── components/
    └── ui/
        ├── button.tsx
        ├── input.tsx
        ├── checkbox.tsx
        ├── radio.tsx
        ├── switch.tsx
        ├── select.tsx
        ├── dialog.tsx
        ├── avatar.tsx
        ├── badge.tsx
        └── index.ts          # barrel export
```

---

## Reference Links

- [Base UI Documentation](https://base-ui.com/react/overview/quick-start)
- [Base UI Styling Guide](https://base-ui.com/react/handbook/styling)
- [Base UI for LLMs](https://base-ui.com/llms.txt)
- [Tailwind Variants Documentation](https://www.tailwind-variants.org/)
