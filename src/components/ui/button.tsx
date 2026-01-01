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
    'inline-flex items-center justify-center gap-50 rounded-pill',
    'font-medium transition-colors duration-standard ease-default cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand-primary',
    'disabled:pointer-events-none disabled:opacity-disabled',
  ],
  variants: {
    variant: {
      primary: [
        'bg-inverse-primary text-fg-inverse-primary',
        'hover:bg-brand-primary',
        'active:bg-brand-emphasis',
        'focus-visible:outline-inverse-primary',
        'text-on-brand',
      ],
      secondary: [
        'bg-surface text-fg-primary',
        'border border-border-subtle',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-border-strong',
      ],
      tertiary: [
        'bg-primary text-fg-primary',
        'hover:bg-secondary',
        'active:bg-muted',
        'focus-visible:outline-fg-tertiary',
      ],
      ghost: [
        'bg-transparent text-fg-primary',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-fg-tertiary',
      ],
      negative: [
        'bg-negative-primary text-on-accent',
        'hover:bg-negative-strong',
        'active:bg-negative-emphasis',
        'focus-visible:outline-negative-primary',
      ],
    },
    size: {
      small: [
        'h-sm',
        'px-75',
        'gap-0',
        'label-fixed-x-small',
      ],
      medium: [
        'h-md',
        'px-75',
        'gap-12',
        'label-fixed-x-small',
      ],
      large: [
        'h-lg',
        'px-75',
        'gap-12',
        'label-fixed-small',
      ],
      'x-large': [
        'h-xl',
        'px-75',
        'gap-12',
        'label-fixed-medium',
      ],
      '2x-large': [
        'h-2xl',
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

/**
 * Icon size variants based on button size
 */
const iconSizeVariants = tv({
  variants: {
    size: {
      small: 'w-icon-sm h-icon-sm',
      medium: 'w-icon-md h-icon-md',
      large: 'w-icon-lg h-icon-lg',
      'x-large': 'w-icon-xl h-icon-xl',
      '2x-large': 'w-icon-2xl h-icon-2xl',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> &
  VariantProps<typeof buttonVariants> & {
    beforeIcon?: React.ReactNode
    afterIcon?: React.ReactNode
  }

/**
 * Styled Button component using Base UI primitives
 * with Tailwind Variants and Supernova design tokens.
 * 
 * @example
 * ```tsx
 * import AddIcon from '@/icons/add-fill.svg'
 * import ArrowIcon from '@/icons/arrow-right-fill.svg'
 * 
 * // With before icon
 * <Button beforeIcon={<AddIcon />}>Add Item</Button>
 * 
 * // With after icon
 * <Button afterIcon={<ArrowIcon />}>Next</Button>
 * 
 * // With both icons
 * <Button beforeIcon={<AddIcon />} afterIcon={<ArrowIcon />}>Add and Continue</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, children, beforeIcon, afterIcon, ...props }, ref) => {
    // Wrap text content in a span with size-specific padding
    const content = typeof children === 'string' ? (
      <span className={textPaddingVariants({ size })}>{children}</span>
    ) : (
      children
    )

    // Helper to render icon (handles React components)
    const renderIcon = (icon: React.ReactNode, sizeClass: string) => {
      if (!icon) return null

      // Handle React elements (components)
      if (React.isValidElement(icon)) {
        return (
          <span className={cn(sizeClass, 'shrink-0')}>
            {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className: cn(
                'w-full h-full fill-current stroke-current', 
                (icon.props as { className?: string })?.className
              ),
            })}
          </span>
        )
      }

      return icon
    }

    const beforeIconElement = renderIcon(beforeIcon, iconSizeVariants({ size }))
    const afterIconElement = renderIcon(afterIcon, iconSizeVariants({ size }))

    return (
      <BaseButton
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {beforeIconElement}
        {content}
        {afterIconElement}
      </BaseButton>
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
