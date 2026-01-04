import { clsx, type ClassValue } from 'clsx'
import { createTV } from 'tailwind-variants'

/**
 * Utility for combining class names
 * Note: We do NOT use tailwind-merge as it strips custom design tokens
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Custom tv() without tailwind-merge
 */
export const tv = createTV({
  twMerge: false,
})
