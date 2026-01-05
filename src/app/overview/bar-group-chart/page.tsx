'use client'

import { ParentSize } from '@visx/responsive'
import { BarGroupChart } from '@/components/charts'

// Sample grouped data
const groupData = [
  { month: 'Jan', '2023': 65, '2024': 85 },
  { month: 'Feb', '2023': 85, '2024': 95 },
  { month: 'Mar', '2023': 45, '2024': 75 },
  { month: 'Apr', '2023': 95, '2024': 110 },
  { month: 'May', '2023': 75, '2024': 90 },
  { month: 'Jun', '2023': 55, '2024': 80 },
  { month: 'Jul', '2023': 110, '2024': 125 },
  { month: 'Aug', '2023': 80, '2024': 100 },
]

const keys = ['2023', '2024']

export default function BarGroupChartPage() {
  return (
    <div className="p-200 space-y-200">
      <div>
        <h1 className="text-heading-h4 font-semibold text-fg-primary">Bar Group Chart</h1>
        <p className="text-body-base text-fg-secondary mt-50">
          A grouped bar chart for side-by-side comparison across categories.
        </p>
      </div>

      {/* Main Demo */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Year-over-Year Comparison
        </h2>
        <div className="h-[450px]">
          <ParentSize>
            {({ width, height }) => (
              <BarGroupChart
                data={groupData}
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

      {/* Three Group Comparison */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Three Series Comparison
        </h2>
        <div className="h-[400px]">
          <ParentSize>
            {({ width, height }) => (
              <BarGroupChart
                data={[
                  { region: 'North', Sales: 120, Costs: 80, Profit: 40 },
                  { region: 'South', Sales: 150, Costs: 90, Profit: 60 },
                  { region: 'East', Sales: 100, Costs: 70, Profit: 30 },
                  { region: 'West', Sales: 180, Costs: 100, Profit: 80 },
                ]}
                keys={['Sales', 'Costs', 'Profit']}
                xKey="region"
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

      {/* Usage */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">Usage</h2>
        <pre className="bg-canvas p-100 rounded-md text-body-sm overflow-x-auto">
{`import { BarGroupChart } from '@/components/charts'
import { ParentSize } from '@visx/responsive'

const data = [
  { month: 'Jan', '2023': 65, '2024': 85 },
  { month: 'Feb', '2023': 85, '2024': 95 },
  // ...
]

const keys = ['2023', '2024']

<ParentSize>
  {({ width, height }) => (
    <BarGroupChart
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
