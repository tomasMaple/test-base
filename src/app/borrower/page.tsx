'use client'

import {
  EntitySection,
  sortEntitiesByUrgency,
  PortfolioSummary,
} from './components'
import {
  mockEntities,
  mockLoans,
  calculatePortfolioSummary,
} from './mock-data'

// =============================================================================
// BORROWER LOAN DASHBOARD
// =============================================================================

export default function BorrowerDashboardPage() {
  const sortedEntities = sortEntitiesByUrgency(mockEntities)
  const portfolioSummary = calculatePortfolioSummary()

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

        <main className="pb-200 space-y-200">
          {/* Portfolio summary */}
          <PortfolioSummary data={portfolioSummary} loans={mockLoans} />

          {/* Entity sections */}
          <div className="space-y-200">
            {sortedEntities.map((entity) => (
              <EntitySection key={entity.id} entity={entity} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
