'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { LoanCard } from './loan-card'
import { LegalEntity, Loan, LoanStatus } from '../types'

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const statusPriority: Record<LoanStatus, number> = {
  'margin-call': 0,
  overdue: 1,
  healthy: 2,
}

function sortLoansByUrgency(loans: Loan[]): Loan[] {
  return [...loans].sort((a, b) => {
    const priorityDiff = statusPriority[a.status] - statusPriority[b.status]
    if (priorityDiff !== 0) return priorityDiff
    return a.interestDueDate.getTime() - b.interestDueDate.getTime()
  })
}

// =============================================================================
// ENTITY SECTION COMPONENT
// =============================================================================

interface EntitySectionProps {
  entity: LegalEntity
  className?: string
}

export function EntitySection({ entity, className }: EntitySectionProps) {
  // Loans are already sorted by the page-level filterAndSortEntities function
  // Do not re-sort here to preserve the user's selected sort order

  return (
    <section className={cn('space-y-100', className)}>
      {/* Entity header */}
      <div className="flex items-center gap-75">
        <h2 className="text-heading-h6 text-fg-primary">{entity.name}</h2>
        <span className="text-label-xs text-fg-muted">
          ({entity.loans.length} loan{entity.loans.length !== 1 ? 's' : ''})
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-100">
        {entity.loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>
    </section>
  )
}

// =============================================================================
// ENTITY SORTING HELPER
// =============================================================================

export function sortEntitiesByUrgency(entities: LegalEntity[]): LegalEntity[] {
  return [...entities].sort((a, b) => {
    const aMinPriority = Math.min(
      ...a.loans.map((l) => statusPriority[l.status])
    )
    const bMinPriority = Math.min(
      ...b.loans.map((l) => statusPriority[l.status])
    )
    return aMinPriority - bMinPriority
  })
}
