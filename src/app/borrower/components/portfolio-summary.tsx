'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// HELPERS
// =============================================================================

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatFullCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// =============================================================================
// SUMMARY CARD COMPONENT
// =============================================================================

interface SummaryCardProps {
  title: string
  value: React.ReactNode
  subtitle?: string
  highlighted?: boolean
  className?: string
}

function SummaryCard({
  title,
  value,
  subtitle,
  highlighted = false,
  className,
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        'flex-1 rounded-xl p-100 border',
        highlighted 
          ? 'bg-negative-subtle border-negative' 
          : 'bg-surface border-border-subtle',
        className
      )}
    >
      <span className={cn('text-label-xs', highlighted ? 'text-negative' : 'text-fg-muted')}>
        {title}
      </span>
      <div className="mt-50">
        <span className={cn('text-heading-h5 font-semibold', highlighted ? 'text-negative' : 'text-fg-primary')}>
          {value}
        </span>
        {subtitle && (
          <p className={cn('text-label-xs mt-12', highlighted ? 'text-negative' : 'text-fg-muted')}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// PORTFOLIO SUMMARY COMPONENT
// =============================================================================

interface PortfolioSummaryData {
  totalPrincipal: number
  activeLoans: number
  activeMarginCalls: number
  overdueInterest: number
  nextPayment: {
    amount: number
    date: Date
    loanId: string
  } | null
  nearestMarginCall: {
    collateralType: string
    marginCallPrice: number
    loanId: string
  } | null
}

interface PortfolioSummaryProps {
  data: PortfolioSummaryData
  className?: string
}

export function PortfolioSummary({ data, className }: PortfolioSummaryProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-100', className)}>
      {/* Total principal */}
      <SummaryCard
        title="Total Principal"
        value={formatCurrency(data.totalPrincipal)}
      />

      {/* Active loans */}
      <SummaryCard
        title="Active Loans"
        value={data.activeLoans}
      />

      {/* Active margin calls */}
      <SummaryCard
        title="Active Margin Calls"
        value={data.activeMarginCalls}
        highlighted={data.activeMarginCalls > 0}
      />

      {/* Overdue interest */}
      <SummaryCard
        title="Overdue Interest"
        value={data.overdueInterest}
        highlighted={data.overdueInterest > 0}
      />

      {/* Next payment */}
      <SummaryCard
        title="Next Payment"
        value={data.nextPayment ? formatFullCurrency(data.nextPayment.amount) : '—'}
        subtitle={data.nextPayment ? formatDate(data.nextPayment.date) : undefined}
      />

      {/* Nearest margin call */}
      <SummaryCard
        title="Nearest Margin Call"
        value={
          data.nearestMarginCall ? (
            <span className="text-warning">
              {data.nearestMarginCall.collateralType.toUpperCase()} at{' '}
              {formatFullCurrency(data.nearestMarginCall.marginCallPrice)}
            </span>
          ) : (
            '—'
          )
        }
      />
    </div>
  )
}
