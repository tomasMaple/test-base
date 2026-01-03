'use client'

import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

export default function ScrollAreaPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Scroll Area</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          Augments native scroll functionality for custom, cross-browser styling.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Vertical Scrolling</h2>
          <ScrollArea className="h-72 w-48 rounded-md border border-border-subtle p-100">
            <div className="p-100">
              <h4 className="mb-100 text-label-sm font-medium leading-none">Tags</h4>
              {tags.map((tag) => (
                <div key={tag} className="text-body-sm border-b border-border-subtle py-50 last:border-0 text-fg-secondary">
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea>
        </section>
      </div>
    </div>
  )
}
