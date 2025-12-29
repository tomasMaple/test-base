# Component Library Rules

You are building styled components using **Base UI** primitives with **Tailwind CSS v4** and custom design tokens.

## Core Principles

1. **Base UI for behavior** – All interactive components must use `@base-ui/react` primitives
2. **Tailwind for styling** – Use only Tailwind classes with the project's custom theme
3. **Design tokens only** – Never use arbitrary values; always use configured theme variables
4. **CVA for variants** – All component variants managed through `class-variance-authority`

---

## Imports

```tsx
// Base UI - import specific components
import { Button } from '@base-ui/react/button'
import { Dialog } from '@base-ui/react/dialog'
import { Select } from '@base-ui/react/select'

// Styling utilities
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
```

---

## Component Pattern

Every styled component follows this structure:

```tsx
'use client'

import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles array
  [
    'inline-flex items-center justify-center',
    'font-medium rounded-md',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
        ghost: 'bg-transparent hover:bg-neutral-100',
      },
      size: {
        sm: 'h-7 px-3 text-xs',
        md: 'h-8 px-4 text-sm',
        lg: 'h-10 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

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
)
Button.displayName = 'Button'
```

---

## Styling Rules

### Use Theme Variables Only

```tsx
// ✅ Correct - theme colors
className="bg-primary-600 text-neutral-900 border-neutral-200"

// ❌ Wrong - arbitrary or default Tailwind colors
className="bg-[#0ea5e9] text-gray-900 border-slate-200"
```

### Use Data Attributes for States

Base UI exposes state via data attributes. Style them with Tailwind's `data-*` modifier:

```tsx
className={cn(
  'bg-neutral-100',
  'data-[checked]:bg-primary-600',
  'data-[disabled]:opacity-50',
  'data-[highlighted]:bg-neutral-200',
  'data-[open]:bg-neutral-100',
)}
```

**Common data attributes:**
- `data-checked` / `data-unchecked`
- `data-disabled`
- `data-highlighted`
- `data-open` / `data-closed`
- `data-popup-open`
- `data-focus-visible`
- `data-starting-style` / `data-ending-style` (animations)

### Use CSS Variables for Dynamic Values

Base UI exposes positioning variables on popups:

```tsx
className="origin-[var(--transform-origin)] max-h-[var(--available-height)]"
```

---

## Required Practices

1. **Always use `cn()` for className merging**
   ```tsx
   className={cn(variants({ variant, size }), className)}
   ```

2. **Always forward refs**
   ```tsx
   export const Component = React.forwardRef<HTMLElement, Props>(...)
   Component.displayName = 'Component'
   ```

3. **Always export types**
   ```tsx
   export interface ComponentProps
     extends React.ComponentPropsWithoutRef<typeof BaseComponent>,
       VariantProps<typeof componentVariants> {}
   ```

4. **Always use Base UI for interactive elements**
   - Buttons, inputs, selects, checkboxes, switches
   - Dialogs, popovers, menus, tooltips
   - Tabs, accordions, sliders

---

## Forbidden

- ❌ Arbitrary values: `h-[32px]`, `text-[#000]`, `bg-[rgb(...)]`
- ❌ Default Tailwind colors: `bg-blue-500`, `text-gray-600`, `border-slate-300`
- ❌ Inline styles: `style={{ ... }}`
- ❌ Template literal className: `` className={`${a} ${b}`} ``
- ❌ Native elements for interactive components: `<button>`, `<select>`, `<input type="checkbox">`
- ❌ Missing displayName on forwardRef components
- ❌ Missing ref forwarding

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

- Base UI: https://base-ui.com/react/overview/quick-start
- Base UI Styling: https://base-ui.com/react/handbook/styling
- Base UI for LLMs: https://base-ui.com/llms.txt
- CVA: https://cva.style/docs
