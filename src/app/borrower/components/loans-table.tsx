'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button, Pill, TokenLogo } from '@/components/ui'
import { AlertTriangle, Clock } from 'lucide-react'
import type { Loan, LoanStatus } from '../types'

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
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

function calculatePriceChangePercent(currentPrice: number, triggerPrice: number): string {
  const percentChange = ((triggerPrice - currentPrice) / currentPrice) * 100
  const sign = percentChange > 0 ? '+' : ''
  return `${sign}${percentChange.toFixed(0)}%`
}

const statusConfig: Record<
  LoanStatus,
  { label: string; type: 'positive' | 'negative' | 'primary'; icon?: React.ReactNode }
> = {
  healthy: { label: 'Healthy', type: 'positive' },
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
// LOANS TABLE COMPONENT
// =============================================================================

interface LoansTableProps {
  loans: Loan[]
  className?: string
}

export function LoansTable({ loans, className }: LoansTableProps) {
  const router = useRouter()

  return (
    <div className={cn('bg-surface rounded-lg border border-border-subtle overflow-hidden', className)} suppressHydrationWarning>
      <table className="w-full" suppressHydrationWarning>
        <thead suppressHydrationWarning>
          <tr className="border-b border-border-subtle bg-muted" suppressHydrationWarning>
            <th className="text-left text-label-xs text-fg-muted p-75">Entity</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Principal</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Collateral</th>
            <th className="text-left text-label-xs text-fg-muted p-75">LTV</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Margin Call</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Liquidation Level</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Interest Due</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Status</th>
            <th className="text-right text-label-xs text-fg-muted p-75">Actions</th>
          </tr>
        </thead>
        <tbody suppressHydrationWarning>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              className="border-b border-border-subtle last:border-b-0 hover:bg-primary transition-colors cursor-pointer"
              onClick={() => router.push(`/borrower/loans/${loan.id}`)}
            >
              <td className="p-75">
                <span className="text-label-sm text-fg-primary">{loan.entityName}</span>
              </td>
              <td className="p-75">
                <div className="flex items-center gap-25">
                  <TokenLogo token={loan.paymentCoin} size="xs" />
                  <span className="text-label-sm text-fg-primary">
                    ${formatCurrency(loan.principalUsd)}
                  </span>
                </div>
              </td>
              <td className="p-75">
                <div className="flex items-center gap-25">
                  <TokenLogo token={loan.collateralType} size="xs" />
                  <span className="text-label-sm text-fg-primary">
                    {loan.collateralAmount.toLocaleString()} {loan.collateralType.toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="p-75">
                <span className={cn(
                  'text-label-sm font-medium',
                  loan.currentLtv >= loan.marginCallLtv ? 'text-negative' : 'text-positive'
                )}>
                  {loan.currentLtv}%
                </span>
                <span className="text-label-xs text-fg-muted ml-25">
                  / {loan.marginCallLtv}%
                </span>
              </td>
              <td className="p-75">
                <span className="text-label-sm text-fg-primary">
                  ${formatCurrency(loan.marginCallPrice)}
                </span>
                <span className="text-label-xs text-fg-muted ml-25">
                  ({calculatePriceChangePercent(loan.currentCollateralPrice, loan.marginCallPrice)})
                </span>
              </td>
              <td className="p-75">
                <span className="text-label-sm text-fg-primary">
                  ${formatCurrency(loan.liquidationPrice)}
                </span>
                <span className="text-label-xs text-fg-muted ml-25">
                  ({calculatePriceChangePercent(loan.currentCollateralPrice, loan.liquidationPrice)})
                </span>
              </td>
              <td className="p-75">
                <div className="flex flex-col">
                  <div className="flex items-center gap-25">
                    <TokenLogo token={loan.paymentCoin} size="2xs" />
                    <span className="text-label-sm text-fg-primary">
                      {formatCurrency(loan.interestAmountUsd)}
                    </span>
                  </div>
                  <span className="text-label-xs text-fg-muted mt-25">
                    {formatDate(loan.interestDueDate)}
                  </span>
                </div>
              </td>
              <td className="p-75">
                <Pill
                  type={statusConfig[loan.status].type}
                  appearance="subtle"
                  size="24"
                  beforeIcon={statusConfig[loan.status].icon}
                >
                  {statusConfig[loan.status].label}
                </Pill>
              </td>
              <td className="p-75 text-right">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/borrower/loans/${loan.id}`)
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
