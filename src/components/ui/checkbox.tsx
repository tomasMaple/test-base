'use client'

import * as React from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'
import { Check } from 'lucide-react'

/**
 * Checkbox variants using Tailwind Variants with Supernova design tokens
 */
const checkboxVariants = tv({
  slots: {
    root: [
      'group flex size-control-2xs items-center justify-center rounded-sm',
      'transition-all duration-standard ease-default cursor-pointer',
      'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
      'disabled:pointer-events-none disabled:opacity-disabled',
    ],
    indicator: [
      'flex items-center justify-center text-inverse-fg',
      'transition-all duration-standard ease-default',
      'data-[unchecked]:hidden',
      'animate-in zoom-in-75 fade-in duration-standard',
    ],
    icon: 'size-icon-md transition-transform duration-standard',
  },
  variants: {
    variant: {
      default: {
        root: [
          'bg-secondary text-primary-fg',
          'border border-border-subtle',
          'hover:bg-primary',
          'data-[checked]:bg-brand data-[checked]:border-brand data-[checked]:text-on-brand-fg',
          'focus-visible:outline-brand',
        ],
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> &
  VariantProps<typeof checkboxVariants> & {
    label?: string
  }

/**
 * Styled Checkbox component using Base UI primitives
 * with Tailwind Variants and Supernova design tokens.
 * 
 * @example
 * ```tsx
 * <Checkbox label="Accept terms and conditions" defaultChecked />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLSpanElement, CheckboxProps>(
  ({ className, variant, label, ...props }, ref) => {
    const { root, indicator, icon } = checkboxVariants({ variant })

    const checkbox = (
      <BaseCheckbox.Root
        ref={ref}
        className={cn(root(), className)}
        {...props}
      >
        <BaseCheckbox.Indicator className={indicator()}>
          <Check className={icon()} />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    )

    if (!label) return checkbox

    return (
      <label className="inline-flex items-center gap-75 cursor-pointer select-none">
        {checkbox}
        <span className="label-fixed-small text-primary-fg group-disabled:text-muted-fg">
          {label}
        </span>
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
