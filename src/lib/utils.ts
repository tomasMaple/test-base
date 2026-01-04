import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createTV } from 'tailwind-variants'

/**
 * Utility for combining class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Custom tv() without tailwind-merge
 */
export const tv = createTV({
  twMerge: false,
})
