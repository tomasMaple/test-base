'use client'

import * as React from 'react'
import { Toggle } from '@/components/ui/toggle'
import { Bold, Italic, Underline } from 'lucide-react'

export default function TogglePage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Toggle</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A two-state button that can be either on or off.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <div className="flex gap-100">
            <Toggle aria-label="Toggle bold">
              <Bold className="size-4" />
            </Toggle>
            <Toggle aria-label="Toggle italic">
              <Italic className="size-4" />
            </Toggle>
            <Toggle aria-label="Toggle underline">
              <Underline className="size-4" />
            </Toggle>
          </div>
        </section>
        
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
           <div className="flex items-center gap-100">
            <Toggle size="sm" aria-label="Small">
              <Bold className="size-3" />
            </Toggle>
            <Toggle size="md" aria-label="Medium">
              <Bold className="size-4" />
            </Toggle>
            <Toggle size="lg" aria-label="Large">
              <Bold className="size-5" />
            </Toggle>
          </div>
        </section>
      </div>
    </div>
  )
}
