# Maple Component Library Reference

> **Comprehensive documentation for each UI component in the Atlassian style**

---

## Button

A component for triggering actions with text. Use `Button` for text buttons (optionally with icons) and `IconButton` for icon-only buttons.

- **Keywords:** button, action, submit, click, primary, secondary, CTA
- **Categories:** actions, forms, navigation
- **Status:** production

### Example

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

### Props

| Prop       | Type                                                                                      | Default     | Description                       |
| ---------- | ----------------------------------------------------------------------------------------- | ----------- | --------------------------------- |
| variant    | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'brand' \| 'negative' \| 'outline'` | `'primary'` | Visual style                      |
| size       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                    | `'md'`      | Button size                       |
| beforeIcon | `ReactNode`                                                                               | -           | Icon displayed before text        |
| afterIcon  | `ReactNode`                                                                               | -           | Icon displayed after text         |
| fullWidth  | `boolean`                                                                                 | `false`     | Stretch button to container width |
| disabled   | `boolean`                                                                                 | `false`     | Disable interaction               |

### Usage Guidelines

- Use **primary** for the main action on a page (limit to one per view)
- Use **secondary** for supporting actions next to primary
- Use **tertiary** for less important actions in tight spaces
- Use **ghost** for low-emphasis actions (toolbars, inline actions)
- Use **negative** ONLY for destructive actions (delete, remove, disconnect)
- Always include text label — for icon-only buttons, use `IconButton`
- Use sentence case: "Save changes" not "Save Changes"
- Use verb + noun pattern: "Add item" not just "Add"

### Prop Guidance

- **variant** — Choose based on action importance, not aesthetics
- **size** — Match the surrounding UI context (use `sm` in compact tables, `lg` for hero CTAs)
- **beforeIcon** — Use for actions (Plus for add, Trash for delete)
- **afterIcon** — Use for navigation arrows or external link indicators
- **fullWidth** — Use in mobile layouts or form footers

### Translating from Tailwind

```diff
- <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-orange-500">
-   Submit
- </button>
+ <Button>Submit</Button>

- <button className="bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50">
-   Cancel
- </button>
+ <Button variant="secondary">Cancel</Button>

- <button className="bg-transparent hover:bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2">
-   <PlusIcon className="w-4 h-4" />
-   Add item
- </button>
+ <Button variant="ghost" beforeIcon={<Plus />}>Add item</Button>

- <button className="bg-red-500 text-white px-4 py-2 rounded-full">
-   Delete
- </button>
+ <Button variant="negative">Delete</Button>
```

---

## IconButton

A button component for icon-only interactions without text labels. Always include `aria-label` for accessibility.

- **Keywords:** icon button, toolbar, action, icon-only, compact
- **Categories:** actions, toolbars, navigation
- **Status:** production

### Example

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

### Props

| Prop       | Type                                                                           | Default      | Description                  |
| ---------- | ------------------------------------------------------------------------------ | ------------ | ---------------------------- |
| variant    | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'negative' \| 'outline'` | `'ghost'`    | Visual style                 |
| size       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                         | `'md'`       | Button size                  |
| aria-label | `string`                                                                       | **required** | Accessible label (mandatory) |
| disabled   | `boolean`                                                                      | `false`      | Disable interaction          |
| children   | `ReactNode`                                                                    | -            | Icon element                 |

### Usage Guidelines

- **ALWAYS** include `aria-label` — this is required for accessibility
- Use for toolbars, table actions, close buttons, menu triggers
- Do NOT use when text would improve clarity — prefer `Button` with `beforeIcon`
- Use `ghost` variant for most cases unless emphasis is needed
- Common icons: `X` (close), `MoreHorizontal` (menu), `Settings`, `Search`, `Plus`

### Prop Guidance

- **aria-label** — Use clear, action-oriented text: "Close dialog", "Open menu", "Delete item"
- **variant** — Use `ghost` in toolbars, `secondary` for standalone actions
- **size** — Match surrounding elements; use `xs` or `sm` in compact spaces

### Translating from Tailwind

```diff
- <button className="p-2 rounded-full hover:bg-gray-100">
-   <XIcon className="w-4 h-4" />
- </button>
+ <IconButton aria-label="Close"><X /></IconButton>

- <button className="p-2 bg-gray-100 rounded-full">
-   <SettingsIcon className="w-5 h-5" />
- </button>
+ <IconButton variant="secondary" aria-label="Settings"><Settings /></IconButton>
```

