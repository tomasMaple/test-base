'use client'

import * as React from 'react'
import { Progress as BaseProgress } from '@base-ui-components/react/progress'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const progressVariants = tv({
  base: [
    'relative overflow-hidden rounded-full bg-secondary',
    'w-full',
  ],
  variants: {
    size: {
      xs: 'h-1', // 4px
      sm: 'h-2', // 8px
      md: 'h-3', // 12px
      lg: 'h-4', // 16px
    },
    variant: {
      default: '[&>div]:bg-brand',
      positive: '[&>div]:bg-positive',
      negative: '[&>div]:bg-negative',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

// =============================================================================
// COMPONENT
// =============================================================================

export type ProgressProps = React.ComponentPropsWithoutRef<typeof BaseProgress.Root> &
  VariantProps<typeof progressVariants>

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, size, variant, ...props }, ref) => (
    <BaseProgress.Root
      ref={ref}
      value={value}
      className={cn(progressVariants({ size, variant }), className)}
      {...props}
    >
      <BaseProgress.Track className="h-full w-full bg-transparent">
        <BaseProgress.Indicator
          className="h-full w-full flex-1 transition-all duration-standard ease-default"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
)
Progress.displayName = 'Progress'

export { Progress, progressVariants }
