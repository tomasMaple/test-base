'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ExternalLink } from 'lucide-react'
import { TokenLogo } from '@/components/ui/token-logo'
import { Pill } from '@/components/ui/pill'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { getAllTransactions, getLoanById, getBlockExplorerUrl } from '../mock-data'
import { PaymentHistoryItem, COLLATERAL_TO_NETWORK } from '../types'

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

export default function TransactionsPage() {
  const router = useRouter()
  const allTransactions = getAllTransactions()

  // Filter state
  const [selectedLoanId, setSelectedLoanId] = React.useState<string>('all')
  const [selectedEntity, setSelectedEntity] = React.useState<string>('all')
  const [selectedType, setSelectedType] = React.useState<string>('all')

  // Derive filter options from data
  const uniqueLoanIds = React.useMemo(() => {
    const ids = new Set(allTransactions.map((tx) => tx.loanId))
    return Array.from(ids)
  }, [allTransactions])

  const uniqueEntities = React.useMemo(() => {
    const entities = new Set(allTransactions.map((tx) => tx.entityName))
    return Array.from(entities).filter(Boolean)
  }, [allTransactions])

  const transactionTypes = [
    { value: 'interest', label: 'Interest payment' },
    { value: 'principal', label: 'Principal payment' },
    { value: 'drawdown', label: 'Principal drawdown' },
    { value: 'refinance', label: 'Refinance' },
    { value: 'collateral-deposit', label: 'Collateral deposit' },
    { value: 'fee', label: 'Fee payment' },
  ]

  // Apply filters
  const filteredTransactions = React.useMemo(() => {
    return allTransactions.filter((tx) => {
      if (selectedLoanId !== 'all' && tx.loanId !== selectedLoanId) return false
      if (selectedEntity !== 'all' && tx.entityName !== selectedEntity) return false
      if (selectedType !== 'all' && tx.type !== selectedType) return false
      return true
    })
  }, [allTransactions, selectedLoanId, selectedEntity, selectedType])

  // Build loan ID options for select
  const loanIdOptions = [
    { value: 'all', label: 'All loans' },
    ...uniqueLoanIds.map((id) => {
      const loan = getLoanById(id)
      const last4 = loan?.loanContractAddress.slice(-4) || id.slice(-4)
      return { value: id, label: `Loan #${last4}` }
    }),
  ]

  // Build entity options for select
  const entityOptions = [
    { value: 'all', label: 'All entities' },
    ...uniqueEntities.map((entity) => ({ value: entity, label: entity })),
  ]

  // Build type options for select
  const typeOptions = [
    { value: 'all', label: 'All types' },
    ...transactionTypes.map((type) => ({ value: type.value, label: type.label })),
  ]

  // Helper to format transaction type label
  const formatTransactionType = (type: PaymentHistoryItem['type']): string => {
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

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-7xl mx-auto p-200">
        {/* Header */}
        <h1 className="text-heading-h4 text-fg-primary mb-150">Transactions</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-100 mb-150">
          <Select
            label="Loan"
            options={loanIdOptions}
            value={selectedLoanId}
            onValueChange={(value) => setSelectedLoanId(value as string)}
            placeholder="Select loan"
          />
          <Select
            label="Entity"
            options={entityOptions}
            value={selectedEntity}
            onValueChange={(value) => setSelectedEntity(value as string)}
            placeholder="Select entity"
          />
          <Select
            label="Type"
            options={typeOptions}
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as string)}
            placeholder="Select type"
          />
        </div>

        {/* Transactions list */}
        <Card>
          <CardHeader title="All transactions" />
          {filteredTransactions.length === 0 ? (
            <p className="text-body-sm text-fg-muted py-100 text-center">
              No transactions found
            </p>
          ) : (
            <div className="divide-y divide-border-subtle">
              {filteredTransactions.map((tx) => {
                const loan = getLoanById(tx.loanId)
                const network = loan ? COLLATERAL_TO_NETWORK[loan.collateralType] : 'ethereum'
                const loanLast4 = loan?.loanContractAddress.slice(-4) || tx.loanId.slice(-4)

                return (
                  <div
                    key={tx.id}
                    className="py-100 grid grid-cols-1 md:grid-cols-[120px_1fr_120px_160px_140px_100px_80px] gap-50 md:gap-75 items-center hover:bg-subtle transition-colors"
                  >
                    {/* Loan ID - clickable */}
                    <button
                      onClick={() => router.push(`/borrower/loans/${tx.loanId}`)}
                      className="text-label-sm text-brand hover:underline text-left"
                    >
                      Loan #{loanLast4}
                    </button>

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
          )}
        </Card>
      </div>
    </div>
  )
}
