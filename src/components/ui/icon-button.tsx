'use client'

import * as React from 'react'
import { Button as BaseButton } from '@base-ui-components/react/button'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

/**
 * IconButton variants mirroring Button but with square/circle dimensions
 */
const iconButtonVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'rounded-pill font-medium', // Circular by default due to matching w/h
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
      outline: [
         'bg-surface text-fg-primary',
         'border border-border-strong',
         'hover:bg-primary',
         'active:bg-secondary',
      ]
    },
    size: {
      xs: ['size-control-xs', '[&_svg]:size-icon-sm'], // 24px button, 12px icon
      sm: ['size-control-sm', '[&_svg]:size-icon-md'], // 32px button, 14px icon
      md: ['size-control-md', '[&_svg]:size-icon-lg'], // 36px button, 16px icon
      lg: ['size-control-lg', '[&_svg]:size-icon-xl'], // 40px button, 18px icon
      xl: ['size-control-xl', '[&_svg]:size-icon-2xl'], // 48px button, 20px icon
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export type IconButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> &
  VariantProps<typeof iconButtonVariants>

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = 'IconButton'

export { IconButton, iconButtonVariants }
