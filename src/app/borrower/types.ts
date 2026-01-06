// =============================================================================
// BORROWER LOAN DASHBOARD TYPES
// =============================================================================

export type LoanStatus = 'healthy' | 'margin-call' | 'overdue'

export type CollateralType = 'btc' | 'eth' | 'sol' | 'wbtc' | 'weth'

export interface Loan {
  id: string
  entityId: string
  entityName: string
  collateralType: CollateralType
  collateralAmount: number
  collateralValueUsd: number
  principalUsd: number
  currentLtv: number
  marginCallLtv: number
  liquidationLtv: number
  marginCallPrice: number // Collateral price that triggers margin call
  liquidationPrice: number // Collateral price that triggers liquidation
  currentCollateralPrice: number
  interestDueDate: Date
  interestAmountUsd: number
  interestOverdueDays?: number
  interestRate: number // Annual rate as decimal (e.g., 0.08 = 8%)
  status: LoanStatus
  marginCallDeadline?: Date // If margin call active
  marginCallRequiredUsd?: number
  startDate: Date
  maturityDate: Date
  collateralWalletAddress: string
}

export interface LegalEntity {
  id: string
  name: string
  loans: Loan[]
}

export interface PaymentHistoryItem {
  id: string
  loanId: string
  date: Date
  amountUsd: number
  type: 'interest' | 'principal' | 'fee'
  status: 'completed' | 'pending' | 'failed'
}

