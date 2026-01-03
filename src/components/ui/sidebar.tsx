'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

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
      className={cn(
        'w-full flex items-center gap-12 px-75 py-50 rounded-md',
        'label-fixed-small text-left transition-colors',
        'hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong',
        isActive
          ? 'bg-secondary text-primary-fg font-medium'
          : 'text-secondary-fg hover:text-primary-fg'
      )}
    >
      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
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
        <h2 className="text-heading-h6 px-75">Navigation</h2>
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

