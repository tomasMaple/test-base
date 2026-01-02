import { Switch } from '@/components/ui'

export default function SwitchPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Switch Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            Toggle switches for binary settings and preferences.
          </p>
        </header>

        {/* Variants */}
        <section className="space-y-100">
          <h2 className="heading-h5">Color Variants</h2>
          <div className="flex flex-wrap gap-100">
            <div className="flex items-center gap-50">
              <Switch variant="brand" defaultChecked id="sw-brand" />
              <label htmlFor="sw-brand" className="label-fixed-small">Brand Variant</label>
            </div>
            <div className="flex items-center gap-50">
              <Switch variant="neutral" defaultChecked id="sw-neutral" />
              <label htmlFor="sw-neutral" className="label-fixed-small">Neutral Variant</label>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Sizes</h2>
          <div className="flex flex-col gap-75">
            <div className="flex items-center gap-50">
              <Switch size="sm" id="sw-sm" />
              <label htmlFor="sw-sm" className="label-fixed-small">Small (sm)</label>
            </div>
            <div className="flex items-center gap-50">
              <Switch size="md" id="sw-md" />
              <label htmlFor="sw-md" className="label-fixed-small">Medium (md)</label>
            </div>
            <div className="flex items-center gap-50" >
              <Switch size="lg" id="sw-lg" />
              <label htmlFor="sw-lg" className="label-fixed-small">Large (lg)</label>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-100">
          <h2 className="heading-h5">States</h2>
          <div className="flex flex-wrap gap-100">
            <div className="flex items-center gap-50 opacity-50 pointer-events-none">
              <Switch disabled id="sw-disabled" />
              <label htmlFor="sw-disabled" className="label-fixed-small">Disabled Unchecked</label>
            </div>
            <div className="flex items-center gap-50 opacity-50 pointer-events-none">
              <Switch disabled defaultChecked id="sw-disabled-checked" />
              <label htmlFor="sw-disabled-checked" className="label-fixed-small">Disabled Checked</label>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
