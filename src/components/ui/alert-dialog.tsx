'use client'

import * as React from 'react'
import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const overlayVariants = tv({
  base: [
    'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
    'transition-opacity duration-fast ease-default',
    'data-[starting-style]:opacity-0',
    'data-[ending-style]:opacity-0',
  ],
})

const contentVariants = tv({
  base: [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'w-full max-w-[32rem] p-150',
    'bg-surface rounded-xl shadow-400 border border-border-subtle',
    'transition-all duration-fast ease-default',
    'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
    'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
  ],
})

// =============================================================================
// ALIASES & WRAPPERS
// =============================================================================

const AlertDialog = BaseAlertDialog.Root
const AlertDialogTrigger = BaseAlertDialog.Trigger
const AlertDialogPortal = BaseAlertDialog.Portal

const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Backdrop
    ref={ref}
    className={cn(overlayVariants(), className)}
    {...props}
  />
))
AlertDialogOverlay.displayName = 'AlertDialogOverlay'

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Popup>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <BaseAlertDialog.Popup
      ref={ref}
      className={cn(contentVariants(), className)}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = 'AlertDialogContent'

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Title
    ref={ref}
    className={cn('text-heading-h5 font-semibold text-fg-primary mb-50', className)}
    {...props}
  />
))
AlertDialogTitle.displayName = 'AlertDialogTitle'

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseAlertDialog.Description
    ref={ref}
    className={cn('text-body-base text-fg-secondary mb-150', className)}
    {...props}
  />
))
AlertDialogDescription.displayName = 'AlertDialogDescription'

const AlertDialogAction = BaseAlertDialog.Close
const AlertDialogCancel = BaseAlertDialog.Close

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
