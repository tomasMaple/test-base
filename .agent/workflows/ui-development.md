---
description: How to develop UI in this project - ALWAYS use existing components
---

# UI Development Rules

> **Context**: This repo is a template for Product Managers who clone it and prompt AI agents to build prototypes. The AI agent should use these rules to build consistent, design-system-compliant UI.

## Core Rules

### 1. ALWAYS Use Existing Components

Before writing ANY UI code, check `src/components/ui/`:

```
src/components/ui/
├── button.tsx          # All buttons
├── navbar.tsx          # App navigation
├── dashboard-card.tsx  # Cards with metrics, headers, footers
├── modal-presets.tsx   # Confirmation, Form, Info modals
├── badge.tsx           # Status badges
├── pill.tsx            # Pill labels
├── avatar.tsx          # User avatars
├── select.tsx          # Dropdowns
├── tabs.tsx            # Tab navigation
├── toast.tsx           # Toast notifications
├── token-logo.tsx      # Crypto token logos
└── ... (see index.ts for all)
```

### 2. Use Design Tokens (Not Arbitrary Values)

```tsx
// ❌ BAD
<div className="p-[24px] bg-[#f5f5f5] text-[14px]">

// ✅ GOOD
<div className="p-150 bg-surface text-body-base">
```

Common tokens:

- **Spacing**: `p-100`, `gap-75`, `mb-200`
- **Colors**: `bg-surface`, `bg-canvas`, `text-fg-primary`, `text-brand`
- **Typography**: `text-heading-h3`, `text-body-base`, `text-label-sm`

### 3. Reference Templates for Real Examples

Check `src/app/templates/portfolio/page.tsx` for a complete working example of:

- Using `DashboardCard` for stats and tables
- Using `Button`, `Badge`, `Pill`, `TokenLogo`
- Proper layout structure with design tokens

### 4. Don't Add Unnecessary Content

This is a prototyping template. Keep pages focused on UI structure, not marketing copy.

```tsx
// ❌ BAD - Unnecessary marketing text
<p>Earn sustainable yield on your digital assets with Maple's institutional lending platform.</p>

// ✅ GOOD - Focus on structure
<main className="max-w-7xl mx-auto px-150 py-200">
  {/* Page content using components */}
</main>
```

### 5. Navbar is Already in Root Layout

The persistent navbar is in `src/app/layout.tsx` via `AppNavbar`. Don't add another navbar in page components.

```tsx
// ❌ BAD - Adding navbar in page
export default function MyPage() {
  return (
    <div>
      <Navbar>...</Navbar> // Don't do this!
      <main>...</main>
    </div>
  );
}

// ✅ GOOD - Just the page content
export default function MyPage() {
  return (
    <main className="max-w-7xl mx-auto px-150 py-200">
      {/* Your content */}
    </main>
  );
}
```

## Project Structure

```
src/app/
├── layout.tsx              # Root layout with persistent AppNavbar
├── page.tsx                # Landing page (/)
├── templates/
│   └── portfolio/page.tsx  # Reference template
└── overview/               # Component documentation
```

## When Creating New Pages

1. Create in appropriate folder (e.g., `src/app/templates/my-page/page.tsx`)
2. Just export default function with `<main>` content
3. Use existing components - don't reinvent them
4. Use design tokens for all styling
