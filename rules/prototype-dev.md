# Prototype Development Rules

> **Rules for AI agents creating prototypes, designs, and UI compositions using Maple components.**

---

## Core Principle: Maple First, Always

**Default Approach**: Always use Maple Design System components and tokens FIRST. Only create custom solutions when no existing component fits.

**Priority Order**:

1. Use existing components from `@/components/ui`
2. Compose complex UIs by combining components
3. Use design tokens for any custom styling
4. Create new components only as last resort (using Base UI + tokens)

> ⚠️ **NEVER** install external UI libraries (shadcn, Radix standalone, etc.)

---

## Quick Navigation Guide

### 🎨 Colors

- **ALWAYS**: Use design tokens (`bg-surface`, `text-fg-primary`, etc.)
- **NEVER**: Use hex values like `#FFFFFF` or Tailwind defaults like `bg-blue-500`
- **Reference**: See Token Quick Reference below

### 🅰️ Headings & Text

- **NEVER**: Use native HTML elements like `<h1>`, `<p>`, `<span>` with custom styling
- **INSTEAD**: Use typography classes (`.text-heading-h1`, `.text-body-base`, `.text-label-sm`)
- **NEVER**: Use `font-mono` or custom fonts

### 📏 Spacing

- **NEVER**: Use pixel or rem values for padding, margin, or gap
- **INSTEAD**: Use spacing tokens like `p-100`, `gap-75`, `mb-150`

### 🔘 Buttons

- **NEVER**: Use native `<button>` elements with Tailwind classes
- **INSTEAD**: Use `Button` for buttons with text (and optional icons)
- **INSTEAD**: Use `IconButton` for icon-only buttons
- **NEVER**: Create custom button-like elements

### 🔗 Links

- **NEVER**: Use native `<a>` elements with custom styling
- **INSTEAD**: Use `Link` component with appropriate variants

### 📝 Form Inputs

- **NEVER**: Use native `<input>` elements with custom styling
- **INSTEAD**: Use `Field` component (includes label, description, error handling)

---

## Decision Tree

```
Need UI Element?
├── Check Maple Components → Found? → Use it
├── Check Design Tokens → Found? → Apply them
├── Can compose existing components? → Do it
└── No solution? → Create minimal custom using Base UI + tokens
```

---

## Available Components

Import all from `@/components/ui`:

```tsx
import {
  Button,
  IconButton,
  Link,
  Avatar,
  Badge,
  Pill,
  TokenLogo,
  Field,
  Select,
  Checkbox,
  Radio,
  Switch,
  Toggle,
  NumberField,
  Dialog,
  AlertDialog,
  Popover,
  Tooltip,
  Toast,
  Tabs,
  Progress,
  ScrollArea,
  AppLayout,
  Navbar,
  Sidebar,
  DashboardCard,
  ModalPresets,
} from "@/components/ui";
```

---

## Component Reference

> [!IMPORTANT]
> For **comprehensive Atlassian-style documentation** on each component including usage guidelines, prop tables, code examples, and "Translating from Tailwind" patterns, see **[Component Library Reference](./component-reference.md)**.

### Button

Use for actions with text. Use `beforeIcon`/`afterIcon` for icons with text.

```tsx
import { Button } from "@/components/ui";
import { Plus, ArrowRight } from "lucide-react";

<Button variant="primary" size="md">Submit</Button>
<Button variant="secondary" size="lg" beforeIcon={<Plus />}>Add item</Button>
<Button variant="ghost" size="sm" afterIcon={<ArrowRight />}>Continue</Button>

// Variants: primary, secondary, tertiary, ghost, brand, negative
// Sizes: xs, sm, md, lg, xl
```

### IconButton

Use for icon-only buttons **without text labels**.

```tsx
import { IconButton } from "@/components/ui";
import { Plus, Settings, X } from "lucide-react";

<IconButton variant="ghost" size="sm" aria-label="Add item">
  <Plus />
</IconButton>

<IconButton variant="secondary" size="md" aria-label="Settings">
  <Settings />
</IconButton>

// MUST include aria-label for accessibility
// Variants: primary, secondary, tertiary, ghost, negative, outline
// Sizes: xs, sm, md, lg, xl
```

### Link

Use for navigation and external links.

```tsx
import { Link } from "@/components/ui";
import { ExternalLink } from "lucide-react";

<Link href="/dashboard">Dashboard</Link>
<Link href="https://docs.example.com" external afterIcon={<ExternalLink />}>
  Documentation
</Link>

// Types: primary, inverse-primary, secondary
// Sizes: medium, small, x-small
// underlined: true/false
```

### Field (Input)

Use for text inputs with labels, descriptions, and error handling.

