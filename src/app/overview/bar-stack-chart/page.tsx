'use client'

import { ParentSize } from '@visx/responsive'
import { BarStackChart } from '@/components/charts'

// Sample stacked data
const stackData = [
  { month: 'Jan', Desktop: 65, Mobile: 45, Tablet: 25 },
  { month: 'Feb', Desktop: 85, Mobile: 55, Tablet: 30 },
  { month: 'Mar', Desktop: 45, Mobile: 65, Tablet: 20 },
  { month: 'Apr', Desktop: 95, Mobile: 75, Tablet: 35 },
  { month: 'May', Desktop: 75, Mobile: 50, Tablet: 28 },
  { month: 'Jun', Desktop: 55, Mobile: 40, Tablet: 22 },
  { month: 'Jul', Desktop: 110, Mobile: 80, Tablet: 40 },
  { month: 'Aug', Desktop: 80, Mobile: 60, Tablet: 32 },
]

const keys = ['Desktop', 'Mobile', 'Tablet']

export default function BarStackChartPage() {
  return (
    <div className="p-200 space-y-200">
      <div>
        <h1 className="text-heading-h4 font-semibold text-fg-primary">Bar Stack Chart</h1>
        <p className="text-body-base text-fg-secondary mt-50">
          A stacked bar chart for comparing parts of a whole across categories.
        </p>
      </div>

      {/* Main Demo */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Stacked Bar Chart with Legend
        </h2>
        <div className="h-[450px]">
          <ParentSize>
            {({ width, height }) => (
              <BarStackChart
                data={stackData}
                keys={keys}
                xKey="month"
                width={width}
                height={height}
                showTooltip
                showAxes
                showGrid
                showLegend
              />
            )}
          </ParentSize>
        </div>
      </div>

      {/* Without Legend */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Without Legend
        </h2>
        <div className="h-[350px]">
          <ParentSize>
            {({ width, height }) => (
              <BarStackChart
                data={stackData}
                keys={keys}
                xKey="month"
                width={width}
                height={height}
                showTooltip
                showAxes
                showGrid
                showLegend={false}
              />
            )}
          </ParentSize>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">Usage</h2>
        <pre className="bg-canvas p-100 rounded-md text-body-sm overflow-x-auto">
{`import { BarStackChart } from '@/components/charts'
import { ParentSize } from '@visx/responsive'

const data = [
  { month: 'Jan', Desktop: 65, Mobile: 45, Tablet: 25 },
  { month: 'Feb', Desktop: 85, Mobile: 55, Tablet: 30 },
  // ...
]

const keys = ['Desktop', 'Mobile', 'Tablet']

<ParentSize>
  {({ width, height }) => (
    <BarStackChart
      data={data}
      keys={keys}
      xKey="month"
      width={width}
      height={height}
      showTooltip
      showAxes
      showGrid
      showLegend
    />
  )}
</ParentSize>`}
        </pre>
      </div>
    </div>
  )
}
