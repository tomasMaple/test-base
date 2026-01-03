'use client'

import * as React from 'react'
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from '@/components/ui/number-field'

export default function NumberFieldPage() {
  const basicId = React.useId()
  const scrubId = React.useId()
  const minMaxId = React.useId()
  const stepId = React.useId()
  const disabledId = React.useId()

  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Number Field Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            A numeric input element with increment and decrement buttons, and a scrub area.
          </p>
        </header>

        {/* Basic Example */}
        <section className="space-y-100">
          <h2 className="heading-h5">Basic Example</h2>
          <div className="space-y-50">
            <NumberField id={basicId} defaultValue={100}>
              <label htmlFor={basicId} className="label-fixed-small text-fg-primary">
                Amount
              </label>
              <NumberFieldGroup>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>
          </div>
        </section>

        {/* With Scrub Area */}
        <section className="space-y-100">
          <h2 className="heading-h5">With Scrub Area</h2>
          <p className="body-fixed-small text-fg-secondary">
            Click and drag on the label to change the value.
          </p>
          <div className="space-y-50">
            <NumberField id={scrubId} defaultValue={50}>
              <NumberFieldScrubArea>
                <label htmlFor={scrubId} className="label-fixed-small text-fg-primary cursor-ew-resize">
                  Drag to adjust
                </label>
                <NumberFieldScrubAreaCursor />
              </NumberFieldScrubArea>
              <NumberFieldGroup>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Sizes</h2>
          <div className="space-y-150">
            {/* Small */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Small</p>
              <NumberField defaultValue={10}>
                <NumberFieldGroup size="sm">
                  <NumberFieldDecrement size="sm" />
                  <NumberFieldInput size="sm" />
                  <NumberFieldIncrement size="sm" />
                </NumberFieldGroup>
              </NumberField>
            </div>

            {/* Medium */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Medium (Default)</p>
              <NumberField defaultValue={50}>
                <NumberFieldGroup size="md">
                  <NumberFieldDecrement size="md" />
                  <NumberFieldInput size="md" />
                  <NumberFieldIncrement size="md" />
                </NumberFieldGroup>
              </NumberField>
            </div>

            {/* Large */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Large</p>
              <NumberField defaultValue={100}>
                <NumberFieldGroup size="lg">
                  <NumberFieldDecrement size="lg" />
                  <NumberFieldInput size="lg" />
                  <NumberFieldIncrement size="lg" />
                </NumberFieldGroup>
              </NumberField>
            </div>
          </div>
        </section>

        {/* Min/Max Constraints */}
        <section className="space-y-100">
          <h2 className="heading-h5">Min/Max Constraints</h2>
          <p className="body-fixed-small text-fg-secondary">
            Value is constrained between 0 and 10.
          </p>
          <NumberField id={minMaxId} defaultValue={5} min={0} max={10}>
            <label htmlFor={minMaxId} className="label-fixed-small text-fg-primary">
              Quantity (0-10)
            </label>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </section>

        {/* Custom Step */}
        <section className="space-y-100">
          <h2 className="heading-h5">Custom Step</h2>
          <p className="body-fixed-small text-fg-secondary">
            Increments by 0.5. Hold Shift for large step (5), Meta for small step (0.1).
          </p>
          <NumberField
            id={stepId}
            defaultValue={0}
            step={0.5}
            largeStep={5}
            smallStep={0.1}
          >
            <label htmlFor={stepId} className="label-fixed-small text-fg-primary">
              Decimal Value
            </label>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </section>

        {/* States */}
        <section className="space-y-100">
          <h2 className="heading-h5">States</h2>
          <div className="flex flex-wrap gap-150">
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Disabled</p>
              <NumberField id={disabledId} defaultValue={42} disabled>
                <NumberFieldGroup>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
            </div>

            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Read Only</p>
              <NumberField defaultValue={99} readOnly>
                <NumberFieldGroup>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