---

## Link

A component for navigation, both internal and external. Use instead of raw `<a>` elements.

- **Keywords:** link, anchor, navigation, external, href, url
- **Categories:** navigation, text
- **Status:** production

### Example

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

// With arrow
<Link href="/features" afterIcon={<ArrowRight />}>View all features</Link>
```

### Props

| Prop       | Type                                            | Default      | Description                                     |
| ---------- | ----------------------------------------------- | ------------ | ----------------------------------------------- |
| href       | `string`                                        | **required** | URL or path                                     |
| type       | `'primary' \| 'inverse-primary' \| 'secondary'` | `'primary'`  | Color style                                     |
| size       | `'medium' \| 'small' \| 'x-small'`              | `'medium'`   | Text size                                       |
| underlined | `boolean`                                       | `false`      | Show underline                                  |
| external   | `boolean`                                       | `false`      | Opens in new tab with rel="noopener noreferrer" |
| beforeIcon | `ReactNode`                                     | -            | Icon before text                                |
| afterIcon  | `ReactNode`                                     | -            | Icon after text                                 |

### Usage Guidelines

- Use `Link` for navigation, `Button` for actions
- Add `external` prop for links opening in new tabs
- Include `ExternalLink` icon for external URLs
- Use descriptive link text, not "click here" or "learn more"
- Use `secondary` type for footer links or less important navigation

### Prop Guidance

- **external** — Always set to `true` for URLs outside your domain
- **afterIcon** — Use `ExternalLink` for external, `ArrowRight` for call-to-action
- **underlined** — Use for inline links within body text

### Translating from Tailwind

```diff
- <a href="/dashboard" className="text-gray-900 hover:text-orange-500">
-   Dashboard
- </a>
+ <Link href="/dashboard">Dashboard</Link>

- <a href="https://docs.example.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
-   Documentation
-   <ExternalLinkIcon className="w-4 h-4" />
- </a>
+ <Link href="https://docs.example.com" external afterIcon={<ExternalLink />}>Documentation</Link>
```

---

## Avatar

A component for displaying user or entity identity with images or initials.

- **Keywords:** avatar, user, profile, image, initials, identity
- **Categories:** data-display, identity
- **Status:** production

### Example

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

// Auto-generate initials from alt
<Avatar alt="Jane Smith" size="md" />
```

### Props

| Prop       | Type                                                                                                                           | Default     | Description                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------- |
| src        | `string`                                                                                                                       | -           | Image URL                                 |
| alt        | `string`                                                                                                                       | -           | Alt text (also used for auto-initials)    |
| fallback   | `ReactNode`                                                                                                                    | -           | Content when image fails (initials, icon) |
| size       | `'3xs' \| '2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                              | `'md'`      | Avatar size                               |
| type       | `'primary' \| 'secondary' \| 'brand' \| 'pink' \| 'fuchsia' \| 'violet' \| 'teal' \| 'lime' \| 'aave' \| 'cowswap' \| 'fluid'` | `'primary'` | Fallback color                            |
| appearance | `'default' \| 'subtle'`                                                                                                        | `'default'` | Fallback color intensity                  |

### Usage Guidelines

- Always provide `alt` text for images
- Use `fallback` with initials when image might not load
- Use consistent sizing within the same context
- For teams/groups, consider using partner types (`aave`, `cowswap`)
- Use `3xs`/`2xs` for inline mentions, `lg`/`xl` for profile headers

### Prop Guidance

- **fallback** — Use 2-character initials: "JD" for "John Doe"
- **type** — Choose colors that distinguish different categories (teams, roles)
- **appearance** — Use `subtle` for secondary contexts, `default` for primary

### Translating from Tailwind

```diff
- <img src="/avatar.jpg" alt="User" className="w-10 h-10 rounded-full" />
+ <Avatar src="/avatar.jpg" alt="User" size="md" />

