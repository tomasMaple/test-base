'use client'

import * as React from 'react'
import { Progress } from '@/components/ui/progress'

export default function ProgressPage() {
  const [value, setValue] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Progress</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          Displays an indicator showing the completion progress of a task.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <div className="w-[60%]">
            <Progress value={value} />
            <p className="mt-50 text-label-xs text-fg-secondary">
               {value}% Complete
            </p>
          </div>
        </section>

        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Variants & Sizes</h2>
          <div className="flex flex-col gap-200 w-[60%]">
            <div className="flex flex-col gap-50">
               <span className="text-label-xs mb-25">Default (Brand) - SM</span>
               <Progress value={40} size="sm" />
            </div>
            <div className="flex flex-col gap-50">
               <span className="text-label-xs mb-25">Positive - MD</span>
               <Progress value={70} variant="positive" size="md" />
            </div>
            <div className="flex flex-col gap-50">
               <span className="text-label-xs mb-25">Negative - LG</span>
               <Progress value={80} variant="negative" size="lg" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
