'use client'

import * as React from 'react'
import { Toast as BaseToast } from '@base-ui/react/toast'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

const toastVariants = tv({
  slots: {
    root: [
      'relative flex w-full items-start gap-75 overflow-hidden rounded-md border p-100 shadow-elevation-300 transition-all select-none',
      'data-[ending-style]:opacity-0 data-[ending-style]:translate-x-full',
      'data-[starting-style]:opacity-0 data-[starting-style]:translate-x-full',
    ],
    title: 'label-fixed-small font-medium',
    description: 'body-fixed-small mt-25',
    icon: 'size-icon-lg shrink-0 mt-[2px]',
    close: [
      'absolute top-25 right-25 rounded-xs p-25 text-fg-tertiary transition-colors',
      'hover:bg-bg-subtle hover:text-fg-primary',
      'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand-primary',
    ],
  },
  variants: {
    variant: {
      default: {
        root: 'bg-surface border-border-subtle text-fg-primary',
        icon: 'text-fg-primary',
        description: 'text-fg-secondary',
      },
      success: {
        root: 'bg-positive-weak border-positive-subtle text-positive-strong',
        icon: 'text-positive-primary',
        description: 'text-positive-emphasis',
      },
      error: {
        root: 'bg-negative-weak border-negative-subtle text-negative-strong',
        icon: 'text-negative-primary',
        description: 'text-negative-emphasis',
        close: 'text-negative-emphasis hover:bg-negative-subtle hover:text-negative-strong',
      },
      warning: {
        root: 'bg-warning-weak border-warning-subtle text-warning-strong',
        icon: 'text-warning-primary',
        description: 'text-warning-emphasis',
        close: 'text-warning-emphasis hover:bg-warning-subtle hover:text-warning-strong',
      },
      info: {
        root: 'bg-info-weak border-info-subtle text-info-strong',
        icon: 'text-info-primary',
        description: 'text-info-emphasis',
        close: 'text-info-emphasis hover:bg-info-subtle hover:text-info-strong',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const Icons = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

export interface ToastProps extends VariantProps<typeof toastVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  duration?: number
}

interface ToastContextValue {
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastManager = React.useMemo(() => BaseToast.createToastManager(), [])

  const toast = React.useCallback(
    (props: ToastProps) => {
      toastManager.add(props)
    },
    [toastManager]
  )

  const contextValue = React.useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={contextValue}>
      <BaseToast.Provider toastManager={toastManager}>
        {children}
        <Toasts />
      </BaseToast.Provider>
    </ToastContext.Provider>
  )
}

export function Toasts() {
  const { toasts } = BaseToast.useToastManager()
  const { root, title, description, icon, close } = toastVariants()

  return (
    <div className="fixed bottom-0 right-0 z-50 flex w-full max-w-[420px] flex-col gap-25 p-100 outline-none">
      {toasts.map((toast) => {
        // The toast object contains the data passed to .add() merged with internal state
        // We cast it to access our custom props
        const data = toast as unknown as ToastProps
        const Icon = Icons[data.variant || 'default']

        return (
          <BaseToast.Root
            key={toast.id}
            toast={toast}
            className={cn(root({ variant: data.variant }))}
          >
            <Icon className={icon({ variant: data.variant })} />
            <div className="flex-1 space-y-25">
              {data.title && (
                <BaseToast.Title className={title()}>{data.title}</BaseToast.Title>
              )}
              {data.description && (
                <BaseToast.Description className={description({ variant: data.variant })}>
                  {data.description}
                </BaseToast.Description>
              )}
            </div>
            <BaseToast.Close className={close({ variant: data.variant })}>
              <X className="size-icon-sm" />
            </BaseToast.Close>
          </BaseToast.Root>
        )
      })}
    </div>
  )
}
