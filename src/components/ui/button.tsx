'use client'

import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

/**
 * Button variants using Tailwind Variants with Supernova design tokens
 */
const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2 rounded-pill',
    'font-medium transition-colors cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: [
        'bg-inverse-primary text-fg-inverse-primary',
        'hover:bg-brand-primary',
        'active:bg-brand-emphasis',
        'focus-visible:ring-inverse-primary',
      ],
      secondary: [
        'bg-bg-secondary text-fg-primary',
        'border border-border-subtle',
        'hover:bg-bg-muted',
        'active:bg-bg-strong',
        'focus-visible:ring-fg-secondary',
      ],
      ghost: [
        'bg-transparent text-fg-primary',
        'hover:bg-bg-subtle',
        'active:bg-bg-muted',
        'focus-visible:ring-fg-tertiary',
      ],
      positive: [
        'bg-positive-primary text-on-accent',
        'hover:bg-positive-strong',
        'active:bg-positive-emphasis',
        'focus-visible:ring-positive-primary',
      ],
      negative: [
        'bg-negative-primary text-on-accent',
        'hover:bg-negative-strong',
        'active:bg-negative-emphasis',
        'focus-visible:ring-negative-primary',
      ],
      warning: [
        'bg-warning-primary text-on-accent',
        'hover:bg-warning-strong',
        'active:bg-warning-emphasis',
        'focus-visible:ring-warning-primary',
      ],
      info: [
        'bg-info-primary text-on-accent',
        'hover:bg-info-strong',
        'active:bg-info-emphasis',
        'focus-visible:ring-info-primary',
      ],
    },
    size: {
      xs: [
        'h-size-3xs',
        'px-50',
        'label-fixed-x-small',
      ],
      sm: [
        'h-size-xs',
        'px-75',
        'label-fixed-small',
      ],
      md: [
        'h-size-sm',
        'px-100',
        'label-fixed-small',
      ],
      lg: [
        'h-size-lg',
        'px-125',
        'label-fixed-medium',
      ],
      xl: [
        'h-size-xl',
        'px-150',
        'label-fixed-large',
      ],
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
})

export type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> &
  VariantProps<typeof buttonVariants>


/**
 * Styled Button component using Base UI primitives
 * with Tailwind Variants and Supernova design tokens.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size,  fullWidth, ...props }, ref) => (
    <BaseButton
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { buttonVariants }
