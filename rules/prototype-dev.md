# Prototype Development Rules

> **Rules for AI agents creating prototypes, designs, and UI compositions using existing Maple components.**

---

## Quick Start

### Creating a New Prototype

1. Create a new page in `src/app/{feature-name}/page.tsx`
2. Import components from `@/components/ui`
3. Use design tokens for any custom styling
4. Add realistic mock data

```tsx
// src/app/my-prototype/page.tsx
"use client";

import { Button, Avatar, Card } from "@/components/ui";

export default function MyPrototypePage() {
  return (
    <div className="p-200 bg-canvas min-h-screen">
      <h1 className="text-heading-h3 text-fg-primary mb-150">My Feature</h1>
      {/* Build your prototype here */}
    </div>
  );
}
```

---

## Component Priority

**Always use this order:**

1. **Use existing components** from `@/components/ui` first
2. **Compose complex UIs** by combining existing components
3. **Create new components** only if no existing component fits — and use Base UI + `globals.css` tokens

> ⚠️ Never install external UI libraries (shadcn, Radix standalone, etc.)

---

## Available Components with Examples

Import from `@/components/ui`:

### Button

```tsx
import { Button } from "@/components/ui";
import { Plus, ArrowRight } from "lucide-react";

// Basic
<Button variant="primary" size="md">Submit</Button>

// With icons
<Button variant="secondary" size="lg" beforeIcon={<Plus />}>Add Item</Button>
<Button variant="ghost" size="sm" afterIcon={<ArrowRight />}>Continue</Button>

// Variants: primary, secondary, tertiary, ghost, brand, negative
// Sizes: xs, sm, md, lg, xl
```

### Avatar

```tsx
import { Avatar } from "@/components/ui";

// With image
<Avatar src="/avatars/user.jpg" size="md" />

// With fallback initials
<Avatar fallback="JD" size="lg" type="brand" appearance="default" />

// Sizes: 3xs, 2xs, xs, sm, md, lg, xl
// Types: primary, secondary, brand, positive, negative, info, warning
```

### Badge & Pill

```tsx
import { Badge, Pill } from "@/components/ui";

// Badge (for status indicators)
<Badge type="positive" size="20">Active</Badge>
<Badge type="negative" appearance="subtle">Failed</Badge>

// Pill (for tags/labels)
<Pill type="brand">DeFi</Pill>
<Pill type="info" appearance="ghost">New</Pill>
```

### Form Controls

```tsx
import { Checkbox, Radio, Switch, Select } from "@/components/ui";

// Checkbox
<Checkbox size="3xs" defaultChecked />

// Radio Group
<Radio.Root defaultValue="option1">
  <Radio.Item value="option1">Option 1</Radio.Item>
  <Radio.Item value="option2">Option 2</Radio.Item>
</Radio.Root>

// Switch
<Switch size="sm" defaultChecked />

// Select
<Select
  options={[
    { value: "usdc", label: "USDC" },
    { value: "usdt", label: "USDT" },
  ]}
  placeholder="Select asset"
  size="md"
/>
```

### Dialog

```tsx
import { Dialog, Button, Input, Select } from "@/components/ui";

<Dialog>
  <Dialog.Trigger>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Deposit Funds</Dialog.Title>
      <Dialog.Description>Enter amount to deposit</Dialog.Description>

      {/* Compose with other components inside */}
      <div className="space-y-100 mt-150">
        <Select options={assets} placeholder="Select asset" />
        <Input placeholder="Amount" type="number" />
      </div>

      <div className="flex gap-75 mt-150">
        <Dialog.Close>
          <Button variant="secondary">Cancel</Button>
        </Dialog.Close>
        <Button variant="primary">Confirm</Button>
      </div>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog>;
```

### Popover & Tooltip

```tsx
import { Popover, Tooltip, Button } from "@/components/ui";

// Popover (interactive content)
<Popover>
  <Popover.Trigger>
    <Button variant="ghost">Settings</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        {/* Any components inside */}
        <div className="p-100 space-y-75">
          <Checkbox>Enable notifications</Checkbox>
          <Checkbox>Dark mode</Checkbox>
        </div>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover>

// Tooltip (informational, hover-only)
<Tooltip content="Click to copy address">
  <Button variant="ghost" size="sm">0x1234...5678</Button>
</Tooltip>
```

### Tabs

```tsx
import { Tabs } from "@/components/ui";

<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="positions">Positions</Tabs.Tab>
    <Tabs.Tab value="history">History</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">
    {/* Content with other components */}
  </Tabs.Panel>
  <Tabs.Panel value="positions">
    {/* Position cards, tables, etc. */}
  </Tabs.Panel>
</Tabs.Root>;
```

