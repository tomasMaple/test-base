'use client'

import { Select, Button, TokenLogo, IconButton } from '@/components/ui'
import { X, LayoutGrid, List, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CollateralType, SortOption, ViewMode, Loan } from '../types'

// =============================================================================
// TYPES
// =============================================================================

interface FilterSortBarProps {
  collateralFilter: CollateralType[]
  entityFilter: string | null
  sortBy: SortOption
  viewMode: ViewMode
  onCollateralFilterChange: (types: CollateralType[]) => void
  onEntityFilterChange: (entityId: string | null) => void
  onSortChange: (sort: SortOption) => void
  onViewModeChange: (mode: ViewMode) => void
  entities: { id: string; name: string }[]
  availableCollateralTypes: CollateralType[]
  loans: Loan[]
}

// =============================================================================
// CONSTANTS
// =============================================================================

const SORT_OPTIONS = [
  { value: 'urgency', label: 'Status (default)' },
  { value: 'ltv-high', label: 'LTV: highest first' },
  { value: 'interest-date', label: 'Interest due: soonest' },
]

const COLLATERAL_LABELS: Record<CollateralType, string> = {
  btc: 'BTC',
  eth: 'ETH',
  sol: 'SOL',
  wbtc: 'WBTC',
  weth: 'WETH',
}

// =============================================================================
// COLLATERAL TOGGLE CHIP
// =============================================================================

interface CollateralChipProps {
  type: CollateralType
  isSelected: boolean
  onToggle: () => void
}

function CollateralChip({ type, isSelected, onToggle }: CollateralChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-50 h-control-sm px-75 rounded-pill',
        'text-label-xs font-medium transition-colors cursor-pointer',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        isSelected
          ? 'bg-brand-subtle text-brand border border-brand'
          : 'bg-surface text-fg-secondary border border-border-subtle hover:border-border-strong'
      )}
    >
      <TokenLogo token={type} size="2xs" />
      {COLLATERAL_LABELS[type]}
    </button>
  )
}

// =============================================================================
// FILTER SORT BAR COMPONENT
// =============================================================================

export function FilterSortBar({
  collateralFilter,
  entityFilter,
  sortBy,
  viewMode,
  onCollateralFilterChange,
  onEntityFilterChange,
  onSortChange,
  onViewModeChange,
  entities,
  availableCollateralTypes,
  loans,
}: FilterSortBarProps) {
  const hasActiveFilters = collateralFilter.length > 0 || entityFilter !== null

  const handleCollateralToggle = (type: CollateralType) => {
    if (collateralFilter.includes(type)) {
      onCollateralFilterChange(collateralFilter.filter((t) => t !== type))
    } else {
      onCollateralFilterChange([...collateralFilter, type])
    }
  }

  const handleClearFilters = () => {
    onCollateralFilterChange([])
    onEntityFilterChange(null)
  }

  const handleExportCSV = () => {
    // CSV headers
    const headers = [
      'Loan ID',
      'Entity',
      'Collateral Type',
      'Collateral Amount',
      'Collateral Value (USD)',
      'Principal (USD)',
      'Payment Coin',
      'Current LTV (%)',
      'Margin Call LTV (%)',
      'Liquidation LTV (%)',
      'Initial LTV (%)',
      'Status',
      'Interest Due Date',
      'Interest Amount (USD)',
      'Interest Rate (%)',
      'Margin Call Price',
      'Liquidation Price',
      'Current Price',
    ]

    // CSV rows
    const rows = loans.map((loan) => [
      loan.loanContractAddress,
      loan.entityName,
      loan.collateralType.toUpperCase(),
      loan.collateralAmount,
      loan.collateralValueUsd,
      loan.principalUsd,
      loan.paymentCoin.toUpperCase(),
      loan.currentLtv,
      loan.marginCallLtv,
      loan.liquidationLtv,
      loan.initialLtv,
      loan.status,
      loan.interestDueDate.toISOString().split('T')[0],
      loan.interestAmountUsd,
      (loan.interestRate * 100).toFixed(2),
      loan.marginCallPrice,
      loan.liquidationPrice,
      loan.currentCollateralPrice,
    ])

    // Combine and download
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `loans-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const entityOptions = [
    { value: 'all', label: 'All entities' },
    ...entities.map((e) => ({ value: e.id, label: e.name })),
  ]

  return (
    <div className="bg-surface rounded-lg border border-border-subtle p-100">
      <div className="flex flex-wrap items-center justify-between gap-100">
        {/* Left side: Filters and Sort */}
        <div className="flex flex-wrap items-center gap-100">
          {/* Collateral type filters */}
          <div className="flex items-center gap-50">
            <span className="text-label-xs text-fg-muted mr-25">Collateral:</span>
            {availableCollateralTypes.map((type) => (
              <CollateralChip
                key={type}
                type={type}
                isSelected={collateralFilter.includes(type)}
                onToggle={() => handleCollateralToggle(type)}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="h-control-sm w-px bg-border-subtle" />

          {/* Entity filter */}
          <div className="flex items-center gap-50">
            <span className="text-label-xs text-fg-muted whitespace-nowrap">Entity:</span>
            <Select
              options={entityOptions}
              defaultValue="all"
              value={entityFilter ?? 'all'}
              onValueChange={(val) => onEntityFilterChange(val === 'all' ? null : (val as string))}
              size="sm"
              triggerClassName="min-w-[140px]"
            />
          </div>

          {/* Divider */}
          <div className="h-control-sm w-px bg-border-subtle" />

          {/* Sort dropdown */}
          <div className="flex items-center gap-50">
            <span className="text-label-xs text-fg-muted whitespace-nowrap">Sort by:</span>
            <Select
              options={SORT_OPTIONS}
              value={sortBy}
              onValueChange={(val) => onSortChange(val as SortOption)}
              size="sm"
              triggerClassName="min-w-[180px]"
            />
          </div>

          {/* Divider */}
          <div className="h-control-sm w-px bg-border-subtle" />

          {/* Export CSV button */}
          <Button
            variant="secondary"
            size="sm"
            beforeIcon={<Download />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>

          {/* Clear filters button */}
          {hasActiveFilters && (
            <Button
              variant="secondary"
              size="sm"
              beforeIcon={<X />}
              onClick={handleClearFilters}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Right side: View toggle */}
        <div className="flex items-center gap-0 border border-border-subtle rounded-pill p-0 bg-muted" suppressHydrationWarning>
          <button
            type="button"
            onClick={() => onViewModeChange('cards')}
            aria-label="Card view"
            suppressHydrationWarning
            className={cn(
              'inline-flex items-center justify-center',
              'h-control-sm w-control-sm rounded-pill',
              'transition-all duration-fast cursor-pointer',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              viewMode === 'cards'
                ? 'bg-inverse text-fg-inverse shadow-sm'
                : 'text-fg-muted hover:text-fg-primary hover:bg-primary'
            )}
          >
            <LayoutGrid className="size-icon-md" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('table')}
            aria-label="Table view"
            suppressHydrationWarning
            className={cn(
              'inline-flex items-center justify-center',
              'h-control-sm w-control-sm rounded-pill',
              'transition-all duration-fast cursor-pointer',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              viewMode === 'table'
                ? 'bg-inverse text-fg-inverse shadow-sm'
                : 'text-fg-muted hover:text-fg-primary hover:bg-primary'
            )}
          >
            <List className="size-icon-md" />
          </button>
        </div>
      </div>
    </div>
  )
}
