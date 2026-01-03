'use client'

import * as React from 'react'
import { Toggle as BaseToggle } from '@base-ui-components/react/toggle'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

const toggleVariants = tv({
  base: [
    'inline-flex items-center justify-center',
    'rounded-md font-medium',
    'transition-colors duration-standard ease-default',
    'cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'data-[pressed]:bg-secondary data-[pressed]:text-fg-primary',
    'data-[unpressed]:bg-transparent data-[unpressed]:text-fg-secondary',
    'hover:data-[unpressed]:bg-primary hover:data-[unpressed]:text-fg-primary',
  ],
  variants: {
    size: {
      xs: 'h-control-xs px-25 text-label-xs min-w-control-xs',
      sm: 'h-control-sm px-50 text-label-xs min-w-control-sm',
      md: 'h-control-md px-75 text-label-sm min-w-control-md',
      lg: 'h-control-lg px-100 text-label-sm min-w-control-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type ToggleProps = React.ComponentPropsWithoutRef<typeof BaseToggle> &
  VariantProps<typeof toggleVariants> &
  React.ComponentPropsWithoutRef<'button'>

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, size, children, ...props }, ref) => (
    <BaseToggle
      ref={ref}
      className={cn(toggleVariants({ size }), className)}
      {...props}
    >
      {children}
    </BaseToggle>
  )
)
Toggle.displayName = 'Toggle'

export { Toggle, toggleVariants }
