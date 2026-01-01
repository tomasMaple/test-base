import { Button } from '@/components/ui'
import { AddFill, ArrowRightFill, SearchFill } from '@/icons'

export default function ButtonsPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Button Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            Explore all button variants, sizes, and states
          </p>
        </header>

        {/* Icons */}
        <section className="space-y-100">
          <h2 className="heading-h5">Buttons with Icons</h2>
          <div className="flex flex-wrap items-center gap-75">
            <Button beforeIcon={<AddFill />}>Before Icon</Button>
            <Button afterIcon={<ArrowRightFill />}>After Icon</Button>
            <Button beforeIcon={<AddFill />} afterIcon={<ArrowRightFill />}>
              Both Icons
            </Button>
            <Button variant="secondary" beforeIcon={<SearchFill />}>
              Search
            </Button>
            <Button variant="ghost" beforeIcon={<AddFill />} />
          </div>
        </section>

        {/* Variants */}
        <section className="space-y-100">
          <h2 className="heading-h5">Button Variants</h2>
          <div className="flex flex-wrap gap-75">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="negative">Negative</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-75">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
            <Button size="x-large">X-Large</Button>
            <Button size="2x-large">2X-Large</Button>
          </div>
        </section>

        {/* States */}
        <section className="space-y-100">
          <h2 className="heading-h5">Button States</h2>
          <div className="flex flex-wrap gap-75">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full Width</Button>
          </div>
        </section>

        {/* Combined */}
        <section className="space-y-100">
          <h2 className="heading-h5">Combined Variants</h2>
          <div className="flex flex-wrap gap-75">
            <Button variant="secondary" size="large">
              Large Secondary
            </Button>
            <Button variant="tertiary" size="small">
              Small Tertiary
            </Button>
            <Button variant="negative" size="x-large">
              XL Negative
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

