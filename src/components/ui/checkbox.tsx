'use client'

import * as React from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox'
import { type VariantProps } from 'tailwind-variants'
import { Check as CheckIcon } from 'lucide-react'
import { cn, tv } from '@/lib/utils'

const checkboxVariants = tv({
  slots: {
    root: 'flex items-center justify-center border transition-colors duration-standard ease-default cursor-pointer focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-disabled data-[checked]:bg-brand data-[checked]:border-transparent data-[checked]:text-fg-inverse data-[unchecked]:bg-surface data-[unchecked]:border-border-strong data-[unchecked]:text-transparent hover:data-[unchecked]:bg-subtle hover:data-[unchecked]:border-border-strong',
    icon: 'text-current',
  },
  variants: {
    size: {
      '3xs': {
        root: 'size-control-3xs rounded-xs text-label-xs',
        icon: 'size-icon-sm',
      },
      '2xs': {
        root: 'size-control-2xs rounded-sm text-label-sm',
        icon: 'size-icon-md',
      },
    },
  },
  defaultVariants: {
    size: '3xs',
  },
})

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> &
  VariantProps<typeof checkboxVariants> &
  React.ComponentPropsWithoutRef<'button'>

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, size, children, ...props }, ref) => {
    const { root, icon } = checkboxVariants({ size })
    return (
      <BaseCheckbox.Root
        ref={ref}
        className={cn(root(), className)}
        {...props}
      >
        <BaseCheckbox.Indicator>
          <CheckIcon className={icon()} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox, checkboxVariants }
