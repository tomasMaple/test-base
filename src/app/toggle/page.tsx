import { Toggle } from '@/components/ui'
import { Bold, Italic, Underline } from 'lucide-react'

export default function TogglePage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Toggle Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            Explore all toggle variants, sizes, and states
          </p>
        </header>

        {/* Variants */}
        <section className="space-y-100">
          <h2 className="heading-h5">Variants</h2>
          <div className="flex flex-wrap gap-75">
            <div className="flex flex-col gap-25">
              <span className="label-fixed-small text-fg-secondary">Default</span>
              <div className="flex gap-2">
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
            </div>

            <div className="flex flex-col gap-25">
              <span className="label-fixed-small text-fg-secondary">Outline</span>
              <div className="flex gap-2">
                <Toggle variant="outline" aria-label="Toggle bold">
                  <Bold className="size-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="Toggle italic">
                  <Italic className="size-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="Toggle underline">
                  <Underline className="size-4" />
                </Toggle>
              </div>
            </div>

            <div className="flex flex-col gap-25">
              <span className="label-fixed-small text-fg-secondary">Ghost</span>
              <div className="flex gap-2">
                <Toggle variant="ghost" aria-label="Toggle bold">
                  <Bold className="size-4" />
                </Toggle>
                <Toggle variant="ghost" aria-label="Toggle italic">
                  <Italic className="size-4" />
                </Toggle>
                <Toggle variant="ghost" aria-label="Toggle underline">
                  <Underline className="size-4" />
                </Toggle>
              </div>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Sizes</h2>
          <div className="flex flex-wrap items-end gap-75">
            <div className="flex flex-col gap-25">
              <span className="label-fixed-small text-fg-secondary">Small</span>
              <Toggle size="small" aria-label="Toggle bold">
                <Bold className="size-3.5" />
              </Toggle>
            </div>
            <div className="flex flex-col gap-25">
              <span className="label-fixed-small text-fg-secondary">Medium</span>
              <Toggle size="medium" aria-label="Toggle bold">
                <Bold className="size-4" />
              </Toggle>
            </div>
            <div className="flex flex-col gap-25">
              <span className="label-fixed-small text-fg-secondary">Large</span>
              <Toggle size="large" aria-label="Toggle bold">
                <Bold className="size-5" />
              </Toggle>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-100">
          <h2 className="heading-h5">States</h2>
          <div className="flex flex-wrap gap-75">
            <Toggle aria-label="Normal toggle">
              <Bold className="size-4" />
            </Toggle>
            <Toggle defaultPressed aria-label="Pressed toggle">
              <Bold className="size-4" />
            </Toggle>
            <Toggle disabled aria-label="Disabled toggle">
              <Bold className="size-4" />
            </Toggle>
            <Toggle disabled defaultPressed aria-label="Disabled pressed toggle">
              <Bold className="size-4" />
            </Toggle>
          </div>
        </section>
      </main>
    </div>
  )
}
