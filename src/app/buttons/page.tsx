'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'

export default function ButtonsPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Buttons</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          Standard button styles.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Variants</h2>
          <div className="flex flex-wrap gap-200">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="negative">Negative</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
          <div className="flex flex-wrap items-center gap-200">
            <Button size="xs">XS</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">XL</Button>
          </div>
        </section>
        
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">States</h2>
          <div className="flex flex-wrap gap-200">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
