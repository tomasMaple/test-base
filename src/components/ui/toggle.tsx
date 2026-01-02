'use client'

import * as React from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

/**
 * Toggle variants using Tailwind Variants with Supernova design tokens
 */
const toggleVariants = tv({
  base: [
    'inline-flex items-center justify-center rounded-sm text-fg-secondary font-medium',
    'transition-colors duration-standard ease-default cursor-pointer select-none',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand-primary',
    'disabled:pointer-events-none disabled:opacity-disabled',
  ],
  variants: {
    variant: {
      default: [
        'bg-transparent hover:bg-surface-secondary',
        'data-[pressed]:bg-surface-tertiary data-[pressed]:text-fg-primary',
        'active:bg-surface-tertiary',
      ],
      outline: [
        'border border-border-subtle bg-transparent',
        'hover:bg-surface-secondary hover:border-border-strong',
        'data-[pressed]:bg-surface-tertiary data-[pressed]:border-border-strong data-[pressed]:text-fg-primary',
      ],
      ghost: [
        'bg-transparent hover:bg-surface-secondary',
        'data-[pressed]:bg-surface-secondary data-[pressed]:text-fg-primary',
      ],
    },
    size: {
      small: 'h-8 px-2 text-label-fixed-x-small gap-1.5',
      medium: 'h-9 px-2.5 text-label-fixed-small gap-2',
      large: 'h-10 px-3 text-label-fixed-medium gap-2.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
})

export type ToggleProps = React.ComponentPropsWithoutRef<typeof BaseToggle> &
  VariantProps<typeof toggleVariants>

/**
 * Styled Toggle component using Base UI primitives
 * with Tailwind Variants and Supernova design tokens.
 *
 * @example
 * ```tsx
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon />
 * </Toggle>
 * ```
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <BaseToggle
        ref={ref}
        className={cn(toggleVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Toggle.displayName = 'Toggle'
