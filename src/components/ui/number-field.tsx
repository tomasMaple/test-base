'use client'

import * as React from 'react'
import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'
import { Plus, Minus } from 'lucide-react'

const numberFieldRootVariants = tv({
  base: 'group flex flex-col gap-25',
})

const numberFieldGroupVariants = tv({
  base: [
    'flex items-center overflow-hidden',
    'rounded-sm border border-border-subtle bg-surface transition-colors duration-standard',
    'focus-within:border-brand focus-within:ring-1 focus-within:ring-brand',
  ],
  variants: {
    size: {
      xs: 'h-control-xs',
      sm: 'h-control-sm',
      md: 'h-control-md',
      lg: 'h-control-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const numberFieldInputVariants = tv({
  base: [
    'flex-1 bg-transparent px-50 text-center font-medium placeholder:text-fg-tertiary outline-none',
    'text-fg-primary',
  ],
  variants: {
    size: {
      xs: 'text-label-xs',
      sm: 'text-label-xs',
      md: 'text-label-sm',
      lg: 'text-label-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const numberFieldButtonVariants = tv({
  base: [
    'flex items-center justify-center bg-transparent text-fg-secondary transition-colors',
    'hover:bg-primary hover:text-fg-primary active:bg-secondary',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'border-l border-r-0 first:border-r first:border-l-0 border-border-subtle',
  ],
  variants: {
    size: {
      xs: 'w-control-xs',
      sm: 'w-control-sm',
      md: 'w-control-md',
      lg: 'w-control-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type NumberFieldProps = React.ComponentPropsWithoutRef<typeof BaseNumberField.Root> &
  VariantProps<typeof numberFieldGroupVariants>

const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  ({ className, size, ...props }, ref) => (
    <BaseNumberField.Root
      ref={ref}
      className={cn(numberFieldRootVariants(), className)}
      {...props}
    >
      <BaseNumberField.Group className={numberFieldGroupVariants({ size })}>
        <BaseNumberField.Decrement className={numberFieldButtonVariants({ size })}>
          <Minus className="size-icon-sm" />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className={numberFieldInputVariants({ size })} />
        <BaseNumberField.Increment className={numberFieldButtonVariants({ size })}>
          <Plus className="size-icon-sm" />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
)
NumberField.displayName = 'NumberField'

export { NumberField, numberFieldGroupVariants }
