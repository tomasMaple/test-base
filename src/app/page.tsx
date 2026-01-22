import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const prototypes = [
  {
    title: 'BEXP Dash View Only MVP',
    description: 'Minimal loan portfolio view',
    href: '/borrower-mvp',
    lastChanged: '2026-01-22',
  },
  {
    title: 'BEXP Dash View Only Full',
    description: 'Full loan portfolio with cards view and LTV calculator',
    href: '/borrower',
    lastChanged: '2026-01-22',
  },
  {
    title: 'Components',
    description: 'Component library showcase',
    href: '/overview',
    lastChanged: '2026-01-20',
  },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-150 py-200 flex flex-col gap-150">
      <div className="flex flex-col gap-50">
        <h1 className="text-heading-h3 font-semibold text-fg-primary">
          Prototypes
        </h1>
        <p className="text-body-sm text-fg-secondary">
          Select a prototype to explore.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-100">
        {prototypes.map((prototype) => (
          <Link
            key={prototype.href}
            href={prototype.href}
            className="group p-100 bg-surface rounded-lg border border-subtle hover:border-brand transition-colors"
          >
            <div className="flex flex-col gap-50 h-full">
              <div className="flex items-start justify-between gap-50">
                <h2 className="text-heading-h6 font-medium text-fg-primary group-hover:text-brand transition-colors">
                  {prototype.title}
                </h2>
                <ArrowRight className="size-4 text-fg-tertiary group-hover:text-brand transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-body-xs text-fg-tertiary flex-1">
                {prototype.description}
              </p>
              <p className="text-body-xs text-fg-muted">
                Updated {formatDate(prototype.lastChanged)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
