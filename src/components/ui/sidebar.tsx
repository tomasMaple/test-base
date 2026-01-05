'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn, tv } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

// =============================================================================
// VARIANTS
// =============================================================================

const sidebarItemVariants = tv({
  base: [
    'flex w-full items-center gap-200 px-50 py-50 rounded-sm',
    'text-body-xs text-left transition-colors duration-fast ease-default',
    'hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong',
  ],
  variants: {
    active: {
      true: 'bg-secondary text-fg-primary hover:bg-secondary text-label-xs font-medium',
      false: 'text-fg-secondary hover:text-fg-primary',
    },
  },
  defaultVariants: {
    active: false,
  },
})

const groupHeaderVariants = tv({
  base: [
    'flex w-full items-center justify-between px-50 py-25 rounded-sm',
    'text-label-2xs text-fg-muted uppercase tracking-wider',
    'cursor-pointer select-none',
    'hover:bg-subtle transition-colors duration-fast ease-default',
  ],
})

// =============================================================================
// TYPES
// =============================================================================

export interface SidebarItem {
  href: string
  label: string
  icon?: React.ReactNode
}

export interface SidebarGroup {
  label: string
  items: SidebarItem[]
  defaultOpen?: boolean
}

// =============================================================================
// COMPONENTS
// =============================================================================

interface SidebarItemComponentProps {
  item: SidebarItem
  isActive: boolean
}

const SidebarItemComponent = ({ item, isActive }: SidebarItemComponentProps) => {
  return (
    <Link
      href={item.href}
      className={cn(sidebarItemVariants({ active: isActive }))}
    >
      {item.icon && <span className="flex-shrink-0 size-icon-xs">{item.icon}</span>}
      <span>{item.label}</span>
    </Link>
  )
}

interface SidebarGroupComponentProps {
  group: SidebarGroup
  pathname: string
}

const SidebarGroupComponent = ({ group, pathname }: SidebarGroupComponentProps) => {
  const hasActiveItem = group.items.some(item => pathname === item.href)
  const [isOpen, setIsOpen] = React.useState(group.defaultOpen ?? hasActiveItem)

  // Auto-open group if it contains active item
  React.useEffect(() => {
    if (hasActiveItem && !isOpen) {
      setIsOpen(true)
    }
  }, [hasActiveItem, isOpen])

  return (
    <div className="space-y-25">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={groupHeaderVariants()}
      >
        <span>{group.label}</span>
        <ChevronDown
          className={cn(
            'size-icon-md transition-transform duration-fast',
            isOpen ? 'rotate-0' : '-rotate-90'
          )}
        />
      </button>
      {isOpen && (
        <div className="space-y-2 ">
          {group.items.map((item) => (
            <SidebarItemComponent
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// SIDEBAR PROPS
// =============================================================================

interface SidebarProps {
  items?: SidebarItem[]
  groups?: SidebarGroup[]
  title?: string
  className?: string
}

export const Sidebar = ({ items, groups, title = 'Navigation', className }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'w-64 h-screen bg-surface border-r border-border-subtle sticky top-0',
        'flex flex-col overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="px-75 py-75 border-b border-border-subtle shrink-0">
        <h2 className="text-label-sm font-semibold text-fg-primary">{title}</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-50 py-75 space-y-75">
        {/* Grouped items */}
        {groups?.map((group, index) => (
          <React.Fragment key={group.label}>
            <SidebarGroupComponent group={group} pathname={pathname} />
            {index < groups.length - 1 && (
              <div className="border-t border-border-weak my-50" />
            )}
          </React.Fragment>
        ))}

        {/* Flat items (backwards compatibility) */}
        {items && !groups && (
          <div className="space-y-2">
            {items.map((item) => (
              <SidebarItemComponent
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}

export type { SidebarItem as SidebarItemType, SidebarGroup as SidebarGroupType }
