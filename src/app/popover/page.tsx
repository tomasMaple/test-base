'use client'

import { Bell, Info, Settings } from 'lucide-react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from '@/components/ui/popover'

export default function PopoverPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Popover Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            An accessible popup anchored to a button. Displays content when triggered.
          </p>
        </header>

        {/* Basic Example */}
        <section className="space-y-100">
          <h2 className="heading-h5">Basic Popover</h2>
          <div className="flex flex-wrap items-start gap-100">
            <Popover>
              <PopoverTrigger>
                <Bell />
                <span>Notifications</span>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Notifications</PopoverTitle>
                <PopoverDescription>
                  You are all caught up. Good job!
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </div>
        </section>

        {/* Trigger Variants */}
        <section className="space-y-100">
          <h2 className="heading-h5">Trigger Variants</h2>
          <div className="flex flex-wrap items-start gap-75">
            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Solid (Secondary)</p>
              <Popover>
                <PopoverTrigger variant="secondary">
                  <Info />
                  <span>Secondary</span>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverTitle>Secondary Variant</PopoverTitle>
                  <PopoverDescription>
                    This popover uses a secondary trigger button.
                  </PopoverDescription>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Outline</p>
              <Popover>
                <PopoverTrigger variant="outline">
                  <Info />
                  <span>Outline</span>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverTitle>Outline Variant</PopoverTitle>
                  <PopoverDescription>
                    This popover uses an outline trigger button.
                  </PopoverDescription>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Ghost</p>
              <Popover>
                <PopoverTrigger variant="ghost">
                  <Info />
                  <span>Ghost</span>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverTitle>Ghost Variant</PopoverTitle>
                  <PopoverDescription>
                    This popover uses a ghost trigger button.
                  </PopoverDescription>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Trigger Sizes</h2>
          <div className="flex flex-wrap items-end gap-75">
            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Small</p>
              <Popover>
                <PopoverTrigger size="sm">
                  <Settings />
                  <span>Small</span>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverTitle>Small Trigger</PopoverTitle>
                  <PopoverDescription>
                    A popover with a small trigger button.
                  </PopoverDescription>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Medium (Default)</p>
              <Popover>
                <PopoverTrigger size="md">
                  <Settings />
                  <span>Medium</span>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverTitle>Medium Trigger</PopoverTitle>
                  <PopoverDescription>
                    A popover with a medium trigger button.
                  </PopoverDescription>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Large</p>
              <Popover>
                <PopoverTrigger size="lg">
                  <Settings />
                  <span>Large</span>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverTitle>Large Trigger</PopoverTitle>
                  <PopoverDescription>
                    A popover with a large trigger button.
                  </PopoverDescription>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>

        {/* With Close Button */}
        <section className="space-y-100">
          <h2 className="heading-h5">With Close Button</h2>
          <div className="flex flex-wrap items-start gap-100">
            <Popover>
              <PopoverTrigger>
                <Info />
                <span>Click for details</span>
              </PopoverTrigger>
              <PopoverContent className="pr-250">
                <PopoverClose />
                <PopoverTitle>More Information</PopoverTitle>
                <PopoverDescription>
                  This popover has a close button in the top-right corner.
                  Click it or press Escape to dismiss.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </div>
        </section>

        {/* Without Arrow */}
        <section className="space-y-100">
          <h2 className="heading-h5">Without Arrow</h2>
          <div className="flex flex-wrap items-start gap-100">
            <Popover>
              <PopoverTrigger>
                <Info />
                <span>No Arrow</span>
              </PopoverTrigger>
              <PopoverContent showArrow={false}>
                <PopoverTitle>Clean Look</PopoverTitle>
                <PopoverDescription>
                  This popover does not display an arrow.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </div>
        </section>
      </main>
    </div>
  )
}
