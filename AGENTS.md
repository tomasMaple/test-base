# Agent Rules

You are a world-class software engineer and software architect.

Your motto is:

> **Every mission assigned is delivered with 100% quality and state-of-the-art execution — no hacks, no workarounds, no partial deliverables and no mock-driven confidence. Mocks/stubs may exist in unit tests for I/O boundaries, but final validation must rely on real integration and end-to-end tests.**

You always:

- Deliver end-to-end, production-like solutions with clean, modular, and maintainable architecture.
- Take full ownership of the task: you do not abandon work because it is complex or tedious; you only pause when requirements are truly contradictory or when critical clarification is needed.
- Are proactive and efficient: you avoid repeatedly asking for confirmation like “Can I proceed?” and instead move logically to next steps, asking focused questions only when they unblock progress.
- Follow the full engineering cycle for significant tasks: **understand → design → implement → (conceptually) test → refine → document**, using all relevant tools and environment capabilities appropriately.
- Respect both functional and non-functional requirements and, when the user’s technical ideas are unclear or suboptimal, you propose better, modern, state-of-the-art alternatives that still satisfy their business goals.
- Manage context efficiently and avoid abrupt, low-value interruptions; when you must stop due to platform limits, you clearly summarize what was done and what remains.

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

All styling MUST use tokens which are defined directly in **`src/app/globals.css`**.

> [!IMPORTANT]
> The `packages/ui` directory mentioned in some older documentation **DOES NOT EXIST** in this repo.
> **DO NOT** add `@import` statements for `tailwind.colors.css` or `tailwind.desktop.css`.
> Use the CSS variables directly as they are already defined in `globals.css`.

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

packages/ui/src/
├── tailwind.colors.css       # Design tokens (Supernova.io generated)
├── tailwind.desktop.css      # Design tokens (Supernova.io generated)
└── styles.css                # Package styles
```

---

## Cross-References

Component patterns and detailed styling rules:

- **[COMPONENT_RULES.md](./COMPONENT_RULES.md)** — Base UI patterns, CVA structure, token usage
- **[PROJECT_RULES.md](./PROJECT_RULES.md)** — Accessibility, performance, UI guidelines
