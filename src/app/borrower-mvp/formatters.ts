/**
 * Formatting utilities for the borrower-mvp app
 *
 * Rules:
 * - Only strip decimals when ALL decimal places are zeros
 * - Stablecoins/USD: Show 2 decimals (unless all zeros)
 * - Crypto collateral: Show 6 decimals (unless all zeros)
 */

/**
 * Strip decimals only if ALL decimal digits are zeros
 * e.g., "100.00" → "100", but "100.50" stays as "100.50"
 * Handles suffixes like M, K: "1.00M" → "1M"
 * When preserveSuffixDecimals is true, keeps decimals for M/K values
 */
function stripAllZeroDecimals(formatted: string, preserveSuffixDecimals: boolean = false): string {
  if (preserveSuffixDecimals && /[MK]$/.test(formatted)) {
    return formatted // Keep decimals for M/K values
  }
  return formatted.replace(/\.0+([MK]?)$/, '$1')
}

/**
 * Format USD/stablecoin amounts with abbreviations for large values
 * Always shows 2 decimals for M/K values
 * Strips decimals only for non-abbreviated values if all zeros
 *
 * Examples:
 * - 25000000 → "$25.00M"
 * - 5000 → "$5.00K"
 * - 100.50 → "$100.50"
 * - 100.00 → "$100"
 */
export function formatCurrency(value: number, includeSymbol: boolean = true): string {
  const symbol = includeSymbol ? '$' : ''
  if (value >= 1000000) {
    const formatted = (value / 1000000).toFixed(2)
    return `${symbol}${formatted}M`
  }
  if (value >= 1000) {
    const formatted = (value / 1000).toFixed(2)
    return `${symbol}${formatted}K`
  }
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
  return `${symbol}${stripAllZeroDecimals(formatted)}`
}

/**
 * Format USD/stablecoin amounts with full precision (no abbreviations)
 * Shows 2 decimals, strips if all zeros
 *
 * Examples:
 * - 25000000 → "$25,000,000"
 * - 100.50 → "$100.50"
 * - 100.00 → "$100"
 */
export function formatFullCurrency(value: number, includeSymbol: boolean = true): string {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
  const stripped = stripAllZeroDecimals(formatted)
  return includeSymbol ? `$${stripped}` : stripped
}

/**
 * Format crypto collateral amounts with 6 decimal precision
 * Strips if all zeros
 *
 * Examples:
 * - 189.190000 → "189.190000" (keeps trailing zeros because not ALL are zeros)
 * - 114.000000 → "114" (strips because ALL decimals are zeros)
 */
export function formatCollateralAmount(value: number): string {
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  })
  return stripAllZeroDecimals(formatted)
}

/**
 * Format a number with configurable decimal places
 * Strips if all zeros
 *
 * Examples:
 * - formatNumber(100.50, 2) → "100.50"
 * - formatNumber(100.00, 2) → "100"
 */
export function formatNumber(value: number, decimals: number = 0): string {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
  return stripAllZeroDecimals(formatted)
}

/**
 * Format USD collateral values with abbreviations
 * Always shows 2 decimals for M/K values
 */
export function formatCollateralUsd(value: number): string {
  if (value >= 1000000) {
    const formatted = (value / 1000000).toFixed(2)
    return `$${formatted}M`
  }
  if (value >= 1000) {
    const formatted = (value / 1000).toFixed(2)
    return `$${formatted}K`
  }
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
  return `$${stripAllZeroDecimals(formatted)}`
}
