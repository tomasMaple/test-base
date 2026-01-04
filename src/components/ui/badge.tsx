'use client'

import * as React from 'react'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * Badge variants using Tailwind Variants with Maple design tokens
 * Circular badge for displaying numbers or icons
 */
const badgeVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'rounded-pill font-medium',
    'aspect-square',
  ],
  variants: {
    size: {
      '56': ['size-control-2xl', 'min-w-control-2xl', 'px-87', 'text-label-xl', '[&_svg]:size-icon-3xl'],
      '48': ['size-control-xl', 'min-w-control-xl', 'px-87', 'text-label-xl', '[&_svg]:size-icon-3xl'],
      '40': ['size-control-lg', 'min-w-control-lg', 'px-75', 'text-label-lg', '[&_svg]:size-icon-2xl'],
      '36': ['size-control-md', 'min-w-control-md', 'px-67', 'text-label-md', '[&_svg]:size-icon-xl'],
      '32': ['size-control-sm', 'min-w-control-sm', 'px-50', 'text-label-md', '[&_svg]:size-icon-xl'],
      '24': ['size-control-xs', 'min-w-control-xs', 'px-50', 'text-label-xs', '[&_svg]:size-icon-lg'],
      '20': ['size-control-2xs', 'min-w-control-2xs', 'px-37', 'text-label-xs', '[&_svg]:size-icon-md'],
      '16': ['size-control-3xs', 'min-w-control-3xs', 'px-25', 'text-label-2xs', '[&_svg]:size-icon-sm'],
      '12': ['h-[12px]', 'min-w-[12px]', 'px-12', 'text-label-2xs', '[&_svg]:size-[10px]'],
    },
    type: {
      primary: '',
      secondary: '',
      brand: '',
      info: '',
      positive: '',
      warning: '',
      negative: '',
      custom: '',
    },
    appearance: {
      default: '',
      subtle: '',
    },
  },
  compoundVariants: [
    // =========================
    // PRIMARY TYPE
    // =========================
    {
      type: 'primary',
      appearance: 'default',
      class: 'bg-inverse text-fg-inverse',
    },
    {
      type: 'primary',
      appearance: 'subtle',
      class: 'bg-primary text-fg-secondary',
    },
    // =========================
    // SECONDARY TYPE
    // =========================
    {
      type: 'secondary',
      appearance: 'default',
      class: 'bg-surface text-fg-primary border border-border-subtle',
    },
    {
      type: 'secondary',
      appearance: 'subtle',
      class: 'bg-primary text-fg-secondary',
    },
    // =========================
    // BRAND TYPE
    // =========================
    {
      type: 'brand',
      appearance: 'default',
      class: 'bg-brand text-fg-on-brand',
    },
    {
      type: 'brand',
      appearance: 'subtle',
      class: 'bg-brand-subtle text-brand',
    },
    // =========================
    // INFO TYPE
    // =========================
    {
      type: 'info',
      appearance: 'default',
      class: 'bg-info text-fg-on-accent',
    },
    {
      type: 'info',
      appearance: 'subtle',
      class: 'bg-info-subtle text-info',
    },
    // =========================
    // POSITIVE TYPE
    // =========================
    {
      type: 'positive',
      appearance: 'default',
      class: 'bg-positive text-fg-on-accent',
    },
    {
      type: 'positive',
      appearance: 'subtle',
      class: 'bg-positive-subtle text-positive',
    },
    // =========================
    // WARNING TYPE
    // =========================
    {
      type: 'warning',
      appearance: 'default',
      class: 'bg-warning text-fg-on-accent',
    },
    {
      type: 'warning',
      appearance: 'subtle',
      class: 'bg-warning-subtle text-warning',
    },
    // =========================
    // NEGATIVE TYPE
    // =========================
    {
      type: 'negative',
      appearance: 'default',
      class: 'bg-negative text-fg-on-accent',
    },
    {
      type: 'negative',
      appearance: 'subtle',
      class: 'bg-negative-subtle text-negative',
    },
    // =========================
    // CUSTOM TYPE
    // =========================
    {
      type: 'custom',
      appearance: 'default',
      class: '',
    },
    {
      type: 'custom',
      appearance: 'subtle',
      class: '',
    },
  ],
  defaultVariants: {
    size: '56',
    type: 'primary',
    appearance: 'default',
  },
})

// =============================================================================
// COMPONENT
// =============================================================================

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    /** Icon to display (when showing icon instead of number) */
    icon?: React.ReactNode
  }

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      size,
      type,
      appearance,
      children,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ size, type, appearance }), className)}
        {...props}
      >
        {icon || children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'

// =============================================================================
// EXPORTS
// =============================================================================

export { Badge, badgeVariants }
