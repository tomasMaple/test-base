'use client'

import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const switchVariants = tv({
  slots: {
    root: [
      'group relative inline-flex items-center rounded-pill cursor-pointer transition-[background-position,box-shadow,background-color] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)]',
      'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
      'disabled:pointer-events-none disabled:opacity-disabled',
    ],
    thumb: [
      'pointer-events-none block rounded-full bg-white shadow-100 transition-transform duration-[150ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)]',
      'data-[checked]:translate-x-full',
    ],
  },
  variants: {
    variant: {
      brand: {
        root: 'bg-strong data-[checked]:bg-brand',
      },
      neutral: {
        root: 'bg-strong data-[checked]:bg-inverse',
      },
    },
    size: {
      sm: {
        root: 'h-control-2xs w-7',
        thumb: 'size-3 translate-x-0.5 data-[checked]:translate-x-[calc(100%+0.5px)]',
      },
      md: {
        root: 'h-control-md w-10',
        thumb: 'size-5 translate-x-0.5 data-[checked]:translate-x-[calc(100%+2px)]',
      },
      lg: {
        root: 'h-8 w-14',
        thumb: 'size-7 translate-x-0.5 data-[checked]:translate-x-[calc(100%+6px)]',
      },
    },
  },
  defaultVariants: {
    variant: 'brand',
    size: 'md',
  },
})

export type SwitchProps = React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> &
  VariantProps<typeof switchVariants>

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { root, thumb } = switchVariants({ variant, size })

    return (
      <BaseSwitch.Root
        ref={ref}
        className={cn(root(), className)}
        {...props}
      >
        <BaseSwitch.Thumb className={thumb()} />
      </BaseSwitch.Root>
    )
  }
)

Switch.displayName = 'Switch'

export { switchVariants }
