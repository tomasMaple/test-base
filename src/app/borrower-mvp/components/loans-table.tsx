'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { formatCurrency, formatFullCurrency, formatCollateralAmount, formatNumber, formatPercent } from '../formatters'
import { Button, Pill, TokenLogo } from '@/components/ui'
import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip'
import { AlertTriangle, Clock, Info } from 'lucide-react'
import type { Loan, LoanStatus } from '../types'

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function formatInterestRate(netRate: number, protocolFee: number): string {
  const totalRate = (netRate + protocolFee) * 100
  return `${totalRate.toFixed(2)}%`
}

function formatRateBreakdown(netRate: number, protocolFee: number): string {
  const netPercent = (netRate * 100).toFixed(2)
  const feePercent = (protocolFee * 100).toFixed(2)
  return `Net: ${netPercent}% + Protocol: ${feePercent}%`
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
            <th className="text-left text-label-xs text-fg-muted p-75">LTV / Initial LTV</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Interest Rate</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Margin Call</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Liquidation</th>
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
              onClick={() => router.push(`/borrower-mvp/loans/${loan.id}`)}
            >
              <td className="p-75">
                <span className="text-label-sm text-fg-primary">{loan.entityName}</span>
              </td>
              <td className="p-75">
                <div className="flex items-center gap-25">
                  <TokenLogo token={loan.paymentCoin} size="xs" />
                  <span className="text-label-sm text-fg-primary">
                    {formatCurrency(loan.principalUsd)}
                  </span>
                </div>
              </td>
              <td className="p-75">
                <div className="flex items-center gap-25 whitespace-nowrap">
                  <TokenLogo token={loan.collateralType} size="xs" />
                  <div className="flex flex-col">
                    <span className="text-label-sm text-fg-primary">
                      {formatCollateralAmount(loan.collateralAmount)}
                    </span>
                    <span className="text-label-xs text-fg-muted">
                      ≈ {formatCurrency(loan.collateralValueUsd)}
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-75">
                <span className={cn(
                  'text-label-sm font-medium',
                  loan.currentLtv >= loan.marginCallLtv ? 'text-negative' : 'text-positive'
                )}>
                  {formatPercent(loan.currentLtv)}
                </span>
                <span className="text-label-xs text-fg-muted ml-25">
                  / {formatPercent(loan.initialLtv)}
                </span>
              </td>
              <td className="p-75">
                <BaseTooltip.Root>
                  <BaseTooltip.Trigger
                    className="text-label-sm text-fg-primary flex items-center gap-25 cursor-pointer hover:text-brand transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {formatInterestRate(loan.interestRate, loan.protocolFee)}
                    <Info className="size-icon-xs text-fg-muted" />
                  </BaseTooltip.Trigger>
                  <BaseTooltip.Portal>
                    <BaseTooltip.Positioner sideOffset={4}>
                      <BaseTooltip.Popup className="z-50 bg-inverse text-fg-inverse px-100 py-75 rounded-lg text-label-sm shadow-200">
                        {formatRateBreakdown(loan.interestRate, loan.protocolFee)}
                      </BaseTooltip.Popup>
                    </BaseTooltip.Positioner>
                  </BaseTooltip.Portal>
                </BaseTooltip.Root>
              </td>
              <td className="p-75">
                <div className="flex flex-col">
                  <span className="text-label-sm text-fg-primary">
                    ${formatFullCurrency(loan.marginCallPrice, false)}
                  </span>
                  <span className="text-label-xs text-fg-muted">
                    at {formatPercent(loan.marginCallLtv)} LTV
                  </span>
                </div>
              </td>
              <td className="p-75">
                <div className="flex flex-col">
                  <span className="text-label-sm text-fg-primary">
                    ${formatFullCurrency(loan.liquidationPrice, false)}
                  </span>
                  <span className="text-label-xs text-fg-muted">
                    at {formatPercent(loan.liquidationLtv)} LTV
                  </span>
                </div>
              </td>
              <td className="p-75">
                <div className="flex flex-col">
                  <div className="flex items-center gap-25">
                    <TokenLogo token={loan.paymentCoin} size="2xs" />
                    <span className="text-label-sm text-fg-primary">
                      {formatFullCurrency(loan.interestAmountUsd, false)}
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
                    router.push(`/borrower-mvp/loans/${loan.id}`)
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

// =============================================================================
// CLOSED LOANS TABLE COMPONENT - Simplified display for inactive loans
// =============================================================================

interface ClosedLoansTableProps {
  loans: Loan[]
  className?: string
}

function formatClosedDate(date: Date | null): string {
  if (!date) return '-'
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ClosedLoansTable({ loans, className }: ClosedLoansTableProps) {
  return (
    <div className={cn('bg-surface rounded-lg border border-border-subtle overflow-hidden', className)} suppressHydrationWarning>
      <table className="w-full" suppressHydrationWarning>
        <thead suppressHydrationWarning>
          <tr className="border-b border-border-subtle bg-muted" suppressHydrationWarning>
            <th className="text-left text-label-xs text-fg-muted p-75">Entity</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Principal</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Collateral</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Initial LTV</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Closed Date</th>
            <th className="text-left text-label-xs text-fg-muted p-75">Status</th>
          </tr>
        </thead>
        <tbody suppressHydrationWarning>
          {loans.map((loan) => (
            <tr
              key={loan.id}
              className="border-b border-border-subtle last:border-b-0 opacity-75"
            >
              <td className="p-75">
                <span className="text-label-sm text-fg-muted">{loan.entityName}</span>
              </td>
              <td className="p-75">
                <div className="flex items-center gap-25">
                  <TokenLogo token={loan.paymentCoin} size="xs" />
                  <span className="text-label-sm text-fg-muted">
                    {formatCurrency(loan.principalUsd)}
                  </span>
                </div>
              </td>
              <td className="p-75">
                <div className="flex items-center gap-25 whitespace-nowrap">
                  <TokenLogo token={loan.collateralType} size="xs" />
                  <span className="text-label-sm text-fg-muted">
                    {formatCollateralAmount(loan.collateralAmount)}
                  </span>
                </div>
              </td>
              <td className="p-75">
                <span className="text-label-sm text-fg-muted">
                  {formatPercent(loan.initialLtv)}
                </span>
              </td>
              <td className="p-75">
                <span className="text-label-sm text-fg-muted">
                  {formatClosedDate(loan.maturityDate)}
                </span>
              </td>
              <td className="p-75">
                <Pill type="secondary" appearance="subtle" size="24">
                  Closed
                </Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
