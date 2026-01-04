'use client'

import * as React from 'react'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

/**
 * Link variants using Tailwind Variants with Maple design tokens
 * Inline text link for external documentation, etc.
 */
const linkVariants = tv({
  base: [
    'inline-flex items-center',
    'cursor-pointer',
    'transition-colors duration-fast ease-default',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)]',
  ],
  variants: {
    size: {
      medium: ['gap-25', 'text-label-md', '[&_svg]:size-icon-2xl'],
      small: ['gap-25', 'text-label-sm', '[&_svg]:size-icon-2xl'],
      'x-small': ['gap-12', 'text-label-xs', '[&_svg]:size-icon-lg'],
    },
    type: {
      primary: [
        'text-fg-primary',
        'hover:text-fg-secondary',
        'focus-visible:text-fg-tertiary focus-visible:outline-inverse',
        'aria-disabled:text-fg-subtle aria-disabled:pointer-events-none',
      ],
      'inverse-primary': [
        'text-fg-inverse',
        'hover:text-fg-inverse/80',
        'focus-visible:text-fg-inverse/70 focus-visible:outline-inverse',
        'aria-disabled:text-fg-inverse/50 aria-disabled:pointer-events-none',
      ],
      secondary: [
        'text-fg-muted',
        'hover:text-fg-secondary',
        'focus-visible:text-fg-tertiary focus-visible:outline-inverse',
        'aria-disabled:text-fg-subtle aria-disabled:pointer-events-none',
      ],
    },
    underlined: {
      true: 'underline underline-offset-2',
      false: 'no-underline',
    },
  },
  defaultVariants: {
    size: 'medium',
    type: 'primary',
    underlined: true,
  },
})

// =============================================================================
// COMPONENT
// =============================================================================

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants> & {
    /** Icon to display before the label */
    beforeIcon?: React.ReactNode
    /** Icon to display after the label */
    afterIcon?: React.ReactNode
    /** Opens link in new tab (adds target="_blank" and rel="noopener noreferrer") */
    external?: boolean
    /** Disabled state */
    disabled?: boolean
  }

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      size,
      type,
      underlined,
      children,
      beforeIcon,
      afterIcon,
      external = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}

    return (
      <a
        ref={ref}
        className={cn(linkVariants({ size, type, underlined }), className)}
        aria-disabled={disabled}
        {...externalProps}
        {...props}
      >
        {beforeIcon && <span className="shrink-0">{beforeIcon}</span>}
        {children}
        {afterIcon && <span className="shrink-0">{afterIcon}</span>}
      </a>
    )
  }
)
Link.displayName = 'Link'

// =============================================================================
// EXPORTS
// =============================================================================

export { Link, linkVariants }