```tsx
import { Field } from "@/components/ui";

<Field
  label="Email address"
  description="We'll never share your email"
  placeholder="you@example.com"
  type="email"
  size="md"
  required
/>

<Field
  label="Amount"
  placeholder="0.00"
  type="number"
  size="lg"
  errorMessage="Amount is required"
  invalid
/>

// Sizes: xs, sm, md, lg
// Variants: primary, ghost
```

### Select

Use for dropdown selection.

```tsx
import { Select } from "@/components/ui";

<Select
  options={[
    { value: "usdc", label: "USDC" },
    { value: "usdt", label: "USDT" },
    { value: "dai", label: "DAI" },
  ]}
  placeholder="Select asset"
  size="md"
/>;

// Sizes: xs, sm, md, lg, xl
// Variants: secondary (default)
```

### Checkbox, Radio, Switch, Toggle

```tsx
import { Checkbox, Radio, Switch, Toggle } from "@/components/ui";

// Checkbox
<Checkbox size="3xs" defaultChecked>Accept terms</Checkbox>

// Radio Group
<Radio.Root defaultValue="option1">
  <Radio.Item value="option1">Option 1</Radio.Item>
  <Radio.Item value="option2">Option 2</Radio.Item>
</Radio.Root>

// Switch
<Switch size="sm" defaultChecked />

// Toggle
<Toggle size="md" defaultPressed>Bold</Toggle>
```

### Avatar

```tsx
import { Avatar } from "@/components/ui";

<Avatar src="/avatars/user.jpg" size="md" />
<Avatar fallback="JD" size="lg" type="brand" appearance="default" />

// Sizes: 3xs, 2xs, xs, sm, md, lg, xl
// Types: primary, secondary, brand, positive, negative, info, warning, pink, fuchsia, violet, teal, lime
// Appearances: default, subtle
```

### Badge & Pill

```tsx
import { Badge, Pill } from "@/components/ui";

// Badge - for status indicators (circular)
<Badge type="positive" size="20">3</Badge>
<Badge type="negative" appearance="subtle">!</Badge>

// Pill - for tags/labels (rounded rectangle)
<Pill type="brand">DeFi</Pill>
<Pill type="info" appearance="ghost">New</Pill>

// Types: primary, secondary, brand, info, positive, warning, negative, custom
// Appearances: default, subtle, ghost (Pill only)
```

### TokenLogo

**CRITICAL**: The `token` prop MUST match the token name displayed in the UI.

```tsx
import { TokenLogo } from "@/components/ui";

// If displaying "syrupUSDC" in text, use token="syrupusdc"
<div className="flex items-center gap-75">
  <TokenLogo token="syrupusdc" size="sm" />
  <div>
    <span className="text-label-sm">300.00</span>
    <span className="text-body-xs text-fg-secondary">syrupUSDC</span>
  </div>
</div>

// If displaying "Pendle" as a protocol name, use token="pendle"
<div className="flex items-center gap-75">
  <TokenLogo token="pendle" size="md" />
  <span className="text-label-md">Explore Pendle</span>
</div>

// Sizes: 3xs, 2xs, xs, sm, md, lg, xl, 2xl
```

**Available tokens** (maps to `/public/logos/{token}.svg`):
`aave`, `arbitrium`, `balancer`, `btc`, `cbbtc`, `cowswap`, `dai`, `drips`, `eth`, `fluid`, `hype`, `jitosol`, `jupiter`, `kamino`, `lbtc`, `lombard`, `maple`, `midas`, `morpho`, `orca`, `pendle`, `plasma`, `sky`, `sol`, `spark`, `superform`, `susde`, `syrupbtc`, `syrupusdc`, `syrupusdt`, `teth`, `uni`, `usdc`, `usde`, `usds`, `usdt`, `usdt0`, `usr`, `ustb`, `wbtc`, `weth`, `xrp`

### Dialog

```tsx
import { Dialog, Button, Field, Select } from "@/components/ui";

<Dialog>
  <Dialog.Trigger>
    <Button>Open dialog</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Deposit funds</Dialog.Title>
      <Dialog.Description>Enter amount to deposit</Dialog.Description>

      {/* Compose with other components */}
      <div className="space-y-100 mt-150">
        <Select options={assets} placeholder="Select asset" />
        <Field label="Amount" placeholder="0.00" type="number" />
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

### AlertDialog

```tsx
import { AlertDialog, Button } from "@/components/ui";

<AlertDialog>
  <AlertDialog.Trigger>
    <Button variant="negative">Delete</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone.
      </AlertDialog.Description>
      <div className="flex gap-75 mt-150">
        <AlertDialog.Close>
          <Button variant="secondary">Cancel</Button>
        </AlertDialog.Close>
        <Button variant="negative">Delete</Button>
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog>;
```

### Popover & Tooltip

```tsx
import { Popover, Tooltip, Button, Checkbox } from "@/components/ui";

