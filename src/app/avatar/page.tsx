'use client'

import * as React from 'react'
import { Avatar } from '@/components/ui/avatar'

export default function AvatarPage() {
  return (
    <div className="p-300 bg-surface">
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
               <Avatar fallback="XS" size="xs" type="brand" appearance="default" />
               <span className="text-label-xs text-secondary-fg">XS</span>
            </div>
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="SM" size="sm" type="brand" appearance="default" />
               <span className="text-label-xs text-secondary-fg">SM</span>
            </div>
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="MD" size="md" type="brand" appearance="default" />
               <span className="text-label-xs text-secondary-fg">MD</span>
            </div>
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="LG" size="lg" type="brand" appearance="default" />
               <span className="text-label-xs text-secondary-fg">LG</span>
            </div>
            <div className="flex flex-col items-center gap-50">
               <Avatar fallback="XL" size="xl" type="brand" appearance="default" />
               <span className="text-label-xs text-secondary-fg">XL</span>
            </div>
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Appearance: Default (Solid)</h2>
            <div className="flex flex-wrap gap-200">
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="PR" type="primary" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="SE" type="secondary" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Secondary</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="BR" type="brand" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Brand</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="PI" type="pink" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Pink</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="FU" type="fuchsia" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Fuchsia</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="VI" type="violet" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Violet</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="TE" type="teal" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Teal</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="LI" type="lime" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Lime</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-200 mt-200 border-t border-border-subtle pt-200">
               <div className="flex flex-col items-center gap-50">
                <Avatar fallback="AA" type="aave" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Aave</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="CO" type="cowswap" appearance="default" />
                <span className="text-label-xs text-secondary-fg">CoW Swap</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="FL" type="fluid" appearance="default" />
                <span className="text-label-xs text-secondary-fg">Fluid</span>
              </div>
            </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Appearance: Subtle (Soft)</h2>
           <div className="flex flex-wrap gap-200">
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="PR" type="primary" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="SE" type="secondary" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Secondary</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="BR" type="brand" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Brand</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="PI" type="pink" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Pink</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="FU" type="fuchsia" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Fuchsia</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="VI" type="violet" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Violet</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="TE" type="teal" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Teal</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="LI" type="lime" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Lime</span>
              </div>
            </div>
             <div className="flex flex-wrap gap-200 mt-200 border-t border-border-subtle pt-200">
               <div className="flex flex-col items-center gap-50">
                <Avatar fallback="AA" type="aave" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Aave</span>
              </div>
              <div className="flex flex-col items-center gap-50">
                <Avatar fallback="CO" type="cowswap" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">CoW Swap</span>
              </div>
               <div className="flex flex-col items-center gap-50">
                <Avatar fallback="FL" type="fluid" appearance="subtle" />
                <span className="text-label-xs text-secondary-fg">Fluid</span>
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
