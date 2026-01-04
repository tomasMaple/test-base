'use client'

import * as React from 'react'
import { NumberField } from '@/components/ui/number-field'

export default function NumberFieldPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Number Field</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A text input that allows users to enter a number.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <NumberField />
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
          <div className="flex flex-col gap-200">
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-secondary-fg">XS</span>
               <NumberField size="xs" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-secondary-fg">SM</span>
               <NumberField size="sm" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-secondary-fg">MD</span>
               <NumberField size="md" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-secondary-fg">LG</span>
               <NumberField size="lg" />
             </div>
          </div>
        </section>
      </div>
    </div>
  )
}
