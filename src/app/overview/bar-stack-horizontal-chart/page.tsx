'use client'

import { ParentSize } from '@visx/responsive'
import { BarStackHorizontalChart } from '@/components/charts'

// Sample stacked data
const stackData = [
  { category: 'Product A', Q1: 65, Q2: 45, Q3: 55, Q4: 80 },
  { category: 'Product B', Q1: 85, Q2: 55, Q3: 40, Q4: 70 },
  { category: 'Product C', Q1: 45, Q2: 65, Q3: 75, Q4: 50 },
  { category: 'Product D', Q1: 95, Q2: 75, Q3: 60, Q4: 90 },
  { category: 'Product E', Q1: 75, Q2: 50, Q3: 45, Q4: 60 },
]

const keys = ['Q1', 'Q2', 'Q3', 'Q4']

export default function BarStackHorizontalChartPage() {
  return (
    <div className="p-200 space-y-200">
      <div>
        <h1 className="text-heading-h4 font-semibold text-fg-primary">
          Bar Stack Horizontal Chart
        </h1>
        <p className="text-body-base text-fg-secondary mt-50">
          A horizontal stacked bar chart ideal for comparing totals with longer category labels.
        </p>
      </div>

      {/* Main Demo */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Horizontal Stacked Bar Chart
        </h2>
        <div className="h-[400px]">
          <ParentSize>
            {({ width, height }) => (
              <BarStackHorizontalChart
                data={stackData}
                keys={keys}
                yKey="category"
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

      {/* Large Dataset */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Compact Version
        </h2>
        <p className="text-body-sm text-fg-tertiary mb-100">
          Without grid for cleaner visualization
        </p>
        <div className="h-[300px]">
          <ParentSize>
            {({ width, height }) => (
              <BarStackHorizontalChart
                data={stackData.slice(0, 3)}
                keys={keys}
                yKey="category"
                width={width}
                height={height}
                showTooltip
                showAxes
                showGrid={false}
                showLegend
              />
            )}
          </ParentSize>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">Usage</h2>
        <pre className="bg-canvas p-100 rounded-md text-body-sm overflow-x-auto">
{`import { BarStackHorizontalChart } from '@/components/charts'
import { ParentSize } from '@visx/responsive'

const data = [
  { category: 'Product A', Q1: 65, Q2: 45, Q3: 55, Q4: 80 },
  { category: 'Product B', Q1: 85, Q2: 55, Q3: 40, Q4: 70 },
  // ...
]

const keys = ['Q1', 'Q2', 'Q3', 'Q4']

<ParentSize>
  {({ width, height }) => (
    <BarStackHorizontalChart
      data={data}
      keys={keys}
      yKey="category"
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
