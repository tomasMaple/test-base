import { Button } from '@/components/ui'

export default function Home() {
  return (
    <div className="min-h-screen p-200">
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
            <Button variant="ghost">Ghost</Button>
            <Button variant="positive">Positive</Button>
            <Button variant="negative">Negative</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="info">Info</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-75">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
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
            <Button variant="positive" size="lg"    >
              Large Pill Positive
            </Button>
            <Button variant="secondary" size="sm">
              Small Secondary
            </Button>
            <Button variant="negative" size="xl">
              XL Negative
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
