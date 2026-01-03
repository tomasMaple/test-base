'use client'

import * as React from 'react'
import { Avatar } from '@/components/ui/avatar'

export default function AvatarPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Avatar</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          An image element with a fallback for representing the user.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Sizes</h2>
          <div className="flex flex-wrap items-end gap-200">
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="XS" size="xs" />
               <span className="text-label-xs text-secondary-fg">XS</span>
            </div>
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="SM" size="sm" />
               <span className="text-label-xs text-secondary-fg">SM</span>
            </div>
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="MD" size="md" />
               <span className="text-label-xs text-secondary-fg">MD</span>
            </div>
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="LG" size="lg" />
               <span className="text-label-xs text-secondary-fg">LG</span>
            </div>
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="XL" size="xl" />
               <span className="text-label-xs text-secondary-fg">XL</span>
            </div>
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Image vs Fallback</h2>
          <div className="flex gap-200">
             <Avatar src="https://github.com/shadcn.png" alt="@shadcn" size="md" />
             <Avatar fallback="CN" size="md" />
          </div>
        </section>
      </div>
    </div>
  )
}
