'use client'

import { Select, Button, TokenLogo } from '@/components/ui'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CollateralType, SortOption } from '../types'

// =============================================================================
// TYPES
// =============================================================================

interface FilterSortBarProps {
  collateralFilter: CollateralType[]
  entityFilter: string | null
  sortBy: SortOption
  onCollateralFilterChange: (types: CollateralType[]) => void
  onEntityFilterChange: (entityId: string | null) => void
  onSortChange: (sort: SortOption) => void
  entities: { id: string; name: string }[]
  availableCollateralTypes: CollateralType[]
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
  onCollateralFilterChange,
  onEntityFilterChange,
  onSortChange,
  entities,
  availableCollateralTypes,
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

  const entityOptions = [
    { value: 'all', label: 'All entities' },
    ...entities.map((e) => ({ value: e.id, label: e.name })),
  ]

  return (
    <div className="bg-surface rounded-lg border border-border-subtle p-100">
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

        {/* Clear filters button */}
        {hasActiveFilters && (
          <>
            <div className="h-control-sm w-px bg-border-subtle" />
            <Button
              variant="secondary"
              size="sm"
              beforeIcon={<X />}
              onClick={handleClearFilters}
            >
              Clear filters
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