---

## Composing Complex UIs

**Principle:** Build complex interfaces by combining existing components.

### Example: Position Card

```tsx
import { Avatar, Badge, Button, Tooltip } from "@/components/ui";

function PositionCard({ position }) {
  return (
    <div className="bg-surface rounded-lg border border-border-subtle p-150">
      {/* Header with avatar and badge */}
      <div className="flex items-center justify-between mb-100">
        <div className="flex items-center gap-75">
          <Avatar src={position.icon} size="sm" />
          <span className="text-label-md text-fg-primary">
            {position.asset}
          </span>
        </div>
        <Badge type="positive" size="16">
          Active
        </Badge>
      </div>

      {/* Stats */}
      <div className="space-y-50 mb-150">
        <div className="flex justify-between">
          <span className="text-body-sm text-fg-secondary">Deposited</span>
          <span className="text-label-sm text-fg-primary">
            ${position.deposited}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-body-sm text-fg-secondary">Earned</span>
          <span className="text-label-sm text-positive">
            ${position.earned}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-75">
        <Button variant="secondary" size="sm" fullWidth>
          Withdraw
        </Button>
        <Button variant="primary" size="sm" fullWidth>
          Deposit More
        </Button>
      </div>
    </div>
  );
}
```

### Example: Settings Dialog

```tsx
import { Dialog, Button, Switch, Select, Input } from "@/components/ui";

function SettingsDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button variant="ghost">Settings</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup className="max-w-md">
          <Dialog.Title>Preferences</Dialog.Title>

          <div className="space-y-150 mt-150">
            {/* Section with switches */}
            <div className="space-y-100">
              <h3 className="text-label-sm text-fg-secondary">Notifications</h3>
              <div className="flex items-center justify-between">
                <span className="text-body-sm">Email alerts</span>
                <Switch size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-sm">Push notifications</span>
                <Switch size="sm" />
              </div>
            </div>

            {/* Section with select */}
            <div className="space-y-75">
              <h3 className="text-label-sm text-fg-secondary">Display</h3>
              <Select
                options={[
                  { value: "usd", label: "USD" },
                  { value: "eur", label: "EUR" },
                ]}
                placeholder="Currency"
              />
            </div>
          </div>

          <div className="flex gap-75 mt-200">
            <Dialog.Close>
              <Button variant="secondary" fullWidth>
                Cancel
              </Button>
            </Dialog.Close>
            <Button variant="primary" fullWidth>
              Save
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog>
  );
}
```

---

## Creating New Components (When Necessary)

Only create new components when existing ones cannot be composed to achieve the design.

### Rules for New Components

1. **Use Base UI primitives** from `@base-ui-components/react`
2. **Use only tokens** from `src/app/globals.css`
3. **Follow existing patterns** (forwardRef, displayName, tv variants)
4. **Never use arbitrary values** or Tailwind defaults

### Example: Simple New Component

```tsx
"use client";

import * as React from "react";
import { cn, tv } from "@/lib/utils";

const statCardVariants = tv({
  base: [
    "bg-surface rounded-lg border border-border-subtle p-150",
    "flex flex-col gap-50",
  ],
  variants: {
    trend: {
      up: "border-l-4 border-l-positive",
      down: "border-l-4 border-l-negative",
      neutral: "",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
});

export function StatCard({ label, value, trend, className }) {
  return (
    <div className={cn(statCardVariants({ trend }), className)}>
      <span className="text-label-xs text-fg-secondary">{label}</span>
      <span className="text-heading-h5 text-fg-primary">{value}</span>
    </div>
  );
}
```

## Layout Patterns

### Page Container

```tsx
<div className="min-h-screen bg-canvas">
  {/* Header */}
  <header className="border-b border-border-weak p-100">
    <h1 className="text-heading-h5 text-fg-primary">Page Title</h1>
  </header>

  {/* Content */}
  <main className="p-200 max-w-6xl mx-auto">{/* Your content */}</main>
</div>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-150">
  <div className="bg-surface rounded-lg border border-border-subtle p-150">
    {/* Card content */}
  </div>
</div>
```

### Sidebar Layout

```tsx
<div className="flex min-h-screen">
  {/* Sidebar */}
  <aside className="w-[280px] border-r border-border-weak bg-surface p-100">
    {/* Navigation */}
  </aside>

  {/* Main content */}
  <main className="flex-1 p-200">{/* Content */}</main>
</div>
```

### List with Dividers

