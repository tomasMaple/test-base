'use client'

import * as React from 'react'
import { Progress } from '@/components/ui'

export default function ProgressPage() {
  const [value, setValue] = React.useState(25)

  // Simulate progress
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 5))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Progress Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            Visual indicator for tasks that take time.
          </p>
        </header>

        {/* Dynamic Example */}
        <section className="space-y-100">
          <h2 className="heading-h5">Simulated Progress</h2>
          <div className="p-100 bg-surface rounded-md border border-border-subtle max-w-sm">
            <Progress 
              value={value} 
              label="Syncing files..." 
              showValue 
              variant="brand" 
              size="md"
            />
          </div>
        </section>

        {/* Color Variants */}
        <section className="space-y-100">
          <h2 className="heading-h5">Color Variants</h2>
          <div className="space-y-75 max-w-md">
            <Progress value={75} label="Brand (Default)" showValue variant="brand" />
            <Progress value={100} label="Positive" showValue variant="positive" />
            <Progress value={45} label="Neutral" showValue variant="neutral" />
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Sizes</h2>
          <div className="space-y-100 max-w-md">
            <Progress value={60} label="Extra Small (xs)" size="xs" />
            <Progress value={60} label="Small (sm)" size="sm" />
            <Progress value={60} label="Medium (md)" size="md" />
            <Progress value={60} label="Large (lg)" size="lg" />
          </div>
        </section>

        {/* Indeterminate State */}
        <section className="space-y-100">
          <h2 className="heading-h5">Indeterminate State</h2>
          <div className="max-w-md">
            <Progress value={null} label="Loading something..." />
          </div>
        </section>
      </main>
    </div>
  )
}
