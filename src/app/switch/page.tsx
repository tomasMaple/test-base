'use client'

import * as React from 'react'
import { Switch } from '@/components/ui/switch'

export default function SwitchPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Switch</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A control that allows the user to toggle between checked and not checked.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Usage</h2>
          <div className="flex flex-col gap-200">
            <div className="flex items-center gap-100">
              <Switch id="s1" />
              <label htmlFor="s1" className="text-label-sm cursor-pointer select-none">Notifications</label>
            </div>
            <div className="flex items-center gap-100">
              <Switch id="s2" defaultChecked />
              <label htmlFor="s2" className="text-label-sm cursor-pointer select-none">Airplane Mode</label>
            </div>
            <div className="flex items-center gap-100">
              <Switch id="s3" disabled />
              <label htmlFor="s3" className="text-label-sm text-fg-tertiary">Disabled</label>
            </div>
             <div className="flex items-center gap-100">
              <Switch id="s4" defaultChecked disabled />
              <label htmlFor="s4" className="text-label-sm text-fg-tertiary">Disabled Checked</label>
            </div>
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
          <div className="flex items-center gap-300">
           <div className="flex flex-col gap-50">
               <Switch size="xs" />
               <span className="text-label-xs text-fg-secondary">XS</span>
            </div>
         <div className="flex flex-col gap-50">
               <Switch size="md" />
               <span className="text-label-xs text-fg-secondary">MD</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
