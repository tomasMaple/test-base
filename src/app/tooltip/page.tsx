'use client'

import * as React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function TooltipPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Tooltip</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <div className="flex gap-100">
            <Tooltip>
              <TooltipTrigger>
                <div className="inline-flex items-center justify-center size-10 rounded-full border border-border-subtle hover:bg-subtle cursor-pointer">
                  <Plus className="size-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </section>
      </div>
    </div>
  )
}
