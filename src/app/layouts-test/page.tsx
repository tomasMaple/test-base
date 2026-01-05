'use client'

import Link from 'next/link'

const layouts = [
  { id: 1, name: 'Page container', description: 'Basic page structure with header and centered content' },
  { id: 2, name: 'Card grid (3 columns)', description: 'Responsive grid: 1 → 2 → 3 columns' },
  { id: 3, name: 'Card grid (4 columns)', description: 'Responsive grid: 1 → 2 → 3 → 4 columns' },
  { id: 4, name: 'Two column equal', description: 'Two equal columns, stacks on mobile' },
  { id: 5, name: 'Dashboard stats row', description: 'Row of metric cards' },
  { id: 6, name: 'Split view', description: 'Master-detail pattern for tables/lists' },
  { id: 7, name: 'Stack layout', description: 'Vertical stack of cards (forms, settings)' },
]

export default function LayoutsIndexPage() {
  return (
    <div className="min-h-screen bg-canvas p-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-heading-h4 text-fg-primary mb-50">Layout patterns</h1>
        <p className="text-body-base text-fg-secondary mb-200">
          Click each layout to see it full-page. This page is temporary.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-150">
          {layouts.map((layout) => (
            <Link
              key={layout.id}
              href={`/layouts-test/${layout.id}`}
              className="bg-surface rounded-lg border border-border-subtle p-150 hover:border-border-weak transition-colors"
            >
              <span className="text-label-md text-fg-primary block mb-25">{layout.id}. {layout.name}</span>
              <span className="text-body-sm text-fg-secondary">{layout.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
