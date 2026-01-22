'use client'

import * as React from 'react'
import { use } from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'
import {
  Badge,
  Button,
  IconButton,
  Pill,
  TokenLogo,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanel,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui'
import {
  ToastProvider,
  ToastPortal,
  StyledToastViewport,
  ToastList,
  useToastManager,
} from '@/components/ui/toast'
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  TrendingDown,
  ExternalLink,
  Copy,
  Check,
  CheckCircle,
  CreditCard,
  Plus,
  FileText,
  ArrowDownLeft,
} from 'lucide-react'
import { LtvDisplay } from '../../components/ltv-gauge'
import { getLoanById, getPaymentHistoryForLoan, getBlockExplorerUrl } from '../../mock-data'
import { Loan, LoanStatus, PaymentHistoryItem, COLLATERAL_TO_NETWORK, BlockchainNetwork } from '../../types'

// Suppress flushSync warning from Base UI Toast (React 19 compatibility issue)
const originalError = console.error
if (typeof window !== 'undefined') {
  console.error = (...args) => {
    if (args[0]?.includes?.('flushSync was called from inside a lifecycle method')) {
      return
    }
    originalError.apply(console, args)
  }
}

// =============================================================================
// HELPERS
// =============================================================================

function formatCurrency(value: number, decimals = 0, includeSymbol: boolean = true): string {
  return new Intl.NumberFormat('en-US', {
    style: includeSymbol ? 'currency' : 'decimal',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function formatCollateralAmount(amount: number, _type?: string): string {
  // All collateral types use 6 decimals for consistency
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  })
}

function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function formatPercent(value: number): string {
  const formatted = value.toFixed(1)
  // Strip .0 suffix
  if (formatted.endsWith('.0')) {
    return `${formatted.slice(0, -2)}%`
  }
  return `${formatted}%`
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDeadline(date: Date): string {
  const day = date.getDate()
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' 
    : day === 2 || day === 22 ? 'nd'
    : day === 3 || day === 23 ? 'rd'
    : 'th'
  
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hour12 = hours % 12 || 12
  const minuteStr = minutes.toString().padStart(2, '0')
  
  return `${month} ${day}${suffix} ${hour12}:${minuteStr}${ampm}`
}

function getDaysUntil(date: Date): number {
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Payment coin display now uses TokenLogo component directly (USDC/USDT logos available)

// =============================================================================
// STATUS CONFIG
// =============================================================================

const statusConfig: Record<
  LoanStatus,
  { label: string; type: 'positive' | 'negative' | 'primary'; icon?: React.ReactNode }
> = {
  healthy: { label: 'Healthy', type: 'positive' },
  'margin-call': {
    label: 'Margin call active',
    type: 'negative',
    icon: <AlertTriangle className="size-icon-sm" />,
  },
  overdue: {
    label: 'Interest overdue',
    type: 'negative',
    icon: <Clock className="size-icon-sm" />,
  },
}

// =============================================================================
// CARD WRAPPER
// =============================================================================

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('bg-surface border border-border-subtle rounded-xl p-150 overflow-visible', className)}>
      {children}
    </div>
  )
}

