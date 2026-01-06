'use client'

import * as React from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'
import { Pill, TokenLogo } from '@/components/ui'
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react'
import { LtvGauge } from './ltv-gauge'
import { Loan, LoanStatus } from '../types'

// =============================================================================
// HELPERS
// =============================================================================

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
  })
}

// =============================================================================
// STATUS CONFIG
// =============================================================================

const statusConfig: Record<
  LoanStatus,
  { label: string; type: 'positive' | 'negative' | 'primary'; icon?: React.ReactNode }
> = {
  healthy: {
    label: 'Healthy',
    type: 'positive',
  },
  'margin-call': {
    label: 'Margin call',
    type: 'negative',
    icon: <AlertTriangle className="size-icon-sm" />,
  },
  overdue: {
    label: 'Overdue',
    type: 'negative',
    icon: <Clock className="size-icon-sm" />,
  },
}

// =============================================================================
// LOAN CARD COMPONENT - Compact horizontal layout
// =============================================================================

interface LoanCardProps {
  loan: Loan
  className?: string
}

export function LoanCard({ loan, className }: LoanCardProps) {
  const status = statusConfig[loan.status]
  const isMarginCall = loan.status === 'margin-call'

  return (
    <NextLink href={`/borrower/loans/${loan.id}`} className="block">
      <div
        className={cn(
          'rounded-xl p-125 border transition-all duration-fast',
          'bg-surface border-border-subtle',
          'hover:border-border-strong',
          isMarginCall && 'ring-2 ring-negative border-negative',
          className
        )}
      >
        {/* Row 1: Header - Address, Status, Entity, Collateral type */}
        <div className="flex items-center justify-between mb-100">
          <div className="flex items-center gap-75">
            <Pill type="secondary" appearance="default" size="24">
              {loan.collateralWalletAddress}
            </Pill>
            <Pill
              type={status.type}
              appearance="subtle"
              size="24"
              beforeIcon={status.icon}
            >
              {status.label}
            </Pill>
            <span className="text-label-sm text-fg-muted">{loan.entityName}</span>
          </div>
          <div className="flex items-center gap-75">
            <TokenLogo token={loan.collateralType} size="sm" />
            <span className="text-label-md font-medium text-fg-primary">
              {loan.collateralType.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Row 2: Principal */}
        <div className="text-heading-h4 font-semibold text-fg-primary mb-100">
          {formatFullCurrency(loan.principalUsd)}
        </div>

        {/* Row 3: Full-width LTV bar */}
        <div className="mb-100">
          <div className="flex items-center justify-between mb-50">
            <div className="flex items-center gap-50">
              <span className="text-label-sm text-fg-muted">LTV</span>
              <span className={cn(
                'text-label-md font-semibold',
                loan.currentLtv >= loan.marginCallLtv ? 'text-negative' : 'text-positive'
              )}>
                {loan.currentLtv}%
              </span>
            </div>
            <div className="flex items-center gap-100 text-label-sm text-fg-muted">
              <div className="flex items-center gap-50">
                <div className="w-2 h-2 rounded-sm bg-negative" />
                <span>MC {loan.marginCallLtv}%</span>
              </div>
              <div className="flex items-center gap-50">
                <div className="w-2.5 h-2.5 rounded-sm bg-negative-emphasis" />
                <span className="font-medium">Liq {loan.liquidationLtv}%</span>
              </div>
            </div>
          </div>
          <LtvGauge
            currentLtv={loan.currentLtv}
            marginCallLtv={loan.marginCallLtv}
            liquidationLtv={loan.liquidationLtv}
            size="sm"
          />
        </div>

        {/* Row 3: Triggers + Interest - all inline */}
        <div className="flex items-center justify-between text-label-sm">
          <div className="flex items-center gap-125">
            <div className="flex items-center gap-50 text-fg-muted">
              <AlertTriangle className="size-icon-xs text-warning" />
              <span>Margin call if {loan.collateralType.toUpperCase()} &lt; <span className="font-medium text-fg-primary">{formatFullCurrency(loan.marginCallPrice)}</span></span>
            </div>
            <div className="flex items-center gap-50 text-fg-muted">
              <TrendingDown className="size-icon-xs text-negative" />
              <span>Liquidation if {loan.collateralType.toUpperCase()} &lt; <span className="font-medium text-fg-primary">{formatFullCurrency(loan.liquidationPrice)}</span></span>
            </div>
          </div>
          <div className="flex items-center gap-75 text-fg-muted">
            <span>Next interest</span>
            <span className="font-medium text-fg-primary">{formatFullCurrency(loan.interestAmountUsd)}</span>
            <span>due {formatDate(loan.interestDueDate)}</span>
          </div>
        </div>
      </div>
    </NextLink>
  )
}