- <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
-   JD
- </div>
+ <Avatar fallback="JD" type="brand" />
```

---

## TokenLogo

A component for displaying cryptocurrency/protocol logos. The token prop MUST match the displayed token name.

- **Keywords:** token, logo, crypto, asset, protocol, icon
- **Categories:** data-display, crypto
- **Status:** production

### Example

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

// Sizes
<TokenLogo token="usdc" size="3xs" />
<TokenLogo token="usdc" size="xs" />
<TokenLogo token="usdc" size="sm" />
<TokenLogo token="usdc" size="md" />
<TokenLogo token="usdc" size="lg" />
<TokenLogo token="usdc" size="xl" />
```

### Props

| Prop  | Type                                                              | Default      | Description                  |
| ----- | ----------------------------------------------------------------- | ------------ | ---------------------------- |
| token | `string`                                                          | **required** | Token identifier (lowercase) |
| size  | `'3xs' \| '2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'`       | Logo size                    |

### Available Tokens

`aave`, `arbitrium`, `balancer`, `btc`, `cbbtc`, `cowswap`, `dai`, `drips`, `eth`, `fluid`, `hype`, `jitosol`, `jupiter`, `kamino`, `lbtc`, `lombard`, `maple`, `midas`, `morpho`, `orca`, `pendle`, `plasma`, `sky`, `sol`, `spark`, `superform`, `susde`, `syrupbtc`, `syrupusdc`, `syrupusdt`, `teth`, `uni`, `usdc`, `usde`, `usds`, `usdt`, `usdt0`, `usr`, `ustb`, `wbtc`, `weth`, `xrp`

### Usage Guidelines

- **CRITICAL**: Token prop MUST match the token name shown in UI text
- Token names are lowercase: `usdc` not `USDC`
- Use in tables, cards, and anywhere displaying asset/protocol info
- Always pair with text label for clarity

### Prop Guidance

- **token** — Use exact token identifier from the available list
- **size** — Use `sm` in tables, `md` in cards, `lg` in headers

### Translating from Tailwind

```diff
- <img src="/logos/usdc.svg" alt="USDC" className="w-6 h-6" />
+ <TokenLogo token="usdc" size="sm" />

- <div className="flex items-center gap-2">
-   <img src="/logos/eth.svg" alt="ETH" className="w-8 h-8" />
-   <span>Ethereum</span>
- </div>
+ <div className="flex items-center gap-75">
+   <TokenLogo token="eth" size="md" />
+   <span className="text-label-md">Ethereum</span>
+ </div>
```

---

## Badge

A circular component for displaying counts, status indicators, or small icons.

- **Keywords:** badge, count, notification, indicator, status, number
- **Categories:** data-display, status
- **Status:** production

### Example

```tsx
import { Badge } from '@/components/ui'
import { Check, X, AlertCircle } from 'lucide-react'

// Numbers
<Badge type="primary" size="20">3</Badge>
<Badge type="positive" size="24">12</Badge>
<Badge type="negative" size="16">!</Badge>

// Status types
<Badge type="positive" size="20">✓</Badge>
<Badge type="negative" size="20">✗</Badge>
<Badge type="warning" size="20">!</Badge>
<Badge type="info" size="20">i</Badge>

// Appearances
<Badge type="brand" appearance="default">5</Badge>
<Badge type="brand" appearance="subtle">5</Badge>

// With icons
<Badge type="positive" size="24" icon={<Check />} />
<Badge type="negative" size="24" icon={<X />} />
```

### Props

| Prop       | Type                                                                                                 | Default     | Description                 |
| ---------- | ---------------------------------------------------------------------------------------------------- | ----------- | --------------------------- |
| size       | `'12' \| '16' \| '20' \| '24' \| '32' \| '36' \| '40' \| '48' \| '56'`                               | `'56'`      | Badge diameter in pixels    |
| type       | `'primary' \| 'secondary' \| 'brand' \| 'info' \| 'positive' \| 'warning' \| 'negative' \| 'custom'` | `'primary'` | Color scheme                |
| appearance | `'default' \| 'subtle'`                                                                              | `'default'` | Color intensity             |
| icon       | `ReactNode`                                                                                          | -           | Icon instead of text        |
| children   | `ReactNode`                                                                                          | -           | Badge content (number/text) |

### Usage Guidelines

- Use for notification counts, status indicators, step numbers
- Keep content short (1-2 characters or small icon)
- Use `positive` for success, `negative` for errors, `warning` for alerts
- Use `subtle` appearance for less prominent indicators
- Size `20` works well for inline indicators, `32`+ for standalone badges