function CardHeader({ title }: { title: string }) {
  return <h3 className="text-label-sm font-medium text-fg-secondary mb-75">{title}</h3>
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  const toastManager = useToastManager()

  const handleCopy = async () => {
    try {
      // Use clipboard API if available (requires HTTPS or localhost)
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for HTTP or unsupported browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setCopied(true)
      // Show toast notification
      queueMicrotask(() => {
        toastManager.add({
          title: 'Copied',
          timeout: 1000,
          data: {
            appearance: 'default',
            type: 'positive',
          },
        })
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <IconButton
      variant="ghost"
      size="xs"
      aria-label="Copy address"
      onClick={handleCopy}
    >
      {copied ? <Check className="size-icon-sm" /> : <Copy className="size-icon-sm" />}
    </IconButton>
  )
}

interface BlockExplorerLinkProps {
  transactionHash: string
  network: BlockchainNetwork
  size?: 'xs' | 'sm' | 'md'
}

function BlockExplorerLink({ transactionHash, network, size = 'xs' }: BlockExplorerLinkProps) {
  const explorerUrl = getBlockExplorerUrl(network, transactionHash)

  return (
    <IconButton
      variant="ghost"
      size={size}
      aria-label="View on block explorer"
      onClick={() => window.open(explorerUrl, '_blank', 'noopener,noreferrer')}
    >
      <ExternalLink className="size-icon-sm" />
    </IconButton>
  )
}

interface MetricRowProps {
  label: string
  value: React.ReactNode
  className?: string
}

function MetricRow({ label, value, className }: MetricRowProps) {
  return (
    <div className={cn('flex items-center justify-between py-50', className)}>
      <span className="text-label-sm text-fg-muted">{label}</span>
      <span className="text-label-sm font-medium text-fg-primary">{value}</span>
    </div>
  )
}

// =============================================================================
// ACTION ITEM
// =============================================================================

interface ActionItemProps {
  icon: React.ReactNode
  label: string
  comingSoon?: boolean
  highlighted?: boolean
}

function ActionItem({ icon, label, comingSoon = true, highlighted = false }: ActionItemProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-100 rounded-xl border transition-all',
        highlighted
          ? 'bg-inverse border-transparent'
          : 'bg-surface border-border-subtle'
      )}
    >
      <div className="flex items-center gap-75">
        <span className={highlighted ? 'text-fg-inverse' : 'text-fg-muted'}>{icon}</span>
        <span className={cn('text-label-md font-medium', highlighted ? 'text-fg-inverse' : 'text-fg-primary')}>
          {label}
        </span>
      </div>
      {comingSoon && (
        <Pill type="secondary" appearance="subtle" size="20">
          Coming soon
        </Pill>
      )}
    </div>
  )
}

// =============================================================================
// REFINANCE DETAILS MODAL
// =============================================================================

interface RefinanceDetailsModalProps {
  open: boolean
  onClose: () => void
  refinance: PaymentHistoryItem
  loan: Loan
}

