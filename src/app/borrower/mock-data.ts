import { Loan, LegalEntity, PaymentHistoryItem } from './types'

// =============================================================================
// MOCK LOAN DATA - Realistic institutional loan sizes ($5M+)
// =============================================================================

// Current date reference for relative dates
const now = new Date()
const daysFromNow = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

// Current market prices (mock)
export const CURRENT_PRICES = {
  btc: 97500,
  eth: 3450,
  sol: 185,
  wbtc: 97400,
  weth: 3445,
}

// =============================================================================
// LOANS - Galaxy Digital across multiple legal entities
// =============================================================================

export const mockLoans: Loan[] = [
  // Galaxy US - Loan 1 (Healthy, large BTC loan)
  {
    id: 'LOAN-7a3B4f2E',
    entityId: 'entity-1',
    entityName: 'Galaxy US',
    collateralType: 'btc',
    collateralAmount: 114.29,
    collateralValueUsd: 114.29 * CURRENT_PRICES.btc, // ~$11.14M
    principalUsd: 5000000,
    currentLtv: 45,
    marginCallLtv: 70,
    liquidationLtv: 85,
    marginCallPrice: 62700,
    liquidationPrice: 51500,
    currentCollateralPrice: CURRENT_PRICES.btc,
    interestDueDate: daysFromNow(9),
    interestAmountUsd: 41667,
    interestRate: 0.10,
    status: 'healthy',
    startDate: daysAgo(45),
    maturityDate: daysFromNow(315),
    collateralWalletAddress: '0x7a3B...4f2E',
  },
  // Galaxy US - Loan 2 (Healthy, ETH loan)
  {
    id: 'LOAN-9c1D8e3A',
    entityId: 'entity-1',
    entityName: 'Galaxy US',
    collateralType: 'eth',
    collateralAmount: 4347.83,
    collateralValueUsd: 4347.83 * CURRENT_PRICES.eth, // ~$15M
    principalUsd: 8500000,
    currentLtv: 57,
    marginCallLtv: 70,
    liquidationLtv: 85,
    marginCallPrice: 2737,
    liquidationPrice: 2300,
    currentCollateralPrice: CURRENT_PRICES.eth,
    interestDueDate: daysFromNow(15),
    interestAmountUsd: 70833,
    interestRate: 0.10,
    status: 'healthy',
    startDate: daysAgo(30),
    maturityDate: daysFromNow(330),
    collateralWalletAddress: '0x9c1D...8e3A',
  },
  // Galaxy Cayman - Loan 3 (MARGIN CALL ACTIVE)
  {
    id: 'LOAN-2b5F9d1C',
    entityId: 'entity-2',
    entityName: 'Galaxy Cayman',
    collateralType: 'sol',
    collateralAmount: 189189.19,
    collateralValueUsd: 189189.19 * CURRENT_PRICES.sol, // ~$35M
    principalUsd: 25000000,
    currentLtv: 72,
    marginCallLtv: 70,
    liquidationLtv: 85,
    marginCallPrice: 164,
    liquidationPrice: 138,
    currentCollateralPrice: CURRENT_PRICES.sol,
    interestDueDate: daysFromNow(3),
    interestAmountUsd: 208333,
    interestRate: 0.10,
    status: 'margin-call',
    marginCallDeadline: daysFromNow(2),
    marginCallRequiredUsd: 2500000,
    startDate: daysAgo(60),
    maturityDate: daysFromNow(300),
    collateralWalletAddress: '0x2b5F...9d1C',
  },
  // Galaxy Europe - Loan 4 (Approaching trigger)
  {
    id: 'LOAN-4d7A2c8B',
    entityId: 'entity-3',
    entityName: 'Galaxy Europe',
    collateralType: 'btc',
    collateralAmount: 205.13,
    collateralValueUsd: 205.13 * CURRENT_PRICES.btc, // ~$20M
    principalUsd: 12000000,
    currentLtv: 60,
    marginCallLtv: 70,
    liquidationLtv: 85,
    marginCallPrice: 83500,
    liquidationPrice: 68800,
    currentCollateralPrice: CURRENT_PRICES.btc,
    interestDueDate: daysFromNow(21),
    interestAmountUsd: 100000,
    interestRate: 0.10,
    status: 'healthy',
    startDate: daysAgo(20),
    maturityDate: daysFromNow(340),
    collateralWalletAddress: '0x4d7A...2c8B',
  },
  // Galaxy Europe - Loan 5 (Healthy)
  {
    id: 'LOAN-6e9C3f5D',
    entityId: 'entity-3',
    entityName: 'Galaxy Europe',
    collateralType: 'eth',
    collateralAmount: 8695.65,
    collateralValueUsd: 8695.65 * CURRENT_PRICES.eth, // ~$30M
    principalUsd: 15000000,
    currentLtv: 50,
    marginCallLtv: 70,
    liquidationLtv: 85,
    marginCallPrice: 2415,
    liquidationPrice: 2029,
    currentCollateralPrice: CURRENT_PRICES.eth,
    interestDueDate: daysFromNow(12),
    interestAmountUsd: 125000,
    interestRate: 0.10,
    status: 'healthy',
    startDate: daysAgo(25),
    maturityDate: daysFromNow(335),
    collateralWalletAddress: '0x6e9C...3f5D',
  },
]