### Prop Guidance

- **size** — Match context: `16`-`20` inline, `24`-`32` in cards, `40`+ for emphasis
- **type** — Semantic meaning: positive=success, negative=error, warning=caution
- **appearance** — Use `subtle` when badge is secondary information

### Translating from Tailwind

```diff
- <span className="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
-   3
- </span>
+ <Badge type="negative" size="20">3</Badge>

- <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full">
-   <CheckIcon className="w-4 h-4" />
- </span>
+ <Badge type="positive" appearance="subtle" size="24" icon={<Check />} />
```

---

## Pill

A rounded rectangle component for tags, labels, and categories. Use instead of Badge when content is text-based.

- **Keywords:** pill, tag, label, category, chip, filter
- **Categories:** data-display, filtering
- **Status:** production

### Example

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

// Sizes
<Pill size="sm">Small</Pill>
<Pill size="md">Medium</Pill>
<Pill size="lg">Large</Pill>
```

### Props

| Prop       | Type                                                                                                 | Default     | Description     |
| ---------- | ---------------------------------------------------------------------------------------------------- | ----------- | --------------- |
| type       | `'primary' \| 'secondary' \| 'brand' \| 'info' \| 'positive' \| 'warning' \| 'negative' \| 'custom'` | `'primary'` | Color scheme    |
| appearance | `'default' \| 'subtle' \| 'ghost'`                                                                   | `'default'` | Color intensity |
| size       | `'sm' \| 'md' \| 'lg'`                                                                               | `'md'`      | Pill size       |
| children   | `ReactNode`                                                                                          | -           | Pill content    |

### Usage Guidelines

- Use for categories, tags, status labels, filter chips
- Keep text short (1-3 words)
- Use consistent types for the same categories across your app
- Use `ghost` for filter chips that can be toggled
- Prefer `Pill` over `Badge` for text content

### Translating from Tailwind

```diff
- <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
-   DeFi
- </span>
+ <Pill type="brand" appearance="subtle">DeFi</Pill>

- <span className="px-2 py-0.5 bg-green-500 text-white rounded-full text-xs">
-   Active
- </span>
+ <Pill type="positive" size="sm">Active</Pill>
```

---

## Field

A complete form input component with label, description, and error handling built-in.

- **Keywords:** input, field, form, text, email, password, label
- **Categories:** forms, input
- **Status:** production

### Example

```tsx
import { Field } from '@/components/ui'

// Basic input
<Field
  label="Email address"
  placeholder="you@example.com"
  type="email"
/>

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
<Field label="Small" size="sm" placeholder="Small" />
<Field label="Default" size="md" placeholder="Medium" />
<Field label="Large" size="lg" placeholder="Large" />

// Required field
<Field label="Full name" placeholder="John Doe" required />

// Disabled
<Field label="Email" value="locked@example.com" disabled />
```

### Props

| Prop         | Type                                                            | Default     | Description             |
| ------------ | --------------------------------------------------------------- | ----------- | ----------------------- |
| label        | `string`                                                        | -           | Input label             |
| description  | `string`                                                        | -           | Helper text below label |
| placeholder  | `string`                                                        | -           | Placeholder text        |
| type         | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'`    | Input type              |
| size         | `'xs' \| 'sm' \| 'md' \| 'lg'`                                  | `'md'`      | Input size              |
| variant      | `'primary' \| 'ghost'`                                          | `'primary'` | Visual style            |
| errorMessage | `string`                                                        | -           | Error text              |
| invalid      | `boolean`                                                       | `false`     | Show error state        |
| required     | `boolean`                                                       | `false`     | Mark as required        |
| disabled     | `boolean`                                                       | `false`     | Disable input           |

### Usage Guidelines

- Always include a `label` — never rely on placeholder alone
- Use `description` to explain format requirements
- Show errors inline with `errorMessage` + `invalid`
- Use appropriate `type` for validation (email, tel, url)
- Use `lg` size for primary forms, `sm`/`xs` for compact UIs

### Prop Guidance

- **label** — Required for accessibility; use sentence case
- **description** — Explain format: "Must be 8+ characters", "We'll never share this"
- **errorMessage** — Be specific: "Email must include @" not just "Invalid"
- **type** — Enables proper mobile keyboards and browser validation

