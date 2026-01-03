'use client'

import * as React from 'react'
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

/**
 * ScrollArea Root - Groups all parts of the scroll area
 */
const ScrollArea = BaseScrollArea.Root

/**
 * ScrollArea Viewport - The actual scrollable container
 */
const ScrollAreaViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Viewport>
>(({ className, children, ...props }, ref) => (
  <BaseScrollArea.Viewport
    ref={ref}
    className={cn(
      'h-full overscroll-contain rounded-md',
      'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
      className
    )}
    {...props}
  >
    {children}
  </BaseScrollArea.Viewport>
))
ScrollAreaViewport.displayName = 'ScrollAreaViewport'

/**
 * ScrollArea Content - Container for the content inside the viewport
 */
const ScrollAreaContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Content>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Content
    ref={ref}
    className={cn('flex flex-col gap-100', className)}
    {...props}
  />
))
ScrollAreaContent.displayName = 'ScrollAreaContent'

/**
 * Scrollbar variants using tailwind-variants
 */
const scrollbarVariants = tv({
  base: [
    'flex rounded-md bg-secondary opacity-0 transition-opacity duration-standard ease-default',
    'pointer-events-none',
    'data-[hovering]:opacity-100 data-[hovering]:pointer-events-auto',
    'data-[scrolling]:opacity-100 data-[scrolling]:pointer-events-auto data-[scrolling]:duration-0',
  ],
  variants: {
    orientation: {
      vertical: 'w-[4px] m-50',
      horizontal: 'h-[4px] m-50',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

export interface ScrollAreaScrollbarProps
  extends React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>,
    VariantProps<typeof scrollbarVariants> {}

/**
 * ScrollArea Scrollbar - A vertical or horizontal scrollbar
 */
const ScrollAreaScrollbar = React.forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => (
    <BaseScrollArea.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cn(scrollbarVariants({ orientation }), className)}
      {...props}
    />
  )
)
ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar'

/**
 * ScrollArea Thumb - The draggable part of the scrollbar
 */
const ScrollAreaThumb = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Thumb>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Thumb
    ref={ref}
    className={cn('w-full rounded-md bg-tertiary-fg', className)}
    {...props}
  />
))
ScrollAreaThumb.displayName = 'ScrollAreaThumb'

/**
 * ScrollArea Corner - Appears at the intersection of horizontal and vertical scrollbars
 */
const ScrollAreaCorner = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Corner>
>(({ className, ...props }, ref) => (
  <BaseScrollArea.Corner
    ref={ref}
    className={cn('bg-secondary', className)}
    {...props}
  />
))
ScrollAreaCorner.displayName = 'ScrollAreaCorner'

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
}
