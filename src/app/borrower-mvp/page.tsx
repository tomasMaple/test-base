'use client'

import { useState, useMemo } from 'react'
import {
  sortEntitiesByUrgency,
  PortfolioSummary,
  FilterSortBar,
  LoansTable,
  ClosedLoansTable,
} from './components'
import {
  mockEntities,
  mockLoans,
  calculatePortfolioSummary,
  filterAndSortEntities,
  getAvailableCollateralTypes,
  getPastLoans,
  getCurrentLoans,
} from './mock-data'
import type { CollateralType, SortOption } from './types'

// =============================================================================
// BORROWER LOAN DASHBOARD (MVP)
// =============================================================================

export default function BorrowerDashboardPage() {
  // Filter & sort state
  const [collateralFilter, setCollateralFilter] = useState<CollateralType[]>([])
  const [entityFilter, setEntityFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('urgency')

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

  // Get active loans (for export CSV)
  const activeLoans = useMemo(() => getCurrentLoans(), [])

  // Get closed/past loans
  const closedLoans = useMemo(() => getPastLoans(), [])

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
            onCollateralFilterChange={setCollateralFilter}
            onEntityFilterChange={setEntityFilter}
            onSortChange={setSortBy}
            entities={entityOptions}
            availableCollateralTypes={availableCollateralTypes}
            loans={activeLoans}
          />

          {/* Table view only */}
          <div className="space-y-150">
            {allFilteredLoans.length > 0 ? (
              <LoansTable loans={allFilteredLoans} />
            ) : (
              <div className="bg-surface rounded-lg border border-border-subtle p-200 text-center">
                <p className="text-body-sm text-fg-muted">
                  No loans match the current filters
                </p>
              </div>
            )}
          </div>

          {/* Closed Loans Section */}
          {closedLoans.length > 0 && (
            <div className="space-y-100 mt-200">
              <h2 className="text-heading-h6 text-fg-muted">Closed Loans</h2>
              <ClosedLoansTable loans={closedLoans} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
