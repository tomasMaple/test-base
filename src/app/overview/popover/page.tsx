'use client'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default function PopoverPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Popover Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            An accessible popup anchored to a button.
          </p>
        </header>

        {/* Basic Example with Button and Label */}
        <section className="space-y-100">
          <h2 className="heading-h5">Popover with Button</h2>
          <div className="flex flex-wrap items-start gap-100">
            <Popover>
              <PopoverTrigger>Open Popover</PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Popover Title</PopoverTitle>
                <PopoverDescription>
                  This is a label text inside the popover content.
                </PopoverDescription>
                <div className="mt-100">
                  <Button size="sm" variant="primary">
                    Action Button
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </section>
      </main>
    </div>
  )
}
