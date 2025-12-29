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
        'text-on-brand',
      ],
      secondary: [
        'bg-surface text-fg-primary',
        'border border-border-subtle',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:ring-border-strong',
      ],
      tertiary: [
        'bg-primary text-fg-primary',
        'hover:bg-secondary',
        'active:bg-muted',
        'focus-visible:ring-fg-tertiary',
      ],
      ghost: [
        'bg-transparent text-fg-primary',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:ring-fg-tertiary',
      ],
      negative: [
        'bg-negative-primary text-on-accent',
        'hover:bg-negative-strong',
        'active:bg-negative-emphasis',
        'focus-visible:ring-negative-primary',
      ],
    },
    size: {
      small: [
        'h-size-sm',
        'px-75',
        'gap-0',
        'label-fixed-x-small',
      ],
      medium: [
        'h-size-md',
        'px-75',
        'gap-12',
        'label-fixed-x-small',
      ],
      large: [
        'h-size-lg',
        'px-75',
        'gap-12',
        'label-fixed-small',
      ],
      'x-large': [
        'h-size-xl',
        'px-75',
        'gap-12',
        'label-fixed-medium',
      ],
      '2x-large': [
        'h-size-2xl',
        'px-75',
        'gap-25',
        'label-fixed-medium',
      ],
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
  },
})

/**
 * Text padding variants based on button size
 */
const textPaddingVariants = tv({
  variants: {
    size: {
      small: 'px-25',
      medium: 'px-25',
      large: 'px-25',
      'x-large': 'px-25',
      '2x-large': 'px-25',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> &
  VariantProps<typeof buttonVariants>


/**
 * Styled Button component using Base UI primitives
 * with Tailwind Variants and Supernova design tokens.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, children, ...props }, ref) => {
    // Wrap text content in a span with size-specific padding
    const content = typeof children === 'string' ? (
      <span className={textPaddingVariants({ size })}>{children}</span>
    ) : (
      children
    )

    return (
      <BaseButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {content}
      </BaseButton>
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
