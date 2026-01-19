'use client'

import * as React from 'react'
import { Dialog as BaseDialog } from '@base-ui-components/react/dialog'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'
import { X } from 'lucide-react'

// =============================================================================
// VARIANTS
// =============================================================================

const dialogOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
    'transition-opacity duration-fast ease-default',
    'data-[starting-style]:opacity-0',
    'data-[ending-style]:opacity-0',
  ],
})

const dialogPopupVariants = tv({
  base: [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'bg-surface rounded-xl shadow-400 border border-border-subtle',
    'p-150 w-full max-w-[32rem]',
    'transition-all duration-fast ease-default',
    'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
    'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
  ],
})

// =============================================================================
// COMPOUND PARTS
// =============================================================================

const DialogRoot = BaseDialog.Root
const DialogTrigger = BaseDialog.Trigger
const DialogPortal = BaseDialog.Portal
const DialogClose = BaseDialog.Close

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(dialogOverlayVariants(), className)}
    {...props}
  />
))
DialogOverlay.displayName = 'DialogOverlay'

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <BaseDialog.Popup
      ref={ref}
      className={cn(dialogPopupVariants(), className)}
      {...props}
    >
      {children}
      <DialogClose className="absolute right-4 top-4 rounded-sm hover:bg-subtle p-25 outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer">
        <X className="size-icon-md text-fg-tertiary" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </BaseDialog.Popup>
  </DialogPortal>
))
DialogContent.displayName = 'DialogContent'

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    className={cn('text-heading-h5 font-semibold text-fg-primary mb-25', className)}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn('text-body-base text-fg-secondary', className)}
    {...props}
  />
))
DialogDescription.displayName = 'DialogDescription'

// =============================================================================
// EXPORTS
// =============================================================================

export {
  DialogRoot as Dialog, // Alias for ease of use matching simplified pattern often used
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
