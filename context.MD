# Project Context & Specifications

## Overview

This repository contains Maple Finance's design system, component library, and prototyping infrastructure for AI-assisted development.

## Goal

Create a system where:

1. **PM (Product Manager)** can rapidly prototype features using natural language prompts to AI agents
2. **AI Agents** have clear rules to generate high-quality, consistent prototypes
3. **Developers** can easily improve, fix, and extend the component library
4. **Prototypes** are isolated from production code, allowing fast iteration without affecting the main app

## Why This Approach?

### Problem

- PMs need fast prototypes for stakeholder reviews
- Developers are busy with production code
- AI coding tools generate inconsistent code without clear guidelines
- Prototypes often bleed into production or become unmaintainable

### Solution

- **Isolated prototypes folder** (`/prototypes/`) for PM's work
- **Comprehensive AI rules** (`/minimax/rules/AGENTS.md`) for consistent code generation
- **Component library** (`/components/ui/`) for reusable, well-styled primitives
- **Design tokens** in `/src/app/globals.css` for consistent styling

### Key Design Decisions

1. **Separate Prototypes from Production**

   - Location: `/prototypes/` vs `/app/`
   - Reason: PM can experiment freely without affecting main codebase
   - Prototypes use real components from shared library

2. **Three-Tier Design Token System**

   - Tier 1: Primitives (raw values - never use directly)
   - Tier 2: Semantic (theme-switchable meaning-based tokens)
   - Tier 3: Tailwind @theme (utility classes used in code)
   - Reason: Enables consistent styling, easy dark mode, future theming

3. **Base UI Components Only**

   - No domain-specific components (PositionCard, YieldBadge, etc.)
   - AI agents compose base primitives for prototypes
   - Reason: Flexibility, no premature abstraction, faster iteration

4. **AI Agent Self-Documenting Rules**

   - AGENTS.md contains placeholders for agent to expand
   - Example: "List all components here" → Agent documents as it discovers
   - Reason: Reduces initial rules burden, adapts as codebase grows

5. **Mock Data for Prototypes**
   - No backend integration in prototypes
   - Realistic mock data structure for finance domain
   - Reason: Speed, no dependencies on external services

## Team & Ownership

### Roles

- **Maintainer (You)**: Owns components, rules, design tokens. Fixes, improves, and extends the library.
- **PM/Designers**: Use the library to prototype different flows, solutions, and ideas. Focus on visual reviews and demo sessions only.

### Responsibilities

- **Maintainer**: Decides when to add new components, update rules, fix issues
- **PM/Designers**: Provide feedback on prototypes, suggest improvements, conduct visual reviews

## AI Agent Behavior

### Supported Tools

AI agents may use different tools to work on this codebase:

- Cursor
- Claude Code
- Antigravity
- Other AI coding tools

### Operation Mode

- AI agents work autonomously
- No need to ask for confirmation before making changes
- Follow rules in AGENTS.md and PROJECT_CONTEXT.md

### Common Failure Modes to Avoid

AI agents must avoid these common mistakes:

- Installing and using different UI libraries (e.g., shadcn) instead of existing components
- Not using design tokens from globals.css
- Creating new CSS variables instead of using existing ones
- Not using existing base components when available
- Creating new components when composition would work
- Inconsistent styling that doesn't follow brand guidelines
- Ugly or unprofessional UI

## Design System Constraints

### NEVER

- Do NOT create new CSS variables or design tokens
- Do NOT install new UI libraries (shadcn, Radix UI, etc.)
- Do NOT create new components when existing base components can be composed
- Do NOT use raw primitive values directly (--primitive-\*)
- Do NOT deviate from brand colors and typography hierarchy

### ALWAYS

- Use design tokens from `/src/app/globals.css` (Tier 3 Tailwind @theme classes)
- Use existing base UI components before creating new ones
- Compose base primitives for custom functionality
- Follow the component structure in `/components/ui/`
- Use consistent spacing with the spacing-\* tokens

### Creating New Components

If existing components are insufficient:

1. First, try composing multiple base components
2. If still insufficient, create new base primitives only
3. Never create domain-specific components (PositionCard, YieldBadge, etc.)
4. Always use design tokens for styling

## Prototype Lifecycle