// Popover - for interactive content
<Popover>
  <Popover.Trigger>
    <Button variant="ghost">Settings</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <div className="p-100 space-y-75">
          <Checkbox>Enable notifications</Checkbox>
          <Checkbox>Dark mode</Checkbox>
        </div>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover>

// Tooltip - informational, hover-only
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
  <Tabs.Panel value="overview">{/* Tab content */}</Tabs.Panel>
</Tabs.Root>;
```

### Progress

```tsx
import { Progress } from "@/components/ui";

<Progress value={75} max={100} />;
```

### ScrollArea

```tsx
import { ScrollArea } from "@/components/ui";

<ScrollArea className="h-[300px]">{/* Scrollable content */}</ScrollArea>;
```

### Toast

```tsx
import { Toast, useToast, Button } from "@/components/ui";

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({ title: "Success!", description: "Action completed" })
      }
    >
      Show toast
    </Button>
  );
}
```

### Layout Components

```tsx
import { AppLayout, Navbar, Sidebar, DashboardCard } from "@/components/ui";

// These are pre-configured layout components
// Use them for consistent page structure
```

---

## Composing Complex UIs

**Principle**: Build complex interfaces by combining existing components.

### Example: Position Card

```tsx
import { Avatar, Badge, Button } from "@/components/ui";

