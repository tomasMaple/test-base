'use client'

import { ParentSize } from '@visx/responsive'
import { BarChart } from '@/components/charts'

// Sample data
const barData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 85 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 95 },
  { label: 'May', value: 75 },
  { label: 'Jun', value: 55 },
  { label: 'Jul', value: 110 },
  { label: 'Aug', value: 80 },
]

export default function BarChartPage() {
  return (
    <div className="p-200 space-y-200">
      <div>
        <h1 className="text-heading-h4 font-semibold text-fg-primary">Bar Chart</h1>
        <p className="text-body-base text-fg-secondary mt-50">
          A simple vertical bar chart for visualizing categorical data.
        </p>
      </div>

      {/* Main Demo */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Interactive Bar Chart
        </h2>
        <div className="h-[400px]">
          <ParentSize>
            {({ width, height }) => (
              <BarChart
                data={barData}
                width={width}
                height={height}
                showTooltip
                showAxes
                showGrid
              />
            )}
          </ParentSize>
        </div>
      </div>

      {/* Minimal Version */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Minimal Bar Chart
        </h2>
        <p className="text-body-sm text-fg-tertiary mb-100">
          Without grid for a cleaner look
        </p>
        <div className="h-[300px]">
          <ParentSize>
            {({ width, height }) => (
              <BarChart
                data={barData}
                width={width}
                height={height}
                showTooltip
                showAxes
                showGrid={false}
              />
            )}
          </ParentSize>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">Usage</h2>
        <pre className="bg-canvas p-100 rounded-md text-body-sm overflow-x-auto">
{`import { BarChart } from '@/components/charts'
import { ParentSize } from '@visx/responsive'

const data = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 85 },
  // ...
]

<ParentSize>
  {({ width, height }) => (
    <BarChart
      data={data}
      width={width}
      height={height}
      showTooltip
      showAxes
      showGrid
    />
  )}
</ParentSize>`}
        </pre>
      </div>
    </div>
  )
}