### Translating from Tailwind

```diff
- <div>
-   <label className="block text-sm font-medium text-gray-700">Email</label>
-   <input
-     type="email"
-     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
-     placeholder="you@example.com"
-   />
- </div>
+ <Field label="Email" type="email" placeholder="you@example.com" />

- <div>
-   <label className="block text-sm text-gray-700">Password</label>
-   <input type="password" className="border border-red-500 rounded-md" />
-   <p className="text-red-500 text-sm">Password is required</p>
- </div>
+ <Field label="Password" type="password" errorMessage="Password is required" invalid />
```

---

## Select

A dropdown component for selecting from a list of options.

- **Keywords:** select, dropdown, picker, options, menu, choice
- **Categories:** forms, input
- **Status:** production

### Example

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
<Select options={options} size="xs" placeholder="Extra small" />
<Select options={options} size="sm" placeholder="Small" />
<Select options={options} size="md" placeholder="Medium" />
<Select options={options} size="lg" placeholder="Large" />

// With error
<Select
  label="Country"
  options={countries}
  placeholder="Select country"
  error="Country is required"
/>
```

### Props

| Prop        | Type                                   | Default      | Description        |
| ----------- | -------------------------------------- | ------------ | ------------------ |
| options     | `{ value: string, label: string }[]`   | **required** | List of options    |
| placeholder | `string`                               | -            | Placeholder text   |
| label       | `string`                               | -            | Label above select |
| description | `string`                               | -            | Helper text        |
| size        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`       | Select size        |
| error       | `string`                               | -            | Error message      |
| disabled    | `boolean`                              | `false`      | Disable select     |

### Usage Guidelines

- Provide meaningful `placeholder` text
- Use for 4+ options; for 2-3 options, consider Radio buttons
- Keep option labels concise
- Order options logically (alphabetical, most common first, etc.)

### Translating from Tailwind

```diff
- <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
-   <option value="">Select asset</option>
-   <option value="usdc">USDC</option>
-   <option value="usdt">USDT</option>
- </select>
+ <Select
+   options={[
+     { value: 'usdc', label: 'USDC' },
+     { value: 'usdt', label: 'USDT' },
+   ]}
+   placeholder="Select asset"
+ />
```

---

## Tabs

A component for organizing content into switchable panels.

- **Keywords:** tabs, tabbed, panels, navigation, sections
- **Categories:** navigation, layout
- **Status:** production

### Example

```tsx
import { Tabs } from '@/components/ui'

// Basic usage
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
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs.Root>
```

### Props (Tabs.Root)

| Prop          | Type                      | Default      | Description                  |
| ------------- | ------------------------- | ------------ | ---------------------------- |
| defaultValue  | `string`                  | **required** | Initially selected tab value |
| value         | `string`                  | -            | Controlled selected value    |
| onValueChange | `(value: string) => void` | -            | Callback on tab change       |

### Props (Tabs.List)

| Prop    | Type                                   | Default       | Description              |
| ------- | -------------------------------------- | ------------- | ------------------------ |
| padding | `'noPadding' \| 'withPadding'`         | `'noPadding'` | List container padding   |
| variant | `'canvas' \| 'primary' \| 'secondary'` | `'canvas'`    | Background color variant |

### Usage Guidelines

- Always have a minimum of 2 tabs
- First tab should be selected by default
- Keep tab labels short (1-2 words)
- Use sentence case for labels
- Don't use tabs for workflow steps (use stepper instead)

### Translating from Tailwind

```diff
- <div className="flex border-b">
-   <button className="px-4 py-2 text-orange-500 border-b-2 border-orange-500">Overview</button>
-   <button className="px-4 py-2 text-gray-500">Positions</button>
- </div>
- <div className="p-4">Tab content</div>
+ <Tabs.Root defaultValue="overview">
+   <Tabs.List>
+     <Tabs.Tab value="overview">Overview</Tabs.Tab>
+     <Tabs.Tab value="positions">Positions</Tabs.Tab>
+   </Tabs.List>
+   <Tabs.Panel value="overview">Tab content</Tabs.Panel>
+   <Tabs.Panel value="positions">Positions content</Tabs.Panel>
+ </Tabs.Root>
```

