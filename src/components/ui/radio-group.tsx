'use client'

import * as React from 'react'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

/**
 * Radio variants using Tailwind Variants with Supernova design tokens.
 * Strict adherence to project tokens for sizing, focus, and transitions.
 */
const radioVariants = tv({
  slots: {
    group: 'flex flex-col items-start gap-50',
    root: [
      'group flex size-control-2xs items-center justify-center rounded-pill border border-border-strong',
      'transition-all duration-standard ease-default cursor-pointer bg-surface',
      'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
      'disabled:pointer-events-none disabled:opacity-disabled',
      'data-[checked]:bg-brand data-[checked]:border-brand',
    ],
    indicator: [
      'size-[8px] rounded-full bg-on-brand-fg',
      'transition-all duration-standard ease-default',
      'data-[unchecked]:hidden',
    ],
    labelWrapper: 'inline-flex items-center gap-75 cursor-pointer select-none',
    labelText: 'label-fixed-small text-primary-fg group-disabled:text-muted-fg',
  },
})

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof BaseRadioGroup> & {
  label?: string
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, label, ...props }, ref) => {
    const { group } = radioVariants()
    const id = React.useId()
    
    return (
      <BaseRadioGroup
        ref={ref}
        aria-labelledby={label ? id : undefined}
        className={cn(group(), className)}
        {...props}
      >
        {label && (
          <div id={id} className="label-fixed-medium font-medium text-primary-fg mb-25">
            {label}
          </div>
        )}
        {children}
      </BaseRadioGroup>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

export type RadioProps = React.ComponentPropsWithoutRef<typeof BaseRadio.Root> & {
  label?: string
}

export const Radio = React.forwardRef<HTMLSpanElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    const { root, indicator, labelWrapper, labelText } = radioVariants()

    const radioElement = (
      <BaseRadio.Root
        ref={ref}
        className={cn(root(), className)}
        {...props}
      >
        <BaseRadio.Indicator className={indicator()} />
      </BaseRadio.Root>
    )

    if (!label) return radioElement

    return (
      <label className={labelWrapper()}>
        {radioElement}
        <span className={labelText()}>
          {label}
        </span>
      </label>
    )
  }
)
Radio.displayName = 'Radio'
