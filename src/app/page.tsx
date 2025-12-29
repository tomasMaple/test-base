import { Button } from '@/components/ui'

export default function Home() {
  return (
    <div className="min-h-screen p-200 bg-surface">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Component Library</h1>
          <p className="body-fixed-medium text-fg-secondary">
            BaseUI + Tailwind v4 + Tailwind Variants + Supernova Design Tokens
          </p>
        </header>

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
