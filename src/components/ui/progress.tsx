'use client'

import * as React from 'react'
import { Progress as BaseProgress } from '@base-ui/react/progress'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const progressVariants = tv({
  slots: {
    root: 'group flex flex-col gap-50 w-full',
    header: 'flex items-center justify-between gap-100',
    label: 'label-fixed-small text-fg-primary',
    value: 'label-fixed-small text-fg-secondary tabular-nums',
    track: 'relative overflow-hidden rounded-pill bg-surface-strong',
    indicator: 'h-full bg-brand-primary transition-all duration-300 ease-default',
  },
  variants: {
    variant: {
      brand: {
        indicator: 'bg-brand-primary',
      },
      positive: {
        indicator: 'bg-positive-primary',
      },
      neutral: {
        indicator: 'bg-inverse-primary',
      },
    },
    size: {
      xs: {
        track: 'h-6', // ~2px
      },
      sm: {
        track: 'h-25', // ~4px
      },
      md: {
        track: 'h-50', // ~8px
      },
      lg: {
        track: 'h-75', // ~12px
      },
    },
  },
  defaultVariants: {
    variant: 'brand',
    size: 'sm',
  },
})

export type ProgressProps = BaseProgress.Root.Props &
  VariantProps<typeof progressVariants> & {
    label?: React.ReactNode
    showValue?: boolean
  }

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, variant, size, label, showValue, ...props }, ref) => {
    const { root, header, label: labelStyle, value, track, indicator } = progressVariants({
      variant,
      size,
    })

    return (
      <BaseProgress.Root
        ref={ref}
        className={cn(root(), className)}
        {...props}
      >
        {(label || showValue) && (
          <div className={header()}>
            {label && <BaseProgress.Label className={labelStyle()}>{label}</BaseProgress.Label>}
            {showValue && <BaseProgress.Value className={value()} />}
          </div>
        )}
        <BaseProgress.Track className={track()}>
          <BaseProgress.Indicator className={indicator()} />
        </BaseProgress.Track>
      </BaseProgress.Root>
    )
  }
)

Progress.displayName = 'Progress'

export { progressVariants }
