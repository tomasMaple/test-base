'use client'

import { Radio, RadioGroup } from '@/components/ui/radio-group'

export default function RadioPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Radio Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            A high-quality, easily stylable radio button component.
          </p>
        </header>

        {/* Basic Usage */}
        <section className="space-y-100">
          <h2 className="heading-h5">Basic Usage</h2>
          <div className="flex flex-col gap-75">
            <RadioGroup defaultValue="option1">
              <Radio value="option1" label="Option 1" />
              <Radio value="option2" label="Option 2" />
              <Radio value="option3" label="Disabled" disabled />
              <Radio value="option4" label="Disabled Selected" disabled />
            </RadioGroup>
            <RadioGroup defaultValue="disabled-selected">
              <Radio value="disabled-selected" label="Disabled Selected" disabled />
            </RadioGroup>
          </div>
        </section>

        {/* States and Interactions */}
        <section className="space-y-100">
          <h2 className="heading-h5">States & Interactions</h2>
          <div className="p-100 border border-border-subtle rounded-md bg-surface space-y-100">
            <p className="label-fixed-small text-fg-secondary italic">
              Try interacting with these radio buttons to see focus and active states.
            </p>
            <div className="grid grid-cols-2 gap-100">
              <div className="space-y-50">
                <h3 className="label-fixed-base font-bold">Unselected</h3>
                <RadioGroup>
                  <Radio value="focus" label="Focus me via Tab" />
                  <Radio value="hover" label="Hover over me" />
                </RadioGroup>
              </div>
              <div className="space-y-50">
                <h3 className="label-fixed-base font-bold">Selected</h3>
                <RadioGroup defaultValue="selected">
                  <Radio value="selected" label="Already selected" />
                  <Radio value="select-me" label="Select me" />
                </RadioGroup>
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
                <h3 className="label-fixed-medium font-bold">Preferred Contact Method</h3>
                <RadioGroup defaultValue="email" name="contact">
                  <Radio value="email" label="Email" />
                  <Radio value="phone" label="Phone" />
                  <Radio value="mail" label="Mail" disabled />
                </RadioGroup>
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
