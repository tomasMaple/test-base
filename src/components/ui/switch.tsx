'use client'

import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui-components/react/switch'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

const switchVariants = tv({
  base: [
    'group relative inline-flex items-center',
    'rounded-pill border border-transparent',
    'transition-colors duration-standard ease-default',
    'cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'data-[checked]:bg-brand',
    'data-[unchecked]:bg-secondary', // Assuming a base/muted color for unchecked track
    'hover:data-[unchecked]:bg-base-400',
  ],
  variants: {
    size: {
      xs: 'h-control-xs w-[2.5rem]',
      md: 'h-control-md w-[3.70rem]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const switchThumbVariants = tv({
  base: [
    'block rounded-pill bg-surface shadow-100',
    'transition-all duration-standard ease-default',
    'data-[checked]:translate-x-[100%] data-[checked]:-ml-[--thumb-size]',
    'data-[unchecked]:translate-x-0',
  ],
  variants: {
    size: {
      xs: 'h-100 w-100 mx-[3px]',
      md: 'h-150 w-150 mx-[4px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type SwitchProps = React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> &
  VariantProps<typeof switchVariants> &
  React.ComponentPropsWithoutRef<'button'>

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, ...props }, ref) => (
    <BaseSwitch.Root
      ref={ref}
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <BaseSwitch.Thumb className={switchThumbVariants({ size })} />
    </BaseSwitch.Root>
  )
)
Switch.displayName = 'Switch'

export { Switch, switchVariants }
