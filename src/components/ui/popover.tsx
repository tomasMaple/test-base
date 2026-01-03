'use client'

import * as React from 'react'
import { Popover as BasePopover } from '@base-ui-components/react/popover'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'

const popoverContentVariants = tv({
  base: [
    'z-50 min-w-[12rem] overflow-hidden rounded-lg',
    'border border-border-subtle bg-surface text-fg-primary',
    'shadow-300',
    'px-150 py-100',
    'transition-[transform,opacity] duration-fast ease-default absolute', // Absolute usually needed for positioner
    'data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
    'data-[ending-style]:scale-90 data-[ending-style]:opacity-0',
  ],
})

const popoverArrowVariants = tv({
  base: [
    'fill-surface stroke-border-subtle',
  ],
})

// =============================================================================
// COMPOUND PARTS
// =============================================================================

const PopoverRoot = BasePopover.Root
const PopoverPortal = BasePopover.Portal
const PopoverClose = BasePopover.Close

const PopoverTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', ...props }, ref) => {
    return (
      <BasePopover.Trigger
        ref={ref}
        render={<Button variant={variant} className={className} {...props} />}
      />
    )
  }
)
PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Popup> & { showArrow?: boolean }
>(({ className, children, showArrow = true, ...props }, ref) => (
  <BasePopover.Portal>
    <BasePopover.Positioner sideOffset={8}>
      <BasePopover.Popup
        ref={ref}
        className={cn(popoverContentVariants(), className)}
        {...props}
      >
        {showArrow && (
          <BasePopover.Arrow className={cn(popoverArrowVariants())} />
        )}
        {children}
      </BasePopover.Popup>
    </BasePopover.Positioner>
  </BasePopover.Portal>
))
PopoverContent.displayName = 'PopoverContent'

const PopoverTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Title>
>(({ className, ...props }, ref) => (
  <BasePopover.Title
    ref={ref}
    className={cn('text-label-md font-medium text-fg-primary mb-25', className)}
    {...props}
  />
))
PopoverTitle.displayName = 'PopoverTitle'

const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Description>
>(({ className, ...props }, ref) => (
  <BasePopover.Description
    ref={ref}
    className={cn('text-body-sm text-fg-secondary', className)}
    {...props}
  />
))
PopoverDescription.displayName = 'PopoverDescription'

// =============================================================================
// EXPORTS
// =============================================================================

export {
  PopoverRoot as Popover,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
}
