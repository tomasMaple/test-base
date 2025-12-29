# Project Rules

This project is a styled Base UI component library built with Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16.1.1 with React 19.2.3
- **Component primitives**: Base UI (@base-ui/react v1.0.0)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Icons**: Lucide React
- **Variant management**: class-variance-authority (CVA)

## Project Structure

```
src/
├── components/ui/    # Styled components (Button, etc.)
└── lib/utils/        # Utility functions (clsx, cn)

app/
├── globals.css       # Global styles
├── tokens.css        # Design tokens
└── design-tokens.css # Custom theme configuration
```

## Design System

This project uses custom design tokens defined in `app/design-tokens.css`:
- Color scales (brand, semantic, support colors)
- Spacing system
- Typography (headings, labels, body text)
- Border radii
- Shadows and elevation

## Custom Rules

Component library and accessibility rules are automatically loaded from:
- `COMPONENT_RULES.md` - Base UI + Tailwind v4 patterns
- `PROJECT_RULES.md` - Accessibility, performance, and UI guidelines

**Note**: These rules are auto-loaded via `opencode.jsonc` configuration.