function PositionCard({ position }) {
  return (
    <div className="bg-surface rounded-lg border border-border-subtle p-150">
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

      <div className="flex gap-75">
        <Button variant="secondary" size="sm" fullWidth>
          Withdraw
        </Button>
        <Button variant="primary" size="sm" fullWidth>
          Deposit more
        </Button>
      </div>
    </div>
  );
}
```

---

## Token Quick Reference

### Colors

| Purpose         | Class                                        |
| --------------- | -------------------------------------------- |
| Page background | `bg-canvas`                                  |
| Card background | `bg-surface`                                 |
| Hover state     | `bg-primary`                                 |
| Active state    | `bg-secondary`                               |
| Disabled        | `bg-muted`                                   |
| Primary text    | `text-fg-primary`                            |
| Secondary text  | `text-fg-secondary`                          |
| Muted text      | `text-fg-muted`                              |
| Positive        | `text-positive`, `bg-positive`               |
| Negative        | `text-negative`, `bg-negative`               |
| Borders         | `border-border-subtle`, `border-border-weak` |

### Spacing

| Token              | Value | Use      |
| ------------------ | ----- | -------- |
| `p-25`, `gap-25`   | 4px   | Tight    |
| `p-50`, `gap-50`   | 8px   | Small    |
| `p-75`, `gap-75`   | 12px  | Default  |
| `p-100`, `gap-100` | 16px  | Standard |
| `p-150`, `gap-150` | 24px  | Large    |
| `p-200`, `gap-200` | 32px  | Section  |

### Typography

| Class                                  | Use             |
| -------------------------------------- | --------------- |
| `.text-heading-h3`, `.text-heading-h4` | Page titles     |
| `.text-heading-h5`, `.text-heading-h6` | Section titles  |
| `.text-body-base`                      | Body text       |
| `.text-body-sm`                        | Secondary text  |
| `.text-label-sm`, `.text-label-md`     | Labels, buttons |
| `.text-label-xs`                       | Captions        |

### Border Radius

| Token          | Use            |
| -------------- | -------------- |
| `rounded-sm`   | Small elements |
| `rounded-md`   | Cards, inputs  |
| `rounded-lg`   | Large cards    |
| `rounded-pill` | Pills, buttons |

---

## Content Writing Guidelines

### Voice & Tone

- **Clear and direct**: Professional yet approachable
- **Helpful and empowering**: Build user confidence
- **Adapt by context**:
  - New users: Supportive and prescriptive
  - Power users: Direct and efficient
  - Errors: Calm, solution-focused
  - Success: Brief celebration

### Capitalization

**ALWAYS use sentence case for ALL UI text**:

- ✅ "Account settings" NOT "Account Settings"
- ✅ "Email notifications" NOT "Email Notifications"
- ✅ "Save changes" NOT "Save Changes"
- ✅ "Privacy and security" NOT "Privacy and Security"

Capitalize only: first word, proper nouns, product names.
Don't use periods at the end (unless complete sentence).

### Button Labels

Use verb + noun pattern in sentence case:

- ✅ "Save changes", "Delete project", "Add item", "Send message"
- ❌ "Save" (too vague)
- ❌ "Submit" (prefer specific action)
- ❌ "Message" (missing verb)

### Numbers & Numerals

**Use numerals for**: dates, times, measurements, percentages, quantities, statistics

- ✅ "3 projects", "25% complete", "2 hours ago"
- ✅ Use commas for thousands: "1,000 items"
- Spell out one through nine only at start of sentences

### Dates & Times

- **Dates**: "January 8, 2020" (medium) or "Jan 8, 2020" (short)
- **Time**: "3:30 p.m." (omit `:00` for exact hours → "3 p.m.")

### Contractions & Language

- **ALWAYS** use contractions: "can't", "don't", "you'll", "won't"
- **ALWAYS** use US English: "color" not "colour", "organize" not "organise"
- **ALWAYS** use second person: "your", "you"
- Be direct and concise - no filler words

### Vocabulary Standards

| Use                     | Instead of         |
| ----------------------- | ------------------ |
| "app"                   | "add-on", "plugin" |
| "sign in"               | "log in" (in UI)   |
| "menu"                  | "dropdown"         |
| "checkbox"              | "check box"        |
| "canceled", "canceling" | "cancelled"        |
| "real-time"             | "realtime"         |

### Message Types

| Type        | Tone                 | Example                                                      |
| ----------- | -------------------- | ------------------------------------------------------------ |
| Success     | Brief, celebratory   | "Changes saved"                                              |
| Error       | Solution-focused     | "Connection failed. Check your network and try again."       |
| Warning     | Explain consequences | "This will delete all your data"                             |
| Info        | Helpful context      | "You can change this later in settings"                      |
| Empty state | Motivate action      | "No projects yet. Create your first project to get started." |

### Lists

- **Bulleted lists**: Lowercase if completing intro sentence, no periods for fragments, max 6 items
- **Numbered lists**: Capitalize first word, end with periods, don't use for 2 or fewer steps
- **Parallel structure**: All items must follow same grammatical pattern
- **Serial comma**: Always use comma before "and" in series of 3+ items

### Accessibility Copy

- **ALWAYS** provide accessible labels for interactive elements
- **NEVER** rely on placeholder text for critical information
- **NEVER** use "Learn more" as link text - use descriptive text instead:
  - ❌ "Learn more"
  - ✅ "View documentation", "Read the API guide"
- **ALWAYS** ensure status is not conveyed by color alone

### Icons

- **Import from**: `lucide-react`
- **NEVER** invent or guess icon names
- **ALWAYS** add `aria-hidden="true"` to decorative icons
- **ALWAYS** pair icons with text labels where possible

---

## Do's and Don'ts

### ✅ DO

- Use existing components from `@/components/ui`
- Use `Button` for text buttons, `IconButton` for icon-only
- Use `Field` for form inputs, `Select` for dropdowns
- Use `Link` for navigation, not `<a>` elements
- Use design tokens for all colors, spacing, typography
- Use sentence case for all UI text
- Use Lucide icons (from `lucide-react`)
- Use `border-border-weak` for dividers
- Use `border-border-weak` → `hover:border-border-subtle` for interactive elements
- Create realistic mock data
- Build complete, polished prototypes
- Add `aria-label` to icon-only buttons

### ❌ DON'T

- Use raw `<button>`, `<a>`, `<input>` elements
- Use borders on `bg-surface` cards placed directly on `bg-canvas` — the surface color provides enough contrast
- Use emojis — use Lucide icons instead
- Use `shadow-*` classes — shadows come from components like `DashboardCard`
- Use `border-border-strong` — reserved for high-contrast only
- Add a Navbar in pages — it's already in root layout (`AppNavbar`)
- Use `font-mono` or custom fonts
- Use arbitrary values (`h-[32px]`, `bg-[#fff]`)
- Use Tailwind defaults (`bg-blue-500`, `text-gray-900`)
- Use hex colors directly
- Install new UI libraries
- Create new CSS variables
- Leave placeholder text like "Lorem ipsum"
- Use Title Case for UI copy

---

## Creating New Components (Last Resort)

Only when existing components cannot achieve the design:

1. **Use Base UI primitives** from `@base-ui-components/react`
2. **Use only tokens** from `src/app/globals.css`
3. **Follow existing patterns** in `src/components/ui/`
4. **Never use arbitrary values** or Tailwind defaults

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

---

## Layout Patterns

### Page Container

```tsx
<div className="min-h-screen bg-canvas">
  <header className="border-b border-border-weak p-100">
    <h1 className="text-heading-h5 text-fg-primary">Page title</h1>
  </header>
  <main className="p-200 max-w-6xl mx-auto">{/* Content */}</main>
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
  <aside className="w-[280px] border-r border-border-weak bg-surface p-100">
    {/* Navigation */}
  </aside>
  <main className="flex-1 p-200">{/* Content */}</main>
</div>
```

---

## File Locations

| What                   | Where                               |
| ---------------------- | ----------------------------------- |
| Create prototypes      | `src/app/{feature-name}/page.tsx`   |
| Import components      | `@/components/ui`                   |
| Check available tokens | `src/app/globals.css`               |
| See component examples | `src/app/{component-name}/page.tsx` |