```tsx
<div className="divide-y divide-border-weak">
  {items.map((item) => (
    <div key={item.id} className="py-100 flex items-center gap-100">
      {/* Item content */}
    </div>
  ))}
</div>
```

---

## Token Quick Reference

### Colors

| Purpose         | Class                  |
| --------------- | ---------------------- |
| Page background | `bg-canvas`            |
| Card background | `bg-surface`           |
| Hover state     | `bg-primary`           |
| Active state    | `bg-secondary`         |
| Disabled        | `bg-muted`             |
| Primary text    | `text-fg-primary`      |
| Secondary text  | `text-fg-secondary`    |
| Muted text      | `text-fg-muted`        |
| Borders         | `border-border-subtle` |

### Spacing

| Size | Class              | Value |
| ---- | ------------------ | ----- |
| XS   | `p-50`, `gap-50`   | 8px   |
| SM   | `p-75`, `gap-75`   | 12px  |
| MD   | `p-100`, `gap-100` | 16px  |
| LG   | `p-150`, `gap-150` | 24px  |
| XL   | `p-200`, `gap-200` | 32px  |

### Typography

| Use           | Class                                  |
| ------------- | -------------------------------------- |
| Page title    | `text-heading-h3` or `text-heading-h4` |
| Section title | `text-heading-h5` or `text-heading-h6` |
| Body text     | `text-body-base`                       |
| Small text    | `text-body-sm`                         |
| Labels        | `text-label-sm`                        |
| Captions      | `text-label-xs`                        |

### Border Radius

| Use            | Class          |
| -------------- | -------------- |
| Small elements | `rounded-sm`   |
| Cards, inputs  | `rounded-md`   |
| Large cards    | `rounded-lg`   |
| Pills, buttons | `rounded-pill` |

---

## Mock Data Conventions

### User/Account

```tsx
const mockUser = {
  id: "user_001",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/avatars/alex.jpg",
  initials: "AJ",
};
```

### Financial Positions

```tsx
const mockPositions = [
  {
    id: "pos_001",
    asset: "syrupUSDC",
    deposited: 50000,
    earned: 1250.5,
    apy: 8.5,
    status: "active",
  },
  {
    id: "pos_002",
    asset: "syrupUSDT",
    deposited: 25000,
    earned: 487.25,
    apy: 7.2,
    status: "active",
  },
];
```

### Transactions

```tsx
const mockTransactions = [
  {
    id: "tx_001",
    type: "deposit",
    amount: 10000,
    asset: "USDC",
    timestamp: "2026-01-05T10:30:00Z",
    status: "completed",
  },
];
```

---

## Do's and Don'ts

### ✅ DO

- Use existing components from `@/components/ui`
- Use `IconButton` for icon-only buttons (not raw `<button>`)
- Use `Button` with `beforeIcon`/`afterIcon` for buttons with icons + text
- Use design tokens for all colors, spacing, typography
- Create realistic mock data
- Build complete, polished prototypes
- Use proper semantic HTML

### ❌ DON'T

- Use raw `<button>` elements — use `Button` or `IconButton` components
- Use `font-mono` — stick to the design system typography
- Create new components (compose existing ones instead)
- Use arbitrary values (`h-[32px]`, `bg-[#fff]`)
- Use Tailwind defaults (`bg-blue-500`, `text-gray-900`)
- Install new UI libraries (shadcn, Radix, etc.)
- Create new CSS variables
- Leave placeholder text like "Lorem ipsum"

---

## Visual Quality Standards

Prototypes must look **polished and professional**:

1. **Consistent spacing** — Use the spacing scale, never mix arbitrary values
2. **Proper hierarchy** — Clear visual distinction between headers, body, captions
3. **Realistic content** — Use mock data that looks real, not Lorem ipsum
4. **Complete states** — Show loading, empty, error states when relevant
5. **Responsive** — Test at desktop and mobile widths

---

## Working with Screenshots/Designs

When replicating a design from a screenshot:

1. **Identify existing components** — Match UI elements to available components
2. **Map colors to tokens** — Find the closest token for each color
3. **Use the spacing scale** — Measure and use closest spacing token
4. **Match typography** — Use heading/body/label classes appropriately
5. **Don't pixel-perfect** — Match the intent, not every pixel

---

## File Locations

| What                   | Where                               |
| ---------------------- | ----------------------------------- |
| Create prototypes      | `src/app/{feature-name}/page.tsx`   |
| Import components      | `@/components/ui`                   |
| Check available tokens | `src/app/globals.css`               |
| See component examples | `src/app/{component-name}/page.tsx` |
