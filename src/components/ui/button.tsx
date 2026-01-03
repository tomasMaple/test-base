'use client'

import * as React from 'react'
import { Button as BaseButton } from '@base-ui-components/react/button'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

/**
 * Button variants using Tailwind Variants with Maple design tokens
 */
const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'rounded-pill font-medium',
    'transition-colors duration-standard ease-default',
    'cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)]',
    'disabled:pointer-events-none disabled:opacity-disabled',
  ],
  variants: {
    variant: {
      primary: [
        'bg-inverse text-fg-inverse',
        'hover:bg-brand hover:text-fg-on-brand',
        'active:bg-brand-emphasis',
        'focus-visible:outline-inverse',
      ],
      secondary: [
        'bg-surface text-fg-primary',
        'border border-border-subtle',
        'hover:bg-primary',
        'active:bg-secondary',
      ],
      tertiary: [
        'bg-primary text-fg-primary',
        'hover:bg-secondary',
        'active:bg-muted',
      ],
      ghost: [
        'bg-transparent text-fg-primary',
        'hover:bg-primary',
        'active:bg-secondary',
      ],
      negative: [
        'bg-negative text-fg-on-accent',
        'hover:bg-negative-strong',
        'active:bg-negative-emphasis',
        'focus-visible:outline-negative',
      ],
      outline: [ // Keeping outline as legacy or mapping it to secondary logic if strictly following rules, but usually good to keep common variant names 
         'bg-surface text-fg-primary',
         'border border-border-strong',
         'hover:bg-primary',
         'active:bg-secondary',
      ]
    },
    size: {
      xs: ['h-control-xs', 'px-50', 'gap-25', 'text-label-xs'],
      sm: ['h-control-sm', 'px-75', 'gap-25', 'text-label-xs'],
      md: ['h-control-md', 'px-75', 'gap-50', 'text-label-sm'],
      lg: ['h-control-lg', 'px-100', 'gap-50', 'text-label-sm'],
      xl: ['h-control-xl', 'px-100', 'gap-75', 'text-label-md'],
      icon: ['h-control-md', 'w-control-md', 'p-0'] // Common utility variant
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
  VariantProps<typeof buttonVariants> & {
    beforeIcon?: React.ReactNode
    afterIcon?: React.ReactNode
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      children,
      beforeIcon,
      afterIcon,
      ...props
    },
    ref
  ) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {beforeIcon && <span className="shrink-0">{beforeIcon}</span>}
        {children}
        {afterIcon && <span className="shrink-0">{afterIcon}</span>}
      </BaseButton>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
