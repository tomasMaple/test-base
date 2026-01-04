'use client'

import * as React from 'react'
import { cn, tv } from '@/lib/utils'
import { type VariantProps } from 'tailwind-variants'

// =============================================================================
// VARIANTS
// =============================================================================

const layoutVariants = tv({
  base: 'min-h-screen flex flex-col',
  variants: {
    layout: {
      default: '',
      sidebar: '',
      centered: '',
    },
  },
  defaultVariants: {
    layout: 'default',
  },
})

const mainVariants = tv({
  base: 'flex-1',
  variants: {
    layout: {
      default: 'container mx-auto px-150 py-100',
      sidebar: 'px-150 py-100',
      centered: 'flex items-center justify-center',
    },
    maxWidth: {
      sm: 'max-w-[640px]',
      md: 'max-w-[768px]',
      lg: 'max-w-[1024px]',
      xl: 'max-w-[1280px]',
      full: 'max-w-none',
    },
  },
  defaultVariants: {
    layout: 'default',
    maxWidth: 'xl',
  },
})

const sidebarWrapperVariants = tv({
  base: 'flex flex-1',
})

// =============================================================================
// CONTEXT
// =============================================================================

type LayoutType = 'default' | 'sidebar' | 'centered'

interface AppLayoutContextValue {
  layout: LayoutType
}

const AppLayoutContext = React.createContext<AppLayoutContextValue | undefined>(undefined)

// =============================================================================
// LAYOUT ROOT
// =============================================================================

interface AppLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  children: React.ReactNode
}

const AppLayoutRoot = React.forwardRef<HTMLDivElement, AppLayoutRootProps>(
  ({ className, layout = 'default', children, ...props }, ref) => {
    return (
      <AppLayoutContext.Provider value={{ layout }}>
        <div
          ref={ref}
          className={cn(layoutVariants({ layout }), className)}
          {...props}
        >
          {children}
        </div>
      </AppLayoutContext.Provider>
    )
  }
)
AppLayoutRoot.displayName = 'AppLayout'

// =============================================================================
// LAYOUT NAVBAR SLOT
// =============================================================================

interface AppLayoutNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const AppLayoutNavbar = React.forwardRef<HTMLDivElement, AppLayoutNavbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('shrink-0', className)} {...props}>
        {children}
      </div>
    )
  }
)
AppLayoutNavbar.displayName = 'AppLayoutNavbar'

// =============================================================================
// LAYOUT SIDEBAR SLOT
// =============================================================================

interface AppLayoutSidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  width?: string
}

const AppLayoutSidebar = React.forwardRef<HTMLElement, AppLayoutSidebarProps>(
  ({ className, children, width = 'w-64', ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          width,
          'shrink-0 border-r border-border-subtle bg-surface',
          'h-[calc(100vh-64px)] sticky top-[64px]',
          className
        )}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
AppLayoutSidebar.displayName = 'AppLayoutSidebar'

// =============================================================================
// LAYOUT MAIN CONTENT
// =============================================================================

interface AppLayoutMainProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof mainVariants> {
  children: React.ReactNode
}

const AppLayoutMain = React.forwardRef<HTMLElement, AppLayoutMainProps>(
  ({ className, maxWidth, children, ...props }, ref) => {
    const context = React.useContext(AppLayoutContext)
    const layout = context?.layout ?? 'default'

    return (
      <main
        ref={ref}
        className={cn(mainVariants({ layout, maxWidth }), className)}
        {...props}
      >
        {children}
      </main>
    )
  }
)
AppLayoutMain.displayName = 'AppLayoutMain'

// =============================================================================
// LAYOUT BODY (Sidebar + Main wrapper)
// =============================================================================

interface AppLayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const AppLayoutBody = React.forwardRef<HTMLDivElement, AppLayoutBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(sidebarWrapperVariants(), className)} {...props}>
        {children}
      </div>
    )
  }
)
AppLayoutBody.displayName = 'AppLayoutBody'

// =============================================================================
// LAYOUT FOOTER SLOT
// =============================================================================

interface AppLayoutFooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const AppLayoutFooter = React.forwardRef<HTMLElement, AppLayoutFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'shrink-0 border-t border-border-subtle bg-surface py-100 px-150',
          className
        )}
        {...props}
      >
        {children}
      </footer>
    )
  }
)
AppLayoutFooter.displayName = 'AppLayoutFooter'

// =============================================================================
// EXPORTS
// =============================================================================

export const AppLayout = Object.assign(AppLayoutRoot, {
  Navbar: AppLayoutNavbar,
  Body: AppLayoutBody,
  Sidebar: AppLayoutSidebar,
  Main: AppLayoutMain,
  Footer: AppLayoutFooter,
})

export {
  AppLayoutRoot,
  AppLayoutNavbar,
  AppLayoutBody,
  AppLayoutSidebar,
  AppLayoutMain,
  AppLayoutFooter,
  layoutVariants,
  mainVariants,
}
