'use client'

import * as React from 'react'
import { Radio as BaseRadio } from '@base-ui-components/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui-components/react/radio-group'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

const radioVariants = tv({
  base: [
    'flex items-center justify-center',
    'rounded-pill border transition-all duration-standard ease-default',
    'cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'data-[checked]:bg-inverse data-[checked]:border-inverse',
    'data-[unchecked]:bg-surface data-[unchecked]:border-border-strong',
    'hover:data-[unchecked]:bg-subtle',
  ],
  variants: {
    size: {
      '3xs': 'size-control-3xs',
      '2xs': 'size-control-2xs',
    },
  },
  defaultVariants: {
    size: '3xs',
  },
})

export type RadioProps = React.ComponentPropsWithoutRef<typeof BaseRadio.Root> &
  VariantProps<typeof radioVariants> &
  React.ComponentPropsWithoutRef<'button'>

const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  ({ className, size, children, ...props }, ref) => (
    <BaseRadio.Root
      ref={ref}
      className={cn(radioVariants({ size }), className)}
      {...props}
    >
      <BaseRadio.Indicator className="size-icon-xs bg-surface rounded-pill" />
    </BaseRadio.Root>
  )
)
Radio.displayName = 'Radio'

const RadioGroup = BaseRadioGroup

export { Radio, RadioGroup, radioVariants }
