'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTitle, TokenLogo } from '@/components/ui'
import { Loan } from '../types'

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
  clickable?: boolean
  onClick?: () => void
  className?: string
}

function SummaryCard({
  title,
  value,
  subtitle,
  highlighted = false,
  clickable = false,
  onClick,
  className,
}: SummaryCardProps) {
  const content = (
    <>
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
    </>
  )

  if (clickable && onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'flex-1 rounded-xl p-100 border text-left transition-all cursor-pointer',
          highlighted 
            ? 'bg-negative-subtle border-negative hover:bg-negative-subtle/80' 
            : 'bg-surface border-border-subtle hover:border-border-strong',
          className
        )}
      >
        {content}
      </button>
    )
  }

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
      {content}
    </div>
  )
}

// =============================================================================
// MARGIN CALL LEVELS MODAL
// =============================================================================

interface MarginCallLevelsModalProps {
  open: boolean
  onClose: () => void
  loans: Loan[]
}

function MarginCallLevelsModal({ open, onClose, loans }: MarginCallLevelsModalProps) {
  // Sort loans by how close they are to margin call (least headroom first)
  const sortedLoans = [...loans].sort((a, b) => {
    const aHeadroom = a.marginCallLtv - a.currentLtv
    const bHeadroom = b.marginCallLtv - b.currentLtv
    return aHeadroom - bHeadroom
  })

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="w-full max-w-2xl">
        <DialogTitle>Margin Call Levels</DialogTitle>
        
        <p className="text-body-sm text-fg-muted mb-150">
          Price levels at which each loan will trigger a margin call, sorted by proximity to trigger.
        </p>

        <div className="space-y-100 max-h-[60vh] overflow-y-auto">
          {sortedLoans.map((loan) => {
            const headroom = loan.marginCallLtv - loan.currentLtv
            const isMarginCalled = headroom <= 0
            const isClose = headroom > 0 && headroom < 15

            return (
              <div
                key={loan.id}
                className={cn(
                  'rounded-xl p-100 border',
                  isMarginCalled 
                    ? 'bg-negative-subtle border-negative' 
                    : isClose 
                      ? 'bg-warning-subtle border-warning' 
                      : 'bg-surface border-border-subtle'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-100">
                    <TokenLogo token={loan.collateralType} size="md" />
                    <div>
                      <p className="text-label-md font-medium text-fg-primary">
                        {loan.collateralType.toUpperCase()}
                      </p>
                      <p className="text-label-xs text-fg-muted">
                        {loan.entityName} · Loan #{loan.id.split('-')[1]}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      'text-heading-h6 font-semibold',
                      isMarginCalled ? 'text-negative' : isClose ? 'text-warning' : 'text-fg-primary'
                    )}>
                      {formatFullCurrency(loan.marginCallPrice)}
                    </p>
                    <p className="text-label-xs text-fg-muted">
                      Current: {formatFullCurrency(loan.currentCollateralPrice)}
                    </p>
                  </div>
                </div>
                <div className="mt-75 flex items-center justify-between text-label-xs">
                  <span className="text-fg-muted">
                    LTV: <span className={cn(
                      'font-medium',
                      loan.currentLtv >= loan.marginCallLtv ? 'text-negative' : 'text-fg-primary'
                    )}>{loan.currentLtv}%</span> / {loan.marginCallLtv}% margin call
                  </span>
                  <span className={cn(
                    'font-medium',
                    isMarginCalled ? 'text-negative' : isClose ? 'text-warning' : 'text-positive'
                  )}>
                    {isMarginCalled ? 'Margin called' : `${headroom.toFixed(0)}% headroom`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
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
  loans: Loan[]
  className?: string
}

export function PortfolioSummary({ data, loans, className }: PortfolioSummaryProps) {
  const [showMarginCallModal, setShowMarginCallModal] = React.useState(false)

  return (
    <>
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

        {/* Nearest margin call - clickable */}
        <SummaryCard
          title="Nearest Margin Call"
          value={
            data.nearestMarginCall ? (
              <>
                {data.nearestMarginCall.collateralType.toUpperCase()} at{' '}
                {formatFullCurrency(data.nearestMarginCall.marginCallPrice)}
              </>
            ) : (
              '—'
            )
          }
          clickable={!!data.nearestMarginCall}
          onClick={() => setShowMarginCallModal(true)}
        />
      </div>

      {/* Margin Call Levels Modal */}
      <MarginCallLevelsModal
        open={showMarginCallModal}
        onClose={() => setShowMarginCallModal(false)}
        loans={loans}
      />
    </>
  )
}
