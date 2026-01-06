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
  maturityDate: Date | null // null for revolving loans with no maturity
  recallPeriodDays: number // Number of days notice required to recall the loan (30 or 60)
  loanContractAddress: string // Ethereum smart contract address for the loan
  borrowerWalletAddress: string // Ethereum wallet address that draws down the principal (entity-specific)
  collateralWalletAddress: string // Blockchain-specific wallet address for collateral deposits
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
  type: 'interest' | 'principal' | 'fee' | 'drawdown'
  status: 'completed' | 'pending' | 'failed'
}

