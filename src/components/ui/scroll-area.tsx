'use client'

import * as React from 'react'
import { ScrollArea as BaseScrollArea } from '@base-ui-components/react/scroll-area'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const scrollBarVariants = tv({
  base: [
    'flex touch-none select-none transition-colors duration-fast ease-default',
    'data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:border-l data-[orientation=vertical]:border-transparent',
    'data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-transparent',
    'bg-transparent p-[1px]',
    'hover:bg-subtle',
  ],
})

const scrollThumbVariants = tv({
  base: [
    'relative flex-1 rounded-full bg-border-strong',
    'hover:bg-fg-tertiary', // Darker on hover
    'transition-colors duration-fast',
  ],
})

// =============================================================================
// COMPONENT
// =============================================================================

const ScrollAreaRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>
>(({ className, children, ...props }, ref) => (
  <BaseScrollArea.Root
    ref={ref}
    className={cn('relative overflow-hidden h-full w-full', className)}
    {...props}
  >
    <BaseScrollArea.Viewport className="h-full w-full rounded-[inherit] outline-none">
      {children}
    </BaseScrollArea.Viewport>
    <ScrollBar orientation="vertical" />
    <ScrollBar orientation="horizontal" />
    <BaseScrollArea.Corner />
  </BaseScrollArea.Root>
))
ScrollAreaRoot.displayName = 'ScrollArea'

const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Scrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <BaseScrollArea.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(scrollBarVariants(), className)}
    {...props}
  >
    <BaseScrollArea.Thumb className={scrollThumbVariants()} />
  </BaseScrollArea.Scrollbar>
))
ScrollBar.displayName = 'ScrollBar'

export { ScrollAreaRoot as ScrollArea, ScrollBar }
