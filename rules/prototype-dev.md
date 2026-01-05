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

---

### Button

A component for triggering actions with text. Use `Button` for text buttons (optionally with icons) and `IconButton` for icon-only buttons.

- **Keywords:** button, action, submit, click, primary, secondary, CTA
- **Categories:** actions, forms, navigation

#### Example

```tsx
import { Button } from '@/components/ui'
import { Plus, ArrowRight, Trash2 } from 'lucide-react'

// Basic variants
<Button variant="primary">Submit</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary">Learn more</Button>
<Button variant="ghost">Skip</Button>

// With icons
<Button variant="primary" beforeIcon={<Plus />}>Add item</Button>
<Button variant="ghost" afterIcon={<ArrowRight />}>Continue</Button>

// Sizes
<Button size="xs">Tiny</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra large</Button>

// Destructive action
<Button variant="negative" beforeIcon={<Trash2 />}>Delete</Button>

// Full width
<Button fullWidth>Full width button</Button>
```

#### Props

| Prop       | Type                                                                                      | Default     | Description                       |
| ---------- | ----------------------------------------------------------------------------------------- | ----------- | --------------------------------- |
| variant    | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'brand' \| 'negative' \| 'outline'` | `'primary'` | Visual style                      |
| size       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                    | `'md'`      | Button size                       |
| beforeIcon | `ReactNode`                                                                               | -           | Icon displayed before text        |
| afterIcon  | `ReactNode`                                                                               | -           | Icon displayed after text         |
| fullWidth  | `boolean`                                                                                 | `false`     | Stretch button to container width |
| disabled   | `boolean`                                                                                 | `false`     | Disable interaction               |

#### Usage Guidelines

- Use **primary** for the main action on a page (limit to one per view)
- Use **secondary** for supporting actions next to primary
- Use **tertiary** for less important actions in tight spaces
- Use **ghost** for low-emphasis actions (toolbars, inline actions)
- Use **negative** ONLY for destructive actions (delete, remove, disconnect)
- Always include text label — for icon-only buttons, use `IconButton`
- Use sentence case: "Save changes" not "Save Changes"
- Use verb + noun pattern: "Add item" not just "Add"

#### Prop Guidance

- **variant** — Choose based on action importance, not aesthetics
- **size** — Match the surrounding UI context (use `sm` in compact tables, `lg` for hero CTAs)
- **beforeIcon** — Use for actions (Plus for add, Trash for delete)
- **afterIcon** — Use for navigation arrows or external link indicators
- **fullWidth** — Use in mobile layouts or form footers

#### Translating from Tailwind

```diff
- <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-orange-500">Submit</button>
+ <Button>Submit</Button>

- <button className="bg-white border border-gray-300 px-4 py-2 rounded-full">Cancel</button>
+ <Button variant="secondary">Cancel</Button>

- <button className="flex items-center gap-2"><PlusIcon className="w-4 h-4" /> Add item</button>
+ <Button beforeIcon={<Plus />}>Add item</Button>
```

---

### IconButton

A button component for icon-only interactions without text labels. Always include `aria-label` for accessibility.

- **Keywords:** icon button, toolbar, action, icon-only, compact
- **Categories:** actions, toolbars, navigation

#### Example

```tsx
import { IconButton } from '@/components/ui'
import { Plus, Settings, X, Search, Menu, MoreHorizontal } from 'lucide-react'

// Variants
<IconButton variant="ghost" aria-label="Add item"><Plus /></IconButton>
<IconButton variant="secondary" aria-label="Settings"><Settings /></IconButton>
<IconButton variant="tertiary" aria-label="Close"><X /></IconButton>

// Sizes
<IconButton size="xs" aria-label="Search"><Search /></IconButton>
<IconButton size="sm" aria-label="Menu"><Menu /></IconButton>
<IconButton size="md" aria-label="More options"><MoreHorizontal /></IconButton>