### Creation

1. PM describes feature to AI agent
2. AI agent reads AGENTS.md and PROJECT_CONTEXT.md
3. AI agent discovers available components and tokens
4. AI agent creates prototype in `/prototypes/{feature-name}/`

### Review Process

- **Visual inspection only**: PM/Designers cannot review code
- **Demo sessions**: Present prototypes to stakeholders
- **Iterate**: Make changes based on feedback

### After Approval

- Prototypes are **disposable** - they are not production code
- Final design happens in Figma with proper handoff
- Production implementation is separate from prototypes
- No need to add production-readiness comments in prototypes

## Workflow

### For PMs

1. Clone repo with Next.js and base-ui installed
2. Describe feature to AI agent (e.g., "Create a portfolio page showing my syrup positions")
3. AI agent reads AGENTS.md for rules
4. AI agent creates prototype in `/prototypes/portfolio/page.tsx`
5. Review, iterate, present to stakeholders

### For Developers

1. Improve components in `/components/ui/`
2. Update design tokens in `/src/app/globals.css`
3. Refine AGENTS.md based on common issues
4. Review and merge prototype-inspired improvements to main app

### For AI Agents

1. Read PROJECT_CONTEXT.md for overall context
2. Read AGENTS.md for specific rules and constraints
3. Discover components in `/components/ui/`
4. Use design tokens from `/src/app/globals.css`
5. Create prototypes in `/prototypes/{feature-name}/`
6. Follow existing patterns in `/prototypes/`
7. Work autonomously without asking for confirmation

## Success Criteria

### What Success Looks Like

- **Fast**: Prototypes are created quickly
- **Well-branded**: Consistent use of design tokens and brand colors
- **Well-styled**: Professional, consistent visual design
- **Feedback-driven**: PMs and users provide feedback that shapes improvements

### What Failure Looks Like

- AI agent not using design tokens correctly
- AI agent not using existing components
- AI agent installing new libraries
- Inconsistent or ugly styling
- Not following brand guidelines

## Directory Structure

```
base-knowledge/
├── app/                      # Main production application
├── components/
│   └── ui/                   # Base UI components (Button, Card, Select, etc.)
├── prototypes/               # PM's prototyping workspace
│   ├── portfolio/            # Example prototype
│   │   ├── page.tsx
│   │   ├── data.ts
│   │   └── components/
│   └── deposit/              # Example prototype
│       ├── page.tsx
│       ├── data.ts
│       └── components/
├── maxim/
│   ├── rules/                # AI agent rules
│   │   └── AGENTS.md         # Main rules file
│   └── context/              # Project context and specs
│       └── PROJECT_CONTEXT.md
└── src/
    └── app/
        ├── globals.css       # Design tokens (3-tier system)
        └── layout.tsx
```

## Tech Stack

- **Framework**: Next.js App Router
- **Styling**: Tailwind CSS + custom @theme
- **Components**: Base UI (headless components)
- **Icons**: Lucide React
- **Language**: TypeScript

## Design Token System

### Colors

- **Backgrounds**: bg-canvas, bg-surface, bg-surface-raised, bg-muted
- **Foregrounds**: text-fg-primary, text-fg-secondary, text-fg-muted
- **Borders**: border-border-weak, border-border-subtle, border-border-strong
- **Brand**: bg-brand, text-brand-on-weak
- **Status**: bg-positive, bg-negative, bg-warning, bg-info

### Typography

- **Headings**: text-heading-h1 through text-heading-h7
- **Body**: text-body-xl through text-body-xs
- **Labels**: text-label-xl through text-label-2xs

### Spacing

- Tailwind spacing scale: spacing-50 through spacing-1200
- Utility classes: p-_, m-_, gap-\*

### Interactive States

- Hover, focus, active states use token variants
- Example: hover:bg-brand-strong, focus:ring-2

## Finance Domain Concepts

When creating prototypes, use realistic data structures for:

- **Positions**: Asset (syrupUSDC, syrupUSDT), total earned, APY, deposited amount
- **Vaults**: Deposit assets, yield strategies, TVL
- **Transactions**: Type (deposit, withdraw, claim), status, timestamp
- **Wallets**: Connected state, multi-step approvals
