import { Loan, LegalEntity, PaymentHistoryItem, CollateralType, SortOption, LoanDocument, BlockchainNetwork, COLLATERAL_TO_NETWORK } from './types'

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
  // Galaxy US - Loan 1 (Healthy, large BTC loan, 9 months history)
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
    marginCallPrice: 62498, // 5000000 / (114.29 * 0.70)
    liquidationPrice: 51469, // 5000000 / (114.29 * 0.85)
    currentCollateralPrice: CURRENT_PRICES.btc,
    interestDueDate: daysFromNow(9),
    interestAmountUsd: 41667,
    interestRate: 0.10,
    status: 'healthy',
    startDate: daysAgo(270), // 9 months ago
    maturityDate: null, // Revolving loan with no maturity
    recallPeriodDays: 30, // Galaxy US recall period
    loanContractAddress: '0x7a3B4f2E8c1D9e0F3b2A5c6D7e8F9a0B1c2D3e4F',
    borrowerWalletAddress: '0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T', // Galaxy US drawdown wallet
    collateralWalletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  },
  // Galaxy US - Loan 2 (Healthy, ETH loan, 8 months history)
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
    marginCallPrice: 2793, // 8500000 / (4347.83 * 0.70)
    liquidationPrice: 2300, // 8500000 / (4347.83 * 0.85)
    currentCollateralPrice: CURRENT_PRICES.eth,
    interestDueDate: daysFromNow(15),
    interestAmountUsd: 70833,
    interestRate: 0.10,
    status: 'healthy',
    startDate: daysAgo(240), // 8 months ago
    maturityDate: null, // Revolving loan with no maturity
    recallPeriodDays: 30, // Galaxy US recall period
    loanContractAddress: '0x9c1D8e3A7b4F5c2D1e0A9b8C7d6E5f4A3b2C1d8E',
    borrowerWalletAddress: '0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T', // Galaxy US drawdown wallet
    collateralWalletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4',
  },
  // Galaxy Cayman - Loan 3 (MARGIN CALL ACTIVE, 7 months history)
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
    marginCallPrice: 189, // 25000000 / (189189.19 * 0.70)
    liquidationPrice: 155, // 25000000 / (189189.19 * 0.85)
    currentCollateralPrice: CURRENT_PRICES.sol,
    interestDueDate: daysFromNow(3),
    interestAmountUsd: 208333,
    interestRate: 0.10,
    status: 'margin-call',
    marginCallDeadline: daysFromNow(2),
    marginCallRequiredUsd: 2500000,
    startDate: daysAgo(210), // 7 months ago
    maturityDate: null, // Revolving loan with no maturity
    recallPeriodDays: 60, // Galaxy Cayman recall period
    loanContractAddress: '0x2b5F9d1C3e4A7f8B6c5D4e3F2a1B0c9D8e7F6a9D',
    borrowerWalletAddress: '0x9A8b7C6d5E4f3G2h1I0j9K8l7M6n5O4p3Q2r1S0t', // Galaxy Cayman drawdown wallet
    collateralWalletAddress: 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK',
  },
  // Galaxy Europe - Loan 4 (Approaching trigger, 1 year of history)
  {
    id: 'LOAN-4d7A2c8B',
    entityId: 'entity-3',
    entityName: 'Galaxy Europe',
    collateralType: 'btc',
    collateralAmount: 205.13,
    collateralValueUsd: 205.13 * CURRENT_PRICES.btc, // ~$20M
    principalUsd: 12000000, // Current principal after 2 refinances: $5M → $8M → $12M
    currentLtv: 60, // Healthy LTV
    marginCallLtv: 70,
    liquidationLtv: 85,
    marginCallPrice: 83571, // 12000000 / (205.13 * 0.70)
    liquidationPrice: 68823, // 12000000 / (205.13 * 0.85)
    currentCollateralPrice: CURRENT_PRICES.btc,
    interestDueDate: daysFromNow(21),
    interestAmountUsd: 100000,
    interestRate: 0.10,
    status: 'healthy',
    startDate: daysAgo(365), // Loan started 1 year ago
    maturityDate: null, // Revolving loan with no maturity
    recallPeriodDays: 30, // Galaxy Europe recall period
    loanContractAddress: '0x4d7A2c8B5e1F3a6C9b0D8e7F4a5B3c2D1e0F9a2C',
    borrowerWalletAddress: '0x5F4e3D2c1B0a9F8e7D6c5B4a3F2e1D0c9B8a7F6e', // Galaxy Europe drawdown wallet
    collateralWalletAddress: 'bc1qa5wkgaew2dkv56kfvj49j0av5nml45x9ek9hz6',
  },
  // Galaxy Europe - Loan 5 (Healthy, 6 months history)
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
    marginCallPrice: 2464, // 15000000 / (8695.65 * 0.70)
    liquidationPrice: 2029, // 15000000 / (8695.65 * 0.85)
    currentCollateralPrice: CURRENT_PRICES.eth,
    interestDueDate: daysFromNow(12),
    interestAmountUsd: 125000,
    interestRate: 0.10,
    status: 'healthy',
    startDate: daysAgo(180), // 6 months ago
    maturityDate: null, // Revolving loan with no maturity
    recallPeriodDays: 30, // Galaxy Europe recall period
    loanContractAddress: '0x6e9C3f5D8a2B4c1E7f0A9b3C6d5E4f2A1b0C9d3F',
    borrowerWalletAddress: '0x5F4e3D2c1B0a9F8e7D6c5B4a3F2e1D0c9B8a7F6e', // Galaxy Europe drawdown wallet
    collateralWalletAddress: '0x8e23Ee67d1332aD560396262C48fF9B6B144DFA5',
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
  // LOAN-7a3B4f2E - Galaxy US Loan 1 (Started 270 days ago - 9 months)
  {
    id: 'draw-1',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(270), // Start date of loan - MUST BE FIRST
    amountUsd: 5000000,
    type: 'drawdown',
    status: 'completed',
    transactionHash: '0xa1b2...abcd',
  },
  {
    id: 'pay-1-1',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(240),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xb2c3...bcde',
  },
  {
    id: 'pay-1-2',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(210),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xc3d4...cdef',
  },
  {
    id: 'pay-1-3',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(180),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xd4e5...def0',
  },
  {
    id: 'pay-1-4',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(150),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xe5f6...ef01',
  },
  {
    id: 'pay-1-5',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(120),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xf678...0123',
  },
  {
    id: 'pay-1-6',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(90),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x0789...0234',
  },
  {
    id: 'pay-1-7',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(60),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x8901...2345',
  },
  {
    id: 'pay-1-8',
    loanId: 'LOAN-7a3B4f2E',
    date: daysAgo(30),
    amountUsd: 41667,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x9012...4567',
  },
  // LOAN-9c1D8e3A - Galaxy US Loan 2 (Started 240 days ago - 8 months)
  {
    id: 'draw-2',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(240), // Start date of loan - MUST BE FIRST
    amountUsd: 8500000,
    type: 'drawdown',
    status: 'completed',
    transactionHash: '0x1a2b3c4d5e6f78901234567890abcdef1234567890abcdef1234567890abcdef',
  },
  {
    id: 'pay-2-1',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(210),
    amountUsd: 70833,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x2b3c4d5e6f78901234567890abcdef1234567890abcdef1234567890abcdef12',
  },
  {
    id: 'pay-2-2',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(180),
    amountUsd: 70833,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x3c4d5e6f78901234567890abcdef1234567890abcdef1234567890abcdef1234',
  },
  {
    id: 'pay-2-3',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(150),
    amountUsd: 70833,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x4d5e6f78901234567890abcdef1234567890abcdef1234567890abcdef123456',
  },
  {
    id: 'pay-2-4',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(120),
    amountUsd: 70833,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x5e6f78901234567890abcdef1234567890abcdef1234567890abcdef12345678',
  },
  {
    id: 'pay-2-5',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(90),
    amountUsd: 70833,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x6f78901234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  },
  {
    id: 'pay-2-6',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(60),
    amountUsd: 70833,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x78901234567890abcdef1234567890abcdef1234567890abcdef12345678901a',
  },
  {
    id: 'pay-2-7',
    loanId: 'LOAN-9c1D8e3A',
    date: daysAgo(30),
    amountUsd: 70833,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x8901234567890abcdef1234567890abcdef1234567890abcdef12345678901ab',
  },
  // LOAN-2b5F9d1C - Galaxy Cayman Loan 3 (Started 210 days ago - 7 months)
  {
    id: 'draw-3',
    loanId: 'LOAN-2b5F9d1C',
    date: daysAgo(210), // Start date of loan - MUST BE FIRST
    amountUsd: 25000000,
    type: 'drawdown',
    status: 'completed',
    transactionHash: '0x5abc...def1',
  },
  {
    id: 'pay-3-1',
    loanId: 'LOAN-2b5F9d1C',
    date: daysAgo(180),
    amountUsd: 208333,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x6bcd...ef12',
  },
  {
    id: 'pay-3-2',
    loanId: 'LOAN-2b5F9d1C',
    date: daysAgo(150),
    amountUsd: 208333,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x7cde...f123',
  },
  {
    id: 'pay-3-3',
    loanId: 'LOAN-2b5F9d1C',
    date: daysAgo(120),
    amountUsd: 208333,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x8def...1234',
  },
  {
    id: 'pay-3-4',
    loanId: 'LOAN-2b5F9d1C',
    date: daysAgo(90),
    amountUsd: 208333,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x9ef0...2345',
  },
  {
    id: 'pay-3-5',
    loanId: 'LOAN-2b5F9d1C',
    date: daysAgo(60),
    amountUsd: 208333,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x0f01...3456',
  },
  {
    id: 'pay-3-6',
    loanId: 'LOAN-2b5F9d1C',
    date: daysAgo(30),
    amountUsd: 208333,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x1012...4567',
  },
  // LOAN-4d7A2c8B - Galaxy Europe Loan 4 (Started 365 days ago - full year history)
  // Structure: $5M initial → Refi 1 (+$2M upsize, rate/LTV improvement) = $7M → Refi 2 (+$5M upsize) = $12M
  {
    id: 'draw-4',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(365), // Start date of loan - MUST BE FIRST
    amountUsd: 5000000,
    type: 'drawdown',
    status: 'completed',
    transactionHash: '0x1a2b...3c4d',
  },
  {
    id: 'pay-4-1',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(335),
    amountUsd: 50000, // Interest on $5M at 12% APR
    type: 'interest',
    status: 'completed',
    transactionHash: '0x2b3c...4d5e',
  },
  {
    id: 'pay-4-2',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(305),
    amountUsd: 50000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x3c4d...5e6f',
  },
  {
    id: 'pay-4-3',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(275),
    amountUsd: 50000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x4d5e...6f7a',
  },
  {
    id: 'pay-4-4',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(245),
    amountUsd: 50000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x5e6f...7a8b',
  },
  {
    id: 'pay-4-5',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(215),
    amountUsd: 50000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x6f7a...8b9c',
  },
  {
    id: 'pay-4-6',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(185),
    amountUsd: 50000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0x7a8b...9c0d',
  },
  // Refinance 1 - $2M upsize only (no rate or LTV changes)
  {
    id: 'refi-4-1',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(185),
    amountUsd: 2000000,
    type: 'refinance',
    status: 'completed',
    transactionHash: '0x8b9c...0d1e',
    refinanceDetails: {
      oldInterestRate: 0.12,
      newInterestRate: 0.12,
      oldMarginCallLtv: 65,
      newMarginCallLtv: 65,
      oldLiquidationLtv: 80,
      newLiquidationLtv: 80,
      oldPrincipalUsd: 5000000,
      newPrincipalUsd: 7000000,
      reason: 'Additional capital drawdown',
    },
  },
  {
    id: 'pay-4-7',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(155),
    amountUsd: 70000, // Interest on $7M at 12% APR
    type: 'interest',
    status: 'completed',
    transactionHash: '0x9c0d...1e2f',
  },
  {
    id: 'pay-4-8',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(125),
    amountUsd: 70000, // Interest on $7M at 12% APR
    type: 'interest',
    status: 'completed',
    transactionHash: '0xa0d1...2f3a',
  },
  {
    id: 'pay-4-9',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(95),
    amountUsd: 70000, // Interest on $7M at 12% APR
    type: 'interest',
    status: 'completed',
    transactionHash: '0xb1e2...3a4b',
  },
  // Refinance 2 - $5M upsize from $7M to $12M
  {
    id: 'refi-4-2',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(90),
    amountUsd: 5000000,
    type: 'refinance',
    status: 'completed',
    transactionHash: '0xc2f3...4b5c',
    refinanceDetails: {
      oldInterestRate: 0.12,
      newInterestRate: 0.10,
      oldMarginCallLtv: 65,
      newMarginCallLtv: 70,
      oldLiquidationLtv: 80,
      newLiquidationLtv: 85,
      oldPrincipalUsd: 7000000,
      newPrincipalUsd: 12000000,
      reason: 'Rate reduction and improved terms for expansion',
    },
  },
  {
    id: 'pay-4-10',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(65),
    amountUsd: 100000, // Interest on $12M at 10% APR
    type: 'interest',
    status: 'completed',
    transactionHash: '0xd3a4...5c6d',
  },
  {
    id: 'pay-4-11',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(35),
    amountUsd: 100000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xe4b5...6d7e',
  },
  {
    id: 'pay-4-12',
    loanId: 'LOAN-4d7A2c8B',
    date: daysAgo(5),
    amountUsd: 100000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xf5c6...7e8f',
  },
  // LOAN-6e9C3f5D - Galaxy Europe Loan 5 (Started 180 days ago - 6 months)
  {
    id: 'draw-5',
    loanId: 'LOAN-6e9C3f5D',
    date: daysAgo(180), // Start date of loan - MUST BE FIRST
    amountUsd: 15000000,
    type: 'drawdown',
    status: 'completed',
    transactionHash: '0x9a0b1c2d3e4f567890abcdef1234567890abcdef1234567890abcdef12345678',
  },
  {
    id: 'pay-5-1',
    loanId: 'LOAN-6e9C3f5D',
    date: daysAgo(150),
    amountUsd: 125000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xa0b1c2d3e4f5678901abcdef1234567890abcdef1234567890abcdef12345678',
  },
  {
    id: 'pay-5-2',
    loanId: 'LOAN-6e9C3f5D',
    date: daysAgo(120),
    amountUsd: 125000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xb1c2d3e4f5678901abcdef1234567890abcdef1234567890abcdef123456789a',
  },
  {
    id: 'pay-5-3',
    loanId: 'LOAN-6e9C3f5D',
    date: daysAgo(90),
    amountUsd: 125000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xc2d3e4f5678901abcdef1234567890abcdef1234567890abcdef123456789ab0',
  },
  {
    id: 'pay-5-4',
    loanId: 'LOAN-6e9C3f5D',
    date: daysAgo(60),
    amountUsd: 125000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xd3e4f5678901abcdef1234567890abcdef1234567890abcdef123456789ab01c',
  },
  {
    id: 'pay-5-5',
    loanId: 'LOAN-6e9C3f5D',
    date: daysAgo(30),
    amountUsd: 125000,
    type: 'interest',
    status: 'completed',
    transactionHash: '0xe4f5678901abcdef1234567890abcdef1234567890abcdef123456789ab01c2d',
  },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getLoanById(id: string): Loan | undefined {
  return mockLoans.find((loan) => loan.id === id)
}

