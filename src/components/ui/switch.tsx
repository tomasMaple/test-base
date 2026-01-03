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
    'data-[checked]:bg-inverse',
    'data-[unchecked]:bg-base-300', // Assuming a base/muted color for unchecked track
    'hover:data-[unchecked]:bg-base-400',
  ],
  variants: {
    size: {
      '2xs': 'h-control-2xs w-[2.25rem]',
      xs: 'h-control-xs w-[2.75rem]',
      sm: 'h-control-sm w-[3.25rem]',
      md: 'h-control-md w-[3.75rem]',
    },
  },
  defaultVariants: {
    size: 'sm',
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
      '2xs': '[--thumb-size:12px] size-[--thumb-size] mx-[2px]',
      xs: '[--thumb-size:16px] size-[--thumb-size] mx-[2px]',
      sm: '[--thumb-size:24px] size-[--thumb-size] mx-[2px]',
      md: '[--thumb-size:28px] size-[--thumb-size] mx-[2px]',
    },
  },
  defaultVariants: {
    size: 'sm',
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
