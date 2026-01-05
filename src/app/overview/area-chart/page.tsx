'use client'

import { ParentSize } from '@visx/responsive'
import { AreaChart } from '@/components/charts'

// Sample time series data
const generateAreaData = () => {
  const data = []
  const startDate = new Date('2024-01-01')
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    data.push({
      date: date.toISOString(),
      value: Math.random() * 100 + 50 + Math.sin(i / 5) * 30,
    })
  }
  return data
}

const areaData = generateAreaData()

export default function AreaChartPage() {
  return (
    <div className="p-200 space-y-200">
      <div>
        <h1 className="text-heading-h4 font-semibold text-fg-primary">Area Chart</h1>
        <p className="text-body-base text-fg-secondary mt-50">
          A filled area chart for visualizing time series data with smooth curves.
        </p>
      </div>

      {/* Main Demo */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Interactive Area Chart
        </h2>
        <div className="h-[400px]">
          <ParentSize>
            {({ width, height }) => (
              <AreaChart
                data={areaData}
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
          Minimal Area Chart
        </h2>
        <p className="text-body-sm text-fg-tertiary mb-100">
          Without axes and grid for a cleaner look
        </p>
        <div className="h-[200px]">
          <ParentSize>
            {({ width, height }) => (
              <AreaChart
                data={areaData}
                width={width}
                height={height}
                margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
                showTooltip
                showAxes={false}
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
{`import { AreaChart } from '@/components/charts'
import { ParentSize } from '@visx/responsive'

const data = [
  { date: '2024-01-01', value: 100 },
  { date: '2024-01-02', value: 120 },
  // ...
]

<ParentSize>
  {({ width, height }) => (
    <AreaChart
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
