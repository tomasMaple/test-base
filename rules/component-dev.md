# Component Development Rules

> **Rules for AI agents building, fixing, and improving Maple Design System components.**

---

## Core Principles

1. **Base UI for behavior** — All interactive components use `@base-ui-components/react` primitives
2. **Tailwind for styling** — Use only Tailwind utility classes with design tokens
3. **Design tokens only** — NEVER use arbitrary values; always use configured theme tokens
4. **tailwind-variants for variants** — All component variants managed via `tv()`
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

| Component Type                      | Sizes                                      | Default | Height Token            |
| ----------------------------------- | ------------------------------------------ | ------- | ----------------------- |
| Button, Input, Select, Tabs, Toggle | `xs`, `sm`, `md`, `lg`, `xl`               | `md`    | `h-control-{size}`      |
| Avatar                              | `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl` | `md`    | `size-control-{size}`   |
| Checkbox, Radio                     | `3xs`, `2xs`                               | `3xs`   | `size-control-{size}`   |
| Switch                              | `2xs`, `xs`, `sm`, `md`                    | `sm`    | `h-control-{size}`      |
| Dialog, Popover, Tooltip            | `auto` (content-based)                     | —       | Use padding + max-width |

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
    },
    size: {
      xs: ["h-control-xs", "px-50", "gap-25", "text-label-xs"],
      sm: ["h-control-sm", "px-75", "gap-25", "text-label-xs"],
      md: ["h-control-md", "px-75", "gap-50", "text-label-sm"],
      lg: ["h-control-lg", "px-100", "gap-50", "text-label-sm"],
      xl: ["h-control-xl", "px-100", "gap-75", "text-label-md"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> &
  VariantProps<typeof buttonVariants> & {
    beforeIcon?: React.ReactNode;
    afterIcon?: React.ReactNode;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, children, beforeIcon, afterIcon, ...props },
    ref
  ) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
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

For multi-part components (Select, Dialog, Menu), export both a simplified wrapper AND individual parts:

```tsx
// Simplified wrapper for common usage
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, placeholder, variant, size, ...props }, ref) => (
    <SelectRoot {...props}>
      <SelectTrigger ref={ref} variant={variant} size={size}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectPortal>
        <SelectPositioner>
          <SelectPopup>
            {options.map((option) => (
              <SelectOption key={option.value} value={option.value} size={size}>
                {option.label}
              </SelectOption>
            ))}
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </SelectRoot>
  )
);

// Export all parts for custom usage
export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectOption,
  selectTriggerVariants,
};
```

---

## Icon Handling

### Icon Size Mapping

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
| Muted           | `--color-fg-muted`       | `text-fg-muted`                |
| Subtle          | `--color-fg-subtle`      | `text-fg-subtle`               |
| Inverse         | `--color-fg-inverse`     | `text-fg-inverse`              |
| On Brand        | `--color-fg-on-brand`    | `text-fg-on-brand`             |
| **Borders**     |                          |                                |
| Weak            | `--color-border-weak`    | `border-border-weak`           |
| Subtle          | `--color-border-subtle`  | `border-border-subtle`         |
| Strong          | `--color-border-strong`  | `border-border-strong`         |
| **Brand**       |                          |                                |
| Primary         | `--color-brand`          | `bg-brand`, `text-brand`       |
| Strong          | `--color-brand-strong`   | `bg-brand-strong`              |
| Emphasis        | `--color-brand-emphasis` | `bg-brand-emphasis`            |
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

## Accessibility Requirements

### Keyboard & Focus

- MUST: Full keyboard support per [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/)
- MUST: Visible focus rings using `focus-visible:ring-2 focus-visible:ring-brand`
- MUST: Trap focus in modals/dialogs; return focus on close

### Touch Targets

- MUST: Hit target ≥24px (mobile ≥44px)
- MUST: Use `h-control-xs` (24px) as minimum interactive size

### Form Inputs

- MUST: Mobile input font-size ≥16px (prevents iOS zoom)
- MUST: Use correct `type` and `inputmode` attributes
- MUST: Errors inline next to fields
- MUST: `disabled:pointer-events-none disabled:opacity-disabled`
- NEVER: Block paste in inputs

### General

- MUST: Icon-only buttons have `aria-label`
- MUST: Decorative elements have `aria-hidden="true"`
- MUST: Status cues not color-only (add icons or text)

---

## BaseUI Data Attribute Patterns

```tsx
// Checked/Unchecked
"data-[checked]:bg-brand";
"data-[unchecked]:bg-muted";

// Disabled
"data-[disabled]:opacity-disabled";
"data-[disabled]:pointer-events-none";

// Highlighted (menus)
"data-[highlighted]:bg-primary";

// Open/Closed
"data-[open]:bg-secondary";
"data-[closed]:opacity-0";

// Focus visible
"data-[focus-visible]:ring-2";

// Animation states
"data-[starting-style]:opacity-0 data-[starting-style]:scale-95";
"data-[ending-style]:opacity-0 data-[ending-style]:scale-95";
```

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

## Forbidden Patterns

| ❌ Never Do                              | ✅ Instead                              |
| ---------------------------------------- | --------------------------------------- |
| `<button>` raw elements                  | `<Button>` or `<IconButton>` components |
| `font-mono` or custom fonts              | Use design system typography only       |
| `h-[32px]` arbitrary values              | `h-control-sm` token                    |
| `bg-blue-500` Tailwind defaults          | `bg-info` or `bg-brand`                 |
| `text-white` Tailwind defaults           | `text-fg-inverse` or `text-fg-on-brand` |
| `style={{ ... }}` inline styles          | Tailwind classes                        |
| `import { tv } from 'tailwind-variants'` | `import { tv } from '@/lib/utils'`      |
| Missing `displayName`                    | Always set after forwardRef             |
| Missing disabled styles                  | Always include `disabled:` states       |

---

## Completion Checklist

Before marking a component complete:

- [ ] Uses only design tokens (no arbitrary values)
- [ ] Has `displayName` set
- [ ] Forwards ref properly
- [ ] Exports TypeScript interface
- [ ] All states styled via `data-*` attributes
- [ ] Focus visible ring implemented
- [ ] Disabled state styled
- [ ] Keyboard accessible (Enter, Space, Escape as needed)
- [ ] Touch target ≥24px
- [ ] Added to `src/components/ui/index.ts`

---

## Reference Links

- [Base UI Documentation](https://base-ui.com/react/overview/quick-start)
- [Base UI Styling Guide](https://base-ui.com/react/handbook/styling)
- [Tailwind Variants Documentation](https://www.tailwind-variants.org/)
