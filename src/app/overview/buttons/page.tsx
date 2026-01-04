'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'

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
               <section className="p-300 border border-border-subtle rounded-xl bg-surface ">
          <h2 className="text-heading-h6 mb-200">States</h2>
          <div className="flex flex-wrap gap-200">
            <Button variant="primary" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Primary</Button>
            <Button variant="secondary" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Secondary</Button>
            <Button variant="tertiary" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Tertiary</Button>
            <Button variant="ghost" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Ghost</Button>
            <Button variant="negative" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Negative</Button>
            <Button variant="outline" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Outline</Button>
          </div>
                    <div className="flex flex-wrap gap-200 mt-100">
            <Button variant="primary" size="xs" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Primary</Button>
            <Button variant="secondary" size="sm" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Secondary</Button>
            <Button variant="tertiary" size="md" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Tertiary</Button>
            <Button variant="ghost" size="lg" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Ghost</Button>
            <Button variant="negative" size="xl" beforeIcon={<CheckIcon />} afterIcon={<CheckIcon />}>Negative</Button>
          </div>

        </section>
      </div>
    </div>
  )
}
