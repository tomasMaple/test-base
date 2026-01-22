# Agent Rules

> **Universal entry point for all AI coding assistants working on the Maple Design System.**

---

## Determine Your Role

**Answer this question to find your rules:**

| If you are...                                                | Read this file                                   |
| ------------------------------------------------------------ | ------------------------------------------------ |
| Building, fixing, or improving **components**                | [rules/component-dev.md](rules/component-dev.md) |
| Creating **prototypes or designs** using existing components | [rules/prototype-dev.md](rules/prototype-dev.md) |

---

## Tech Stack

| Layer      | Technology        | Version                            |
| ---------- | ----------------- | ---------------------------------- |
| Framework  | Next.js           | 16.x                               |
| React      | React             | 19.x                               |
| Primitives | Base UI           | `@base-ui-components/react` v1.0.0 |
| Styling    | Tailwind CSS      | v4                                 |
| Variants   | tailwind-variants | Latest                             |
| Icons      | Lucide React      | Latest                             |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Design tokens (source of truth)
│   └── layout.tsx         # Root layout with theme classes
├── components/
│   └── ui/                # Styled Base UI components
└── lib/
    └── utils.ts           # cn() and tv() utilities
```

---

## Quick Token Reference

### Colors (Most Used)

| Purpose          | Background    | Text               | Border                 |
| ---------------- | ------------- | ------------------ | ---------------------- |
| Default surface  | `bg-surface`  | `text-fg-primary`  | `border-border-subtle` |
| Primary action   | `bg-brand`    | `text-fg-on-brand` | `border-brand`         |
| Muted/disabled   | `bg-muted`    | `text-fg-subtle`   | `border-border-weak`   |
| Negative/error   | `bg-negative` | `text-negative`    | `border-negative`      |
| Positive/success | `bg-positive` | `text-positive`    | `border-positive`      |

### Spacing

| Token               | Value | Use      |
| ------------------- | ----- | -------- |
| `p-50` / `gap-50`   | 8px   | Tight    |
| `p-75` / `gap-75`   | 12px  | Default  |
| `p-100` / `gap-100` | 16px  | Standard |
| `p-150` / `gap-150` | 24px  | Large    |
| `p-200` / `gap-200` | 32px  | Section  |

### Typography

| Class                                                | Use            |
| ---------------------------------------------------- | -------------- |
| `.text-heading-h1` to `.text-heading-h7`             | Headings       |
| `.text-body-base`, `.text-body-sm`, `.text-body-xs`  | Body text      |
| `.text-label-md`, `.text-label-sm`, `.text-label-xs` | Labels/buttons |

### Control Heights

| Token          | Value | Use                  |
| -------------- | ----- | -------------------- |
| `h-control-sm` | 32px  | Small buttons/inputs |
| `h-control-md` | 36px  | Default size         |
| `h-control-lg` | 40px  | Large buttons        |
| `h-control-xl` | 48px  | Hero buttons         |

---

## Prototype Registry

When modifying files in a prototype, update the `lastChanged` date in `src/app/page.tsx`:

| Prototype               | Folder            | Update date when changing files in...    |
| ----------------------- | ----------------- | ---------------------------------------- |
| BEXP Dash View Only MVP | `/borrower-mvp`   | `src/app/borrower-mvp/**`                |
| BEXP Dash View Only Full| `/borrower`       | `src/app/borrower/**`                    |
| Components              | `/overview`       | `src/app/overview/**`, `src/components/**` |

**Format:** `YYYY-MM-DD` (e.g., `2026-01-22`)

---

## Critical Rules (All Agents)

### NEVER

- Use arbitrary values (`h-[32px]`, `bg-[#fff]`)
- Use Tailwind defaults (`bg-blue-500`, `text-gray-900`)
- Install new UI libraries (shadcn, Radix, etc.)
- Create new CSS variables

### ALWAYS

- Use design tokens from `globals.css`
- Use Base UI components for interactive elements
- Use `cn()` for class composition
- Use `tv()` from `@/lib/utils` for variants

---

## File Locations

| What                  | Where                        |
| --------------------- | ---------------------------- |
| Components            | `src/components/ui/`         |
| Component exports     | `src/components/ui/index.ts` |
| Design tokens         | `src/app/globals.css`        |
| Utilities             | `src/lib/utils.ts`           |
| Component Agent rules | `rules/component-dev.md`     |
| Prototype Agent rules | `rules/prototype-dev.md`     |