export function getPaymentHistoryForLoan(loanId: string): PaymentHistoryItem[] {
  return mockPaymentHistory
    .filter((p) => p.loanId === loanId)
    .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by date descending (most recent first)
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

// =============================================================================
// FILTERING & SORTING UTILITIES
// =============================================================================

export interface FilterCriteria {
  collateralTypes: CollateralType[]
  entityId: string | null
}

export function filterLoans(loans: Loan[], filters: FilterCriteria): Loan[] {
  return loans.filter((loan) => {
    // Filter by collateral type (if any selected)
    if (filters.collateralTypes.length > 0) {
      if (!filters.collateralTypes.includes(loan.collateralType)) {
        return false
      }
    }

    // Filter by entity (if selected)
    if (filters.entityId) {
      if (loan.entityId !== filters.entityId) {
        return false
      }
    }

    return true
  })
}

export function sortLoansBy(loans: Loan[], sortOption: SortOption): Loan[] {
  const sorted = [...loans]

  switch (sortOption) {
    case 'urgency':
      // Status priority: margin-call > overdue > healthy, then by interest due date
      return sortLoansByUrgency(sorted)

    case 'ltv-high':
      // Highest current LTV first
      return sorted.sort((a, b) => b.currentLtv - a.currentLtv)

    case 'ltv-margin':
      // Closest to margin call first (smallest headroom)
      return sorted.sort((a, b) => {
        const aHeadroom = a.marginCallLtv - a.currentLtv
        const bHeadroom = b.marginCallLtv - b.currentLtv
        return aHeadroom - bHeadroom
      })

    case 'interest-date':
      // Soonest interest due date first
      return sorted.sort(
        (a, b) => a.interestDueDate.getTime() - b.interestDueDate.getTime()
      )

    default:
      return sorted
  }
}

export function filterAndSortEntities(
  entities: LegalEntity[],
  filters: FilterCriteria,
  sortOption: SortOption
): LegalEntity[] {
  return entities
    .map((entity) => {
      // Filter loans within entity
      const filteredLoans = filterLoans(entity.loans, filters)
      // Sort the filtered loans
      const sortedLoans = sortLoansBy(filteredLoans, sortOption)

      return {
        ...entity,
        loans: sortedLoans,
      }
    })
    .filter((entity) => entity.loans.length > 0) // Remove empty entities
}

// Get unique collateral types from loans (for filter options)
export function getAvailableCollateralTypes(): CollateralType[] {
  const types = new Set(mockLoans.map((loan) => loan.collateralType))
  return Array.from(types)
}

// =============================================================================
// LOAN DOCUMENTS - Master Loan Agreements and Amendments
// =============================================================================

export const mockLoanDocuments: LoanDocument[] = [
  // LOAN-7a3B4f2E (Galaxy US - BTC) - MLA only
  {
    id: 'doc-1-1',
    loanId: 'LOAN-7a3B4f2E',
    name: 'Master Loan Agreement',
    type: 'mla',
    date: daysAgo(270),
    fileSize: '2.1 MB',
    fileType: 'PDF',
    downloadUrl: '#',
  },

  // LOAN-9c1D8e3A (Galaxy US - ETH) - MLA only
  {
    id: 'doc-2-1',
    loanId: 'LOAN-9c1D8e3A',
    name: 'Master Loan Agreement',
    type: 'mla',
    date: daysAgo(240),
    fileSize: '2.3 MB',
    fileType: 'PDF',
    downloadUrl: '#',
  },

  // LOAN-2b5F9d1C (Galaxy Cayman - SOL) - MLA only
  {
    id: 'doc-3-1',
    loanId: 'LOAN-2b5F9d1C',
    name: 'Master Loan Agreement',
    type: 'mla',
    date: daysAgo(210),
    fileSize: '2.4 MB',
    fileType: 'PDF',
    downloadUrl: '#',
  },

  // LOAN-4d7A2c8B (Galaxy Europe - BTC) - MLA + 2 Amendments (has refis)
  {
    id: 'doc-4-1',
    loanId: 'LOAN-4d7A2c8B',
    name: 'Master Loan Agreement',
    type: 'mla',
    date: daysAgo(365),
    fileSize: '2.4 MB',
    fileType: 'PDF',
    downloadUrl: '#',
  },
  {
    id: 'doc-4-2',
    loanId: 'LOAN-4d7A2c8B',
    name: 'Amendment No. 1 - Rate & LTV Adjustment',
    type: 'amendment',
    date: daysAgo(185), // Same date as refi 1
    fileSize: '856 KB',
    fileType: 'PDF',
    downloadUrl: '#',
    relatedTransactionId: 'refi-4-1',
  },
  {
    id: 'doc-4-3',
    loanId: 'LOAN-4d7A2c8B',
    name: 'Amendment No. 2 - Additional Drawdown',
    type: 'amendment',
    date: daysAgo(90), // Same date as refi 2
    fileSize: '743 KB',
    fileType: 'PDF',
    downloadUrl: '#',
    relatedTransactionId: 'refi-4-2',
  },

  // LOAN-8e2A1f9D (Galaxy Asia - WBTC) - MLA only
  {
    id: 'doc-5-1',
    loanId: 'LOAN-8e2A1f9D',
    name: 'Master Loan Agreement',
    type: 'mla',
    date: daysAgo(180),
    fileSize: '2.2 MB',
    fileType: 'PDF',
    downloadUrl: '#',
  },
]

// =============================================================================
// HELPER FUNCTIONS - Documents and Block Explorer
// =============================================================================

/**
 * Get all documents for a specific loan, sorted chronologically (oldest first)
 */
export function getDocumentsForLoan(loanId: string): LoanDocument[] {
  return mockLoanDocuments
    .filter((doc) => doc.loanId === loanId)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

/**
 * Get the block explorer URL for a transaction based on the blockchain network
 */
export function getBlockExplorerUrl(
  network: BlockchainNetwork,
  transactionHash: string
): string {
  const explorers: Record<BlockchainNetwork, string> = {
    ethereum: 'https://etherscan.io/tx/',
    bitcoin: 'https://blockchain.com/btc/tx/',
    solana: 'https://solscan.io/tx/',
  }
  return `${explorers[network]}${transactionHash}`
}
