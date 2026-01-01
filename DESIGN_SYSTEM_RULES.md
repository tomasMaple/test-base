# Design System Rules

To maintain high visual quality and consistency, all components must adhere to the following strict token usage rules. **The use of Tailwind CSS default values is prohibited.**

## 🚫 Prohibited Defaults

Do NOT use these Tailwind defaults (always use the Token equivalent):

| Category     | Tailwind Default (AVOID)       | Project Token (USE)                        |
| :----------- | :----------------------------- | :----------------------------------------- |
| **Colors**   | `bg-blue-500`, `text-gray-900` | `bg-brand-primary`, `text-fg-primary`      |
| **Spacing**  | `p-4`, `gap-2`, `m-10`         | `p-100`, `gap-50`, `m-250`                 |
| **Sizing**   | `w-5`, `h-5`, `size-4`         | `w-size-md`, `h-size-md`, `size-size-2xs`  |
| **Radius**   | `rounded-sm`, `rounded-md`     | `rounded-sm`, `rounded-md`, `rounded-pill` |
| **Duration** | `duration-200`, `duration-300` | `duration-standard`, `duration-fast`       |
| **Easing**   | `ease-in-out`                  | `ease-default`                             |
| **Opacity**  | `opacity-50`                   | `opacity-disabled`                         |
| **Ring**     | `ring-2`, `ring-offset-2`      | `ring-size-focus`, `ring-offset-focus`     |

## 🛠️ Implementation Guide

### Sizing and Spacing

Our tokens often include prefixes like `size-` or `space-`. When using Tailwind v4 utilities, you may need to repeat the prefix if it's part of the token name.

- **Correct**: `size-size-2xs` (references `--spacing-size-2xs`)
- **Correct**: `gap-75` (references `--spacing-75`)

### Transitions

Always group transition properties with their corresponding tokens:

```tsx
const classes = "transition-all duration-standard ease-default";
```

### Focus Rings

Standardize focus rings across all interactive elements:

```tsx
const focus =
  "focus-visible:ring-ring-size-focus focus-visible:ring-offset-ring-offset-focus focus-visible:ring-brand-primary";
```