// Negative/destructive
<IconButton variant="negative" aria-label="Delete"><Trash2 /></IconButton>
```

#### Props

| Prop       | Type                                                                           | Default      | Description                  |
| ---------- | ------------------------------------------------------------------------------ | ------------ | ---------------------------- |
| variant    | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'negative' \| 'outline'` | `'ghost'`    | Visual style                 |
| size       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                         | `'md'`       | Button size                  |
| aria-label | `string`                                                                       | **required** | Accessible label (mandatory) |
| disabled   | `boolean`                                                                      | `false`      | Disable interaction          |
| children   | `ReactNode`                                                                    | -            | Icon element                 |

#### Usage Guidelines

- **ALWAYS** include `aria-label` — this is required for accessibility
- Use for toolbars, table actions, close buttons, menu triggers
- Do NOT use when text would improve clarity — prefer `Button` with `beforeIcon`
- Use `ghost` variant for most cases unless emphasis is needed
- Common icons: `X` (close), `MoreHorizontal` (menu), `Settings`, `Search`, `Plus`

#### Translating from Tailwind

```diff
- <button className="p-2 rounded-full hover:bg-gray-100"><XIcon className="w-4 h-4" /></button>
+ <IconButton aria-label="Close"><X /></IconButton>
```

---

### Link

A component for navigation, both internal and external. Use instead of raw `<a>` elements.

- **Keywords:** link, anchor, navigation, external, href, url
- **Categories:** navigation, text

#### Example

```tsx
import { Link } from '@/components/ui'
import { ExternalLink, ArrowRight } from 'lucide-react'

// Basic link
<Link href="/dashboard">Dashboard</Link>

// External link
<Link href="https://docs.example.com" external afterIcon={<ExternalLink />}>
  Documentation
</Link>

// Types
<Link href="/about" type="primary">Learn more</Link>
<Link href="/terms" type="secondary">Terms of service</Link>

// Sizes
<Link href="/help" size="small">Help</Link>
<Link href="/faq" size="x-small">FAQ</Link>

// Underlined
<Link href="/privacy" underlined>Privacy policy</Link>
```

#### Props

| Prop       | Type                                            | Default      | Description                                     |
| ---------- | ----------------------------------------------- | ------------ | ----------------------------------------------- |
| href       | `string`                                        | **required** | URL or path                                     |
| type       | `'primary' \| 'inverse-primary' \| 'secondary'` | `'primary'`  | Color style                                     |
| size       | `'medium' \| 'small' \| 'x-small'`              | `'medium'`   | Text size                                       |
| underlined | `boolean`                                       | `false`      | Show underline                                  |
| external   | `boolean`                                       | `false`      | Opens in new tab with rel="noopener noreferrer" |
| beforeIcon | `ReactNode`                                     | -            | Icon before text                                |
| afterIcon  | `ReactNode`                                     | -            | Icon after text                                 |

#### Usage Guidelines

- Use `Link` for navigation, `Button` for actions
- Add `external` prop for links opening in new tabs
- Include `ExternalLink` icon for external URLs
- Use descriptive link text, not "click here" or "learn more"

#### Translating from Tailwind

```diff
- <a href="/dashboard" className="text-gray-900 hover:text-orange-500">Dashboard</a>
+ <Link href="/dashboard">Dashboard</Link>
```

---

### Avatar

A component for displaying user or entity identity with images or initials.

- **Keywords:** avatar, user, profile, image, initials, identity
- **Categories:** data-display, identity

#### Example

```tsx
import { Avatar } from '@/components/ui'

// With image
<Avatar src="/avatars/user.jpg" alt="John Doe" size="md" />

// With fallback initials
<Avatar fallback="JD" size="lg" />

// Sizes
<Avatar src="/avatar.jpg" size="3xs" />
<Avatar src="/avatar.jpg" size="xs" />
<Avatar src="/avatar.jpg" size="sm" />
<Avatar src="/avatar.jpg" size="md" />
<Avatar src="/avatar.jpg" size="lg" />
<Avatar src="/avatar.jpg" size="xl" />

// With type (colored fallback)
<Avatar fallback="MP" type="brand" appearance="default" />
<Avatar fallback="AB" type="positive" appearance="subtle" />
<Avatar fallback="XY" type="violet" appearance="default" />
```

#### Props

