'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const sidebarItemVariants = tv({
  base: [
    'flex w-full items-center gap-75 px-75 py-50 rounded-md',
    'text-label-sm text-left transition-colors duration-fast ease-default',
    'hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong',
  ],
  variants: {
    active: {
      true: 'bg-secondary text-fg-primary font-medium',
      false: 'text-fg-secondary hover:text-fg-primary',
    },
  },
  defaultVariants: {
    active: false,
  },
})

// =============================================================================
// COMPONENT
// =============================================================================

export interface SidebarItem {
  href: string
  label: string
  icon?: React.ReactNode
}

interface SidebarItemProps {
  item: SidebarItem
  isActive: boolean
}

const SidebarItemComponent = ({ item, isActive }: SidebarItemProps) => {
  return (
    <Link
      href={item.href}
      className={cn(sidebarItemVariants({ active: isActive }))}
    >
      {item.icon && <span className="flex-shrink-0 size-icon-md">{item.icon}</span>}
      <span>{item.label}</span>
    </Link>
  )
}

interface SidebarProps {
  items: SidebarItem[]
  className?: string
}

export const Sidebar = ({ items, className }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'w-64 h-screen bg-surface border-r border-border-subtle sticky top-0',
        'flex flex-col p-75',
        className
      )}
    >
      <div className="mb-100">
        <h2 className="text-heading-h6 px-75 font-semibold text-fg-primary">Navigation</h2>
      </div>
      <nav className="flex flex-col gap-12">
        {items.map((item) => (
          <SidebarItemComponent
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  )
}

export type { SidebarItem as SidebarItemType }
