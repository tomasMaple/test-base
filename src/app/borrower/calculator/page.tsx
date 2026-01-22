'use client'

import * as React from 'react'
import { AlertTriangle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Pill, TokenLogo } from '@/components/ui'
import { LtvGauge } from '../components/ltv-gauge'
import { mockLoans, sortLoansByUrgency, getPaymentHistoryForLoan } from '../mock-data'
import { Loan, LoanStatus } from '../types'
import { formatNumber, formatCollateralAmount, formatFullCurrency } from '../formatters'

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
// CARD COMPONENTS
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
// HELPERS
// =============================================================================


// =============================================================================
// LOAN SELECTOR COMPONENT
// =============================================================================

interface LoanSelectorProps {
  loans: Loan[]
  selectedLoanId: string | null
  onLoanSelect: (loanId: string) => void
}

function LoanSelector({ loans, selectedLoanId, onLoanSelect }: LoanSelectorProps) {
  return (
    <select
      value={selectedLoanId || ''}
      onChange={(e) => onLoanSelect(e.target.value)}
      className="w-full h-control-lg px-100 rounded-lg border border-border-subtle bg-surface text-fg-primary text-label-md"
    >
      <option value="">Choose a loan...</option>
      {loans.map((loan) => (
        <option key={loan.id} value={loan.id}>
          {loan.entityName} - {formatNumber(loan.principalUsd, 0)} {loan.paymentCoin.toUpperCase()} - {loan.collateralType.toUpperCase()}
        </option>
      ))}
    </select>
  )
}

// =============================================================================
// LTV CALCULATOR COMPONENT
// =============================================================================

interface LtvCalculatorProps {
  loan: Loan
}

