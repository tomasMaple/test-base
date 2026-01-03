'use client'

import * as React from 'react'
import { Select, SelectOption } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

export default function SelectPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Select</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          Displays a list of options for the user to pick from—triggered by a button.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <div className="flex gap-200">
            <Select options={frameworks} placeholder="Select framework" />
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
          <div className="flex flex-col gap-200">
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-secondary-fg">XS</span>
               <Select options={frameworks} placeholder="Select..." size="xs" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-secondary-fg">SM</span>
               <Select options={frameworks} placeholder="Select..." size="sm" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-secondary-fg">MD</span>
               <Select options={frameworks} placeholder="Select..." size="md" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-secondary-fg">LG</span>
               <Select options={frameworks} placeholder="Select..." size="lg" />
             </div>
          </div>
        </section>
      </div>
    </div>
  )
}
