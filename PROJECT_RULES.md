# UI Guidelines

> **Accessibility, performance, and design rules for building quality UIs.**
> Rules use MUST (required), SHOULD (recommended), NEVER (forbidden).

---

## Critical Requirements

These MUST be implemented on every component:

### Keyboard & Focus

- MUST: Full keyboard support per [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/)
- MUST: Visible focus rings using `data-[focus-visible]:ring-2 data-[focus-visible]:ring-[--color-brand-primary]`
- MUST: Trap focus in modals/dialogs; return focus on close

### Touch Targets

- MUST: Hit target ≥24px (mobile ≥44px)
- MUST: Use `--spacing-size-xs` (24px) as minimum interactive size
- MUST: `touch-action: manipulation` to prevent double-tap zoom

### Form Inputs

- MUST: Mobile input font-size ≥16px (prevents iOS zoom)
- MUST: Use correct `type` and `inputmode` attributes
- MUST: Errors inline next to fields; focus first error on submit
- MUST: Loading buttons show spinner + original label
- MUST: `disabled:pointer-events-none disabled:opacity-50` for disabled states
- NEVER: Block paste in inputs

### Accessibility

- MUST: Icon-only buttons have `aria-label`
- MUST: Decorative elements have `aria-hidden="true"`
- MUST: Use semantic HTML before ARIA (`button`, `a`, `label`)
- MUST: Status cues not color-only (add icons or text)

---

## BaseUI Data Attribute Patterns

Style interactive states using Base UI's data attributes:

```tsx
// Checkbox/Switch states
"data-[checked]:bg-[--color-brand-primary]";
"data-[unchecked]:bg-[--bg-color-muted]";

// Disabled state
"data-[disabled]:opacity-50";
"data-[disabled]:pointer-events-none";

// Menu/Select highlighted item
"data-[highlighted]:bg-[--bg-color-subtle]";
"data-[highlighted]:text-[--color-fg-primary]";

// Open/Close states (dropdowns, dialogs)
"data-[open]:bg-[--bg-color-secondary]";
"data-[closed]:opacity-0";

// Focus visible (keyboard focus only)
"data-[focus-visible]:ring-2";
"data-[focus-visible]:ring-[--color-brand-primary]";

// Animation states
"data-[starting-style]:opacity-0 data-[starting-style]:scale-95";
"data-[ending-style]:opacity-0 data-[ending-style]:scale-95";
```

---

## Animation

- MUST: Honor `prefers-reduced-motion` (provide reduced variant)
- MUST: Animate only `transform` and `opacity` (compositor-friendly)
- MUST: Animations interruptible (no autoplay blocking input)
- SHOULD: Use CSS transitions before JS solutions

---

## Layout

- MUST: Respect safe areas `env(safe-area-inset-*)`
- MUST: Avoid unwanted scrollbars; test overflow
- MUST: Test mobile, laptop, ultra-wide viewports
- SHOULD: Optical alignment (±1px when perception beats geometry)

---

## Performance

- MUST: Virtualize lists >50 items
- MUST: Lazy-load below-fold images
- MUST: Prevent CLS (explicit image dimensions)
- MUST: Mutations target <500ms response
- SHOULD: Prefer uncontrolled inputs for performance

---

## Design Best Practices

- SHOULD: Layered shadows (ambient + direct)
- SHOULD: Nested radii (child ≤ parent)
- MUST: Meet contrast (prefer [APCA](https://apcacontrast.com/))
- MUST: Increase contrast on `:hover/:active/:focus`

---

## Component Completion Checklist

Before marking a component complete, verify:

- [ ] Uses only design tokens (no arbitrary values)
- [ ] Has `displayName` set
- [ ] Forwards ref properly
- [ ] Exports TypeScript interface
- [ ] All states styled via `data-*` attributes
- [ ] Focus visible ring implemented
- [ ] Disabled state styled
- [ ] Keyboard accessible (Enter, Space, Escape as needed)
- [ ] Touch target ≥24px
- [ ] Works in `.theme-light` + `.theme-desktop`
