'use client'

import * as React from 'react'
import { use } from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'
import {
  Button,
  IconButton,
  Pill,
  TokenLogo,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanel,
} from '@/components/ui'
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  TrendingDown,
  ExternalLink,
  Copy,
  Check,
  CreditCard,
  Plus,
  FileText,
  ArrowDownLeft,
} from 'lucide-react'
import { LtvGauge, LtvDisplay } from '../../components/ltv-gauge'
import { getLoanById, getPaymentHistoryForLoan, CURRENT_PRICES } from '../../mock-data'
import { Loan, LoanStatus, PaymentHistoryItem } from '../../types'

// =============================================================================
// HELPERS
// =============================================================================

function formatCurrency(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function formatCollateralAmount(amount: number, type: string): string {
  const isBtc = type.toLowerCase().includes('btc')
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: isBtc ? 6 : 2,
    maximumFractionDigits: isBtc ? 6 : 2,
  })
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
  return <h3 className="text-label-sm font-medium text-fg-secondary mb-100">{title}</h3>
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
// TAB CONTENT: SUMMARY
// =============================================================================

interface SummaryTabProps {
  loan: Loan
}

function SummaryTab({ loan }: SummaryTabProps) {
  const [simulatedPrice, setSimulatedPrice] = React.useState(loan.currentCollateralPrice)
  const simulatedCollateralValue = loan.collateralAmount * simulatedPrice
  const simulatedLtv = (loan.principalUsd / simulatedCollateralValue) * 100
  const priceChange = ((simulatedPrice - loan.currentCollateralPrice) / loan.currentCollateralPrice) * 100
  const stepSize = loan.currentCollateralPrice > 1000 ? 100 : loan.currentCollateralPrice > 100 ? 1 : 0.1
  const minPrice = Math.floor(loan.liquidationPrice * 0.7)
  const maxPrice = Math.ceil(loan.currentCollateralPrice * 1.3)

  const daysUntilInterest = getDaysUntil(loan.interestDueDate)
  const isOverdue = loan.status === 'overdue'

  return (
    <div className="space-y-150">
      {/* Position overview */}
      <Card>
        <CardHeader title="Position overview" />
        <div className="grid grid-cols-2 gap-150 mb-150">
          {/* Principal */}
          <div className="space-y-50">
            <span className="text-label-xs text-fg-muted">Principal</span>
            <p className="text-heading-h5 font-semibold text-fg-primary">
              {formatCurrency(loan.principalUsd)}
            </p>
          </div>

          {/* Collateral */}
          <div className="space-y-50">
            <span className="text-label-xs text-fg-muted">Collateral</span>
            <div className="flex items-center gap-75">
              <TokenLogo token={loan.collateralType} size="lg" />
              <div>
                <p className="text-label-md font-medium text-fg-primary">
                  {formatCollateralAmount(loan.collateralAmount, loan.collateralType)}{' '}
                  {loan.collateralType.toUpperCase()}
                </p>
                <p className="text-label-xs text-fg-muted">
                  ≈ {formatCurrency(loan.collateralValueUsd)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LTV Display */}
        <div className="border-t border-border-subtle pt-150 overflow-visible">
          <LtvDisplay
            currentLtv={loan.currentLtv}
            marginCallLtv={loan.marginCallLtv}
            liquidationLtv={loan.liquidationLtv}
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
            {loan.collateralType.toUpperCase()} price at {loan.marginCallLtv}% LTV
          </p>
        </Card>

        <Card>
          <CardHeader title="Liquidation trigger" />
          <p className="text-heading-h5 font-semibold text-negative mb-25">
            {formatCurrency(loan.liquidationPrice)}
          </p>
          <p className="text-label-xs text-fg-muted">
            {loan.collateralType.toUpperCase()} price at {loan.liquidationLtv}% LTV
          </p>
        </Card>
      </div>

      {/* LTV Calculator */}
      <Card>
        <div className="flex items-center justify-between mb-100">
          <CardHeader title="LTV calculator" />
          <div className="flex gap-50">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setSimulatedPrice(loan.currentCollateralPrice)}
            >
              Current
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                // Calculate price that gives exactly marginCallLtv
                const priceAtMarginCall = loan.principalUsd / (loan.collateralAmount * loan.marginCallLtv / 100)
                setSimulatedPrice(priceAtMarginCall)
              }}
            >
              Margin Call
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                // Calculate price that gives exactly liquidationLtv
                const priceAtLiquidation = loan.principalUsd / (loan.collateralAmount * loan.liquidationLtv / 100)
                setSimulatedPrice(priceAtLiquidation)
              }}
            >
              Liquidation
            </Button>
          </div>
        </div>
        <div className="space-y-100">
          <div className="flex items-center justify-between">
            <span className="text-label-sm text-fg-muted">
              If {loan.collateralType.toUpperCase()} price is
            </span>
            <div className="flex items-center gap-50">
              <span className="text-label-sm font-medium text-fg-primary">
                {formatCurrency(simulatedPrice)}
              </span>
              {Math.abs(priceChange) > 0.1 && (
                <span
                  className={cn(
                    'text-label-xs',
                    priceChange > 0 ? 'text-positive' : 'text-negative'
                  )}
                >
                  ({priceChange > 0 ? '+' : ''}
                  {priceChange.toFixed(1)}%)
                </span>
              )}
            </div>
          </div>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={stepSize}
            value={simulatedPrice}
            onChange={(e) => setSimulatedPrice(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-brand"
          />

          <div className="bg-primary rounded-lg p-100 overflow-visible">
            <div className="flex items-center justify-between mb-50">
              <span className="text-label-sm text-fg-muted">Simulated LTV</span>
              <span
                className={cn(
                  'text-heading-h6 font-semibold',
                  simulatedLtv >= loan.liquidationLtv
                    ? 'text-negative'
                    : simulatedLtv >= loan.marginCallLtv
                      ? 'text-warning'
                      : 'text-positive'
                )}
              >
                {simulatedLtv.toFixed(1)}%
              </span>
            </div>
            <LtvGauge
              currentLtv={simulatedLtv}
              marginCallLtv={loan.marginCallLtv}
              liquidationLtv={loan.liquidationLtv}
              size="md"
            />
          </div>
        </div>
      </Card>

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
            value={formatCurrency(loan.interestAmountUsd, 2)}
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
}

function HistoryTab({ payments }: HistoryTabProps) {
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
    <Card>
      <CardHeader title="Payment history" />
      <div className="divide-y divide-border-subtle">
        {payments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between py-100">
            <div className="flex flex-col gap-12">
              <span className="text-label-md font-medium text-fg-primary capitalize">
                {payment.type === 'drawdown' ? 'Principal drawdown' : `${payment.type} payment`}
              </span>
              <span className="text-label-sm text-fg-muted">
                {formatDate(payment.date)}
              </span>
            </div>
            <div className="flex items-center gap-75">
              <span className="text-label-md font-medium text-fg-primary">
                {formatCurrency(payment.amountUsd, 2)}
              </span>
              <Pill
                type={payment.status === 'completed' ? 'positive' : 'warning'}
                appearance="subtle"
                size="24"
              >
                {payment.status}
              </Pill>
            </div>
          </div>
        ))}
      </div>
    </Card>
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
            <span className="text-label-sm text-fg-muted">Loan ID</span>
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
          <MetricRow label="Margin call LTV" value={`${loan.marginCallLtv}%`} />
          <MetricRow label="Liquidation LTV" value={`${loan.liquidationLtv}%`} />
          <MetricRow label="Margin call price" value={formatCurrency(loan.marginCallPrice)} />
          <MetricRow label="Liquidation price" value={formatCurrency(loan.liquidationPrice)} />
        </div>
      </Card>

      <Card>
        <CardHeader title="Borrower wallet" />
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
        <CardHeader title="Collateral Deposit wallet" />
        <div className="flex items-center justify-between mb-75">
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
        <p className="text-label-xs text-fg-muted">
          Current {loan.collateralType.toUpperCase()} price:{' '}
          {formatCurrency(CURRENT_PRICES[loan.collateralType as keyof typeof CURRENT_PRICES])}
        </p>
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
          <NextLink href="/borrower">
            <Button variant="secondary">Back to dashboard</Button>
          </NextLink>
        </div>
      </div>
    )
  }

  const status = statusConfig[loan.status]

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-7xl mx-auto px-200">
        {/* Header */}
        <header className="py-150">
          <NextLink
            href="/borrower"
            className="inline-flex items-center gap-50 text-label-sm text-fg-muted hover:text-fg-primary transition-colors mb-100"
          >
            <ArrowLeft className="size-icon-md" />
            Back to Dashboard
          </NextLink>
        </header>

        <main className="pb-200 space-y-150">
          {/* Margin call alert (if active) - full width above everything */}
          {loan.status === 'margin-call' && loan.marginCallDeadline && (
            <div className="bg-negative-subtle border border-negative rounded-xl p-150">
              <div className="flex items-start gap-100">
                <AlertTriangle className="size-icon-xl text-negative shrink-0 mt-12" />
                <div className="flex-1">
                  <h3 className="text-label-md font-medium text-negative mb-25">
                    Margin call active
                  </h3>
                  <p className="text-body-sm text-negative mb-100">
                    Add {formatCurrency(loan.marginCallRequiredUsd || 0)} in collateral
                    to restore your LTV to safe levels.
                  </p>
                  <p className="text-label-sm text-negative">
                    Cure by:{' '}
                    <span className="font-semibold">{formatDeadline(loan.marginCallDeadline)}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs - full width */}
          <Tabs defaultValue="summary">
            <TabsList className="mb-150">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="terms">Loan terms</TabsTrigger>
            </TabsList>

            {/* Tab panels with two-column layout */}
            <TabsPanel value="summary">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-150">
                {/* Left column - Summary content */}
                <div className="lg:col-span-2">
                  <SummaryTab loan={loan} />
                </div>

                {/* Right column - Loan info and Actions */}
                <div className="space-y-150">
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
                    <h3 className="text-label-sm font-medium text-fg-secondary mb-100 uppercase tracking-wide">
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-150">
                {/* Left column - History content */}
                <div className="lg:col-span-2">
                  <HistoryTab payments={paymentHistory} />
                </div>

                {/* Right column - Loan info and Actions */}
                <div className="space-y-150">
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
                    <h3 className="text-label-sm font-medium text-fg-secondary mb-100 uppercase tracking-wide">
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-150">
                {/* Left column - Loan terms content */}
                <div className="lg:col-span-2">
                  <LoanTermsTab loan={loan} />
                </div>

                {/* Right column - Loan info and Actions */}
                <div className="space-y-150">
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
                    <h3 className="text-label-sm font-medium text-fg-secondary mb-100 uppercase tracking-wide">
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
  )
}
