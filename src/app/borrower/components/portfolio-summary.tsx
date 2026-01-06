'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button, Dialog, DialogContent, DialogTitle, Pill, TokenLogo } from '@/components/ui'
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
// GROUPED SUMMARY CARD COMPONENT
// =============================================================================

interface GroupedCardProps {
  title: string
  children: React.ReactNode
  highlighted?: boolean
  clickable?: boolean
  onClick?: () => void
  buttonLabel?: string
  className?: string
}

function GroupedCard({
  title,
  children,
  highlighted = false,
  clickable = false,
  onClick,
  buttonLabel,
  className,
}: GroupedCardProps) {
  return (
    <div
      className={cn(
        'flex-1 rounded-xl p-125 border flex flex-col',
        highlighted
          ? 'bg-negative-subtle border-negative'
          : 'bg-surface border-border-subtle',
        className
      )}
    >
      <span className={cn('text-label-xs uppercase tracking-wide', highlighted ? 'text-negative' : 'text-fg-muted')}>
        {title}
      </span>
      <div className="mt-75 space-y-50 flex-1">
        {children}
      </div>
      {clickable && onClick ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={onClick}
          className="w-full mt-100"
        >
          {buttonLabel || 'View details'}
        </Button>
      ) : (
        <div className="h-control-sm mt-100" />
      )}
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
      <DialogContent className="w-full max-w-3xl">
        <DialogTitle>Margin Call Levels</DialogTitle>
        
        <p className="text-body-sm text-fg-muted mb-150">
          Price levels at which each loan will trigger a margin call, sorted by proximity to trigger.
        </p>

        <div className="space-y-100 max-h-[60vh] overflow-y-auto pr-50">
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
// INTEREST PAYMENTS MODAL
// =============================================================================

interface InterestPaymentsModalProps {
  open: boolean
  onClose: () => void
  loans: Loan[]
}

function InterestPaymentsModal({ open, onClose, loans }: InterestPaymentsModalProps) {
  const now = new Date()

  // Group loans by entity
  const loansByEntity = loans.reduce((acc, loan) => {
    const entity = loan.entityName
    if (!acc[entity]) {
      acc[entity] = []
    }
    acc[entity].push(loan)
    return acc
  }, {} as Record<string, Loan[]>)

  // Calculate entity urgency (for sorting entities)
  const getEntityUrgency = (entityLoans: Loan[]) => {
    const hasOverdue = entityLoans.some(l => l.interestDueDate < now)
    const earliestDue = Math.min(...entityLoans.map(l => l.interestDueDate.getTime()))
    return { hasOverdue, earliestDue }
  }

  // Sort entities: overdue first, then by earliest due date
  const sortedEntities = Object.entries(loansByEntity).sort(([, loansA], [, loansB]) => {
    const urgencyA = getEntityUrgency(loansA)
    const urgencyB = getEntityUrgency(loansB)
    
    if (urgencyA.hasOverdue && !urgencyB.hasOverdue) return -1
    if (!urgencyA.hasOverdue && urgencyB.hasOverdue) return 1
    return urgencyA.earliestDue - urgencyB.earliestDue
  })

  // Sort loans within entity: overdue first, then by due date
  const sortLoansWithinEntity = (entityLoans: Loan[]) => {
    return [...entityLoans].sort((a, b) => {
      const aOverdue = a.interestDueDate < now
      const bOverdue = b.interestDueDate < now
      
      if (aOverdue && !bOverdue) return -1
      if (!aOverdue && bOverdue) return 1
      return a.interestDueDate.getTime() - b.interestDueDate.getTime()
    })
  }

  const formatDueDate = (date: Date) => {
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, isOverdue: true }
    }
    if (diffDays === 0) {
      return { text: 'Due today', isOverdue: false, isUrgent: true }
    }
    if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, isOverdue: false, isUrgent: true }
    }
    return { 
      text: `Due ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, 
      isOverdue: false,
      isUrgent: false 
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="w-full max-w-3xl">
        <DialogTitle>Interest Payments</DialogTitle>
        
        <p className="text-body-sm text-fg-muted mb-150">
          Upcoming and overdue interest payments grouped by legal entity.
        </p>

        <div className="space-y-150 max-h-[60vh] overflow-y-auto pr-50">
          {sortedEntities.map(([entityName, entityLoans]) => {
            const sortedLoans = sortLoansWithinEntity(entityLoans)
            const totalInterest = entityLoans.reduce((sum, l) => sum + l.interestAmountUsd, 0)
            const hasOverdue = entityLoans.some(l => l.interestDueDate < now)

            return (
              <div key={entityName} className="space-y-75">
                {/* Entity header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-75">
                    <h3 className="text-label-md font-semibold text-fg-primary">
                      {entityName}
                    </h3>
                    <span className="text-label-sm text-fg-muted">
                      {entityLoans.length} loan{entityLoans.length > 1 ? 's' : ''}
                    </span>
                    {hasOverdue && (
                      <Pill type="negative" appearance="subtle" size="20">
                        Overdue
                      </Pill>
                    )}
                  </div>
                  <span className="text-label-sm font-medium text-fg-primary">
                    {formatFullCurrency(totalInterest)} total
                  </span>
                </div>

                {/* Loans in this entity */}
                <div className="space-y-75">
                  {sortedLoans.map((loan) => {
                    const dueInfo = formatDueDate(loan.interestDueDate)

                    return (
                      <div
                        key={loan.id}
                        className={cn(
                          'rounded-xl p-100 border flex items-center justify-between',
                          dueInfo.isOverdue 
                            ? 'bg-negative-subtle border-negative' 
                            : dueInfo.isUrgent 
                              ? 'bg-warning-subtle border-warning' 
                              : 'bg-surface border-border-subtle'
                        )}
                      >
                        <div className="flex items-center gap-100">
                          <TokenLogo token={loan.collateralType} size="sm" />
                          <div>
                            <p className="text-label-sm font-medium text-fg-primary">
                              Loan #{loan.id.split('-')[1]}
                            </p>
                            <p className={cn(
                              'text-label-xs',
                              dueInfo.isOverdue ? 'text-negative' : dueInfo.isUrgent ? 'text-warning' : 'text-fg-muted'
                            )}>
                              {dueInfo.text}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-100">
                          <span className={cn(
                            'text-label-md font-semibold',
                            dueInfo.isOverdue ? 'text-negative' : 'text-fg-primary'
                          )}>
                            {formatFullCurrency(loan.interestAmountUsd)}
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled
                            className="opacity-50"
                          >
                            Pay Interest
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-label-xs text-fg-muted mt-150 text-center">
          Payment functionality coming soon
        </p>
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
  const [showInterestModal, setShowInterestModal] = React.useState(false)

  const hasOverdueInterest = data.overdueInterest > 0
  const hasActiveMarginCalls = data.activeMarginCalls > 0

  return (
    <>
      <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-100', className)}>
        {/* Card 1: Total Principal */}
        <GroupedCard title="Total Principal">
          <p className="text-heading-h4 font-semibold text-fg-primary">
            {formatCurrency(data.totalPrincipal)}
          </p>
        </GroupedCard>

        {/* Card 2: Interest Payments - shows overdue OR next payment */}
        <GroupedCard
          title="Interest Payments"
          highlighted={hasOverdueInterest}
          clickable={true}
          onClick={() => setShowInterestModal(true)}
          buttonLabel="Pay Interest"
        >
          {hasOverdueInterest ? (
            <>
              <p className="text-heading-h4 font-semibold text-negative">
                {data.overdueInterest} overdue
              </p>
              <p className="text-label-sm text-negative">
                Click to view all payments
              </p>
            </>
          ) : (
            <>
              <p className="text-heading-h4 font-semibold text-fg-primary">
                {data.nextPayment ? formatFullCurrency(data.nextPayment.amount) : '—'}
              </p>
              {data.nextPayment && (
                <p className="text-label-sm text-fg-muted">
                  Due {formatDate(data.nextPayment.date)}
                </p>
              )}
            </>
          )}
        </GroupedCard>

        {/* Card 3: Margin Calls - shows active count + next trigger */}
        <GroupedCard
          title="Margin Calls"
          highlighted={hasActiveMarginCalls}
          clickable={true}
          onClick={() => setShowMarginCallModal(true)}
          buttonLabel="View Details"
        >
          <div className="flex items-baseline justify-between">
            <span className={cn(
              'text-heading-h4 font-semibold',
              hasActiveMarginCalls ? 'text-negative' : 'text-fg-primary'
            )}>
              {data.activeMarginCalls} active
            </span>
          </div>
          <div className="pt-25 border-t border-border-subtle">
            <p className="text-label-xs text-fg-muted mb-25">Next Trigger</p>
            {data.nearestMarginCall ? (
              <p className="text-label-md font-medium text-fg-primary">
                {data.nearestMarginCall.collateralType.toUpperCase()} at{' '}
                {formatFullCurrency(data.nearestMarginCall.marginCallPrice)}
              </p>
            ) : (
              <p className="text-label-md text-fg-muted">—</p>
            )}
          </div>
        </GroupedCard>
      </div>

      {/* Margin Call Levels Modal */}
      <MarginCallLevelsModal
        open={showMarginCallModal}
        onClose={() => setShowMarginCallModal(false)}
        loans={loans}
      />

      {/* Interest Payments Modal */}
      <InterestPaymentsModal
        open={showInterestModal}
        onClose={() => setShowInterestModal(false)}
        loans={loans}
      />
    </>
  )
}
