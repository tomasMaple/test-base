'use client'

import * as React from 'react'
import { 
  Field, 
  FieldRoot, 
  FieldLabel, 
  FieldDescription, 
  FieldControl, 
  FieldError 
} from '@/components/ui/field'
import { Button } from '@/components/ui/button'

export default function FieldPage() {
  const [hasError, setHasError] = React.useState(false)

  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Field</h1>
        <p className="text-body-base text-fg-secondary">
          A component that provides labeling and validation for form controls.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        {/* Basic Example */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <Field
            label="Name"
            placeholder="Enter your name"
          />
        </section>

        {/* With Description */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">With Description</h2>
          <Field
            label="Email"
            description="We'll never share your email with anyone else."
            placeholder="you@example.com"
            type="email"
          />
        </section>

        {/* Sizes */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
          <div className="flex flex-col gap-200">
            <div className="flex items-start gap-300">
              <Field
                label="Extra Small (xs)"
                description="Compact size for dense UIs"
                placeholder="XS field"
                size="xs"
              />
              <Field
                label="Small (sm)"
                description="Slightly larger than xs"
                placeholder="SM field"
                size="sm"
              />
            </div>
            <div className="flex items-start gap-300">
              <Field
                label="Medium (md)"
                description="Default size"
                placeholder="MD field"
                size="md"
              />
              <Field
                label="Large (lg)"
                description="For prominent inputs"
                placeholder="LG field"
                size="lg"
              />
            </div>
          </div>
        </section>

        {/* Error State */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Error State</h2>
          <div className="flex flex-col gap-200">
            <div className="flex items-center gap-100 mb-100">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setHasError(!hasError)}
              >
                Toggle Error
              </Button>
              <span className="text-body-xs text-fg-muted">
                Error is {hasError ? 'ON' : 'OFF'}
              </span>
            </div>
            <Field
              label="Username"
              description="Choose a unique username"
              placeholder="Enter username"
              invalid={hasError}
              errorMessage="This username is already taken"
            />
          </div>
        </section>

        {/* Composition Example */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Composition Example</h2>
          <p className="text-body-xs text-fg-muted mb-200">
            Using individual field components for full control
          </p>
          <FieldRoot size="md" invalid={hasError}>
            <FieldLabel size="md">Password</FieldLabel>
            <FieldDescription size="md">
              Must be at least 8 characters
            </FieldDescription>
            <FieldControl 
              size="md" 
              type="password" 
              placeholder="Enter password" 
            />
            <FieldError size="md" match={hasError}>
              Password is too weak
            </FieldError>
          </FieldRoot>
        </section>

        {/* Required Field */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Required Field</h2>
          <Field
            label="Company Name"
            description="Required for business accounts"
            placeholder="Acme Inc."
            required
          />
        </section>
      </div>
    </div>
  )
}
