'use client'

import * as React from 'react'
import { cn, tv } from '@/lib/utils'
import { type VariantProps } from 'tailwind-variants'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

// =============================================================================
// VARIANTS
// =============================================================================

const dashboardCardVariants = tv({
  base: [
    'flex flex-col',
    'rounded-xl',
    'overflow-hidden',
    'transition-all duration-fast ease-default',
  ],
  variants: {
    variant: {
      default: 'bg-surface border border-border-subtle',
      outlined: 'bg-transparent border border-border-strong',
      elevated: 'bg-surface shadow-300 border border-border-weak',
    },
    size: {
      sm: 'p-100',
      md: 'p-150',
      lg: 'p-200',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const cardHeaderVariants = tv({
  base: 'flex items-center justify-between gap-100 mb-100',
})

const cardTitleVariants = tv({
  base: 'text-label-sm font-medium text-fg-secondary',
})

const metricVariants = tv({
  base: 'flex flex-col gap-25',
})

const metricValueVariants = tv({
  base: 'text-heading-h4 font-semibold text-fg-primary',
})

const metricChangeVariants = tv({
  base: 'flex items-center gap-25 text-label-xs font-medium',
  variants: {
    trend: {
      positive: 'text-positive',
      negative: 'text-negative',
      neutral: 'text-fg-muted',
    },
  },
  defaultVariants: {
    trend: 'neutral',
  },
})

// =============================================================================
// CARD ROOT
// =============================================================================

interface DashboardCardRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardCardVariants> {
  children: React.ReactNode
}

const DashboardCardRoot = React.forwardRef<HTMLDivElement, DashboardCardRootProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dashboardCardVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DashboardCardRoot.displayName = 'DashboardCard'

// =============================================================================
// CARD HEADER
// =============================================================================

interface DashboardCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  action?: React.ReactNode
}

const DashboardCardHeader = React.forwardRef<HTMLDivElement, DashboardCardHeaderProps>(
  ({ className, title, action, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardHeaderVariants(), className)} {...props}>
        {title ? <span className={cardTitleVariants()}>{title}</span> : children}
        {action && <div className="shrink-0">{action}</div>}
      </div>
    )
  }
)
DashboardCardHeader.displayName = 'DashboardCardHeader'

// =============================================================================
// CARD METRIC
// =============================================================================

type TrendType = 'positive' | 'negative' | 'neutral'

interface DashboardCardMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number
  label?: string
  change?: string
  trend?: TrendType
}

const DashboardCardMetric = React.forwardRef<HTMLDivElement, DashboardCardMetricProps>(
  ({ className, value, label, change, trend = 'neutral', ...props }, ref) => {
    const TrendIcon = trend === 'positive' 
      ? TrendingUp 
      : trend === 'negative' 
        ? TrendingDown 
        : Minus

    return (
      <div ref={ref} className={cn(metricVariants(), className)} {...props}>
        {label && <span className={cardTitleVariants()}>{label}</span>}
        <span className={metricValueVariants()}>{value}</span>
        {change && (
          <div className={metricChangeVariants({ trend })}>
            <TrendIcon className="size-icon-sm" />
            <span>{change}</span>
          </div>
        )}
      </div>
    )
  }
)
DashboardCardMetric.displayName = 'DashboardCardMetric'

// =============================================================================
// CARD CONTENT
// =============================================================================

interface DashboardCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DashboardCardContent = React.forwardRef<HTMLDivElement, DashboardCardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex-1', className)} {...props}>
        {children}
      </div>
    )
  }
)
DashboardCardContent.displayName = 'DashboardCardContent'

// =============================================================================
// CARD FOOTER
// =============================================================================

interface DashboardCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DashboardCardFooter = React.forwardRef<HTMLDivElement, DashboardCardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-100 pt-100 border-t border-border-subtle flex items-center justify-between gap-100',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DashboardCardFooter.displayName = 'DashboardCardFooter'

// =============================================================================
// EXPORTS
// =============================================================================

export const DashboardCard = Object.assign(DashboardCardRoot, {
  Header: DashboardCardHeader,
  Metric: DashboardCardMetric,
  Content: DashboardCardContent,
  Footer: DashboardCardFooter,
})

export {
  DashboardCardRoot,
  DashboardCardHeader,
  DashboardCardMetric,
  DashboardCardContent,
  DashboardCardFooter,
  dashboardCardVariants,
}