function RefinanceDetailsModal({ open, onClose, refinance, loan }: RefinanceDetailsModalProps) {
  if (!refinance.refinanceDetails) return null

  const details = refinance.refinanceDetails
  const network = COLLATERAL_TO_NETWORK[loan.collateralType]

  // Calculate changes
  const interestRateChange = ((details.newInterestRate - details.oldInterestRate) / details.oldInterestRate) * 100
  const principalChange = ((details.newPrincipalUsd - details.oldPrincipalUsd) / details.oldPrincipalUsd) * 100
  const marginCallLtvChange = details.newMarginCallLtv - details.oldMarginCallLtv
  const liquidationLtvChange = details.newLiquidationLtv - details.oldLiquidationLtv

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>Refinance Details</DialogTitle>

        <div className="space-y-100">
          {/* Header with date and transaction link */}
          <div className="flex items-center justify-between pb-100 border-b border-border-subtle">
            <div>
              <p className="text-label-md font-medium text-fg-primary">
                {formatDate(refinance.date)}
              </p>
            </div>
            {refinance.transactionHash && (
              <div className="flex items-center gap-50">
                <CopyButton text={refinance.transactionHash} />
                <BlockExplorerLink
                  transactionHash={refinance.transactionHash}
                  network={network}
                  size="sm"
                />
              </div>
            )}
          </div>

          {/* Interest Rate Card */}
          <Card>
            <CardHeader title="Interest Rate Changes" />
            <div className="space-y-75">
              <MetricRow label="Previous rate" value={`${(details.oldInterestRate * 100).toFixed(2)}% APR`} />
              <MetricRow label="New rate" value={`${(details.newInterestRate * 100).toFixed(2)}% APR`} />
              <MetricRow
                label="Change"
                value={
                  <span className={cn(
                    'font-semibold',
                    interestRateChange < 0 ? 'text-positive' :
                    interestRateChange > 0 ? 'text-negative' : 'text-fg-primary'
                  )}>
                    {interestRateChange > 0 ? '+' : ''}{interestRateChange.toFixed(2)}%
                  </span>
                }
              />
            </div>
          </Card>

          {/* LTV Thresholds Card */}
          <Card>
            <CardHeader title="LTV Threshold Adjustments" />
            <div className="space-y-75">
              <div className="flex items-center justify-between py-50">
                <span className="text-label-sm text-fg-muted">Margin Call LTV</span>
                <span className="text-label-sm font-medium text-fg-primary">
                  {details.oldMarginCallLtv}% → {details.newMarginCallLtv}%
                  <span className={cn(
                    'ml-50',
                    marginCallLtvChange > 0 ? 'text-positive' :
                    marginCallLtvChange < 0 ? 'text-negative' : 'text-fg-muted'
                  )}>
                    ({marginCallLtvChange > 0 ? '+' : ''}{marginCallLtvChange}%)
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between py-50">
                <span className="text-label-sm text-fg-muted">Liquidation LTV</span>
                <span className="text-label-sm font-medium text-fg-primary">
                  {details.oldLiquidationLtv}% → {details.newLiquidationLtv}%
                  <span className={cn(
                    'ml-50',
                    liquidationLtvChange > 0 ? 'text-positive' :
                    liquidationLtvChange < 0 ? 'text-negative' : 'text-fg-muted'
                  )}>
                    ({liquidationLtvChange > 0 ? '+' : ''}{liquidationLtvChange}%)
                  </span>
                </span>
              </div>
            </div>
          </Card>

          {/* Principal Changes Card */}
          <Card>
            <CardHeader title="Principal Amount Changes" />
            <div className="space-y-75">
              <MetricRow
                label="Previous principal"
                value={
                  <div className="flex items-center gap-25">
                    <TokenLogo token={refinance.paymentCoin} size="xs" />
                    <span>{formatNumber(details.oldPrincipalUsd, 2)}</span>
                  </div>
                }
              />
              <MetricRow
                label="New principal"
                value={
                  <div className="flex items-center gap-25">
                    <TokenLogo token={refinance.paymentCoin} size="xs" />
                    <span>{formatNumber(details.newPrincipalUsd, 2)}</span>
                  </div>
                }
              />
              <MetricRow
                label="Change"
                value={
                  <div className="flex items-center gap-25">
                    <TokenLogo token={refinance.paymentCoin} size="xs" />
                    <span className={cn(
                      'font-semibold',
                      principalChange !== 0 ? 'text-fg-primary' : 'text-fg-muted'
                    )}>
                      {principalChange > 0 ? '+' : ''}
                      {formatNumber(details.newPrincipalUsd - details.oldPrincipalUsd, 2)}
                      {principalChange !== 0 && ` (${principalChange.toFixed(1)}%)`}
                    </span>
                  </div>
                }
              />
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// =============================================================================
// TAB CONTENT: SUMMARY
// =============================================================================

interface SummaryTabProps {
  loan: Loan
}

function SummaryTab({ loan }: SummaryTabProps) {
  const daysUntilInterest = getDaysUntil(loan.interestDueDate)
  const isOverdue = loan.status === 'overdue'

  return (
    <div className="space-y-100">
      {/* Position overview */}
      <Card>
        <CardHeader title="Position overview" />
        <div className="grid grid-cols-2 gap-100 mb-100">
          {/* Principal */}
          <div className="space-y-50">
            <span className="text-label-xs text-fg-muted">Principal</span>
            <div className="flex items-center gap-25">
              <TokenLogo token={loan.paymentCoin} size="md" />
              <p className="text-heading-h5 font-semibold text-fg-primary">
                {formatNumber(loan.principalUsd, 0)}
              </p>
            </div>
          </div>

          {/* Collateral */}
          <div className="space-y-50">
            <span className="text-label-xs text-fg-muted">Collateral</span>
            <div className="flex items-center gap-75">
              <TokenLogo token={loan.collateralType} size="lg" />
              <div>
                <p className="text-label-md font-medium text-fg-primary">
                  {formatCollateralAmount(loan.collateralAmount, loan.collateralType)}
                </p>
                <p className="text-label-xs text-fg-muted">
                  ≈ {formatCurrency(loan.collateralValueUsd)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LTV Display */}
        <div className="border-t border-border-subtle pt-100 overflow-visible">
          <LtvDisplay
            currentLtv={loan.currentLtv}
            marginCallLtv={loan.marginCallLtv}
            liquidationLtv={loan.liquidationLtv}
            refundLtv={loan.initialLtv}
          />
        </div>
      </Card>

      {/* Trigger thresholds */}
      <div className="grid grid-cols-2 gap-100">
        <Card>
          <CardHeader title="Margin call trigger" />
          <p className="text-heading-h5 font-semibold text-warning mb-25">
            {formatCurrency(loan.marginCallPrice)}
          </p>
          <p className="text-label-xs text-fg-muted">
            {loan.collateralType.toUpperCase()} price at {formatPercent(loan.marginCallLtv)} LTV
          </p>
        </Card>

        <Card>
          <CardHeader title="Liquidation trigger" />
          <p className="text-heading-h5 font-semibold text-negative mb-25">
            {formatCurrency(loan.liquidationPrice)}
          </p>
          <p className="text-label-xs text-fg-muted">
            {loan.collateralType.toUpperCase()} price at {formatPercent(loan.liquidationLtv)} LTV
          </p>
        </Card>
      </div>

      {/* Interest schedule */}
      <Card>
        <CardHeader title="Interest schedule" />
        <div className="space-y-75">
          <MetricRow
            label="Next payment"
            value={
              isOverdue ? (
                <span className="text-negative">
                  {loan.interestOverdueDays} days overdue
                </span>
              ) : (
                <span>
                  {formatDate(loan.interestDueDate)} ({daysUntilInterest}d)
                </span>
              )
            }
          />
          <MetricRow
            label="Amount due"
            value={
              <div className="flex items-center gap-50">
                <TokenLogo token={loan.paymentCoin} size="xs" />
                <span>{formatNumber(loan.interestAmountUsd, 2)}</span>
              </div>
            }
          />
          <MetricRow
            label="Interest rate"
            value={`${(loan.interestRate * 100).toFixed(2)}% APR`}
          />
        </div>
      </Card>
    </div>
  )
}

// =============================================================================
// TAB CONTENT: HISTORY
// =============================================================================

interface HistoryTabProps {
  payments: PaymentHistoryItem[]
  loan: Loan
}

function HistoryTab({ payments, loan }: HistoryTabProps) {
  const [selectedRefi, setSelectedRefi] = React.useState<PaymentHistoryItem | null>(null)
  const network = COLLATERAL_TO_NETWORK[loan.collateralType]

  if (payments.length === 0) {
    return (
      <Card>
        <p className="text-body-sm text-fg-muted py-100 text-center">
          No payment history yet
        </p>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader title="Payment history" />
        <div className="divide-y divide-border-subtle">
          {payments.map((payment) => {
            const isRefi = payment.type === 'refinance'

            return (
              <div
                key={payment.id}
                className={cn(
                  'flex items-center justify-between py-100',
                  isRefi && 'cursor-pointer hover:bg-subtle transition-colors'
                )}
                onClick={() => isRefi && setSelectedRefi(payment)}
              >
                <div className="flex flex-col gap-12">
                  <div className="flex items-center gap-50">
                    <span className="text-label-md font-medium text-fg-primary capitalize">
                      {payment.type === 'drawdown'
                        ? 'Principal drawdown'
                        : payment.type === 'refinance'
                          ? 'Refinance'
                          : payment.type === 'collateral-deposit'
                            ? 'Collateral deposit'
                            : `${payment.type} payment`}
                    </span>
                    {isRefi && (
                      <Pill type="primary" appearance="subtle" size="20">
                        View details
                      </Pill>
                    )}
                  </div>
                  <div className="flex items-center gap-50">
                    <span className="text-label-sm text-fg-muted">
                      {formatDate(payment.date)}
                    </span>
                    {payment.transactionHash && (
                      <>
                        <span className="text-label-sm text-fg-tertiary">•</span>
                        <a
                          href={getBlockExplorerUrl(network, payment.transactionHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-25 text-label-xs text-fg-tertiary font-mono hover:text-fg-primary transition-colors group"
                        >
                          <span className="group-hover:underline">
                            {payment.transactionHash.slice(0, 6)}...{payment.transactionHash.slice(-4)}
                          </span>
                          <ExternalLink className="size-icon-xs flex-shrink-0" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-50">
                  {payment.type === 'collateral-deposit' ? (
                    // Special display for collateral deposits: crypto amount (6 decimals) with USD below
                    <div className="text-right">
                      <div className="flex items-center gap-25 justify-end">
                        <TokenLogo token={payment.collateralType!} size="xs" />
                        <span className="text-label-md font-medium text-fg-primary">
                          {formatCollateralAmount(payment.collateralAmount!)}
                        </span>
                      </div>
                      <span className="text-label-xs text-fg-muted">
                        {formatCurrency(payment.amountUsd, 0)}
                      </span>
                    </div>
                  ) : payment.amountUsd > 0 ? (
                    // Normal display for payment transactions: payment coin icon + amount (2 decimals, no $ symbol)
                    <div className="flex items-center gap-25">
                      <TokenLogo token={payment.paymentCoin} size="xs" />
                      <span className="text-label-md font-medium text-fg-primary">
                        {formatNumber(payment.amountUsd, 2)}
                      </span>
                    </div>
                  ) : null}
                  {payment.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-positive" strokeWidth={2.5} />
                  ) : (
                    <Pill type="warning" appearance="subtle" size="24">
                      {payment.status}
                    </Pill>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {selectedRefi && (
        <RefinanceDetailsModal
          open={!!selectedRefi}
          onClose={() => setSelectedRefi(null)}
          refinance={selectedRefi}
          loan={loan}
        />
      )}
    </>
  )
}

// =============================================================================
// TAB CONTENT: LOAN TERMS
// =============================================================================

interface LoanTermsTabProps {
  loan: Loan
}

function LoanTermsTab({ loan }: LoanTermsTabProps) {
  const etherscanUrl = `https://etherscan.io/address/${loan.loanContractAddress}`
  const truncatedAddress = loan.loanContractAddress.length > 12
    ? `${loan.loanContractAddress.slice(0, 6)}...${loan.loanContractAddress.slice(-4)}`
    : loan.loanContractAddress

  return (
    <div className="space-y-150">
      <Card>
        <CardHeader title="Loan details" />
        <div className="space-y-75">
          <div className="flex items-center justify-between py-50">
            <span className="text-label-sm text-fg-muted">Loan Contract</span>
            <a
              href={etherscanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              {truncatedAddress}
            </a>
          </div>
          <MetricRow label="Entity" value={loan.entityName} />
          <MetricRow label="Start date" value={formatDate(loan.startDate)} />
          <MetricRow label="Maturity date" value="—" />
          <MetricRow label="Recall period" value={`${loan.recallPeriodDays} days`} />
          <MetricRow label="Interest rate" value={`${(loan.interestRate * 100).toFixed(2)}% APR`} />
        </div>
      </Card>

      <Card>
        <CardHeader title="LTV thresholds" />
        <div className="space-y-75">
          <MetricRow label="Initial LTV" value={formatPercent(loan.initialLtv)} />
          <MetricRow label="Margin call LTV" value={formatPercent(loan.marginCallLtv)} />
          <MetricRow label="Liquidation LTV" value={formatPercent(loan.liquidationLtv)} />
          <MetricRow label="Margin call price" value={formatCurrency(loan.marginCallPrice)} />
          <MetricRow label="Liquidation price" value={formatCurrency(loan.liquidationPrice)} />
        </div>
      </Card>

      <Card>
        <CardHeader title="Your loan wallet" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-50">
            <TokenLogo token="eth" size="sm" />
            <span className="text-label-sm text-fg-primary">
              {loan.borrowerWalletAddress}
            </span>
          </div>
          <div className="flex items-center gap-25">
            <CopyButton text={loan.borrowerWalletAddress} />
            <IconButton variant="ghost" size="xs" aria-label="View on explorer">
              <ExternalLink className="size-icon-sm" />
            </IconButton>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Maple collateral wallet" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-50">
            <TokenLogo token={loan.collateralType} size="sm" />
            <span className="text-label-sm text-fg-primary">
              {loan.collateralWalletAddress}
            </span>
          </div>
          <div className="flex items-center gap-25">
            <CopyButton text={loan.collateralWalletAddress} />
            <IconButton variant="ghost" size="xs" aria-label="View on explorer">
              <ExternalLink className="size-icon-sm" />
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

interface LoanDetailPageProps {
  params: Promise<{ id: string }>
}

export default function LoanDetailPage({ params }: LoanDetailPageProps) {
  const { id } = use(params)
  const loan = getLoanById(id)
  const paymentHistory = getPaymentHistoryForLoan(id)

  if (!loan) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-h5 text-fg-primary mb-50">Loan not found</h1>
          <p className="text-body-sm text-fg-muted mb-150">
            The loan you&apos;re looking for doesn&apos;t exist.
          </p>
          <NextLink href="/borrower-mvp">
            <Button variant="secondary">Back to dashboard</Button>
          </NextLink>
        </div>
      </div>
    )
  }

  const status = statusConfig[loan.status]

  return (
    <ToastProvider>
      <div className="min-h-screen bg-canvas">
        <div className="max-w-7xl mx-auto px-200">
          {/* Header */}
          <header className="py-100">
          <NextLink
            href="/borrower-mvp"
            className="inline-flex items-center gap-50 text-label-sm text-fg-muted hover:text-fg-primary transition-colors"
          >
            <ArrowLeft className="size-icon-md" />
            Back to Dashboard
          </NextLink>
        </header>

        <main className="pb-200 space-y-100">
          {/* Margin call alert (if active) - full width above everything */}
          {loan.status === 'margin-call' && loan.marginCallDeadline && (() => {
            // Calculate target LTV - restore to initial LTV (not marginCallLtv - 5%)
            const targetLtv = loan.initialLtv

            // Calculate required collateral value to reach target LTV
            // LTV = Principal / Collateral Value, so Collateral Value = Principal / Target LTV
            const currentCollateralValue = loan.collateralAmount * loan.currentCollateralPrice
            const requiredCollateralValue = loan.principalUsd / (targetLtv / 100)
            const additionalCollateralValueNeeded = requiredCollateralValue - currentCollateralValue

            // Calculate collateral amount required (Option A)
            const collateralAmountRequired = additionalCollateralValueNeeded / loan.currentCollateralPrice

            // Calculate principal paydown option (Option B)
            // Principal paydown required to reach initial LTV with current collateral
            // Target LTV = (Principal - Paydown) / Current Collateral Value
            // Paydown = Principal - (Target LTV * Current Collateral Value)
            const principalPaydownRequired = loan.principalUsd - (targetLtv / 100 * currentCollateralValue)

            // Calculate accrued interest since last payment
            const paymentHistory = getPaymentHistoryForLoan(loan.id)
            const lastInterestPayment = paymentHistory
              .filter(p => p.type === 'interest')
              .sort((a, b) => b.date.getTime() - a.date.getTime())[0]

            const daysSincePayment = lastInterestPayment
              ? Math.floor((Date.now() - lastInterestPayment.date.getTime()) / (1000 * 60 * 60 * 24))
              : 0

            const accruedInterest = (loan.interestRate / 365) * daysSincePayment * loan.principalUsd

            // Calculate make-whole fee (interest for recall period)
            const makeWholeFee = (loan.interestRate / 365) * loan.recallPeriodDays * principalPaydownRequired

            // Total payment for Option B
            const totalPaydownAmount = principalPaydownRequired + accruedInterest + makeWholeFee

            const formatCollateralRequired = () => {
              return collateralAmountRequired.toLocaleString('en-US', {
                minimumFractionDigits: 6,
                maximumFractionDigits: 6,
              })
            }

            const formatCurrencyValue = (value: number) => {
              return value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }

            return (
              <div className="bg-negative-subtle border border-negative rounded-xl px-150 py-100">
                <div className="flex gap-100">
                  <AlertTriangle className="size-icon-lg text-negative shrink-0 mt-025" />
                  <div className="flex-1 space-y-75">
                    {/* Header */}
                    <div className="text-label-sm text-negative">
                      <span className="font-semibold">Margin call active:</span>{' '}
                      Restore your LTV to {targetLtv}% by{' '}
                      <span className="font-semibold">{formatDeadline(loan.marginCallDeadline)} UTC</span>
                    </div>

                    {/* Two options - boxes with red background */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-50 mt-50">
                      {/* Option A: Add Collateral */}
                      <div className="bg-negative/15 rounded-lg p-75">
                        <div className="flex items-center justify-between mb-25">
                          <span className="text-label-xs text-negative font-medium uppercase tracking-wide">Add collateral</span>
                          <CopyButton text={formatCollateralRequired()} />
                        </div>
                        <div className="flex items-center gap-50">
                          <TokenLogo token={loan.collateralType} size="sm" />
                          <div>
                            <span className="text-label-md font-semibold text-fg-primary">
                              {formatCollateralRequired()} {loan.collateralType.toUpperCase()}
                            </span>
                            <p className="text-label-xs text-fg-muted">
                              ≈ ${formatCurrencyValue(additionalCollateralValueNeeded)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Option B: Pay Down Principal */}
                      <div className="bg-negative/15 rounded-lg p-75">
                        <div className="flex items-center justify-between mb-25">
                          <span className="text-label-xs text-negative font-medium uppercase tracking-wide">Pay down principal</span>
                          <CopyButton text={formatCurrencyValue(totalPaydownAmount)} />
                        </div>
                        <div className="flex items-center gap-50">
                          <TokenLogo token={loan.paymentCoin} size="sm" />
                          <span className="text-label-md font-semibold text-fg-primary">
                            {formatCurrencyValue(totalPaydownAmount)} {loan.paymentCoin.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Latest alert info */}
                    <div className="text-label-xs text-negative">
                      <span className="font-semibold">Latest alert:</span> Jan 6, 2026 at 2:34 PM UTC to j.chen@galaxy.com, m.novak@galaxy.com, s.patel@galaxy.com
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Tabs - full width */}
          <Tabs defaultValue="summary">
            <TabsList className="mb-100">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="terms">Loan terms</TabsTrigger>
            </TabsList>

            {/* Tab panels with two-column layout */}
            <TabsPanel value="summary">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-100">
                {/* Left column - Summary content */}
                <div className="lg:col-span-2">
                  <SummaryTab loan={loan} />
                </div>

                {/* Right column - Loan info and Actions */}
                <div className="space-y-100">
                  {/* Loan header card */}
                  <Card>
                    <div className="flex items-center justify-between mb-100">
                      <h2 className="text-heading-h6 text-fg-primary">
                        Loan #{loan.loanContractAddress.slice(-4)}
                      </h2>
                      <Pill
                        type={status.type}
                        appearance="subtle"
                        size="24"
                        beforeIcon={status.icon}
                      >
                        {status.label}
                      </Pill>
                    </div>
                    <p className="text-label-sm text-fg-muted">{loan.entityName}</p>
                  </Card>

                  {/* Actions */}
                  <Card>
                    <h3 className="text-label-sm font-medium text-fg-secondary mb-75 uppercase tracking-wide">
                      Actions
                    </h3>
                    <div className="space-y-75">
                      <ActionItem
                        icon={<CreditCard className="size-icon-lg" />}
                        label="Pay Interest"
                      />
                      <ActionItem
                        icon={<Plus className="size-icon-lg" />}
                        label="Add Collateral"
                      />
                      <ActionItem
                        icon={<FileText className="size-icon-lg" />}
                        label="Give Notice to Repay"
                      />
                      <ActionItem
                        icon={<ArrowDownLeft className="size-icon-lg" />}
                        label="Request Collateral Back"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </TabsPanel>

            <TabsPanel value="history">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-100">
                {/* Left column - History content */}
                <div className="lg:col-span-2">
                  <HistoryTab payments={paymentHistory} loan={loan} />
                </div>

                {/* Right column - Loan info and Actions */}
                <div className="space-y-100">
                  {/* Loan header card */}
                  <Card>
                    <div className="flex items-center justify-between mb-100">
                      <h2 className="text-heading-h6 text-fg-primary">
                        Loan #{loan.loanContractAddress.slice(-4)}
                      </h2>
                      <Pill
                        type={status.type}
                        appearance="subtle"
                        size="24"
                        beforeIcon={status.icon}
                      >
                        {status.label}
                      </Pill>
                    </div>
                    <p className="text-label-sm text-fg-muted">{loan.entityName}</p>
                  </Card>

                  {/* Actions */}
                  <Card>
                    <h3 className="text-label-sm font-medium text-fg-secondary mb-75 uppercase tracking-wide">
                      Actions
                    </h3>
                    <div className="space-y-75">
                      <ActionItem
                        icon={<CreditCard className="size-icon-lg" />}
                        label="Pay Interest"
                      />
                      <ActionItem
                        icon={<Plus className="size-icon-lg" />}
                        label="Add Collateral"
                      />
                      <ActionItem
                        icon={<FileText className="size-icon-lg" />}
                        label="Give Notice to Repay"
                      />
                      <ActionItem
                        icon={<ArrowDownLeft className="size-icon-lg" />}
                        label="Request Collateral Back"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </TabsPanel>

            <TabsPanel value="terms">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-100">
                {/* Left column - Loan terms content */}
                <div className="lg:col-span-2">
                  <LoanTermsTab loan={loan} />
                </div>

                {/* Right column - Loan info and Actions */}
                <div className="space-y-100">
                  {/* Loan header card */}
                  <Card>
                    <div className="flex items-center justify-between mb-100">
                      <h2 className="text-heading-h6 text-fg-primary">
                        Loan #{loan.loanContractAddress.slice(-4)}
                      </h2>
                      <Pill
                        type={status.type}
                        appearance="subtle"
                        size="24"
                        beforeIcon={status.icon}
                      >
                        {status.label}
                      </Pill>
                    </div>
                    <p className="text-label-sm text-fg-muted">{loan.entityName}</p>
                  </Card>

                  {/* Actions */}
                  <Card>
                    <h3 className="text-label-sm font-medium text-fg-secondary mb-75 uppercase tracking-wide">
                      Actions
                    </h3>
                    <div className="space-y-75">
                      <ActionItem
                        icon={<CreditCard className="size-icon-lg" />}
                        label="Pay Interest"
                      />
                      <ActionItem
                        icon={<Plus className="size-icon-lg" />}
                        label="Add Collateral"
                      />
                      <ActionItem
                        icon={<FileText className="size-icon-lg" />}
                        label="Give Notice to Repay"
                      />
                      <ActionItem
                        icon={<ArrowDownLeft className="size-icon-lg" />}
                        label="Request Collateral Back"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </TabsPanel>
          </Tabs>
        </main>
        </div>
      </div>
      <ToastPortal>
        <StyledToastViewport>
          <ToastList />
        </StyledToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}
