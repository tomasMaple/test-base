// =============================================================================
// BORROWER LOAN DASHBOARD TYPES
// =============================================================================

export type LoanStatus = 'healthy' | 'margin-call' | 'overdue'

export type CollateralType = 'btc' | 'eth' | 'sol' | 'wbtc' | 'weth'

export type SortOption = 'urgency' | 'ltv-high' | 'ltv-margin' | 'interest-date'

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
  type: 'interest' | 'principal' | 'fee' | 'drawdown' | 'refinance'
  status: 'completed' | 'pending' | 'failed'
  transactionHash?: string
  refinanceDetails?: RefinanceDetails
}

export interface RefinanceDetails {
  oldInterestRate: number
  newInterestRate: number
  oldMarginCallLtv: number
  newMarginCallLtv: number
  oldLiquidationLtv: number
  newLiquidationLtv: number
  oldPrincipalUsd: number
  newPrincipalUsd: number
  reason?: string
}

export type DocumentType = 'mla' | 'amendment' | 'notice' | 'other'

export interface LoanDocument {
  id: string
  loanId: string
  name: string
  type: DocumentType
  date: Date
  fileSize: string
  fileType: string
  downloadUrl: string
  relatedTransactionId?: string
}

export type BlockchainNetwork = 'ethereum' | 'bitcoin' | 'solana'

export const COLLATERAL_TO_NETWORK: Record<CollateralType, BlockchainNetwork> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  sol: 'solana',
  wbtc: 'ethereum',
  weth: 'ethereum',
}

