'use client'

import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'

/**
 * Tabs Root - Groups tabs and panels
 */
const Tabs = BaseTabs.Root

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Root> {}

/**
 * Tabs List variants
 */
const tabsListVariants = tv({
  base: [
    'relative z-0 flex',
    'border-b border-border-subtle',
  ],
  variants: {
    variant: {
      solid: 'gap-6 px-25',
      outline: 'gap-6 px-25 border rounded-md border-border-subtle bg-surface',
      ghost: 'gap-6',
    },
    size: {
      sm: 'h-control-sm',
      md: 'h-control-md',
      lg: 'h-control-lg',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant, size, ...props }, ref) => (
    <BaseTabs.List
      ref={ref}
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  )
)
TabsList.displayName = 'TabsList'

/**
 * Tabs Tab variants
 */
const tabsTabVariants = tv({
  base: [
    'relative flex items-center justify-center',
    'border-0 bg-transparent',
    'font-medium whitespace-nowrap cursor-pointer',
    'outline-none select-none',
    'transition-colors duration-standard ease-default',
    'text-secondary-fg',
    'hover:text-primary-fg',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand focus-visible:rounded-sm',
    'data-[active]:text-primary-fg',
    'disabled:pointer-events-none disabled:opacity-disabled',
  ],
  variants: {
    size: {
      sm: 'px-50 label-fixed-x-small',
      md: 'px-75 label-fixed-small',
      lg: 'px-100 label-fixed-medium',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface TabsTabProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>,
    VariantProps<typeof tabsTabVariants> {}

const TabsTab = React.forwardRef<HTMLButtonElement, TabsTabProps>(
  ({ className, size, ...props }, ref) => (
    <BaseTabs.Tab
      ref={ref}
      className={cn(tabsTabVariants({ size }), className)}
      {...props}
    />
  )
)
TabsTab.displayName = 'TabsTab'

/**
 * Tabs Indicator - Animated indicator for active tab
 */
const tabsIndicatorVariants = tv({
  base: [
    'absolute z-[-1] left-0 top-1/2 -translate-y-1/2',
    'w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)]',
    'rounded-sm bg-secondary',
    'transition-all duration-standard ease-default',
  ],
  variants: {
    size: {
      sm: 'h-control-3xs',
      md: 'h-control-2xs',
      lg: 'h-control-xs',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface TabsIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.Indicator>,
    VariantProps<typeof tabsIndicatorVariants> {}

const TabsIndicator = React.forwardRef<HTMLSpanElement, TabsIndicatorProps>(
  ({ className, size, ...props }, ref) => (
    <BaseTabs.Indicator
      ref={ref}
      className={cn(tabsIndicatorVariants({ size }), className)}
      {...props}
    />
  )
)
TabsIndicator.displayName = 'TabsIndicator'

/**
 * Tabs Panel - Content panel for each tab
 */
const tabsPanelVariants = tv({
  base: [
    'relative',
    'outline-none',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand focus-visible:rounded-md',
    '[&[hidden]]:hidden',
  ],
  variants: {
    size: {
      sm: 'p-75',
      md: 'p-100',
      lg: 'p-150',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface TabsPanelProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>,
    VariantProps<typeof tabsPanelVariants> {}

const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ className, size, ...props }, ref) => (
    <BaseTabs.Panel
      ref={ref}
      className={cn(tabsPanelVariants({ size }), className)}
      {...props}
    />
  )
)
TabsPanel.displayName = 'TabsPanel'

export {
  Tabs,
  TabsList,
  TabsTab,
  TabsIndicator,
  TabsPanel,
}
