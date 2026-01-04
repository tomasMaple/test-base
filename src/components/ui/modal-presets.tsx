'use client'

import * as React from 'react'
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog'
import { Button } from './button'
import { cn, tv } from '@/lib/utils'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'

// =============================================================================
// MODAL PRESET VARIANTS
// =============================================================================

const modalIconVariants = tv({
  base: 'size-icon-3xl shrink-0',
  variants: {
    variant: {
      danger: 'text-negative',
      warning: 'text-warning',
      info: 'text-info',
      success: 'text-positive',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

// =============================================================================
// CONFIRMATION MODAL
// =============================================================================

type ConfirmationVariant = 'danger' | 'warning' | 'info' | 'success'

interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ConfirmationVariant
  onConfirm: () => void
  onCancel?: () => void
  loading?: boolean
}

function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm()
    if (!loading) {
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const Icon = variant === 'danger' || variant === 'warning' 
    ? AlertTriangle 
    : variant === 'success'
      ? CheckCircle
      : Info

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]">
        <div className="flex gap-100">
          <Icon className={modalIconVariants({ variant })} />
          <div className="flex-1">
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription className="mb-150">{description}</DialogDescription>
            )}
          </div>
        </div>
        <div className="flex gap-75 justify-end mt-150">
          <Button variant="secondary" onClick={handleCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'negative' : 'primary'}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Loading...' : confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}

// =============================================================================
// FORM MODAL
// =============================================================================

interface FormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  submitLabel?: string
  cancelLabel?: string
  onSubmit: (e: React.FormEvent) => void
  onCancel?: () => void
  loading?: boolean
  children: React.ReactNode
}

function FormModal({
  open,
  onOpenChange,
  title,
  description,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onSubmit,
  onCancel,
  loading = false,
  children,
}: FormModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
        <form onSubmit={handleSubmit}>
          <div className="mt-100 space-y-100">{children}</div>
          <div className="flex gap-75 justify-end mt-150">
            <Button type="button" variant="secondary" onClick={handleCancel} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Submitting...' : submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </DialogRoot>
  )
}

// =============================================================================
// INFO MODAL
// =============================================================================

interface InfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  closeLabel?: string
  children?: React.ReactNode
}

function InfoModal({
  open,
  onOpenChange,
  title,
  description,
  closeLabel = 'Close',
  children,
}: InfoModalProps) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
        {children && <div className="mt-100">{children}</div>}
        <div className="flex justify-end mt-150">
          <DialogClose>
            <Button variant="secondary">{closeLabel}</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}

// =============================================================================
// EXPORTS
// =============================================================================

export { ConfirmationModal, FormModal, InfoModal }

export type { ConfirmationModalProps, FormModalProps, InfoModalProps, ConfirmationVariant }