| Prop       | Type                                                                                         | Default     | Description                               |
| ---------- | -------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------- |
| src        | `string`                                                                                     | -           | Image URL                                 |
| alt        | `string`                                                                                     | -           | Alt text (also used for auto-initials)    |
| fallback   | `ReactNode`                                                                                  | -           | Content when image fails (initials, icon) |
| size       | `'3xs' \| '2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                            | `'md'`      | Avatar size                               |
| type       | `'primary' \| 'secondary' \| 'brand' \| 'pink' \| 'fuchsia' \| 'violet' \| 'teal' \| 'lime'` | `'primary'` | Fallback color                            |
| appearance | `'default' \| 'subtle'`                                                                      | `'default'` | Fallback color intensity                  |

#### Usage Guidelines

- Always provide `alt` text for images
- Use `fallback` with initials when image might not load
- Use consistent sizing within the same context
- Use `3xs`/`2xs` for inline mentions, `lg`/`xl` for profile headers

#### Translating from Tailwind

```diff
- <img src="/avatar.jpg" alt="User" className="w-10 h-10 rounded-full" />
+ <Avatar src="/avatar.jpg" alt="User" size="md" />

- <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">JD</div>
+ <Avatar fallback="JD" type="brand" />
```

---

### TokenLogo

A component for displaying cryptocurrency/protocol logos. The token prop MUST match the displayed token name.

- **Keywords:** token, logo, crypto, asset, protocol, icon
- **Categories:** data-display, crypto

#### Example

```tsx
import { TokenLogo } from '@/components/ui'

// Basic usage
<TokenLogo token="usdc" size="md" />
<TokenLogo token="eth" size="lg" />
<TokenLogo token="btc" size="sm" />

// Protocol logos
<TokenLogo token="aave" size="md" />
<TokenLogo token="pendle" size="md" />
<TokenLogo token="maple" size="lg" />

// With text (CRITICAL: token prop must match displayed text)
<div className="flex items-center gap-75">
  <TokenLogo token="syrupusdc" size="sm" />
  <span className="text-label-sm">300.00 syrupUSDC</span>
</div>
```

#### Props

| Prop  | Type                                                              | Default      | Description                  |
| ----- | ----------------------------------------------------------------- | ------------ | ---------------------------- |
| token | `string`                                                          | **required** | Token identifier (lowercase) |
| size  | `'3xs' \| '2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'`       | Logo size                    |

#### Available Tokens

`aave`, `arbitrium`, `balancer`, `btc`, `cbbtc`, `cowswap`, `dai`, `drips`, `eth`, `fluid`, `hype`, `jitosol`, `jupiter`, `kamino`, `lbtc`, `lombard`, `maple`, `midas`, `morpho`, `orca`, `pendle`, `plasma`, `sky`, `sol`, `spark`, `superform`, `susde`, `syrupbtc`, `syrupusdc`, `syrupusdt`, `teth`, `uni`, `usdc`, `usde`, `usds`, `usdt`, `usdt0`, `usr`, `ustb`, `wbtc`, `weth`, `xrp`

#### Usage Guidelines

- **CRITICAL**: Token prop MUST match the token name shown in UI text
- Token names are lowercase: `usdc` not `USDC`
- Use in tables, cards, and anywhere displaying asset/protocol info
- Always pair with text label for clarity

---

### Badge

A circular component for displaying counts, status indicators, or small icons.

- **Keywords:** badge, count, notification, indicator, status, number
- **Categories:** data-display, status

#### Example

```tsx
import { Badge } from '@/components/ui'
import { Check, X } from 'lucide-react'

// Numbers
<Badge type="primary" size="20">3</Badge>
<Badge type="positive" size="24">12</Badge>
<Badge type="negative" size="16">!</Badge>

// Status types
<Badge type="positive" size="20">✓</Badge>
<Badge type="negative" size="20">✗</Badge>
<Badge type="warning" size="20">!</Badge>

// Appearances
<Badge type="brand" appearance="default">5</Badge>
<Badge type="brand" appearance="subtle">5</Badge>

