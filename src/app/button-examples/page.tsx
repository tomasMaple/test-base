'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, ChevronRight } from 'lucide-react'

export default function ButtonExamplesPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Button Examples</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          Various button configurations and states.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">With Icons</h2>
          <div className="flex flex-wrap gap-200 items-center">
            <Button size="sm" beforeIcon={<Plus className="size-4" />}>
              Add Item
            </Button>
            <Button size="sm" afterIcon={<ChevronRight className="size-4" />}>
              Next Step
            </Button>
            <Button size="icon">
               <Plus className="size-4" />
            </Button>
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Full Width</h2>
          <div className="w-[300px]">
            <Button fullWidth>Sign In</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