---

## Checkbox

A component for binary (checked/unchecked) selection.

- **Keywords:** checkbox, check, toggle, boolean, selection
- **Categories:** forms, input
- **Status:** production

### Example

```tsx
import { Checkbox } from '@/components/ui'

// Basic
<Checkbox>Accept terms and conditions</Checkbox>

// Checked by default
<Checkbox defaultChecked>Enable notifications</Checkbox>

// Sizes
<Checkbox size="3xs">Small checkbox</Checkbox>
<Checkbox size="2xs">Default checkbox</Checkbox>

// Disabled
<Checkbox disabled>Disabled option</Checkbox>
<Checkbox disabled defaultChecked>Disabled checked</Checkbox>
```

### Props

| Prop           | Type             | Default | Description       |
| -------------- | ---------------- | ------- | ----------------- |
| size           | `'3xs' \| '2xs'` | `'3xs'` | Checkbox size     |
| defaultChecked | `boolean`        | `false` | Initially checked |
| disabled       | `boolean`        | `false` | Disable checkbox  |
| children       | `ReactNode`      | -       | Label text        |

### Usage Guidelines

- Use for optional settings that can be independently toggled
- Label should clearly state what happens when checked
- For mutually exclusive options, use Radio instead
- For simple on/off toggles without labels, consider Switch

---

## Radio

A component for selecting one option from a group.

- **Keywords:** radio, option, choice, group, single-select
- **Categories:** forms, input
- **Status:** production

### Example

```tsx
import { Radio } from '@/components/ui'

// Basic group
<Radio.Root defaultValue="option1">
  <Radio.Item value="option1">Option 1</Radio.Item>
  <Radio.Item value="option2">Option 2</Radio.Item>
  <Radio.Item value="option3">Option 3</Radio.Item>
</Radio.Root>

// Horizontal layout
<Radio.Root defaultValue="monthly" orientation="horizontal">
  <Radio.Item value="monthly">Monthly</Radio.Item>
  <Radio.Item value="yearly">Yearly</Radio.Item>
</Radio.Root>
```

### Props (Radio.Root)

| Prop          | Type                         | Default      | Description              |
| ------------- | ---------------------------- | ------------ | ------------------------ |
| defaultValue  | `string`                     | -            | Initially selected value |
| value         | `string`                     | -            | Controlled value         |
| onValueChange | `(value: string) => void`    | -            | Callback on change       |
| orientation   | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction         |

### Usage Guidelines

- Use for 2-5 mutually exclusive options
- For more options, consider Select dropdown
- Always have one option pre-selected when possible
- Use horizontal layout for 2-3 short options

---

## Switch

A toggle component for on/off binary states.

- **Keywords:** switch, toggle, on-off, boolean
- **Categories:** forms, input
- **Status:** production

### Example

```tsx
import { Switch } from '@/components/ui'

// Basic
<Switch />

// Default checked
<Switch defaultChecked />

// Sizes
<Switch size="2xs" />
<Switch size="xs" />
<Switch size="sm" />
<Switch size="md" />

// With label (using separate label element)
<label className="flex items-center gap-75">
  <Switch size="sm" defaultChecked />
  <span className="text-label-sm">Enable dark mode</span>
</label>
```

### Props

| Prop           | Type                            | Default | Description    |
| -------------- | ------------------------------- | ------- | -------------- |
| size           | `'2xs' \| 'xs' \| 'sm' \| 'md'` | `'sm'`  | Switch size    |
| defaultChecked | `boolean`                       | `false` | Initially on   |
| disabled       | `boolean`                       | `false` | Disable switch |

### Usage Guidelines

- Use for immediate effect toggles (settings, preferences)
- Label should describe the ON state
- Use Checkbox if action requires submit button

---

## Dialog

A modal component for focused interactions that require user attention.

- **Keywords:** dialog, modal, overlay, popup, form
- **Categories:** overlay, forms
- **Status:** production

### Example

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

### Usage Guidelines

- Use for forms, confirmations, and focused tasks
- Always include a way to close/cancel
- Keep content focused on a single task
- Use AlertDialog for confirmations with consequences

---

## AlertDialog

A confirmation dialog for actions with significant consequences.

- **Keywords:** alert, confirm, warning, destructive, delete
- **Categories:** overlay, feedback
- **Status:** production