// With icons
<Badge type="positive" size="24" icon={<Check />} />
```

#### Props

| Prop       | Type                                                                                     | Default     | Description              |
| ---------- | ---------------------------------------------------------------------------------------- | ----------- | ------------------------ |
| size       | `'12' \| '16' \| '20' \| '24' \| '32' \| '36' \| '40' \| '48' \| '56'`                   | `'56'`      | Badge diameter in pixels |
| type       | `'primary' \| 'secondary' \| 'brand' \| 'info' \| 'positive' \| 'warning' \| 'negative'` | `'primary'` | Color scheme             |
| appearance | `'default' \| 'subtle'`                                                                  | `'default'` | Color intensity          |
| icon       | `ReactNode`                                                                              | -           | Icon instead of text     |

#### Usage Guidelines

- Use for notification counts, status indicators, step numbers
- Keep content short (1-2 characters or small icon)
- Use `positive` for success, `negative` for errors, `warning` for alerts
- Size `20` works well for inline indicators, `32`+ for standalone badges

---

### Pill

A rounded rectangle component for tags, labels, and categories. Use instead of Badge when content is text-based.

- **Keywords:** pill, tag, label, category, chip, filter
- **Categories:** data-display, filtering

#### Example

```tsx
import { Pill } from '@/components/ui'

// Types
<Pill type="brand">DeFi</Pill>
<Pill type="info">New</Pill>
<Pill type="positive">Active</Pill>
<Pill type="warning">Pending</Pill>
<Pill type="negative">Failed</Pill>

// Appearances
<Pill type="brand" appearance="default">Default</Pill>
<Pill type="brand" appearance="subtle">Subtle</Pill>
<Pill type="brand" appearance="ghost">Ghost</Pill>
```

#### Props

| Prop       | Type                                                                                     | Default     | Description     |
| ---------- | ---------------------------------------------------------------------------------------- | ----------- | --------------- |
| type       | `'primary' \| 'secondary' \| 'brand' \| 'info' \| 'positive' \| 'warning' \| 'negative'` | `'primary'` | Color scheme    |
| appearance | `'default' \| 'subtle' \| 'ghost'`                                                       | `'default'` | Color intensity |
| size       | `'sm' \| 'md' \| 'lg'`                                                                   | `'md'`      | Pill size       |

#### Usage Guidelines

- Use for categories, tags, status labels, filter chips
- Keep text short (1-3 words)
- Use `ghost` for filter chips that can be toggled
- Prefer `Pill` over `Badge` for text content

---

### Field

A complete form input component with label, description, and error handling built-in.

- **Keywords:** input, field, form, text, email, password, label
- **Categories:** forms, input

#### Example

```tsx
import { Field } from '@/components/ui'

// Basic input
<Field label="Email address" placeholder="you@example.com" type="email" />

// With description
<Field
  label="Username"
  description="This will be your public display name"
  placeholder="johndoe"
/>

// With error
<Field
  label="Password"
  type="password"
  placeholder="••••••••"
  errorMessage="Password must be at least 8 characters"
  invalid
/>

// Sizes
<Field label="Small" size="xs" placeholder="Extra small" />
<Field label="Default" size="md" placeholder="Medium" />
<Field label="Large" size="lg" placeholder="Large" />

// Required field
<Field label="Full name" placeholder="John Doe" required />
```

#### Props

| Prop         | Type                                                            | Default  | Description             |
| ------------ | --------------------------------------------------------------- | -------- | ----------------------- |
| label        | `string`                                                        | -        | Input label             |
| description  | `string`                                                        | -        | Helper text below label |
| placeholder  | `string`                                                        | -        | Placeholder text        |
| type         | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type              |
| size         | `'xs' \| 'sm' \| 'md' \| 'lg'`                                  | `'md'`   | Input size              |
| errorMessage | `string`                                                        | -        | Error text              |
| invalid      | `boolean`                                                       | `false`  | Show error state        |
| required     | `boolean`                                                       | `false`  | Mark as required        |
| disabled     | `boolean`                                                       | `false`  | Disable input           |

#### Usage Guidelines

- Always include a `label` — never rely on placeholder alone
- Use `description` to explain format requirements
- Show errors inline with `errorMessage` + `invalid`
- Use appropriate `type` for validation (email, tel, url)

#### Translating from Tailwind

```diff
- <div>
-   <label className="block text-sm font-medium">Email</label>
-   <input type="email" className="border rounded-md px-3 py-2" placeholder="you@example.com" />
- </div>
+ <Field label="Email" type="email" placeholder="you@example.com" />
```

---

### Select

A dropdown component for selecting from a list of options.

- **Keywords:** select, dropdown, picker, options, menu, choice
- **Categories:** forms, input

#### Example

```tsx
import { Select } from '@/components/ui'

