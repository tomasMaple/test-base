'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ExternalLink, Download, FileText, Calendar, ChevronDown, RotateCcw } from 'lucide-react'
import { TokenLogo } from '@/components/ui/token-logo'
import { Pill } from '@/components/ui/pill'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import {
  getAllTransactions,
  getLoanById,
  getBlockExplorerUrl,
  getCurrentLoans,
  getPastLoans,
  getTransactionsInRange,
  getLoansAtDate,
  mockLoans,
} from '../mock-data'
import { PaymentHistoryItem, COLLATERAL_TO_NETWORK, Loan } from '../types'

type TransactionWithEntity = PaymentHistoryItem & { entityName: string }

// Card components
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

// Utility functions for formatting
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function formatCollateralAmount(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  })
}

// Helper to format transaction type label
function formatTransactionType(type: PaymentHistoryItem['type']): string {
  switch (type) {
    case 'drawdown':
      return 'Principal drawdown'
    case 'refinance':
      return 'Refinance'
    case 'collateral-deposit':
      return 'Collateral deposit'
    case 'interest':
      return 'Interest payment'
    case 'principal':
      return 'Principal payment'
    case 'fee':
      return 'Fee payment'
    default:
      return type
  }
}

// CSV Export for transactions
function exportTransactionsToCSV(transactions: TransactionWithEntity[]) {
  const headers = [
    'Loan ID',
    'Loan Principal (USD)',
    'Loan Collateral Type',
    'Entity',
    'Date',
    'Type',
    'Amount (USD)',
    'Payment Coin',
    'Collateral Amount',
    'Collateral Type',
    'Status',
    'Transaction Hash',
  ]

  const rows = transactions.map((tx) => {
    const loan = getLoanById(tx.loanId)
    return [
      tx.loanId,
      loan?.principalUsd.toFixed(2) || '',
      loan?.collateralType.toUpperCase() || '',
      tx.entityName,
      formatDate(tx.date),
      formatTransactionType(tx.type),
      tx.amountUsd.toFixed(2),
      tx.paymentCoin.toUpperCase(),
      tx.collateralAmount?.toFixed(6) || '',
      tx.collateralType?.toUpperCase() || '',
      tx.status,
      tx.transactionHash || '',
    ]
  })

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `transactions_${formatDateISO(new Date())}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// CSV Export for audit snapshot
function exportAuditSnapshotToCSV(loans: Loan[], asOfDate: Date) {
  const headers = [
    'Loan ID',
    'Entity',
    'Principal (USD)',
    'Payment Coin',
    'Collateral Amount',
    'Collateral Coin',
    'Collateral Value (USD)',
    'Current LTV (%)',
    'Margin Call Price',
    'Margin Call LTV (%)',
    'Liquidation Price',
    'Liquidation LTV (%)',
    'Initial LTV (%)',
    'Status',
    'Net Interest Rate (%)',
    'Protocol Fee (%)',
    'Total Interest Rate (%)',
    'Current Price',
    'Start Date',
    'Maturity Date',
    'Is Active',
  ]

  const rows = loans.map((loan) => [
    loan.id,
    loan.entityName,
    loan.principalUsd.toFixed(2),
    loan.paymentCoin.toUpperCase(),
    loan.collateralAmount.toFixed(6),
    loan.collateralType.toUpperCase(),
    loan.collateralValueUsd.toFixed(2),
    loan.currentLtv.toFixed(2),
    loan.marginCallPrice,
    loan.marginCallLtv.toFixed(2),
    loan.liquidationPrice,
    loan.liquidationLtv.toFixed(2),
    loan.initialLtv.toFixed(2),
    loan.status,
    (loan.interestRate * 100).toFixed(2),
    (loan.protocolFee * 100).toFixed(2),
    ((loan.interestRate + loan.protocolFee) * 100).toFixed(2),
    loan.currentCollateralPrice,
    formatDate(loan.startDate),
    loan.maturityDate ? formatDate(loan.maturityDate) : 'Revolving',
    loan.isActive ? 'Yes' : 'No',
  ])

  const csvContent = [
    `# Audit Snapshot as of ${formatDate(asOfDate)}`,
    '',
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `audit_snapshot_${formatDateISO(asOfDate)}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Statement Modal Component
function StatementModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [startDate, setStartDate] = React.useState<string>(
    formatDateISO(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
  )
  const [endDate, setEndDate] = React.useState<string>(formatDateISO(new Date()))

  const start = new Date(startDate)
  const end = new Date(endDate)
  const transactions = getTransactionsInRange(start, end)

  // Calculate summary values
  const summary = React.useMemo(() => {
    const interestPayments = transactions.filter((tx) => tx.type === 'interest')
    const feePayments = transactions.filter((tx) => tx.type === 'fee')
    const principalDrawdowns = transactions.filter((tx) => tx.type === 'drawdown')
    const principalPayments = transactions.filter((tx) => tx.type === 'principal')

    return {
      interestCount: interestPayments.length,
      interestTotal: interestPayments.reduce((sum, tx) => sum + tx.amountUsd, 0),
      feeTotal: feePayments.reduce((sum, tx) => sum + tx.amountUsd, 0),
      principalIssued: principalDrawdowns.reduce((sum, tx) => sum + tx.amountUsd, 0),
      principalRepaid: principalPayments.reduce((sum, tx) => sum + tx.amountUsd, 0),
      totalPaid: interestPayments.reduce((sum, tx) => sum + tx.amountUsd, 0) +
        feePayments.reduce((sum, tx) => sum + tx.amountUsd, 0),
    }
  }, [transactions])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px]">
        <DialogTitle>Get Statement</DialogTitle>
        <DialogDescription>
          Generate a statement for a specific date range.
        </DialogDescription>

        <div className="mt-100 space-y-100">
          {/* Date Range */}
          <div className="grid grid-cols-2 gap-75">
            <div className="flex flex-col gap-25">
              <label className="text-label-xs font-medium text-fg-primary">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-control-md px-75 text-body-sm rounded-md border border-border-strong bg-surface text-fg-primary focus-visible:outline focus-visible:outline-brand cursor-text"
              />
            </div>
            <div className="flex flex-col gap-25">
              <label className="text-label-xs font-medium text-fg-primary">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-control-md px-75 text-body-sm rounded-md border border-border-strong bg-surface text-fg-primary focus-visible:outline focus-visible:outline-brand cursor-text"
              />
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-primary rounded-lg p-100">
            <h4 className="text-label-sm font-medium text-fg-primary mb-75">Statement Preview</h4>

            {/* Section 1: Balances */}
            <div className="space-y-50 mb-75">
              <div className="flex justify-between text-body-sm">
                <span className="text-fg-muted">Transactions</span>
                <span className="text-fg-primary font-medium">{transactions.length}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-fg-muted">Principal Issued</span>
                <span className="text-fg-primary font-medium">${formatNumber(summary.principalIssued, 2)}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-fg-muted">Principal Repaid</span>
                <span className="text-fg-primary font-medium">${formatNumber(summary.principalRepaid, 2)}</span>
              </div>
            </div>

            {/* Section 2: Interest & Fees */}
            <div className="border-t border-border-subtle pt-75 space-y-50 mb-75">
              <div className="flex justify-between text-body-sm">
                <span className="text-fg-muted">Interest Payments</span>
                <span className="text-fg-primary font-medium">{summary.interestCount}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-fg-muted">Interest Paid</span>
                <span className="text-fg-primary font-medium">${formatNumber(summary.interestTotal, 2)}</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-fg-muted">Fees Paid</span>
                <span className="text-fg-primary font-medium">${formatNumber(summary.feeTotal, 2)}</span>
              </div>
            </div>

            {/* Section 3: Total */}
            <div className="border-t border-border-subtle pt-75">
              <div className="flex justify-between text-body-sm">
                <span className="text-fg-primary font-medium">Total Paid</span>
                <span className="text-fg-primary font-semibold">${formatNumber(summary.totalPaid, 2)}</span>
              </div>
            </div>
          </div>

          {/* Download Button - Disabled Placeholder */}
          <Button
            variant="primary"
            fullWidth
            disabled
            beforeIcon={<Download />}
          >
            Download PDF (Coming Soon)
          </Button>
          <p className="text-body-xs text-fg-muted text-center">
            PDF generation will be available in a future release.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Audit Snapshot Modal Component
function AuditSnapshotModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [snapshotDate, setSnapshotDate] = React.useState<string>(formatDateISO(new Date()))
  const date = new Date(snapshotDate)
  const loans = getLoansAtDate(date)

  const handleDownload = () => {
    exportAuditSnapshotToCSV(loans, date)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <DialogTitle>Get Audit Snapshot</DialogTitle>
        <DialogDescription>
          Download loan data as-of a specific date.
        </DialogDescription>

        <div className="mt-100 space-y-100">
          {/* Date Picker */}
          <div className="flex flex-col gap-25">
            <label className="text-label-xs font-medium text-fg-primary">Snapshot Date</label>
            <input
              type="date"
              value={snapshotDate}
              max={formatDateISO(new Date())}
              onChange={(e) => setSnapshotDate(e.target.value)}
              className="h-control-md px-75 text-body-sm rounded-md border border-border-strong bg-surface text-fg-primary focus-visible:outline focus-visible:outline-brand cursor-text"
            />
          </div>

          {/* Preview */}
          <div className="bg-primary rounded-lg p-100 space-y-50">
            <h4 className="text-label-sm font-medium text-fg-primary">Snapshot Preview</h4>
            <div className="flex justify-between text-body-sm">
              <span className="text-fg-muted">Loans at this date</span>
              <span className="text-fg-primary font-medium">{loans.length}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-fg-muted">Active loans</span>
              <span className="text-fg-primary font-medium">{loans.filter(l => l.isActive).length}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-fg-muted">Closed loans</span>
              <span className="text-fg-primary font-medium">{loans.filter(l => !l.isActive).length}</span>
            </div>
          </div>

          {/* Download Button */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleDownload}
            beforeIcon={<Download />}
          >
            Download CSV
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Generic Multi-Select Filter Popover Component
function MultiSelectFilterPopover({
  label,
  options,
  selectedValues,
  onSelectionChange,
  getDisplayLabel,
}: {
  label: string
  options: { value: string; label: string }[]
  selectedValues: Set<string>
  onSelectionChange: (values: Set<string>) => void
  getDisplayLabel?: (count: number, total: number) => string
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const allSelected = options.every((opt) => selectedValues.has(opt.value))
  const someSelected = options.some((opt) => selectedValues.has(opt.value))

  const toggleOption = (value: string) => {
    const newSelection = new Set(selectedValues)
    if (newSelection.has(value)) {
      newSelection.delete(value)
    } else {
      newSelection.add(value)
    }
    onSelectionChange(newSelection)
  }

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(options.map((opt) => opt.value)))
    }
  }

  const selectedCount = selectedValues.size
  const totalCount = options.length

  const displayLabel = getDisplayLabel
    ? getDisplayLabel(selectedCount, totalCount)
    : selectedCount === totalCount
    ? `All ${label.toLowerCase()}`
    : selectedCount === 0
    ? `No ${label.toLowerCase()} selected`
    : `${selectedCount} ${label.toLowerCase()} selected`

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-50 h-control-md px-75 text-body-sm rounded-md border border-border-strong bg-surface text-fg-primary hover:bg-subtle transition-colors w-full justify-between cursor-pointer"
      >
        <span>{displayLabel}</span>
        <ChevronDown className={cn('size-icon-md text-fg-tertiary transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-25 z-50 min-w-[240px] bg-surface border border-border-subtle rounded-lg shadow-300 py-50">
            {/* Select All */}
            <div className="px-75 py-50 border-b border-border-subtle">
              <button
                onClick={toggleAll}
                className="flex items-center gap-50 w-full text-left cursor-pointer"
              >
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                />
                <span className="text-label-xs font-semibold text-fg-primary uppercase tracking-wide">
                  All {label}
                </span>
              </button>
            </div>

            {/* Options */}
            <div className="px-75 py-50 space-y-25 max-h-[240px] overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className="flex items-center gap-50 w-full text-left py-25 hover:bg-subtle rounded px-25 -mx-25 cursor-pointer"
                >
                  <Checkbox checked={selectedValues.has(option.value)} />
                  <span className="text-label-sm text-fg-primary">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Loan Filter Popover Component (with Current/Past sections)
function LoanFilterPopover({
  currentLoans,
  pastLoans,
  selectedLoanIds,
  onSelectionChange,
}: {
  currentLoans: Loan[]
  pastLoans: Loan[]
  selectedLoanIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const allCurrentSelected = currentLoans.every((l) => selectedLoanIds.has(l.id))
  const allPastSelected = pastLoans.length === 0 || pastLoans.every((l) => selectedLoanIds.has(l.id))
  const someCurrentSelected = currentLoans.some((l) => selectedLoanIds.has(l.id))
  const somePastSelected = pastLoans.some((l) => selectedLoanIds.has(l.id))

  const toggleLoan = (loanId: string) => {
    const newSelection = new Set(selectedLoanIds)
    if (newSelection.has(loanId)) {
      newSelection.delete(loanId)
    } else {
      newSelection.add(loanId)
    }
    onSelectionChange(newSelection)
  }

  const toggleAllCurrent = () => {
    const newSelection = new Set(selectedLoanIds)
    if (allCurrentSelected) {
      currentLoans.forEach((l) => newSelection.delete(l.id))
    } else {
      currentLoans.forEach((l) => newSelection.add(l.id))
    }
    onSelectionChange(newSelection)
  }

  const toggleAllPast = () => {
    const newSelection = new Set(selectedLoanIds)
    if (allPastSelected) {
      pastLoans.forEach((l) => newSelection.delete(l.id))
    } else {
      pastLoans.forEach((l) => newSelection.add(l.id))
    }
    onSelectionChange(newSelection)
  }

  const selectedCount = selectedLoanIds.size
  const totalCount = currentLoans.length + pastLoans.length

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-50 h-control-md px-75 text-body-sm rounded-md border border-border-strong bg-surface text-fg-primary hover:bg-subtle transition-colors w-full justify-between cursor-pointer"
      >
        <span>
          {selectedCount === totalCount
            ? 'All loans'
            : selectedCount === 0
            ? 'No loans selected'
            : `${selectedCount} loan${selectedCount !== 1 ? 's' : ''} selected`}
        </span>
        <ChevronDown className={cn('size-icon-md text-fg-tertiary transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-25 z-50 min-w-[280px] bg-surface border border-border-subtle rounded-lg shadow-300 py-50">
            {/* Current Loans Section */}
            <div className="px-75 py-50">
              <button
                onClick={toggleAllCurrent}
                className="flex items-center gap-50 w-full text-left group cursor-pointer"
              >
                <Checkbox
                  checked={allCurrentSelected}
                  indeterminate={someCurrentSelected && !allCurrentSelected}
                />
                <span className="text-label-xs font-semibold text-fg-primary uppercase tracking-wide">
                  Current Loans
                </span>
              </button>
            </div>
            <div className="px-100 pb-50 space-y-25">
              {currentLoans.map((loan) => {
                const last4 = loan.loanContractAddress.slice(-4)
                return (
                  <button
                    key={loan.id}
                    onClick={() => toggleLoan(loan.id)}
                    className="flex items-center gap-50 w-full text-left py-25 hover:bg-subtle rounded px-25 -mx-25 cursor-pointer"
                  >
                    <Checkbox checked={selectedLoanIds.has(loan.id)} />
                    <span className="text-label-sm text-fg-primary">Loan #{last4}</span>
                    <span className="text-label-xs text-fg-muted ml-auto">{loan.entityName}</span>
                  </button>
                )
              })}
            </div>

            {/* Divider */}
            {pastLoans.length > 0 && <div className="border-t border-border-subtle my-50" />}

            {/* Past Loans Section */}
            {pastLoans.length > 0 && (
              <>
                <div className="px-75 py-50">
                  <button
                    onClick={toggleAllPast}
                    className="flex items-center gap-50 w-full text-left group cursor-pointer"
                  >
                    <Checkbox
                      checked={allPastSelected}
                      indeterminate={somePastSelected && !allPastSelected}
                    />
                    <span className="text-label-xs font-semibold text-fg-muted uppercase tracking-wide">
                      Past Loans
                    </span>
                  </button>
                </div>
                <div className="px-100 pb-50 space-y-25">
                  {pastLoans.map((loan) => {
                    const last4 = loan.loanContractAddress.slice(-4)
                    return (
                      <button
                        key={loan.id}
                        onClick={() => toggleLoan(loan.id)}
                        className="flex items-center gap-50 w-full text-left py-25 hover:bg-subtle rounded px-25 -mx-25 cursor-pointer"
                      >
                        <Checkbox checked={selectedLoanIds.has(loan.id)} />
                        <span className="text-label-sm text-fg-muted">Loan #{last4}</span>
                        <span className="text-label-xs text-fg-muted ml-auto">{loan.entityName}</span>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// Transaction types for filters
const TRANSACTION_TYPES = [
  { value: 'interest', label: 'Interest payment' },
  { value: 'principal', label: 'Principal payment' },
  { value: 'drawdown', label: 'Principal drawdown' },
  { value: 'refinance', label: 'Refinance' },
  { value: 'collateral-deposit', label: 'Collateral deposit' },
  { value: 'fee', label: 'Fee payment' },
]

export default function TransactionsPage() {
  const router = useRouter()
  const allTransactions = getAllTransactions()
  const currentLoans = getCurrentLoans()
  const pastLoans = getPastLoans()

  // Get unique entities from transactions
  const uniqueEntities = React.useMemo(() => {
    const entities = new Set(allTransactions.map((tx) => tx.entityName))
    return Array.from(entities).filter(Boolean)
  }, [allTransactions])

  // Default filter values - all selected
  const getDefaultLoanIds = () => new Set([...currentLoans, ...pastLoans].map((l) => l.id))
  const getDefaultEntityIds = () => new Set(uniqueEntities)
  const getDefaultTypeIds = () => new Set(TRANSACTION_TYPES.map((t) => t.value))

  // Filter state - default to all loans, entities, and types selected
  const [selectedLoanIds, setSelectedLoanIds] = React.useState<Set<string>>(getDefaultLoanIds)
  const [selectedEntityIds, setSelectedEntityIds] = React.useState<Set<string>>(getDefaultEntityIds)
  const [selectedTypeIds, setSelectedTypeIds] = React.useState<Set<string>>(getDefaultTypeIds)

  // Modal state
  const [statementModalOpen, setStatementModalOpen] = React.useState(false)
  const [auditSnapshotModalOpen, setAuditSnapshotModalOpen] = React.useState(false)

  // Check if filters are at default state
  const isFiltersDefault = React.useMemo(() => {
    const defaultLoans = getDefaultLoanIds()
    const defaultEntities = getDefaultEntityIds()
    const defaultTypes = getDefaultTypeIds()

    const loansMatch = selectedLoanIds.size === defaultLoans.size &&
      [...selectedLoanIds].every((id) => defaultLoans.has(id))
    const entitiesMatch = selectedEntityIds.size === defaultEntities.size &&
      [...selectedEntityIds].every((id) => defaultEntities.has(id))
    const typesMatch = selectedTypeIds.size === defaultTypes.size &&
      [...selectedTypeIds].every((id) => defaultTypes.has(id))

    return loansMatch && entitiesMatch && typesMatch
  }, [selectedLoanIds, selectedEntityIds, selectedTypeIds, currentLoans, pastLoans, uniqueEntities])

  // Reset filters to default
  const resetFilters = () => {
    setSelectedLoanIds(getDefaultLoanIds())
    setSelectedEntityIds(getDefaultEntityIds())
    setSelectedTypeIds(getDefaultTypeIds())
  }

  // Apply filters
  const filteredTransactions = React.useMemo(() => {
    return allTransactions.filter((tx) => {
      // Filter by selected loans
      if (selectedLoanIds.size === 0 || !selectedLoanIds.has(tx.loanId)) return false
      // Filter by selected entities
      if (selectedEntityIds.size === 0 || !selectedEntityIds.has(tx.entityName)) return false
      // Filter by selected types
      if (selectedTypeIds.size === 0 || !selectedTypeIds.has(tx.type)) return false
      return true
    })
  }, [allTransactions, selectedLoanIds, selectedEntityIds, selectedTypeIds])

  // Entity options for filter
  const entityOptions = uniqueEntities.map((entity) => ({ value: entity, label: entity }))

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-7xl mx-auto p-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-150">
          <h1 className="text-heading-h4 text-fg-primary">Transactions</h1>
          <div className="flex items-center gap-75">
            <Button
              variant="secondary"
              size="sm"
              beforeIcon={<Download />}
              onClick={() => exportTransactionsToCSV(filteredTransactions)}
            >
              Export CSV
            </Button>
            <Button
              variant="secondary"
              size="sm"
              beforeIcon={<FileText />}
              onClick={() => setStatementModalOpen(true)}
            >
              Get Statement
            </Button>
            <Button
              variant="secondary"
              size="sm"
              beforeIcon={<Calendar />}
              onClick={() => setAuditSnapshotModalOpen(true)}
            >
              Audit Snapshot
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-end gap-100 mb-150">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-100">
            <div className="flex flex-col gap-25">
              <label className="text-label-xs font-medium text-fg-primary">Loans</label>
              <LoanFilterPopover
                currentLoans={currentLoans}
                pastLoans={pastLoans}
                selectedLoanIds={selectedLoanIds}
                onSelectionChange={setSelectedLoanIds}
              />
            </div>
            <div className="flex flex-col gap-25">
              <label className="text-label-xs font-medium text-fg-primary">Entity</label>
              <MultiSelectFilterPopover
                label="entities"
                options={entityOptions}
                selectedValues={selectedEntityIds}
                onSelectionChange={setSelectedEntityIds}
              />
            </div>
            <div className="flex flex-col gap-25">
              <label className="text-label-xs font-medium text-fg-primary">Type</label>
              <MultiSelectFilterPopover
                label="types"
                options={TRANSACTION_TYPES}
                selectedValues={selectedTypeIds}
                onSelectionChange={setSelectedTypeIds}
              />
            </div>
          </div>
          <Button
            variant="secondary"
            size="md"
            beforeIcon={<RotateCcw />}
            onClick={resetFilters}
            disabled={isFiltersDefault}
          >
            Reset filters
          </Button>
        </div>

        {/* Transactions list */}
        <Card>
          <CardHeader title={`All transactions (${filteredTransactions.length})`} />
          {filteredTransactions.length === 0 ? (
            <p className="text-body-sm text-fg-muted py-100 text-center">
              No transactions found
            </p>
          ) : (
            <div>
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-[80px_100px_100px_1fr_100px_140px_120px_80px_100px] gap-100 items-center py-75 px-100 border-b border-border-subtle bg-subtle/50">
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide">Loan ID</span>
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide">Principal</span>
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide">Collateral</span>
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide">Entity</span>
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide">Date</span>
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide">Type</span>
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide text-right">Amount</span>
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide text-center">Status</span>
                <span className="text-label-xs font-medium text-fg-tertiary uppercase tracking-wide text-right">Tx Hash</span>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border-subtle">
                {filteredTransactions.map((tx) => {
                  const loan = getLoanById(tx.loanId)
                  const network = loan ? COLLATERAL_TO_NETWORK[loan.collateralType] : 'ethereum'
                  const loanLast4 = loan?.loanContractAddress.slice(-4) || tx.loanId.slice(-4)

                  // Format loan principal with appropriate unit
                  const loanPrincipalFormatted = loan
                    ? loan.principalUsd >= 1000000
                      ? `${(loan.principalUsd / 1000000).toFixed(2)}M`
                      : `${(loan.principalUsd / 1000).toFixed(2)}K`
                    : ''

                  return (
                    <div
                      key={tx.id}
                      className="py-100 px-100 grid grid-cols-1 md:grid-cols-[80px_100px_100px_1fr_100px_140px_120px_80px_100px] gap-50 md:gap-100 items-center hover:bg-subtle transition-colors"
                    >
                      {/* Loan ID - clickable */}
                      <button
                        onClick={() => router.push(`/borrower/loans/${tx.loanId}`)}
                        className="text-label-sm text-brand hover:underline text-left cursor-pointer font-medium"
                      >
                        #{loanLast4}
                      </button>

                      {/* Loan Principal with USDC/USDT icon */}
                      <div className="flex items-center gap-25">
                        {loan && (
                          <>
                            <TokenLogo token={loan.paymentCoin} size="xs" />
                            <span className="text-label-sm text-fg-primary">{loanPrincipalFormatted}</span>
                          </>
                        )}
                      </div>

                      {/* Collateral Type with icon */}
                      <div className="flex items-center gap-25">
                        {loan && (
                          <>
                            <TokenLogo token={loan.collateralType} size="xs" />
                            <span className="text-label-sm text-fg-primary">{loan.collateralType.toUpperCase()}</span>
                          </>
                        )}
                      </div>

                      {/* Entity */}
                      <span className="text-label-sm text-fg-primary">{tx.entityName}</span>

                      {/* Date */}
                      <span className="text-label-sm text-fg-muted">{formatDate(tx.date)}</span>

                      {/* Type */}
                      <span className="text-label-sm text-fg-primary">
                        {formatTransactionType(tx.type)}
                      </span>

                      {/* Amount */}
                      <div className="flex items-center justify-end">
                        {tx.type === 'collateral-deposit' ? (
                          <div className="text-right">
                            <div className="flex items-center gap-25 justify-end">
                              <TokenLogo token={tx.collateralType!} size="xs" />
                              <span className="text-label-md font-medium text-fg-primary">
                                {formatCollateralAmount(tx.collateralAmount!)}
                              </span>
                            </div>
                            <span className="text-label-xs text-fg-muted">
                              ${formatNumber(tx.amountUsd, 0)}
                            </span>
                          </div>
                        ) : tx.amountUsd > 0 ? (
                          <div className="flex items-center gap-25">
                            <TokenLogo token={tx.paymentCoin} size="xs" />
                            <span className="text-label-md font-medium text-fg-primary">
                              {formatNumber(tx.amountUsd, 2)}
                            </span>
                          </div>
                        ) : null}
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-center">
                        {tx.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-positive" strokeWidth={2.5} />
                        ) : (
                          <Pill type="warning" appearance="subtle" size="24">
                            {tx.status}
                          </Pill>
                        )}
                      </div>

                      {/* Tx Hash */}
                      <div className="flex items-center justify-end">
                        {tx.transactionHash && (
                          <a
                            href={getBlockExplorerUrl(network, tx.transactionHash)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-25 text-label-xs text-fg-tertiary font-mono hover:text-fg-primary transition-colors group"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="group-hover:underline">
                              {tx.transactionHash.slice(0, 6)}...{tx.transactionHash.slice(-4)}
                            </span>
                            <ExternalLink className="size-icon-xs flex-shrink-0" />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Modals */}
      <StatementModal open={statementModalOpen} onOpenChange={setStatementModalOpen} />
      <AuditSnapshotModal open={auditSnapshotModalOpen} onOpenChange={setAuditSnapshotModalOpen} />
    </div>
  )
}