### Example

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

### Usage Guidelines

- Use for destructive or irreversible actions
- Clearly explain consequences in description
- Primary action should match trigger intent (Delete → Delete button)
- Always provide cancel option

---

## Tooltip

A hover component for displaying supplementary information.

- **Keywords:** tooltip, hint, info, hover, help
- **Categories:** overlay, data-display
- **Status:** production

### Example

```tsx
import { Tooltip, Button, IconButton } from '@/components/ui'
import { Copy, Info } from 'lucide-react'

// Basic
<Tooltip content="Click to copy">
  <Button variant="ghost" size="sm">0x1234...5678</Button>
</Tooltip>

// With icon button
<Tooltip content="Get more information">
  <IconButton variant="ghost" size="sm" aria-label="Info">
    <Info />
  </IconButton>
</Tooltip>
```

### Props

| Prop     | Type        | Default      | Description     |
| -------- | ----------- | ------------ | --------------- |
| content  | `ReactNode` | **required** | Tooltip content |
| children | `ReactNode` | **required** | Trigger element |

### Usage Guidelines

- Use for supplementary info, not critical information
- Keep content brief (1-2 sentences max)
- Don't use on disabled elements (they can't be hovered)
- Don't use on touch-only interfaces

---

## Popover

A component for displaying interactive content in a floating panel.

- **Keywords:** popover, dropdown, panel, menu, floating
- **Categories:** overlay, navigation
- **Status:** production

### Example

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
          <Checkbox>Compact view</Checkbox>
        </div>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover>;
```

### Usage Guidelines

- Use for interactive content (checkboxes, links, buttons)
- Use Tooltip for simple text information
- Close on outside click by default
- Keep content focused and minimal

---

## Toast

A component for displaying temporary feedback messages.

- **Keywords:** toast, notification, alert, feedback, snackbar
- **Categories:** feedback, overlay
- **Status:** production

### Example

```tsx
import { Toast, useToast, Button } from "@/components/ui";

function MyComponent() {
  const { toast } = useToast();

  return (
    <>
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

      <Button
        onClick={() =>
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          })
        }
      >
        Show error
      </Button>
    </>
  );
}
```

### Usage Guidelines

- Use for transient, non-critical feedback
- Auto-dismiss after 4-5 seconds
- Keep messages brief and actionable
- Don't use for errors requiring user action (use AlertDialog)

---

## Progress

A component for displaying completion progress.

- **Keywords:** progress, loading, percentage, bar
- **Categories:** feedback, data-display
- **Status:** production

### Example

```tsx
import { Progress } from '@/components/ui'

<Progress value={75} max={100} />
<Progress value={3} max={5} />
<Progress value={50} />
```

### Props

| Prop  | Type     | Default      | Description      |
| ----- | -------- | ------------ | ---------------- |
| value | `number` | **required** | Current progress |
| max   | `number` | `100`        | Maximum value    |

---

## ScrollArea

A styled scrollable container with custom scrollbars.

- **Keywords:** scroll, scrollbar, overflow, container
- **Categories:** layout
- **Status:** production

### Example

```tsx
import { ScrollArea } from "@/components/ui";

<ScrollArea className="h-[300px]">
  {/* Large content that scrolls */}
  <div className="space-y-100">
    {items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
</ScrollArea>;
```

### Usage Guidelines

- Set explicit height via className
- Use for long lists, chat windows, log displays
- Provides consistent scrollbar styling across browsers

---

## NumberField

A numeric input with increment/decrement controls.

- **Keywords:** number, stepper, quantity, input
- **Categories:** forms, input
- **Status:** production

### Example

```tsx
import { NumberField } from '@/components/ui'

<NumberField
  label="Quantity"
  placeholder="0"
  min={0}
  max={100}
  step={1}
/>

<NumberField
  label="Price"
  placeholder="0.00"
  min={0}
  step={0.01}
/>
```

### Props

| Prop        | Type     | Default | Description      |
| ----------- | -------- | ------- | ---------------- |
| label       | `string` | -       | Input label      |
| placeholder | `string` | -       | Placeholder text |
| min         | `number` | -       | Minimum value    |
| max         | `number` | -       | Maximum value    |
| step        | `number` | `1`     | Increment step   |
