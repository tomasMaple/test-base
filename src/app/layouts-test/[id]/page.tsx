'use client'

import { Button, DashboardCard, IconButton } from '@/components/ui'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const TOTAL_LAYOUTS = 7

// Layout 1: Page Container
function PageContainerLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-border-weak p-100">
        <h1 className="text-heading-h5 text-fg-primary">Page title</h1>
      </header>
      <main className="p-200 max-w-6xl mx-auto">
        <div className="bg-surface rounded-lg p-150">
          <h2 className="text-heading-h6 text-fg-primary mb-100">Main content</h2>
          <p className="text-body-base text-fg-secondary">
            This layout uses max-w-6xl with mx-auto to center content. The header spans full width with a subtle border.
          </p>
        </div>
      </main>
    </div>
  )
}

// Layout 2: Card Grid 3 Columns
function CardGrid3Layout() {
  return (
    <div className="min-h-screen bg-canvas p-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-heading-h5 text-fg-primary mb-150">Card grid (3 columns)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-150">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-surface rounded-lg border border-border-subtle p-150">
              <h3 className="text-label-md text-fg-primary mb-50">Card {i}</h3>
              <p className="text-body-sm text-fg-secondary">Card content goes here</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Layout 3: Card Grid 4 Columns
function CardGrid4Layout() {
  return (
    <div className="min-h-screen bg-canvas p-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-heading-h5 text-fg-primary mb-150">Card grid (4 columns)</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-150">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-surface rounded-lg border border-border-subtle p-150">
              <h3 className="text-label-md text-fg-primary mb-50">Card {i}</h3>
              <p className="text-body-sm text-fg-secondary">Content</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Layout 4: Two Column Equal
function TwoColumnLayout() {
  return (
    <div className="min-h-screen bg-canvas p-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-heading-h5 text-fg-primary mb-150">Two column equal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-150">
          <div className="bg-surface rounded-lg p-150">
            <h3 className="text-label-md text-fg-primary mb-75">Column 1</h3>
            <p className="text-body-sm text-fg-secondary">Left column content. Both columns are equal width and stack on mobile.</p>
          </div>
          <div className="bg-surface rounded-lg p-150">
            <h3 className="text-label-md text-fg-primary mb-75">Column 2</h3>
            <p className="text-body-sm text-fg-secondary">Right column content. Use for comparison layouts, forms with preview, etc.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Layout 5: Dashboard Stats Row
function DashboardStatsLayout() {
  return (
    <div className="min-h-screen bg-canvas p-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-heading-h5 text-fg-primary mb-150">Dashboard stats row</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-150">
          <DashboardCard size="sm">
            <DashboardCard.Metric value="$1,234,567.00" label="Total value" change="+12.5%" trend="positive" />
          </DashboardCard>
          <DashboardCard size="sm">
            <DashboardCard.Metric value="$45,678.00" label="Monthly revenue" change="+5.2%" trend="positive" />
          </DashboardCard>
          <DashboardCard size="sm">
            <DashboardCard.Metric value="1,234" label="Active users" change="-2.1%" trend="negative" />
          </DashboardCard>
          <DashboardCard size="sm">
            <DashboardCard.Metric value="98.50%" label="Uptime" trend="neutral" />
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}

// Layout 6: Split View
function SplitViewLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-border-weak p-100">
        <h1 className="text-heading-h5 text-fg-primary">Split view (list + detail)</h1>
      </header>
      <div className="flex h-[calc(100vh-57px)]">
        {/* List */}
        <div className="w-1/3 border-r border-border-weak bg-surface overflow-auto">
          <div className="p-100 border-b border-border-subtle">
            <span className="text-label-sm text-fg-primary">Items list</span>
          </div>
          <div className="divide-y divide-border-subtle">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className={`p-100 cursor-pointer hover:bg-primary ${i === 1 ? 'bg-primary' : ''}`}>
                <span className="text-label-sm text-fg-primary">Item {i}</span>
                <p className="text-body-xs text-fg-secondary">Description</p>
              </div>
            ))}
          </div>
        </div>
        {/* Detail */}
        <div className="flex-1 bg-canvas p-150 overflow-auto">
          <h2 className="text-heading-h6 text-fg-primary mb-100">Item 1 details</h2>
          <p className="text-body-base text-fg-secondary">
            Detail content for the selected item. This pattern is useful for email clients, file managers, settings pages, etc.
          </p>
        </div>
      </div>
    </div>
  )
}

// Layout 7: Stack Layout
function StackLayout() {
  return (
    <div className="min-h-screen bg-canvas p-200">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-heading-h5 text-fg-primary mb-150">Stack layout</h1>
        <div className="space-y-150">
          <div className="bg-surface rounded-lg p-150">
            <h3 className="text-label-md text-fg-primary mb-75">Section 1</h3>
            <p className="text-body-sm text-fg-secondary">Content for this section. Good for forms, settings, long content.</p>
          </div>
          <div className="bg-surface rounded-lg p-150">
            <h3 className="text-label-md text-fg-primary mb-75">Section 2</h3>
            <p className="text-body-sm text-fg-secondary">Another section. Each card is a logical grouping.</p>
          </div>
          <div className="bg-surface rounded-lg p-150">
            <h3 className="text-label-md text-fg-primary mb-75">Section 3</h3>
            <p className="text-body-sm text-fg-secondary">Final section with action buttons.</p>
            <div className="flex gap-75 mt-100">
              <Button variant="secondary">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const layouts: Record<string, { component: React.ComponentType; name: string }> = {
  '1': { component: PageContainerLayout, name: 'Page container' },
  '2': { component: CardGrid3Layout, name: 'Card grid (3 columns)' },
  '3': { component: CardGrid4Layout, name: 'Card grid (4 columns)' },
  '4': { component: TwoColumnLayout, name: 'Two column equal' },
  '5': { component: DashboardStatsLayout, name: 'Dashboard stats row' },
  '6': { component: SplitViewLayout, name: 'Split view' },
  '7': { component: StackLayout, name: 'Stack layout' },
}

export default function LayoutPage() {
  const params = useParams()
  const id = params.id as string
  const currentId = parseInt(id, 10)
  
  const layout = layouts[id]
  
  if (!layout) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-h4 text-fg-primary mb-100">Layout not found</h1>
          <Link href="/layouts-test" className="text-brand hover:underline">
            Back to layouts
          </Link>
        </div>
      </div>
    )
  }

  const LayoutComponent = layout.component
  
  // Calculate prev/next with wrap-around
  const prevId = currentId === 1 ? TOTAL_LAYOUTS : currentId - 1
  const nextId = currentId === TOTAL_LAYOUTS ? 1 : currentId + 1

  return (
    <div className="relative">
      {/* Top bar with close and title */}
      <div className="fixed top-100 right-100 z-50 flex items-center gap-75">
        <span className="bg-surface border border-border-subtle rounded-md px-75 py-50 text-label-sm text-fg-secondary">
          {currentId}/{TOTAL_LAYOUTS}: {layout.name}
        </span>
        <Link href="/layouts-test">
          <IconButton variant="secondary" aria-label="Close">
            <X />
          </IconButton>
        </Link>
      </div>
      
      {/* Navigation buttons at bottom */}
      <div className="fixed bottom-100 left-1/2 -translate-x-1/2 z-50 flex items-center gap-75 bg-surface border border-border-subtle rounded-pill px-50 py-50 shadow-300">
        <Link href={`/layouts-test/${prevId}`}>
          <IconButton variant="ghost" aria-label="Previous layout">
            <ChevronLeft />
          </IconButton>
        </Link>
        <span className="text-label-sm text-fg-secondary px-50">{currentId} / {TOTAL_LAYOUTS}</span>
        <Link href={`/layouts-test/${nextId}`}>
          <IconButton variant="ghost" aria-label="Next layout">
            <ChevronRight />
          </IconButton>
        </Link>
      </div>
      
      <LayoutComponent />
    </div>
  )
}
