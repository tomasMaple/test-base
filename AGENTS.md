# Agent Rules

> **This file provides instructions for AI agents building styled BaseUI components.**

---

## Quick Start (for PMs/Developers)

```bash
# Clone and install
git clone <repo-url>
cd new-test-base
npm install

# Run development server
npm run dev
```

---

## Tech Stack

| Layer      | Technology               | Version                 |
| ---------- | ------------------------ | ----------------------- |
| Framework  | Next.js                  | 16.1.1                  |
| React      | React                    | 19.2.3                  |
| Primitives | Base UI                  | `@base-ui/react` v1.0.0 |
| Styling    | Tailwind CSS             | v4                      |
| Variants   | class-variance-authority | Latest                  |
| Icons      | Lucide React             | Latest                  |

---

## Design Token Files

All styling MUST use tokens from these Supernova.io-generated files:

| File                   | Contains                                 |
| ---------------------- | ---------------------------------------- |
| `tailwind.colors.css`  | Semantic colors, shadows, brand colors   |
| `tailwind.desktop.css` | Typography, spacing, sizes, border radii |

**Theme classes required on root:**

- `.theme-desktop` — Typography, spacing, sizes
- `.theme-light` — Colors and shadows

---

## Agent Workflow Checklist

When creating a new component, agents MUST follow this sequence:

### 1. Create Component File

- [ ] Create file in `src/components/ui/{component}.tsx`
- [ ] Add `'use client'` directive at top
- [ ] Import Base UI primitive for the component type

### 2. Define Variants

- [ ] Create CVA variants using ONLY design tokens
- [ ] Use semantic colors: `--color-brand-primary`, `--color-positive-primary`, etc.
- [ ] Use spacing tokens: `--spacing-space-50`, `--spacing-space-100`, etc.
- [ ] Use size tokens: `--spacing-size-sm`, `--spacing-size-md`, `--spacing-size-lg`
- [ ] Use radius tokens: `--radius-border-radius-sm`, `--radius-border-radius-md`

### 3. Build Component

- [ ] Forward refs with `React.forwardRef`
- [ ] Set `displayName` property
- [ ] Export interface extending Base UI props + CVA variants
- [ ] Use `cn()` for className merging

### 4. Add Exports

- [ ] Add named export to `src/components/ui/index.ts`

### 5. Verify

- [ ] Component uses only design tokens (no arbitrary values)
- [ ] All interactive states styled via `data-*` attributes
- [ ] Accessibility: focus visible, disabled states

---

## Project Structure

```
src/
├── components/ui/    # Styled BaseUI components
├── lib/utils/        # Utility functions (cn, clsx)

app/
├── globals.css       # Global styles
├── layout.tsx        # Root layout with theme classes

# Design tokens (Supernova.io generated)
├── tailwind.colors.css
├── tailwind.desktop.css
```

---

## Cross-References

Component patterns and detailed styling rules:

- **[COMPONENT_RULES.md](./COMPONENT_RULES.md)** — Base UI patterns, CVA structure, token usage
- **[PROJECT_RULES.md](./PROJECT_RULES.md)** — Accessibility, performance, UI guidelines
