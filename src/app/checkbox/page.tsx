'use client'

import { Checkbox } from '@/components/ui/checkbox'

export default function CheckboxPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Checkbox Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            A high-quality, easily stylable checkbox component.
          </p>
        </header>

        {/* Basic Usage */}
        <section className="space-y-100">
          <h2 className="heading-h5">Basic Usage</h2>
          <div className="flex flex-col gap-75">
            <Checkbox label="Base Checkbox" />
            <Checkbox label="Default Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled Checked" disabled defaultChecked />
          </div>
        </section>

        {/* States and Interactions */}
        <section className="space-y-100">
          <h2 className="heading-h5">States & Interactions</h2>
          <div className="p-100 border border-border-subtle rounded-md bg-surface space-y-100">
            <p className="label-fixed-small text-fg-secondary italic">
              Try interacting with these checkboxes to see focus and active states.
            </p>
            <div className="grid grid-cols-2 gap-100">
              <div className="space-y-50">
                <h3 className="label-fixed-base font-bold">Unchecked</h3>
                <Checkbox label="Focus me via Tab" />
                <Checkbox label="Hover over me" />
              </div>
              <div className="space-y-50">
                <h3 className="label-fixed-base font-bold">Checked</h3>
                <Checkbox label="Already checked" defaultChecked />
                <Checkbox label="Check me" />
              </div>
            </div>
          </div>
        </section>

        {/* Integration Example */}
        <section className="space-y-100">
          <h2 className="heading-h5">Form Integration Preview</h2>
          <div className="max-w-md p-100 border border-border-subtle rounded-md space-y-100">
            <form className="space-y-100" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-50">
                <h3 className="label-fixed-medium font-bold">Notification Settings</h3>
                <div className="space-y-50">
                  <Checkbox label="Email notifications" defaultChecked />
                  <Checkbox label="Push notifications" />
                  <Checkbox label="Weekly digest" disabled />
                </div>
              </div>
              <div className="pt-50">
                <button className="bg-inverse-primary text-on-inverse px-100 py-50 rounded-pill label-fixed-small font-medium">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