// Basic usage
<Select
  options={[
    { value: 'usdc', label: 'USDC' },
    { value: 'usdt', label: 'USDT' },
    { value: 'dai', label: 'DAI' },
  ]}
  placeholder="Select asset"
/>

// With label
<Select
  label="Payment method"
  options={[
    { value: 'card', label: 'Credit card' },
    { value: 'bank', label: 'Bank transfer' },
  ]}
  placeholder="Choose payment method"
/>

// Sizes
<Select options={options} size="sm" placeholder="Small" />
<Select options={options} size="md" placeholder="Medium" />
<Select options={options} size="lg" placeholder="Large" />
```

#### Props

| Prop        | Type                                   | Default      | Description        |
| ----------- | -------------------------------------- | ------------ | ------------------ |
| options     | `{ value: string, label: string }[]`   | **required** | List of options    |
| placeholder | `string`                               | -            | Placeholder text   |
| label       | `string`                               | -            | Label above select |
| size        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`       | Select size        |
| error       | `string`                               | -            | Error message      |
| disabled    | `boolean`                              | `false`      | Disable select     |

#### Usage Guidelines

- Provide meaningful `placeholder` text
- Use for 4+ options; for 2-3 options, consider Radio buttons
- Keep option labels concise

---

### Checkbox

A component for binary (checked/unchecked) selection.

- **Keywords:** checkbox, check, toggle, boolean, selection
- **Categories:** forms, input

#### Example

```tsx
import { Checkbox } from '@/components/ui'

<Checkbox>Accept terms and conditions</Checkbox>
<Checkbox defaultChecked>Enable notifications</Checkbox>
<Checkbox size="3xs">Small checkbox</Checkbox>
<Checkbox disabled>Disabled option</Checkbox>
```

#### Props

| Prop           | Type             | Default | Description       |
| -------------- | ---------------- | ------- | ----------------- |
| size           | `'3xs' \| '2xs'` | `'3xs'` | Checkbox size     |
| defaultChecked | `boolean`        | `false` | Initially checked |
| disabled       | `boolean`        | `false` | Disable checkbox  |
| children       | `ReactNode`      | -       | Label text        |

---

### Radio

A component for selecting one option from a group.

- **Keywords:** radio, option, choice, group, single-select
- **Categories:** forms, input

#### Example

```tsx
import { Radio } from "@/components/ui";

<Radio.Root defaultValue="option1">
  <Radio.Item value="option1">Option 1</Radio.Item>
  <Radio.Item value="option2">Option 2</Radio.Item>
  <Radio.Item value="option3">Option 3</Radio.Item>
</Radio.Root>;
```

#### Usage Guidelines

- Use for 2-5 mutually exclusive options
- For more options, consider Select dropdown
- Always have one option pre-selected when possible

---

### Switch

A toggle component for on/off binary states.

- **Keywords:** switch, toggle, on-off, boolean
- **Categories:** forms, input

#### Example

```tsx
import { Switch } from '@/components/ui'

<Switch />
<Switch defaultChecked />
<Switch size="sm" />

// With label
<label className="flex items-center gap-75">
  <Switch size="sm" defaultChecked />
  <span className="text-label-sm">Enable dark mode</span>
</label>
```

#### Props

| Prop           | Type                            | Default | Description    |
| -------------- | ------------------------------- | ------- | -------------- |
| size           | `'2xs' \| 'xs' \| 'sm' \| 'md'` | `'sm'`  | Switch size    |
| defaultChecked | `boolean`                       | `false` | Initially on   |
| disabled       | `boolean`                       | `false` | Disable switch |

