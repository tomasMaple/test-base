'use client'

import * as React from 'react'
import { Select, SelectOption } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

export default function SelectPage() {
  const [hasError, setHasError] = React.useState(false)

  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Select</h1>
        <p className="text-body-fixed-base text-fg-secondary">
          Displays a list of options for the user to pick from—triggered by a button.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <div className="flex gap-200">
            <Select options={frameworks} />
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
          <div className="flex flex-col gap-200">
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-fg-secondary">XS</span>
               <Select options={frameworks} size="xs" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-fg-secondary">SM</span>
               <Select options={frameworks} size="sm" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-fg-secondary">MD</span>
               <Select options={frameworks} size="md" />
             </div>
             <div className="flex items-center gap-100">
               <span className="w-20 text-label-xs text-fg-secondary">LG</span>
               <Select options={frameworks} size="lg" />
             </div>
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes with Field Elements</h2>
          <p className="text-body-xs text-fg-muted mb-200">Label, description, and helper text scale with size</p>
          <div className="flex flex-wrap gap-300">
            <Select 
              options={frameworks}
              size="xs"
              label="Framework (XS)"
              description="Small description"
              helperText="Helper text"
            />
            <Select 
              options={frameworks}
              size="sm"
              label="Framework (SM)"
              description="Small description"
              helperText="Helper text"
            />
            <Select 
              options={frameworks}
              size="md"
              label="Framework (MD)"
              description="Medium description"
              helperText="Helper text"
            />
            <Select 
              options={frameworks}
              size="lg"
              label="Framework (LG)"
              description="Large description"
              helperText="Helper text"
            />
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Error State</h2>
          <div className="flex flex-col gap-300">
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
            <Select 
              options={frameworks}
              label="Framework"
              description="Choose the framework for your project"
              helperText="Required for project generation"
              error={hasError}
              errorMessage="Please select a framework to continue"
            />
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">All Field Elements Combined</h2>
          <Select 
            options={frameworks}
            label="Framework"
            description="Choose the framework for your project"
            helperText="This will be used to generate the project structure"
            error={true}
            errorMessage="Please select a framework to continue"
          />
        </section>
      </div>
    </div>
  )
}
