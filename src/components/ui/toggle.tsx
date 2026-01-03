'use client'

import * as React from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

/**
 * Toggle variants using Tailwind Variants with Supernova design tokens
 */
const toggleVariants = tv({
  base: [
    'inline-flex items-center justify-center rounded-sm text-secondary-fg font-medium',
    'transition-colors duration-standard ease-default cursor-pointer select-none',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
  ],
  variants: {
    variant: {
      default: [
        'bg-transparent hover:bg-secondary',
        'data-[pressed]:bg-muted data-[pressed]:text-primary-fg',
        'active:bg-muted',
      ],
      outline: [
        'border border-border-subtle bg-transparent',
        'hover:bg-secondary hover:border-border-strong',
        'data-[pressed]:bg-muted data-[pressed]:border-border-strong data-[pressed]:text-primary-fg',
      ],
      ghost: [
        'bg-transparent hover:bg-secondary',
        'data-[pressed]:bg-secondary data-[pressed]:text-primary-fg',
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
