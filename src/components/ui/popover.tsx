'use client'

import * as React from 'react'
import { Popover as BasePopover } from '@base-ui-components/react/popover'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const popoverTriggerVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-50 rounded-pill',
    'font-medium transition-colors duration-standard ease-default cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'data-[popup-open]:bg-secondary',
  ],
  variants: {
    variant: {
      solid: [
        'bg-secondary text-fg-primary',
        'border border-border-subtle',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-border-strong',
      ],
      outline: [
        'bg-surface text-fg-primary',
        'border border-border-strong',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-border-strong',
      ],
      ghost: [
        'bg-transparent text-fg-primary',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-fg-tertiary',
      ],
    },
    size: {
      sm: ['h-control-sm', 'px-75', 'text-label-xs'],
      md: ['h-control-md', 'px-75', 'text-label-sm'],
      lg: ['h-control-lg', 'px-75', 'text-label-sm'],
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

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

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Trigger> &
    VariantProps<typeof popoverTriggerVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <BasePopover.Trigger
    ref={ref}
    className={cn(popoverTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
  </BasePopover.Trigger>
))
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
  popoverTriggerVariants,
}
