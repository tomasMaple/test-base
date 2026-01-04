'use client'

import * as React from 'react'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { Button } from '@/components/ui/button'

export default function RadioPage() {
  const [value, setValue] = React.useState('1')

  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Radio</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <form className="flex flex-col gap-200">
            <RadioGroup
              value={value}
              onValueChange={(val: any) => setValue(val as string)}
              className="flex flex-col gap-100"
            >
              <div className="flex items-center gap-100">
                <Radio value="1" id="r1" />
                <label className="text-label-sm cursor-pointer" htmlFor="r1">Default</label>
              </div>
              <div className="flex items-center gap-100">
                <Radio value="2" id="r2" />
                <label className="text-label-sm cursor-pointer" htmlFor="r2">Comfortable</label>
              </div>
              <div className="flex items-center gap-100">
                <Radio value="3" id="r3" />
                <label className="text-label-sm cursor-pointer" htmlFor="r3">Compact</label>
              </div>
            </RadioGroup>
          </form>
        </section>



        <section className="p-300 border border-border-subtle rounded-xl">
           <h2 className="text-heading-h6 mb-200">Sizes</h2>
           <div className="flex items-center gap-300">
             <div className="flex flex-col gap-50">
                <RadioGroup defaultValue="1" className="flex items-center gap-100">
                  <Radio value="1" size="3xs" id="r-size-3xs" />
                  <label className="text-label-xs text-fg-secondary cursor-pointer" htmlFor="r-size-3xs">3XS</label>
                </RadioGroup>
             </div>
             <div className="flex flex-col gap-50">
                <RadioGroup defaultValue="1" className="flex items-center gap-100">
                  <Radio value="1" size="2xs" id="r-size-2xs" />
                  <label className="text-label-sm text-fg-secondary cursor-pointer" htmlFor="r-size-2xs">2XS</label>
                </RadioGroup>
             </div>
           </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Disabled</h2>
             <RadioGroup defaultValue="2" className="flex flex-col gap-100">
              <div className="flex items-center gap-100">
                <Radio value="1" id="rd1" disabled />
                <label className="text-label-sm text-tertiary-fg" htmlFor="rd1">Option 1</label>
              </div>
              <div className="flex items-center gap-100">
                <Radio value="2" id="rd2" disabled />
                <label className="text-label-sm text-tertiary-fg" htmlFor="rd2">Option 2</label>
              </div>
            </RadioGroup>
        </section>
      </div>
    </div>
  )
}
