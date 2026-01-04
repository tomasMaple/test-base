'use client'

import * as React from 'react'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * Pill variants using Tailwind Variants with Maple design tokens
 * Based on Figma specs with type × appearance compound variants
 */
const pillVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'rounded-pill font-medium',
    'whitespace-nowrap',
  ],
  variants: {
    size: {
      '32': [
        'h-control-sm',
        'px-50',
        'gap-12',
        'text-label-xs',
        '[&_svg]:size-icon-md',
      ],
      '24': [
        'h-control-xs',
        'px-37',
        'gap-0',
        'text-label-xs',
        '[&_svg]:size-icon-md',
      ],
      '20': [
        'h-control-2xs',
        'px-25',
        'gap-0',
        'text-label-xs',
        '[&_svg]:size-icon-sm',
      ],
      '16': [
        'h-control-3xs',
        'px-25',
        'gap-0',
        'text-label-2xs',
        '[&_svg]:size-[10px]',
      ],
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
      ghost: '',
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
    {
      type: 'primary',
      appearance: 'ghost',
      class: 'bg-transparent text-fg-secondary',
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
    {
      type: 'secondary',
      appearance: 'ghost',
      class: 'bg-transparent text-fg-secondary',
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
    {
      type: 'brand',
      appearance: 'ghost',
      class: 'bg-transparent text-brand',
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
    {
      type: 'info',
      appearance: 'ghost',
      class: 'bg-transparent text-info',
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
    {
      type: 'positive',
      appearance: 'ghost',
      class: 'bg-transparent text-positive',
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
    {
      type: 'warning',
      appearance: 'ghost',
      class: 'bg-transparent text-warning',
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
    {
      type: 'negative',
      appearance: 'ghost',
      class: 'bg-transparent text-negative',
    },
    // =========================
    // CUSTOM TYPE (no colors, user provides via className)
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
    {
      type: 'custom',
      appearance: 'ghost',
      class: 'bg-transparent',
    },
  ],
  defaultVariants: {
    size: '32',
    type: 'primary',
    appearance: 'default',
  },
})

// =============================================================================
// COMPONENT
// =============================================================================

export type PillProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof pillVariants> & {
    /** Icon to display before the label */
    beforeIcon?: React.ReactNode
    /** Icon to display after the label */
    afterIcon?: React.ReactNode
  }

const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  (
    {
      className,
      size,
      type,
      appearance,
      children,
      beforeIcon,
      afterIcon,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(pillVariants({ size, type, appearance }), className)}
        {...props}
      >
        {beforeIcon && <span className="shrink-0">{beforeIcon}</span>}
        <span className="px-25">{children}</span>
        {afterIcon && <span className="shrink-0">{afterIcon}</span>}
      </span>
    )
  }
)
Pill.displayName = 'Pill'

// =============================================================================
// EXPORTS
// =============================================================================

export { Pill, pillVariants }