function LtvCalculator({ loan }: LtvCalculatorProps) {
  // State for price simulation
  const [simulatedPrice, setSimulatedPrice] = React.useState(loan.currentCollateralPrice)

  // State for collateral management
  const [collateralMode, setCollateralMode] = React.useState<'add' | 'remove'>('add')
  const [collateralInputValue, setCollateralInputValue] = React.useState(0)
  const [collateralInputDisplay, setCollateralInputDisplay] = React.useState('')

  // State for principal paydown
  const [principalPaydown, setPrincipalPaydown] = React.useState(0)
  const [principalPaydownDisplay, setPrincipalPaydownDisplay] = React.useState('')

  // State for precise price input
  const [priceInputDisplay, setPriceInputDisplay] = React.useState('')

  // Calculate the actual added/removed amount based on mode
  const simulatedCollateralAdded = collateralMode === 'add' ? collateralInputValue : -collateralInputValue

  // Handler for collateral input with live comma formatting
  const handleCollateralInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPos = input.selectionStart || 0
    const oldValue = collateralInputDisplay
    const rawValue = e.target.value.replace(/[^0-9.]/g, '')

    if (!rawValue || rawValue === '.') {
      setCollateralInputValue(0)
      setCollateralInputDisplay('')
      return
    }

    const numValue = parseFloat(rawValue) || 0
    setCollateralInputValue(numValue)

    const parts = rawValue.split('.')
    const integerPart = parts[0].replace(/^0+(?=\d)/, '')
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const formatted = parts.length > 1 ? `${formattedInteger}.${parts[1]}` : formattedInteger

    setCollateralInputDisplay(formatted || '0')

    requestAnimationFrame(() => {
      const oldCommasBefore = (oldValue.slice(0, cursorPos).match(/,/g) || []).length
      const newCommasBefore = (formatted.slice(0, cursorPos).match(/,/g) || []).length
      const newCursorPos = cursorPos + (newCommasBefore - oldCommasBefore)
      input.setSelectionRange(newCursorPos, newCursorPos)
    })
  }

  const handleCollateralInputBlur = () => {
    if (collateralInputValue) {
      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(collateralInputValue)
      setCollateralInputDisplay(formatted)
    } else {
      setCollateralInputDisplay('')
    }
  }

  // Handler for principal paydown input with live comma formatting
  const handlePrincipalPaydownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPos = input.selectionStart || 0
    const oldValue = principalPaydownDisplay
    const rawValue = e.target.value.replace(/[^0-9.]/g, '')

    if (!rawValue || rawValue === '.') {
      setPrincipalPaydown(0)
      setPrincipalPaydownDisplay('')
      return
    }

    const numValue = parseFloat(rawValue) || 0
    const clampedValue = Math.min(numValue, loan.principalUsd)
    setPrincipalPaydown(clampedValue)

    const parts = rawValue.split('.')
    const integerPart = parts[0].replace(/^0+(?=\d)/, '')
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const formatted = parts.length > 1 ? `${formattedInteger}.${parts[1]}` : formattedInteger

    setPrincipalPaydownDisplay(formatted || '0')

    requestAnimationFrame(() => {
      const oldCommasBefore = (oldValue.slice(0, cursorPos).match(/,/g) || []).length
      const newCommasBefore = (formatted.slice(0, cursorPos).match(/,/g) || []).length
      const newCursorPos = cursorPos + (newCommasBefore - oldCommasBefore)
      input.setSelectionRange(newCursorPos, newCursorPos)
    })
  }

  const handlePrincipalPaydownBlur = () => {
    if (principalPaydown) {
      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(principalPaydown)
      setPrincipalPaydownDisplay(formatted)
    } else {
      setPrincipalPaydownDisplay('')
    }
  }

  // Handler for precise price input with live comma formatting
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPos = input.selectionStart || 0
    const oldValue = priceInputDisplay
    const rawValue = e.target.value.replace(/[^0-9.]/g, '')

    if (!rawValue || rawValue === '.') {
      setSimulatedPrice(0)
      setPriceInputDisplay('')
      return
    }

    const numValue = parseFloat(rawValue) || 0
    setSimulatedPrice(numValue)

    const parts = rawValue.split('.')
    const integerPart = parts[0].replace(/^0+(?=\d)/, '')
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const formatted = parts.length > 1 ? `${formattedInteger}.${parts[1]}` : formattedInteger

    setPriceInputDisplay(formatted || '0')

    requestAnimationFrame(() => {
      const oldCommasBefore = (oldValue.slice(0, cursorPos).match(/,/g) || []).length
      const newCommasBefore = (formatted.slice(0, cursorPos).match(/,/g) || []).length
      const newCursorPos = cursorPos + (newCommasBefore - oldCommasBefore)
      input.setSelectionRange(newCursorPos, newCursorPos)
    })
  }

  const handlePriceInputBlur = () => {
    if (simulatedPrice) {
      const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(simulatedPrice)
      setPriceInputDisplay(formatted)
    } else {
      setPriceInputDisplay('')
    }
  }

  // Price simulation calculations
  const priceChange = ((simulatedPrice - loan.currentCollateralPrice) / loan.currentCollateralPrice) * 100
  const stepSize = loan.currentCollateralPrice > 1000 ? 100 : loan.currentCollateralPrice > 100 ? 1 : 0.1
  const minPrice = Math.floor(loan.liquidationPrice * 0.7 / stepSize) * stepSize
  const maxPrice = Math.ceil(loan.currentCollateralPrice * 1.3 / stepSize) * stepSize

  // Combined calculations (works with price, collateral, AND principal changes)
  const totalSimulatedCollateral = loan.collateralAmount + simulatedCollateralAdded
  const simulatedCollateralValue = totalSimulatedCollateral * simulatedPrice
  const simulatedPrincipal = loan.principalUsd - principalPaydown
  const simulatedLtv = simulatedCollateralValue > 0 ? (simulatedPrincipal / simulatedCollateralValue) * 100 : 0

  // Recalculated trigger prices (when collateral OR principal changes)
  const newMarginCallPrice = simulatedPrincipal / (totalSimulatedCollateral * (loan.marginCallLtv / 100))
  const newLiquidationPrice = simulatedPrincipal / (totalSimulatedCollateral * (loan.liquidationLtv / 100))

  // Calculate accrued interest since last payment
  const paymentHistory = getPaymentHistoryForLoan(loan.id)
  const lastInterestPayment = paymentHistory
    .filter(p => p.type === 'interest')
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0]

  const daysSincePayment = lastInterestPayment
    ? Math.floor((Date.now() - lastInterestPayment.date.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const accruedInterest = principalPaydown > 0
    ? (loan.interestRate / 365) * daysSincePayment * loan.principalUsd
    : 0

  // Make-whole fee calculation (interest for recall period on the paydown amount)
  const makeWholeFee = principalPaydown > 0
    ? (loan.interestRate / 365) * loan.recallPeriodDays * principalPaydown
    : 0

  // Total amount to pay for principal repayment
  const totalRepaymentAmount = principalPaydown + accruedInterest + makeWholeFee

  // Reset function - resets all simulation inputs
  const handleReset = () => {
    setSimulatedPrice(loan.currentCollateralPrice)
    setPriceInputDisplay('')
    setCollateralInputValue(0)
    setCollateralInputDisplay('')
    setCollateralMode('add')
    setPrincipalPaydown(0)
    setPrincipalPaydownDisplay('')
  }

  // Reset when loan changes
  React.useEffect(() => {
    handleReset()
  }, [loan.id])


  // Determine appropriate step for collateral input
  const collateralStep = loan.collateralType === 'btc' || loan.collateralType === 'wbtc' ? 0.01 :
                         loan.collateralType === 'eth' || loan.collateralType === 'weth' ? 0.1 : 1

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-100">
      {/* Left column - LTV Calculator */}
      <div className="lg:col-span-2">
        <Card>
          {/* Header with Reset */}
          <div className="flex items-center justify-between mb-100">
            <CardHeader title="LTV Calculator" />
            <Button size="sm" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {/* Simulated LTV Display */}
          <div className="bg-primary rounded-lg p-100 overflow-visible mb-100">
            <div className="flex items-center justify-between mb-50">
              <div className="flex items-baseline gap-50">
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
              <div className="flex items-center gap-100">
                <div className="flex items-center gap-25">
                  <div className="w-2 h-2 rounded-sm bg-positive" />
                  <span className="text-label-sm text-fg-muted">Initial LTV {loan.initialLtv}%</span>
                </div>
                <div className="flex items-center gap-25">
                  <div className="w-2 h-2 rounded-sm bg-negative" />
                  <span className="text-label-sm text-fg-muted">Margin Call {loan.marginCallLtv}%</span>
                </div>
                <div className="flex items-center gap-25">
                  <div className="w-2.5 h-2.5 rounded-sm bg-negative-emphasis" />
                  <span className="text-label-sm font-medium text-fg-muted">Liq. Level {loan.liquidationLtv}%</span>
                </div>
              </div>
            </div>
            <LtvGauge
              currentLtv={simulatedLtv}
              marginCallLtv={loan.marginCallLtv}
              liquidationLtv={loan.liquidationLtv}
              refundLtv={loan.initialLtv}
              size="md"
            />
          </div>

        {/* Section 1: Collateral Price - Compact */}
        <div className="pt-100 border-t border-border-subtle mb-100">
          <div className="flex items-center justify-between mb-50">
            <span className="text-label-sm text-fg-muted">
              {loan.collateralType.toUpperCase()} Price
              <span className={cn(
                'ml-50',
                priceChange > 0.1 ? 'text-positive' : priceChange < -0.1 ? 'text-negative' : 'text-fg-muted'
              )}>
                ({priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%)
              </span>
            </span>
            <div className="flex items-center gap-50">
              <Button variant="secondary" size="xs" onClick={() => {
                const price = loan.currentCollateralPrice
                setSimulatedPrice(price)
                setPriceInputDisplay(new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price))
              }}>
                Current
              </Button>
              <Button
                variant="secondary"
                size="xs"
                onClick={() => {
                  const price = loan.principalUsd / (loan.collateralAmount * loan.marginCallLtv / 100)
                  setSimulatedPrice(price)
                  setPriceInputDisplay(new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price))
                }}
              >
                Margin Call
              </Button>
              <Button
                variant="secondary"
                size="xs"
                onClick={() => {
                  const price = loan.principalUsd / (loan.collateralAmount * loan.liquidationLtv / 100)
                  setSimulatedPrice(price)
                  setPriceInputDisplay(new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price))
                }}
              >
                Liq. Level
              </Button>
            </div>
          </div>
          {/* Slider + Input on same row */}
          <div className="flex items-center gap-100">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step={stepSize}
              value={simulatedPrice}
              onChange={(e) => {
                const val = Number(e.target.value)
                setSimulatedPrice(val)
                const formatted = new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }).format(val)
                setPriceInputDisplay(formatted)
              }}
              className="flex-1 h-2 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fg-primary [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-fg-primary [&::-moz-range-thumb]:border-0"
            />
            <div className="flex items-center gap-50 w-[140px]">
              <span className="text-label-sm text-fg-muted">$</span>
              <input
                type="text"
                value={priceInputDisplay}
                onChange={handlePriceInputChange}
                onBlur={handlePriceInputBlur}
                placeholder={formatFullCurrency(simulatedPrice).replace('$', '')}
                className="w-full h-control-sm px-75 rounded-lg border border-border-subtle bg-surface text-fg-primary text-right text-label-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Collateral - Compact */}
        <div className="pt-100 border-t border-border-subtle mb-100">
          <div className="flex items-center justify-between mb-50">
            <span className="text-label-sm text-fg-muted">
              Collateral ({formatCollateralAmount(loan.collateralAmount)} {loan.collateralType.toUpperCase()})
            </span>
            <select
              value={collateralMode}
              onChange={(e) => {
                setCollateralMode(e.target.value as 'add' | 'remove')
                setCollateralInputValue(0)
                setCollateralInputDisplay('')
              }}
              className="h-control-sm px-50 rounded-lg border border-border-subtle bg-surface text-fg-primary text-label-xs"
            >
              <option value="add">Add</option>
              <option value="remove">Remove</option>
            </select>
          </div>
          {/* Slider + Input on same row */}
          <div className="flex items-center gap-100">
            <input
              type="range"
              min={0}
              max={loan.collateralAmount}
              step={collateralStep}
              value={collateralInputValue}
              onChange={(e) => {
                const val = Number(e.target.value)
                setCollateralInputValue(val)
                if (val > 0) {
                  const formatted = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6,
                  }).format(val)
                  setCollateralInputDisplay(formatted)
                } else {
                  setCollateralInputDisplay('')
                }
              }}
              className="flex-1 h-2 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fg-primary [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-fg-primary [&::-moz-range-thumb]:border-0"
            />
            <div className="flex items-center gap-50 w-[180px]">
              <input
                type="text"
                value={collateralInputDisplay}
                onChange={handleCollateralInputChange}
                onBlur={handleCollateralInputBlur}
                placeholder="0.000000"
                className="w-full h-control-sm px-75 rounded-lg border border-border-subtle bg-surface text-fg-primary text-right text-label-sm"
              />
              <span className="text-label-xs text-fg-muted whitespace-nowrap">
                {loan.collateralType.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Principal Paydown - Compact */}
        <div className="pt-100 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-50">
            <span className="text-label-sm text-fg-muted">
              Principal Paydown (of {formatFullCurrency(loan.principalUsd)})
            </span>
          </div>
          {/* Slider + Input on same row */}
          <div className="flex items-center gap-100">
            <input
              type="range"
              min={0}
              max={loan.principalUsd}
              step={1000}
              value={principalPaydown}
              onChange={(e) => {
                const val = Number(e.target.value)
                setPrincipalPaydown(val)
                if (val > 0) {
                  const formatted = new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(val)
                  setPrincipalPaydownDisplay(formatted)
                } else {
                  setPrincipalPaydownDisplay('')
                }
              }}
              className="flex-1 h-2 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fg-primary [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-fg-primary [&::-moz-range-thumb]:border-0"
            />
            <div className="flex items-center gap-50 w-[140px]">
              <span className="text-label-sm text-fg-muted">$</span>
              <input
                type="text"
                value={principalPaydownDisplay}
                onChange={handlePrincipalPaydownChange}
                onBlur={handlePrincipalPaydownBlur}
                placeholder="0.00"
                className="w-full h-control-sm px-75 rounded-lg border border-border-subtle bg-surface text-fg-primary text-right text-label-sm"
              />
            </div>
          </div>

          {/* Principal repayment breakdown */}
          {principalPaydown > 0 && (
            <div className="mt-75 p-100 bg-primary rounded-lg border border-border-subtle">
              <div className="space-y-75">
                {/* Total to pay - highlighted */}
                <div className="flex items-center justify-between">
                  <span className="text-label-sm font-medium text-fg-primary">Total to pay</span>
                  <div className="flex items-center gap-50">
                    <TokenLogo token={loan.paymentCoin} size="xs" />
                    <span className="text-label-md font-semibold text-fg-primary">
                      {formatNumber(totalRepaymentAmount, 2)}
                    </span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="pt-75 border-t border-border-subtle space-y-50">
                  <div className="flex items-center justify-between text-label-xs">
                    <span className="text-fg-muted">Principal</span>
                    <span className="text-fg-secondary">{formatNumber(principalPaydown, 2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-label-xs">
                    <span className="text-fg-muted">Accrued interest ({daysSincePayment}d since last payment)</span>
                    <span className="text-fg-secondary">{formatNumber(accruedInterest, 2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-label-xs">
                    <span className="text-fg-muted">Make-whole fee ({loan.recallPeriodDays}-day notice)</span>
                    <span className="text-fg-secondary">{formatNumber(makeWholeFee, 2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </Card>
      </div>

      {/* Right column - Simulation Results */}
      <div className="space-y-75">
        {/* Loan info card */}
        <Card>
          <div className="flex items-center justify-between mb-100">
            <h2 className="text-heading-h6 text-fg-primary">
              Loan #{loan.loanContractAddress.slice(-4)}
            </h2>
            <Pill
              type={statusConfig[loan.status].type}
              appearance="subtle"
              size="24"
              beforeIcon={statusConfig[loan.status].icon}
            >
              {statusConfig[loan.status].label}
            </Pill>
          </div>
          <p className="text-label-sm text-fg-muted">{loan.entityName}</p>
        </Card>

        {/* Simulation Results Card - matching loan details structure */}
        <Card>
          <CardHeader title="Simulation Results" />
          <div className="space-y-75">
            {/* Remaining Principal */}
            <div className="space-y-25">
              <span className="text-label-xs text-fg-muted">Remaining principal</span>
              <div className="flex items-center gap-25">
                <TokenLogo token={loan.paymentCoin} size="xs" />
                <p className="text-heading-h5 font-semibold text-fg-primary">
                  {formatNumber(simulatedPrincipal, 0)}
                </p>
              </div>
            </div>

            {/* Collateral Available to Return */}
            <div className="space-y-25 pt-75 border-t border-border-subtle">
              <span className="text-label-xs text-fg-muted">Collateral available to return</span>
              <div className={cn(
                'flex items-center gap-25',
                simulatedLtv < loan.initialLtv ? 'text-positive' : 'text-fg-primary'
              )}>
                <TokenLogo token={loan.collateralType} size="xs" />
                <span className="text-heading-h5 font-semibold">
                  {simulatedLtv < loan.initialLtv
                    ? formatCollateralAmount(Math.abs(totalSimulatedCollateral - (simulatedPrincipal / (simulatedPrice * (loan.initialLtv / 100)))))
                    : '0.000000'}
                </span>
              </div>
              <p className="text-label-xs text-fg-muted">
                ≈ {simulatedLtv < loan.initialLtv
                    ? formatFullCurrency(Math.abs((totalSimulatedCollateral - (simulatedPrincipal / (simulatedPrice * (loan.initialLtv / 100)))) * simulatedPrice))
                    : '$0.00'}
              </p>
            </div>

            {/* Trigger Prices - side by side */}
            <div className="pt-75 border-t border-border-subtle">
              <div className="grid grid-cols-2 gap-75">
                <div className="space-y-25">
                  <span className="text-label-xs text-fg-muted">Margin Call ({loan.marginCallLtv}%)</span>
                  <p className={cn(
                    'text-label-md font-semibold',
                    (simulatedCollateralAdded !== 0 || principalPaydown > 0) ? 'text-negative' : 'text-fg-primary'
                  )}>
                    {formatFullCurrency(newMarginCallPrice)}
                  </p>
                </div>
                <div className="space-y-25">
                  <span className="text-label-xs text-fg-muted">Liquidation ({loan.liquidationLtv}%)</span>
                  <p className={cn(
                    'text-label-md font-semibold',
                    (simulatedCollateralAdded !== 0 || principalPaydown > 0) ? 'text-negative-emphasis' : 'text-fg-primary'
                  )}>
                    {formatFullCurrency(newLiquidationPrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function CalculatorPage() {
  const sortedLoans = React.useMemo(() => sortLoansByUrgency(mockLoans), [])
  const [selectedLoanId, setSelectedLoanId] = React.useState<string | null>(sortedLoans[0]?.id || null)
  const selectedLoan = selectedLoanId ? sortedLoans.find(l => l.id === selectedLoanId) : null

  return (
    <div className="p-150">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-150">
          <h1 className="text-heading-h3 font-semibold text-fg-primary">LTV Calculator</h1>
          <div className="w-[400px]">
            <LoanSelector
              loans={sortedLoans}
              selectedLoanId={selectedLoanId}
              onLoanSelect={setSelectedLoanId}
            />
          </div>
        </div>

        {selectedLoan ? (
          <LtvCalculator loan={selectedLoan} />
        ) : (
          <Card>
            <p className="text-body-sm text-fg-muted text-center py-150">
              Select a loan to start calculating
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
