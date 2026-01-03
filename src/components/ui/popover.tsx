'use client'

import * as React from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

/**
 * Popover Trigger variants matching Button styles
 */
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
        'bg-secondary text-primary-fg',
        'border border-border-subtle',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-border-strong',
      ],
      outline: [
        'bg-surface text-primary-fg',
        'border border-border-strong',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-border-strong',
      ],
      ghost: [
        'bg-transparent text-primary-fg',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-tertiary-fg',
      ],
    },
    size: {
      sm: [
        'h-control-sm',
        'px-75',
        'label-fixed-x-small',
      ],
      md: [
        'h-control-md',
        'px-75',
        'label-fixed-x-small',
      ],
      lg: [
        'h-control-lg',
        'px-75',
        'label-fixed-small',
      ],
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

// Popup content variants
const popoverContentVariants = tv({
  base: [
    'z-50 min-w-[12rem] overflow-hidden rounded-lg',
    'border border-border-subtle bg-surface text-primary-fg',
    'shadow-300',
    'px-150 py-100',
    'origin-[var(--transform-origin)]',
    'transition-[transform,opacity] duration-fast ease-default',
    'data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
    'data-[ending-style]:scale-90 data-[ending-style]:opacity-0',
  ],
})

// Close button variants
const popoverCloseVariants = tv({
  base: [
    'absolute top-50 right-50',
    'inline-flex items-center justify-center rounded-md',
    'size-control-xs',
    'text-tertiary-fg hover:text-primary-fg',
    'hover:bg-primary active:bg-secondary',
    'transition-colors duration-fast ease-default',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
  ],
})

// Arrow styles
const arrowStyles = [
  'fill-surface',
  'data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180',
  'data-[side=bottom]:top-[-8px]',
  'data-[side=left]:right-[-13px] data-[side=left]:rotate-90',
  'data-[side=right]:left-[-13px] data-[side=right]:-rotate-90',
]

// ============================================
// Component Types
// ============================================

export interface PopoverProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Root> {
  children?: React.ReactNode
}

export interface PopoverTriggerProps 
  extends React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>,
    VariantProps<typeof popoverTriggerVariants> {}

export interface PopoverContentProps 
  extends React.ComponentPropsWithoutRef<typeof BasePopover.Popup> {
  sideOffset?: number
  showArrow?: boolean
}

// ============================================
// Components
// ============================================

const Popover = BasePopover.Root

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, variant, size, ...props }, ref) => (
    <BasePopover.Trigger
      ref={ref}
      className={cn(popoverTriggerVariants({ variant, size }), className)}
      {...props}
    />
  )
)
PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, children, sideOffset = 8, showArrow = true, ...props }, ref) => (
    <BasePopover.Portal>
      <BasePopover.Positioner sideOffset={sideOffset}>
        <BasePopover.Popup
          ref={ref}
          className={cn(popoverContentVariants(), className)}
          {...props}
        >
          {showArrow && (
            <BasePopover.Arrow className={cn(arrowStyles)}>
              <ArrowSvg />
            </BasePopover.Arrow>
          )}
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
)
PopoverContent.displayName = 'PopoverContent'

const PopoverArrow = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BasePopover.Arrow>>(
  ({ className, ...props }, ref) => (
    <BasePopover.Arrow
      ref={ref}
      className={cn(arrowStyles, className)}
      {...props}
    >
      <ArrowSvg />
    </BasePopover.Arrow>
  )
)
PopoverArrow.displayName = 'PopoverArrow'

const PopoverTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<typeof BasePopover.Title>>(
  ({ className, ...props }, ref) => (
    <BasePopover.Title
      ref={ref}
      className={cn('label-fixed-medium font-medium text-primary-fg m-0', className)}
      {...props}
    />
  )
)
PopoverTitle.displayName = 'PopoverTitle'

const PopoverDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<typeof BasePopover.Description>>(
  ({ className, ...props }, ref) => (
    <BasePopover.Description
      ref={ref}
      className={cn('body-fixed-small text-secondary-fg m-0 mt-25', className)}
      {...props}
    />
  )
)
PopoverDescription.displayName = 'PopoverDescription'

const PopoverClose = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof BasePopover.Close>>(
  ({ className, children, ...props }, ref) => (
    <BasePopover.Close
      ref={ref}
      className={cn(popoverCloseVariants(), className)}
      {...props}
    >
      {children || <X className="size-icon-md" />}
    </BasePopover.Close>
  )
)
PopoverClose.displayName = 'PopoverClose'

// ============================================
// Arrow SVG Component (from Base UI docs)
// ============================================

function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-surface"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-border-subtle"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-border-subtle"
      />
    </svg>
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
}