---

### Toggle

A button that can be toggled on/off, typically for formatting or mode switches.

- **Keywords:** toggle, pressed, format, mode
- **Categories:** forms, input

#### Example

```tsx
import { Toggle } from '@/components/ui'
import { Bold, Italic } from 'lucide-react'

<Toggle size="md" defaultPressed><Bold /></Toggle>
<Toggle size="md"><Italic /></Toggle>
```

---

### Tabs

A component for organizing content into switchable panels.

- **Keywords:** tabs, tabbed, panels, navigation, sections
- **Categories:** navigation, layout

#### Example

```tsx
import { Tabs } from '@/components/ui'

<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="positions">Positions</Tabs.Tab>
    <Tabs.Tab value="history">History</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content here</Tabs.Panel>
  <Tabs.Panel value="positions">Positions content here</Tabs.Panel>
  <Tabs.Panel value="history">History content here</Tabs.Panel>
</Tabs.Root>

// With padding and variant
<Tabs.Root defaultValue="tab1">
  <Tabs.List padding="withPadding" variant="primary">
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
</Tabs.Root>
```

#### Props (Tabs.Root)

| Prop         | Type     | Default      | Description                  |
| ------------ | -------- | ------------ | ---------------------------- |
| defaultValue | `string` | **required** | Initially selected tab value |

#### Props (Tabs.List)

| Prop    | Type                                   | Default       | Description              |
| ------- | -------------------------------------- | ------------- | ------------------------ |
| padding | `'noPadding' \| 'withPadding'`         | `'noPadding'` | List container padding   |
| variant | `'canvas' \| 'primary' \| 'secondary'` | `'canvas'`    | Background color variant |

#### Usage Guidelines

- Always have a minimum of 2 tabs
- First tab should be selected by default
- Keep tab labels short (1-2 words)
- Use sentence case for labels

---

### Dialog

A modal component for focused interactions that require user attention.

- **Keywords:** dialog, modal, overlay, popup, form
- **Categories:** overlay, forms

#### Example

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

#### Usage Guidelines

- Use for forms, confirmations, and focused tasks
- Always include a way to close/cancel
- Keep content focused on a single task

---

### AlertDialog

A confirmation dialog for actions with significant consequences.

- **Keywords:** alert, confirm, warning, destructive, delete
- **Categories:** overlay, feedback

#### Example

```tsx
import { AlertDialog, Button } from "@/components/ui";

<AlertDialog>
  <AlertDialog.Trigger>
    <Button variant="negative">Delete project</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Delete project?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. All data will be permanently deleted.
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

#### Usage Guidelines

- Use for destructive or irreversible actions
- Clearly explain consequences in description
- Always provide cancel option

---

### Tooltip

A hover component for displaying supplementary information.

- **Keywords:** tooltip, hint, info, hover, help
- **Categories:** overlay, data-display

#### Example

```tsx
import { Tooltip, Button, IconButton } from '@/components/ui'
import { Info } from 'lucide-react'

<Tooltip content="Click to copy">
  <Button variant="ghost" size="sm">0x1234...5678</Button>
</Tooltip>

<Tooltip content="Get more information">
  <IconButton variant="ghost" size="sm" aria-label="Info">
    <Info />
  </IconButton>
</Tooltip>
```

#### Props

| Prop     | Type        | Default      | Description     |
| -------- | ----------- | ------------ | --------------- |
| content  | `ReactNode` | **required** | Tooltip content |
| children | `ReactNode` | **required** | Trigger element |

#### Usage Guidelines

- Use for supplementary info, not critical information
- Keep content brief (1-2 sentences max)
- Don't use on disabled elements

---

### Popover

A component for displaying interactive content in a floating panel.

- **Keywords:** popover, dropdown, panel, menu, floating
- **Categories:** overlay, navigation

#### Example

```tsx
import { Popover, Button, Checkbox } from "@/components/ui";

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
</Popover>;
```

#### Usage Guidelines

- Use for interactive content (checkboxes, links, buttons)
- Use Tooltip for simple text information

---

### Toast

A component for displaying temporary feedback messages.

- **Keywords:** toast, notification, alert, feedback, snackbar
- **Categories:** feedback, overlay

#### Example

```tsx
import { useToast, Button } from "@/components/ui";

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: "Success!",
          description: "Your changes have been saved.",
        })
      }
    >
      Save
    </Button>
  );
}
```

#### Usage Guidelines

- Use for transient, non-critical feedback
- Auto-dismiss after 4-5 seconds
- Keep messages brief and actionable

---

### Progress

A component for displaying completion progress.

- **Keywords:** progress, loading, percentage, bar
- **Categories:** feedback, data-display

#### Example

```tsx
import { Progress } from '@/components/ui'

