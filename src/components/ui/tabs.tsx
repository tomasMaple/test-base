'use client'

import * as React from 'react'
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// CONTEXT
// =============================================================================

type TabsVariant = 'canvas' | 'primary' | 'secondary'
type TabsPadding = 'noPadding' | 'withPadding'

interface TabsContextValue {
  variant: TabsVariant
  padding: TabsPadding
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: 'canvas',
  padding: 'noPadding',
})

// =============================================================================
// VARIANTS
// =============================================================================

const tabsListVariants = tv({
  base: [
    'inline-flex items-center justify-center rounded-pill',
  ],
  variants: {
    padding: {
      noPadding: 'p-0',
      withPadding: 'p-50 gap-25 border border-border-subtle shadow-200',
    },
    variant: {
      canvas: '',
      primary: '',
      secondary: '',
    },
  },
  compoundVariants: [
    {
      padding: 'withPadding',
      variant: 'canvas',
      class: 'bg-canvas',
    },
    {
      padding: 'withPadding',
      variant: 'primary',
      class: 'bg-primary',
    },
    {
      padding: 'withPadding',
      variant: 'secondary',
      class: 'bg-secondary',
    },
  ],
  defaultVariants: {
    padding: 'noPadding',
    variant: 'canvas',
  },
})

const tabsTriggerVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap px-100 py-50 text-label-sm font-medium transition-all duration-fast',
    'rounded-pill cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
  ],
  variants: {
    variant: {
      canvas: [
        // Inactive state
        'bg-transparent text-fg-secondary',
        // Hover state (inactive)
        'hover:bg-primary hover:text-fg-primary',
        // Selected state
        'data-[selected]:bg-primary data-[selected]:text-fg-primary data-[selected]:shadow-200',
        'data-[state=active]:bg-surface data-[state=active]:text-fg-primary data-[state=active]:shadow-200',
        'aria-selected:bg-surface aria-selected:text-fg-primary aria-selected:shadow-200',
        // Hover while selected
        'hover:data-[selected]:bg-surface',
        'hover:data-[state=active]:bg-surface',
        'hover:aria-selected:bg-surface',
      ],
      primary: [
        // Inactive state
        'bg-transparent text-fg-secondary',
        // Hover state (inactive)
        'hover:bg-secondary hover:text-fg-primary',
        // Selected state
        'data-[selected]:bg-surface data-[selected]:text-fg-primary',
        'data-[state=active]:bg-surface data-[state=active]:text-fg-primary',
        'aria-selected:bg-surface aria-selected:text-fg-primary',
        // Hover while selected
        'hover:data-[selected]:bg-surface',
        'hover:data-[state=active]:bg-surface',
        'hover:aria-selected:bg-surface',
      ],
      secondary: [
        // Inactive state
        'bg-transparent text-fg-secondary',
        // Hover state (inactive)
        'hover:bg-muted hover:text-fg-primary',
        // Selected state
        'data-[selected]:bg-surface data-[selected]:text-fg-primary data-[selected]:shadow-200',
        'data-[state=active]:bg-surface data-[state=active]:text-fg-primary data-[state=active]:shadow-200',
        'aria-selected:bg-surface aria-selected:text-fg-primary aria-selected:shadow-200',
        // Hover while selected
        'hover:data-[selected]:bg-surface',
        'hover:data-[state=active]:bg-surface',
        'hover:aria-selected:bg-surface',
      ],
    },
  },
  defaultVariants: {
    variant: 'canvas',
  },
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
// TYPE EXPORTS
// =============================================================================

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>

// =============================================================================
// COMPOUND PARTS
// =============================================================================

const TabsRoot = BaseTabs.Root

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof BaseTabs.List>,
    TabsListVariantProps {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, padding = 'noPadding', variant = 'canvas', children, ...props }, ref) => (
    <TabsContext.Provider value={{ variant, padding }}>
      <BaseTabs.List
        ref={ref}
        className={cn(tabsListVariants({ padding, variant }), className)}
        {...props}
      >
        {children}
      </BaseTabs.List>
    </TabsContext.Provider>
  )
)
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext)
  
  return (
    <BaseTabs.Tab
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
})
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
TabsPanel.displayName = 'TabsContent'

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
