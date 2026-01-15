'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  EntitySection,
  sortEntitiesByUrgency,
  PortfolioSummary,
  FilterSortBar,
  LoansTable,
} from './components'
import {
  mockEntities,
  mockLoans,
  calculatePortfolioSummary,
  filterAndSortEntities,
  getAvailableCollateralTypes,
} from './mock-data'
import type { CollateralType, SortOption, ViewMode } from './types'

// =============================================================================
// BORROWER LOAN DASHBOARD
// =============================================================================

export default function BorrowerDashboardPage() {
  // Filter & sort state
  const [collateralFilter, setCollateralFilter] = useState<CollateralType[]>([])
  const [entityFilter, setEntityFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('urgency')

  // View mode state with localStorage persistence
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('loanViewMode')
      return (saved as ViewMode) || 'cards'
    }
    return 'cards'
  })

  useEffect(() => {
    localStorage.setItem('loanViewMode', viewMode)
  }, [viewMode])

  // Computed values
  const portfolioSummary = calculatePortfolioSummary()
  const availableCollateralTypes = getAvailableCollateralTypes()

  // Apply filtering and sorting
  const filteredEntities = useMemo(() => {
    const baseEntities = sortEntitiesByUrgency(mockEntities)
    return filterAndSortEntities(
      baseEntities,
      { collateralTypes: collateralFilter, entityId: entityFilter },
      sortBy
    )
  }, [collateralFilter, entityFilter, sortBy])

  // Get all loans flattened for table view
  const allFilteredLoans = useMemo(() => {
    return filteredEntities.flatMap(entity => entity.loans)
  }, [filteredEntities])

  // Entity options for filter dropdown
  const entityOptions = mockEntities.map((e) => ({ id: e.id, name: e.name }))

  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-7xl mx-auto px-200">
        {/* Page header */}
        <header className="py-150">
          <h1 className="text-heading-h5 text-fg-primary">Loan Dashboard</h1>
          <p className="text-body-sm text-fg-muted mt-25">
            Monitor your loans across all entities
          </p>
        </header>

        <main className="pb-200 space-y-150">
          {/* Portfolio summary */}
          <PortfolioSummary data={portfolioSummary} loans={mockLoans} />

          {/* Filter & sort bar */}
          <FilterSortBar
            collateralFilter={collateralFilter}
            entityFilter={entityFilter}
            sortBy={sortBy}
            viewMode={viewMode}
            onCollateralFilterChange={setCollateralFilter}
            onEntityFilterChange={setEntityFilter}
            onSortChange={setSortBy}
            onViewModeChange={setViewMode}
            entities={entityOptions}
            availableCollateralTypes={availableCollateralTypes}
            loans={mockLoans}
          />

          {/* Entity sections OR unified table */}
          <div className="space-y-150" suppressHydrationWarning>
            {viewMode === 'cards' ? (
              // CARDS VIEW - Render entity sections
              filteredEntities.length > 0 ? (
                filteredEntities.map((entity) => (
                  <EntitySection key={entity.id} entity={entity} />
                ))
              ) : (
                <div className="bg-surface rounded-lg border border-border-subtle p-200 text-center">
                  <p className="text-body-sm text-fg-muted">
                    No loans match the current filters
                  </p>
                </div>
              )
            ) : (
              // TABLE VIEW - Render unified table
              allFilteredLoans.length > 0 ? (
                <LoansTable loans={allFilteredLoans} />
              ) : (
                <div className="bg-surface rounded-lg border border-border-subtle p-200 text-center">
                  <p className="text-body-sm text-fg-muted">
                    No loans match the current filters
                  </p>
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
