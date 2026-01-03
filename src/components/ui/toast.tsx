'use client'

import * as React from 'react'
import { Toast as BaseToast } from '@base-ui-components/react/toast'
import { type VariantProps } from 'tailwind-variants'
import { X as XIcon } from 'lucide-react'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const toastVariants = tv({
  base: [
    'group relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
    'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
    'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[starting-style]:translate-y-2',
    'transition-all duration-300 ease-out',
  ],
  variants: {
    appearance: {
      default: 'border',
      subtle: 'border-transparent',
    },
    type: {
      primary: [],
      secondary: [],
      brand: [],
      negative: [],
      positive: [],
      warning: [],
    },
  },
  compoundVariants: [
    // Default (Solid/Strong/Card-like)
    { appearance: 'default', type: 'primary', class: 'bg-surface text-fg-primary border-border-subtle' },
    { appearance: 'default', type: 'secondary', class: 'bg-secondary text-fg-secondary border-border-subtle' },
    { appearance: 'default', type: 'brand', class: 'bg-brand text-fg-on-brand border-brand' },
    { appearance: 'default', type: 'negative', class: 'bg-negative text-fg-on-accent border-negative' },
    { appearance: 'default', type: 'positive', class: 'bg-positive text-fg-on-accent border-positive' },
    { appearance: 'default', type: 'warning', class: 'bg-warning text-fg-on-accent border-warning' },

    // Subtle (Soft background)
    { appearance: 'subtle', type: 'primary', class: 'bg-subtle text-fg-primary' },
    { appearance: 'subtle', type: 'secondary', class: 'bg-muted text-fg-secondary' },
    { appearance: 'subtle', type: 'brand', class: 'bg-brand-weak text-brand-strong' },
    { appearance: 'subtle', type: 'negative', class: 'bg-negative-weak text-negative-strong' },
    { appearance: 'subtle', type: 'positive', class: 'bg-positive-weak text-positive-strong' },
    { appearance: 'subtle', type: 'warning', class: 'bg-warning-weak text-warning-strong' },
  ],
  defaultVariants: {
    appearance: 'default',
    type: 'primary',
  },
})

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface ToastData {
  title?: string
  description?: string
  appearance?: 'default' | 'subtle'
  type?: 'primary' | 'secondary' | 'brand' | 'negative' | 'positive' | 'warning'
}

// =============================================================================
// COMPONENTS
// =============================================================================

const ToastProvider = BaseToast.Provider
const ToastViewport = BaseToast.Viewport
const ToastPortal = BaseToast.Portal

// Hook to manage toasts - re-export for convenience
const useToastManager = BaseToast.useToastManager

// ToastList component that renders toasts from the manager
function ToastList({ className }: { className?: string }) {
  const { toasts } = BaseToast.useToastManager()

  return (
    <>
      {toasts.map((toast) => (
        <BaseToast.Root
          key={toast.id}
          toast={toast}
          className={cn(
            toastVariants({
              appearance: toast.data?.appearance ?? 'default',
              type: toast.data?.type ?? 'primary',
            }),
            className
          )}
        >
          <BaseToast.Content className="flex-1 grid gap-1">
            <BaseToast.Title className="text-sm font-semibold" />
            <BaseToast.Description className="text-sm opacity-90" />
          </BaseToast.Content>
          <BaseToast.Close
            className="absolute right-2 top-2 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
            aria-label="Close"
          >
            <XIcon className="h-4 w-4" />
          </BaseToast.Close>
        </BaseToast.Root>
      ))}
    </>
  )
}

// Styled Viewport
const StyledToastViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToast.Viewport>
>(({ className, ...props }, ref) => (
  <BaseToast.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2',
      className
    )}
    {...props}
  />
))
StyledToastViewport.displayName = 'StyledToastViewport'

export {
  ToastProvider,
  ToastViewport,
  ToastPortal,
  ToastList,
  StyledToastViewport,
  useToastManager,
  toastVariants,
}
export type { ToastData as ToastProps }