<Progress value={75} max={100} />
<Progress value={3} max={5} />
```

#### Props

| Prop  | Type     | Default      | Description      |
| ----- | -------- | ------------ | ---------------- |
| value | `number` | **required** | Current progress |
| max   | `number` | `100`        | Maximum value    |

---

### ScrollArea

A styled scrollable container with custom scrollbars.

- **Keywords:** scroll, scrollbar, overflow, container
- **Categories:** layout

#### Example

```tsx
import { ScrollArea } from "@/components/ui";

<ScrollArea className="h-[300px]">
  <div className="space-y-100">
    {items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
</ScrollArea>;
```

#### Usage Guidelines

- Set explicit height via className
- Use for long lists, chat windows, log displays

---

### NumberField

A numeric input with increment/decrement controls.

- **Keywords:** number, stepper, quantity, input
- **Categories:** forms, input

#### Example

```tsx
import { NumberField } from '@/components/ui'

<NumberField label="Quantity" placeholder="0" min={0} max={100} step={1} />
<NumberField label="Price" placeholder="0.00" min={0} step={0.01} />
```

#### Props

| Prop        | Type     | Default | Description      |
| ----------- | -------- | ------- | ---------------- |
| label       | `string` | -       | Input label      |
| placeholder | `string` | -       | Placeholder text |
| min         | `number` | -       | Minimum value    |
| max         | `number` | -       | Maximum value    |
| step        | `number` | `1`     | Increment step   |

---

### DashboardCard

A pre-styled card component for dashboard metrics and content.

- **Keywords:** card, dashboard, metric, stats, KPI
- **Categories:** layout, data-display

#### Example

```tsx
import { DashboardCard } from "@/components/ui";

<DashboardCard variant="default" size="md">
  <DashboardCard.Header title="Total value" />
  <DashboardCard.Metric value="$1,234,567" change="+12.5%" trend="positive" />
  <DashboardCard.Content>{/* Additional content */}</DashboardCard.Content>
  <DashboardCard.Footer>
    <Button variant="ghost" size="sm">
      View details
    </Button>
  </DashboardCard.Footer>
</DashboardCard>;
```

#### Props (DashboardCard)

| Prop    | Type                      | Default     | Description  |
| ------- | ------------------------- | ----------- | ------------ |
| variant | `'default' \| 'outlined'` | `'default'` | Card style   |
| size    | `'sm' \| 'md' \| 'lg'`    | `'md'`      | Padding size |

#### Props (DashboardCard.Metric)

| Prop   | Type                                    | Default      | Description                    |
| ------ | --------------------------------------- | ------------ | ------------------------------ |
| value  | `string \| number`                      | **required** | Main metric value              |
| label  | `string`                                | -            | Metric label                   |
| change | `string`                                | -            | Change indicator (e.g., "+5%") |
| trend  | `'positive' \| 'negative' \| 'neutral'` | `'neutral'`  | Trend direction                |

---

### Navbar

A navigation bar component for application headers.

- **Keywords:** navbar, navigation, header, menu
- **Categories:** layout, navigation

#### Example

```tsx
import { Navbar, Button } from "@/components/ui";

<Navbar sticky>
  <Navbar.Brand>
    <Navbar.Logo />
    <Navbar.Links>
      <Navbar.Link href="/">Home</Navbar.Link>
      <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
      <Navbar.Link href="/settings">Settings</Navbar.Link>
    </Navbar.Links>
  </Navbar.Brand>
  <Navbar.Actions>
    <Button variant="primary" size="sm">
      Connect wallet
    </Button>
  </Navbar.Actions>
</Navbar>;
```

#### Props (Navbar)

| Prop    | Type        | Default     | Description              |
| ------- | ----------- | ----------- | ------------------------ |
| sticky  | `boolean`   | `true`      | Stick to top of viewport |
| variant | `'default'` | `'default'` | Navbar style             |

---

### ModalPresets

Pre-configured modal components for common use cases: confirmation, forms, and info.

- **Keywords:** modal, confirmation, form, info, preset
- **Categories:** overlay, forms

#### Example

```tsx
import { ConfirmationModal, FormModal, InfoModal, Field } from '@/components/ui'

// Confirmation modal (for destructive actions)
<ConfirmationModal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Delete project?"
  description="This action cannot be undone."
  variant="danger"
  confirmLabel="Delete"
  onConfirm={handleDelete}
/>

// Form modal
<FormModal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Create project"
  description="Enter project details"
  submitLabel="Create"
  onSubmit={handleSubmit}
>
  <Field label="Project name" placeholder="My project" />
</FormModal>

// Info modal
<InfoModal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="About this feature"
  description="This feature allows you to..."
/>
```

#### Props (ConfirmationModal)

| Prop         | Type                                           | Default      | Description           |
| ------------ | ---------------------------------------------- | ------------ | --------------------- |
| open         | `boolean`                                      | **required** | Modal open state      |
| onOpenChange | `(open: boolean) => void`                      | **required** | State handler         |
| title        | `string`                                       | **required** | Modal title           |
| description  | `string`                                       | -            | Modal description     |
| variant      | `'danger' \| 'warning' \| 'info' \| 'success'` | `'danger'`   | Icon and button style |
| confirmLabel | `string`                                       | `'Confirm'`  | Confirm button text   |
| cancelLabel  | `string`                                       | `'Cancel'`   | Cancel button text    |
| onConfirm    | `() => void`                                   | **required** | Confirm callback      |
| loading      | `boolean`                                      | `false`      | Show loading state    |

---

### Placeholder

A placeholder component for empty states or loading content areas.

- **Keywords:** placeholder, empty, loading, skeleton
- **Categories:** feedback, layout

#### Example

```tsx
import { Placeholder } from "@/components/ui";

// Empty state
<Placeholder>
  No items found. Create your first item to get started.
</Placeholder>;
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

| Class                                                  | Use             |
| ------------------------------------------------------ | --------------- |
| `.text-heading-h4`, `.text-heading-h5`                 | Page titles     |
| `.text-heading-h6`, `.text-label-md`, `.text-label-xl` | Section titles  |
| `.text-body-base`, `.text-body-sm`                     | Body text       |
| `.text-body-sm`, `.text-body-xs`                       | Secondary text  |
| `.text-label-sm`, `.text-label-md`                     | Labels, buttons |
| `.text-label-xs`                                       | Captions        |

### Border Radius

| Token                                        | Use            |
| -------------------------------------------- | -------------- |
| `rounded-sm` , `rounded-xs`, `rounded-md`    | Small elements |
| `rounded-md`, `rounded-lg` , `rounded-xl`    | Cards, inputs  |
| `rounded-2xl`, `rounded-3xl`, `rounded-4xl`, | Large cards    |
| `rounded-pill`                               | Pills, buttons |

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
- ✅ **Always display 2 decimals** for values: "1,234.00 USDC", "5.25%"
- ✅ **Use 6 decimals for BTC tokens** (syrupBTC, BTC, lstBTC, WBTC, cbBTC, or any token containing "BTC"): "0.123456 BTC"
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

---

## File Locations

| What                   | Where                               |
| ---------------------- | ----------------------------------- |
| Create prototypes      | `src/app/{feature-name}/page.tsx`   |
| Import components      | `@/components/ui`                   |
| Check available tokens | `src/app/globals.css`               |
| See component examples | `src/app/{component-name}/page.tsx` |
