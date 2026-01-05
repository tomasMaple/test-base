'use client'

import * as React from 'react'
import {
  ToastProvider,
  ToastPortal,
  StyledToastViewport,
  ToastList,
  useToastManager,
  type ToastProps,
} from '@/components/ui/toast'
import { Button } from '@/components/ui/button'

// Suppress flushSync warning from Base UI Toast (React 19 compatibility issue)
const originalError = console.error
if (typeof window !== 'undefined') {
  console.error = (...args) => {
    if (args[0]?.includes?.('flushSync was called from inside a lifecycle method')) {
      return
    }
    originalError.apply(console, args)
  }
}

// Wrapper component to access toast manager (must be inside ToastProvider)
function ToastDemo() {
  const toastManager = useToastManager()

  const triggerToast = (
    appearance: 'default' | 'subtle',
    type: 'primary' | 'secondary' | 'brand' | 'negative' | 'positive' | 'warning'
  ) => {
    // Defer to next microtask to avoid flushSync error in React 19
    queueMicrotask(() => {
      toastManager.add({
        title: `${appearance} ${type}`,
        description: 'This is a toast message.',
        data: {
          appearance,
          type,
        },
      })
    })
  }

  return (
    <div className="p-300 min-h-screen">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Toast</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A succinct message that is displayed temporarily.
        </p>
      </div>

      <div className="flex flex-col gap-300 max-w-2xl">
        {/* Default Appearance */}
        <section className="p-300 border border-border-subtle rounded-xl space-y-300">
          <h2 className="text-heading-h6">Default Appearance</h2>
          <div className="flex flex-wrap gap-200">
            <Button onClick={() => triggerToast('default', 'primary')} variant="secondary">Primary</Button>
            <Button onClick={() => triggerToast('default', 'brand')} variant="secondary">Brand</Button>
            <Button onClick={() => triggerToast('default', 'negative')} variant="secondary">Negative</Button>
            <Button onClick={() => triggerToast('default', 'positive')} variant="secondary">Positive</Button>
            <Button onClick={() => triggerToast('default', 'warning')} variant="secondary">Warning</Button>
          </div>
        </section>

        {/* Subtle Appearance */}
        <section className="p-300 border border-border-subtle rounded-xl space-y-300">
          <h2 className="text-heading-h6">Subtle Appearance</h2>
          <div className="flex flex-wrap gap-200">
            <Button onClick={() => triggerToast('subtle', 'primary')} variant="secondary">Primary</Button>
            <Button onClick={() => triggerToast('subtle', 'brand')} variant="secondary">Brand</Button>
            <Button onClick={() => triggerToast('subtle', 'negative')} variant="secondary">Negative</Button>
            <Button onClick={() => triggerToast('subtle', 'positive')} variant="secondary">Positive</Button>
            <Button onClick={() => triggerToast('subtle', 'warning')} variant="secondary">Warning</Button>
          </div>
        </section>
      </div>

    </div>
  )
}

export default function ToastPage() {
  return (
    <ToastProvider>
      <ToastDemo />
      {/* Toast Viewport - must be sibling to ToastDemo to avoid flushSync errors */}
      <ToastPortal>
        <StyledToastViewport>
          <ToastList />
        </StyledToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}
