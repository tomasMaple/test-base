'use client'

import * as React from 'react'
import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const tooltipContentVariants = tv({
  base: [
    'z-50 overflow-hidden rounded-md',
    'bg-inverse text-fg-inverse', 
    'px-50 py-25 text-label-xs shadow-200',
    'transition-all duration-fast ease-default',
    'data-[starting-style]:opacity-0 data-[starting-style]:scale-95',
    'data-[ending-style]:opacity-0 data-[ending-style]:scale-95',
  ],
})

const tooltipArrowVariants = tv({
  base: [
    'fill-inverse',
  ],
})

// =============================================================================
// COMPOUND PARTS
// =============================================================================

const TooltipRoot = BaseTooltip.Root
const TooltipTrigger = BaseTooltip.Trigger
const TooltipPortal = BaseTooltip.Portal

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseTooltip.Popup> & { showArrow?: boolean }
>(({ className, children, showArrow = true, ...props }, ref) => (
  <BaseTooltip.Portal>
    <BaseTooltip.Positioner sideOffset={4}>
      <BaseTooltip.Popup
        ref={ref}
        className={cn(tooltipContentVariants(), className)}
        style={{ color: 'var(--sem-fg-inverse)', ...props.style }}
        {...props}
      >
        {showArrow && (
          <BaseTooltip.Arrow className={cn(tooltipArrowVariants())}>
            {/* Base UI Arrow SVG logic or custom SVG if needed */}
          </BaseTooltip.Arrow>
        )}
        {children}
      </BaseTooltip.Popup>
    </BaseTooltip.Positioner>
  </BaseTooltip.Portal>
))
TooltipContent.displayName = 'TooltipContent'

// =============================================================================
// EXPORTS
// =============================================================================

export {
  TooltipRoot as Tooltip,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
}
