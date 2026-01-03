'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'

export default function CheckboxPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Checkbox</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A control that allows the user to toggle between checked and not checked.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Usage</h2>
          <div className="flex flex-col gap-200">
            <div className="flex items-center gap-100">
              <Checkbox id="c1" />
              <label htmlFor="c1" className="text-label-sm cursor-pointer select-none">Base Checkbox</label>
            </div>
            <div className="flex items-center gap-100">
              <Checkbox id="c2" defaultChecked />
              <label htmlFor="c2" className="text-label-sm cursor-pointer select-none">Default Checked</label>
            </div>
            <div className="flex items-center gap-100">
               <Checkbox id="c3" disabled />
               <label htmlFor="c3" className="text-label-sm text-fg-tertiary">Disabled</label>
            </div>
            <div className="flex items-center gap-100">
               <Checkbox id="c4" defaultChecked disabled />
               <label htmlFor="c4" className="text-label-sm text-fg-tertiary">Disabled Checked</label>
            </div>
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
          <div className="flex items-center gap-200">
            <div className="flex items-center gap-100">
              <Checkbox id="cs1" size="3xs" />
              <label htmlFor="cs1" className="text-label-xs">3XS</label>
            </div>
            <div className="flex items-center gap-100">
              <Checkbox id="cs2" size="2xs" />
              <label htmlFor="cs2" className="text-label-sm">2XS</label>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