// =============================================================================
// LEGAL ENTITIES (grouped loans) - Galaxy Digital entities
// =============================================================================

export const mockEntities: LegalEntity[] = [
  {
    id: 'entity-1',
    name: 'Galaxy US',
    loans: mockLoans.filter((l) => l.entityId === 'entity-1'),
  },
  {
    id: 'entity-2',
    name: 'Galaxy Cayman',
    loans: mockLoans.filter((l) => l.entityId === 'entity-2'),
  },
  {
    id: 'entity-3',
    name: 'Galaxy Europe',
    loans: mockLoans.filter((l) => l.entityId === 'entity-3'),
  },
]

// =============================================================================
// PAYMENT HISTORY (for detail page)
// =============================================================================

export const mockPaymentHistory: PaymentHistoryItem[] = [
  {
    id: 'pay-1',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(30),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
  },
  {
    id: 'pay-2',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(60),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
  },
  {
    id: 'pay-3',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(15),
    amountUsd: 70833,
    type: 'interest',
    status: 'completed',
  },
  {
    id: 'pay-4',
    loanId: 'LOAN-2b5F9d1C',
    date: daysAgo(25),
    amountUsd: 208333,
    type: 'interest',
    status: 'completed',
  },
  {
    id: 'pay-5',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(10),
    amountUsd: 100000,
    type: 'interest',
    status: 'completed',
  },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getLoanById(id: string): Loan | undefined {
  return mockLoans.find((loan) => loan.id === id)
}

export function getPaymentHistoryForLoan(loanId: string): PaymentHistoryItem[] {
  return mockPaymentHistory.filter((p) => p.loanId === loanId)
}

export function getEntitiesSortedByUrgency(): LegalEntity[] {
  return [...mockEntities].sort((a, b) => {
    const aHasUrgent = a.loans.some(
      (l) => l.status === 'margin-call' || l.status === 'overdue'
    )
    const bHasUrgent = b.loans.some(
      (l) => l.status === 'margin-call' || l.status === 'overdue'
    )

    if (aHasUrgent && !bHasUrgent) return -1
    if (!aHasUrgent && bHasUrgent) return 1
    return 0
  })
}

export function sortLoansByUrgency(loans: Loan[]): Loan[] {
  const statusPriority: Record<string, number> = {
    'margin-call': 0,
    overdue: 1,
    healthy: 2,
  }

  return [...loans].sort((a, b) => {
    const priorityDiff = statusPriority[a.status] - statusPriority[b.status]
    if (priorityDiff !== 0) return priorityDiff
    return a.interestDueDate.getTime() - b.interestDueDate.getTime()
  })
}

// Portfolio summary calculations
export function calculatePortfolioSummary() {
  const totalPrincipal = mockLoans.reduce((sum, l) => sum + l.principalUsd, 0)
  const activeLoans = mockLoans.length
  const activeMarginCalls = mockLoans.filter((l) => l.status === 'margin-call').length
  const overdueInterest = mockLoans.filter((l) => l.status === 'overdue').length

  // Next payment (soonest)
  const nextPaymentLoan = mockLoans
    .filter((l) => l.interestDueDate > now)
    .sort((a, b) => a.interestDueDate.getTime() - b.interestDueDate.getTime())[0]

  // Nearest margin call (loan closest to margin call threshold)
  const nearestMarginCall = mockLoans
    .filter((l) => l.status !== 'margin-call') // exclude already margin called
    .sort((a, b) => {
      const aHeadroom = a.marginCallLtv - a.currentLtv
      const bHeadroom = b.marginCallLtv - b.currentLtv
      return aHeadroom - bHeadroom
    })[0]

  return {
    totalPrincipal,
    activeLoans,
    activeMarginCalls,
    overdueInterest,
    nextPayment: nextPaymentLoan
      ? {
          amount: nextPaymentLoan.interestAmountUsd,
          date: nextPaymentLoan.interestDueDate,
          loanId: nextPaymentLoan.id,
        }
      : null,
    nearestMarginCall: nearestMarginCall
      ? {
          collateralType: nearestMarginCall.collateralType,
          marginCallPrice: nearestMarginCall.marginCallPrice,
          loanId: nearestMarginCall.id,
        }
      : null,
  }
}
