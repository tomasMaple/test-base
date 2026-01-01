import { Button } from '@/components/ui/button'
import {
  Add,
  ArrowRight,
  Check,
  Download,
  Heart,
  Search,
  AddFill,
} from '@/icons'

/**
 * Example page demonstrating button component with icon support
 */
export default function ButtonExamplesPage() {
  return (
    <div className="p-150 space-y-150">
      <div>
        <h1 className="text-[var(--text-heading-h4)] font-semibold mb-75">
          Button Icon Examples
        </h1>
        <p className="text-[var(--text-body-fixed-base)] text-fg-secondary mb-100">
          Demonstrating beforeIcon and afterIcon props with custom icons
        </p>
      </div>

      {/* Before Icon */}
      <section className="space-y-50">
        <h2 className="text-[var(--text-heading-h6)] font-medium">Before Icon</h2>
        <div className="flex flex-wrap gap-50">
          <Button variant="primary" size="small" beforeIcon={<Add />}>
            Add Item
          </Button>
          <Button variant="primary" size="medium" beforeIcon={<Add />} afterIcon={<AddFill />}>
           hello
          </Button>
          <Button variant="primary" size="large" beforeIcon={<Add />}>
            Add Item
          </Button>
          <Button variant="primary" size="x-large" beforeIcon={<Add />}>
            Add Item
          </Button>
          <Button variant="primary" size="2x-large" beforeIcon={<Add />}>
            Add Item
          </Button>
        </div>
      </section>

      {/* After Icon */}
      <section className="space-y-50">
        <h2 className="text-[var(--text-heading-h6)] font-medium">After Icon</h2>
        <div className="flex flex-wrap gap-50">
          <Button variant="primary" size="small" afterIcon={<ArrowRight />}>
            Next
          </Button>
          <Button variant="primary" size="medium" afterIcon={<ArrowRight />}>
            Next
          </Button>
          <Button variant="primary" size="large" afterIcon={<ArrowRight />}>
            Next
          </Button>
          <Button variant="primary" size="x-large" afterIcon={<ArrowRight />}>
            Next
          </Button>
          <Button variant="primary" size="2x-large" afterIcon={<ArrowRight />}>
            Next
          </Button>
        </div>
      </section>

      {/* Both Icons */}
      <section className="space-y-50">
        <h2 className="text-[var(--text-heading-h6)] font-medium">Both Icons</h2>
        <div className="flex flex-wrap gap-50">
          <Button
            variant="primary"
            size="medium"
            beforeIcon={<Add />}
            afterIcon={<ArrowRight />}
          >
            Add & Continue
          </Button>
        </div>
      </section>

      {/* Different Variants */}
      <section className="space-y-50">
        <h2 className="text-[var(--text-heading-h6)] font-medium">
          Different Variants with Icons
        </h2>
        <div className="flex flex-wrap gap-50">
          <Button variant="primary" beforeIcon={<Check />}>
            Primary
          </Button>
          <Button variant="secondary" beforeIcon={<Download />}>
            Secondary
          </Button>
          <Button variant="tertiary" beforeIcon={<Search />}>
            Tertiary
          </Button>
          <Button variant="ghost" beforeIcon={<Heart />}>
            Ghost
          </Button>
          <Button variant="negative" beforeIcon={<Add />}>
            Negative
          </Button>
        </div>
      </section>

      {/* Icon Only (No Text) */}
      <section className="space-y-50">
        <h2 className="text-[var(--text-heading-h6)] font-medium">Icon Only Buttons</h2>
        <div className="flex flex-wrap gap-50">
          <Button variant="primary" size="small" beforeIcon={<Add />} />
          <Button variant="primary" size="medium" beforeIcon={<Add />} />
          <Button variant="primary" size="large" beforeIcon={<Add />} />
          <Button variant="primary" size="x-large" beforeIcon={<Add />} />
          <Button variant="primary" size="2x-large" beforeIcon={<Add />} />
        </div>
      </section>

      {/* Full Width */}
      <section className="space-y-50">
        <h2 className="text-[var(--text-heading-h6)] font-medium">Full Width with Icons</h2>
        <div className="space-y-50 max-w-md">
          <Button variant="primary" fullWidth beforeIcon={<Add />}>
            Add New Item
          </Button>
          <Button variant="secondary" fullWidth afterIcon={<ArrowRight />}>
            Continue
          </Button>
          <Button
            variant="primary"
            fullWidth
            beforeIcon={<Check />}
            afterIcon={<ArrowRight />}
          >
            Save and Continue
          </Button>
        </div>
      </section>
    </div>
  )
}

