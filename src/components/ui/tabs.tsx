'use client'

import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const tabsListVariants = tv({
  base: [
    'inline-flex items-center justify-center rounded-lg bg-surface p-50 text-fg-secondary',
    'shadow-200 border border-border-subtle',
  ],
})

const tabsTriggerVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap px-75 py-25 text-label-sm font-medium transition-all duration-fast',
    'rounded-md cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'bg-transparent text-fg-secondary',
    'data-[selected]:bg-inverse data-[selected]:text-fg-inverse data-[selected]:shadow-100',
    'hover:data-[selected]:bg-inverse',
    'hover:bg-subtle hover:text-fg-primary',
  ],
})

const tabsPanelVariants = tv({
  base: [
    'mt-100 ring-offset-background transition-opacity duration-standard',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'data-[starting-style]:opacity-0', 
    'data-[ending-style]:opacity-0',
  ],
})

// =============================================================================
// COMPOUND PARTS
// =============================================================================

const TabsRoot = BaseTabs.Root

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseTabs.List>
>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(tabsListVariants(), className)}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={cn(tabsTriggerVariants(), className)}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsPanel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>
>(({ className, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    className={cn(tabsPanelVariants(), className)}
    {...props}
  />
))
TabsPanel.displayName = 'TabsContent' // Shadcn/common naming, Base UI calls it Panel

// =============================================================================
// EXPORTS
// =============================================================================

export {
  TabsRoot as Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsPanel as TabsContent,
  TabsPanel,
}
