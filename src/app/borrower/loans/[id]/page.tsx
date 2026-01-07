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
  CreditCard,
  Plus,
  FileText,
  ArrowDownLeft,
  Download,
} from 'lucide-react'
import { LtvGauge, LtvDisplay } from '../../components/ltv-gauge'
import { getLoanById, getPaymentHistoryForLoan, getBlockExplorerUrl, getDocumentsForLoan } from '../../mock-data'
import { Loan, LoanStatus, PaymentHistoryItem, COLLATERAL_TO_NETWORK, BlockchainNetwork, LoanDocument } from '../../types'

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
      <DialogContent className="w-full max-w-2xl">
        <DialogTitle>Refinance Details</DialogTitle>

        <div className="space-y-100">
          {/* Header with date, reason, and transaction link */}
          <div className="flex items-center justify-between pb-100 border-b border-border-subtle">
            <div>
              <p className="text-label-md font-medium text-fg-primary">
                {formatDate(refinance.date)}
              </p>
              {details.reason && (
                <p className="text-label-sm text-fg-muted mt-25">{details.reason}</p>
              )}
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
              <MetricRow label="Previous principal" value={formatCurrency(details.oldPrincipalUsd)} />
              <MetricRow label="New principal" value={formatCurrency(details.newPrincipalUsd)} />
              <MetricRow
                label="Change"
                value={
                  <span className={cn(
                    'font-semibold',
                    principalChange !== 0 ? 'text-fg-primary' : 'text-fg-muted'
                  )}>
                    {principalChange > 0 ? '+' : ''}
                    {formatCurrency(details.newPrincipalUsd - details.oldPrincipalUsd)}
                    {principalChange !== 0 && ` (${principalChange.toFixed(1)}%)`}
                  </span>
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
// TAB CONTENT: LTV CALCULATOR
// =============================================================================

interface LtvCalculatorTabProps {
  loan: Loan
}

function LtvCalculatorTab({ loan }: LtvCalculatorTabProps) {
  // State for price simulation (EXISTING functionality)
  const [simulatedPrice, setSimulatedPrice] = React.useState(loan.currentCollateralPrice)

  // State for collateral management (NEW functionality)
  const [collateralMode, setCollateralMode] = React.useState<'add' | 'remove'>('add')
  const [collateralInputValue, setCollateralInputValue] = React.useState(0)
  const [collateralInputDisplay, setCollateralInputDisplay] = React.useState('')

  // Calculate the actual added/removed amount based on mode
  const simulatedCollateralAdded = collateralMode === 'add' ? collateralInputValue : -collateralInputValue

  // Handler for collateral input with formatting
  const handleCollateralInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '') // Remove existing commas
    const numValue = parseFloat(rawValue) || 0
    setCollateralInputValue(numValue)
    setCollateralInputDisplay(rawValue) // Store raw value for editing
  }

  const handleCollateralInputBlur = () => {
    // Format with thousands separators on blur
    if (collateralInputValue) {
      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 8,
      }).format(collateralInputValue)
      setCollateralInputDisplay(formatted)
    } else {
      setCollateralInputDisplay('')
    }
  }

  const handleCollateralInputFocus = () => {
    // Show raw number without formatting when focused for easier editing
    if (collateralInputValue) {
      setCollateralInputDisplay(String(collateralInputValue))
    }
  }

  // Price simulation calculations (EXISTING)
  const priceChange = ((simulatedPrice - loan.currentCollateralPrice) / loan.currentCollateralPrice) * 100
  const stepSize = loan.currentCollateralPrice > 1000 ? 100 : loan.currentCollateralPrice > 100 ? 1 : 0.1
  const minPrice = Math.floor(loan.liquidationPrice * 0.7 / stepSize) * stepSize
  const maxPrice = Math.ceil(loan.currentCollateralPrice * 1.3 / stepSize) * stepSize

  // Combined calculations (ENHANCED - works with both price AND collateral changes)
  const totalSimulatedCollateral = loan.collateralAmount + simulatedCollateralAdded
  const simulatedCollateralValue = totalSimulatedCollateral * simulatedPrice
  const simulatedLtv = (loan.principalUsd / simulatedCollateralValue) * 100

  // Recalculated trigger prices (NEW - only when collateral changes)
  const newMarginCallPrice = loan.principalUsd / (totalSimulatedCollateral * (loan.marginCallLtv / 100))
  const newLiquidationPrice = loan.principalUsd / (totalSimulatedCollateral * (loan.liquidationLtv / 100))

  // Withdrawable collateral calculation (NEW - only when LTV < 50%)
  const canWithdraw = simulatedLtv < 50
  const maxWithdrawableValue = canWithdraw ? (simulatedCollateralValue - (loan.principalUsd / 0.50)) : 0
  const maxWithdrawableAmount = maxWithdrawableValue / simulatedPrice

  // Reset function (ENHANCED - resets both price and collateral)
  const handleReset = () => {
    setSimulatedPrice(loan.currentCollateralPrice)
    setCollateralInputValue(0)
    setCollateralInputDisplay('')
    setCollateralMode('add')
  }

  // Helper to format collateral amount based on asset type with thousands separators
  const formatCollateralAmount = (amount: number) => {
    let decimals = 2
    if (loan.collateralType === 'btc' || loan.collateralType === 'wbtc') {
      decimals = 8
    } else if (loan.collateralType === 'eth' || loan.collateralType === 'weth') {
      decimals = 4
    }

    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  }

  // Determine appropriate step for collateral input
  const collateralStep = loan.collateralType === 'btc' || loan.collateralType === 'wbtc' ? 0.01 :
                         loan.collateralType === 'eth' || loan.collateralType === 'weth' ? 0.1 : 1

  return (
    <div className="space-y-150">
      <Card>
        <div className="flex items-center justify-between mb-150">
          <CardHeader title="LTV Calculator" />
          <Button
            size="sm"
            variant="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>

        {/* Section 1: Simulated LTV Display - MOVED TO TOP */}
        <div className="mb-150">
          {/* LTV Display with Gauge */}
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

          {/* Updated Trigger Prices (only show when collateral changed) */}
          {simulatedCollateralAdded !== 0 && (
            <div className="mt-125 space-y-75">
              <div className="text-label-xs font-medium text-fg-muted uppercase tracking-wide">
                Updated Trigger Prices
              </div>
              <div className="grid grid-cols-2 gap-100">
                <div>
                  <div className="text-label-xs text-fg-muted">Margin Call</div>
                  <div className="text-label-md font-semibold text-warning">
                    {formatCurrency(newMarginCallPrice)}
                  </div>
                  <div className="text-label-xs text-fg-muted">
                    (was {formatCurrency(loan.marginCallPrice)})
                  </div>
                </div>
                <div>
                  <div className="text-label-xs text-fg-muted">Liquidation</div>
                  <div className="text-label-md font-semibold text-negative">
                    {formatCurrency(newLiquidationPrice)}
                  </div>
                  <div className="text-label-xs text-fg-muted">
                    (was {formatCurrency(loan.liquidationPrice)})
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Price Simulation */}
        <div className="space-y-100 pt-150 border-t border-border-subtle">
          {/* Quick-access buttons row */}
          <div className="flex items-center justify-between">
            <label className="text-label-sm text-fg-muted">Collateral Price</label>
            <div className="flex items-center gap-75">
              <Button
                variant="secondary"
                size="xs"
                onClick={() => setSimulatedPrice(loan.currentCollateralPrice)}
              >
                Current
              </Button>
              <Button
                variant="secondary"
                size="xs"
                onClick={() => {
                  const priceAtMarginCall = loan.principalUsd / (loan.collateralAmount * loan.marginCallLtv / 100)
                  setSimulatedPrice(priceAtMarginCall)
                }}
              >
                Margin Call
              </Button>
              <Button
                variant="secondary"
                size="xs"
                onClick={() => {
                  const priceAtLiquidation = loan.principalUsd / (loan.collateralAmount * loan.liquidationLtv / 100)
                  setSimulatedPrice(priceAtLiquidation)
                }}
              >
                Liquidation
              </Button>
            </div>
          </div>

          {/* Price display with change percentage */}
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

          {/* Range slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={stepSize}
            value={simulatedPrice}
            onChange={(e) => setSimulatedPrice(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-brand"
          />
        </div>

        {/* Section 3: Collateral Management */}
        <div className="space-y-150 mt-150 pt-150 border-t border-border-subtle">
          <label className="text-label-sm text-fg-muted">
            Add/Remove Collateral ({loan.collateralType.toUpperCase()})
          </label>

          <div className="flex items-center gap-100">
            <select
              value={collateralMode}
              onChange={(e) => setCollateralMode(e.target.value as 'add' | 'remove')}
              className="h-control-md px-75 rounded-lg border border-border-subtle bg-surface text-fg-primary text-label-sm"
            >
              <option value="add">Add</option>
              <option value="remove">Remove</option>
            </select>
            <input
              type="text"
              value={collateralInputDisplay}
              onChange={handleCollateralInputChange}
              onBlur={handleCollateralInputBlur}
              onFocus={handleCollateralInputFocus}
              placeholder="0.00"
              className="flex-1 h-control-md px-100 rounded-lg border border-border-subtle bg-surface text-fg-primary"
            />
            <span className="text-label-sm text-fg-muted whitespace-nowrap">
              {loan.collateralType.toUpperCase()}
            </span>
          </div>

          {/* Show current collateral for context */}
          <div className="text-label-xs text-fg-muted">
            Current collateral: {formatCollateralAmount(loan.collateralAmount)} {loan.collateralType.toUpperCase()}
          </div>

          {/* Show withdrawable amount if LTV < 50% - COMPACT VERSION */}
          {canWithdraw && maxWithdrawableAmount > 0 && (
            <div className="flex items-center justify-between p-75 bg-positive-subtle rounded-lg border border-positive">
              <span className="text-label-xs text-positive">Available to withdraw (LTV &lt; 50%)</span>
              <span className="text-label-sm font-semibold text-positive">
                {formatCollateralAmount(maxWithdrawableAmount)} {loan.collateralType.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Card>
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
                <div className="flex items-center gap-75">
                  {payment.amountUsd > 0 && (
                    <span className="text-label-md font-medium text-fg-primary">
                      {formatCurrency(payment.amountUsd, 2)}
                    </span>
                  )}
                  <Pill
                    type={payment.status === 'completed' ? 'positive' : 'warning'}
                    appearance="subtle"
                    size="24"
                  >
                    {payment.status}
                  </Pill>
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
          <MetricRow label="Margin call LTV" value={`${loan.marginCallLtv}%`} />
          <MetricRow label="Liquidation LTV" value={`${loan.liquidationLtv}%`} />
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
// TAB CONTENT: DOCUMENTS
// =============================================================================

interface DocumentsTabProps {
  documents: LoanDocument[]
}

function DocumentsTab({ documents }: DocumentsTabProps) {
  const toastManager = useToastManager()

  const handleDownload = (docId: string, docName: string) => {
    // Simulate download
    // Show toast notification
    queueMicrotask(() => {
      toastManager.add({
        title: 'Downloaded',
        timeout: 1000,
        data: {
          appearance: 'default',
          type: 'positive',
        },
      })
    })
  }

  if (documents.length === 0) {
    return (
      <Card>
        <p className="text-body-sm text-fg-muted py-100 text-center">
          No documents available
        </p>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader title="Loan documents" />
      <div className="space-y-100">
        {documents.map((doc, index) => {
          const isLastItem = index === documents.length - 1

          return (
            <div key={doc.id} className="relative">
              {/* Timeline connector line */}
              {!isLastItem && (
                <div className="absolute left-[15px] top-[40px] bottom-[-16px] w-px bg-border-subtle" />
              )}

              {/* Document row */}
              <div className="flex items-start gap-100">
                {/* Timeline icon */}
                <div className="relative flex-shrink-0">
                  <div className="size-[32px] rounded-full bg-primary border-2 border-border-subtle flex items-center justify-center">
                    <FileText className="size-icon-sm text-fg-muted" />
                  </div>
                </div>

                {/* Document details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-100">
                    <div className="flex-1 min-w-0">
                      <p className="text-label-md font-medium text-fg-primary">
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-50 mt-25">
                        <span className="text-label-sm text-fg-muted">
                          {formatDate(doc.date)}
                        </span>
                        <span className="text-label-sm text-fg-tertiary">•</span>
                        <span className="text-label-sm text-fg-muted">{doc.fileType}</span>
                        <span className="text-label-sm text-fg-tertiary">•</span>
                        <span className="text-label-sm text-fg-muted">{doc.fileSize}</span>
                      </div>
                    </div>

                    {/* Download button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-shrink-0"
                      onClick={() => handleDownload(doc.id, doc.name)}
                      beforeIcon={<Download className="size-icon-sm" />}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
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
  const loanDocuments = getDocumentsForLoan(id)

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
    <ToastProvider>
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
              <TabsTrigger value="ltv-calculator">LTV Calculator</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="terms">Loan terms</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
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

            <TabsPanel value="ltv-calculator">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-150">
                {/* Left column - LTV Calculator */}
                <div className="lg:col-span-2">
                  <LtvCalculatorTab loan={loan} />
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
                        icon={<Plus className="size-icon-lg" />}
                        label="Add Collateral"
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
                  <HistoryTab payments={paymentHistory} loan={loan} />
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

            <TabsPanel value="documents">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-150">
                {/* Left column - Documents content */}
                <div className="lg:col-span-2">
                  <DocumentsTab documents={loanDocuments} />
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
      <ToastPortal>
        <StyledToastViewport>
          <ToastList />
        </StyledToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}
