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
  )
}
