'use client'

import { ParentSize } from '@visx/responsive'
import { BarGroupHorizontalChart } from '@/components/charts'

// Sample grouped data
const groupData = [
  { team: 'Engineering', Q1: 120, Q2: 150, Q3: 180 },
  { team: 'Design', Q1: 80, Q2: 95, Q3: 110 },
  { team: 'Marketing', Q1: 65, Q2: 85, Q3: 100 },
  { team: 'Sales', Q1: 200, Q2: 220, Q3: 250 },
  { team: 'Support', Q1: 90, Q2: 100, Q3: 115 },
]

const keys = ['Q1', 'Q2', 'Q3']

export default function BarGroupHorizontalChartPage() {
  return (
    <div className="p-200 space-y-200">
      <div>
        <h1 className="text-heading-h4 font-semibold text-fg-primary">
          Bar Group Horizontal Chart
        </h1>
        <p className="text-body-base text-fg-secondary mt-50">
          A horizontal grouped bar chart ideal for comparing multiple metrics with longer labels.
        </p>
      </div>

      {/* Main Demo */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Team Performance by Quarter
        </h2>
        <div className="h-[450px]">
          <ParentSize>
            {({ width, height }) => (
              <BarGroupHorizontalChart
                data={groupData}
                keys={keys}
                yKey="team"
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

      {/* Two Series */}
      <div className="bg-surface rounded-lg border border-border-weak p-150">
        <h2 className="text-heading-h6 font-semibold text-fg-primary mb-100">
          Budget vs Actual
        </h2>
        <div className="h-[350px]">
          <ParentSize>
            {({ width, height }) => (
              <BarGroupHorizontalChart
                data={[
                  { department: 'R&D', Budget: 500, Actual: 480 },
                  { department: 'Operations', Budget: 300, Actual: 320 },
                  { department: 'HR', Budget: 150, Actual: 145 },
                  { department: 'IT', Budget: 250, Actual: 270 },
                ]}
                keys={['Budget', 'Actual']}
                yKey="department"
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
{`import { BarGroupHorizontalChart } from '@/components/charts'
import { ParentSize } from '@visx/responsive'

const data = [
  { team: 'Engineering', Q1: 120, Q2: 150, Q3: 180 },
  { team: 'Design', Q1: 80, Q2: 95, Q3: 110 },
  // ...
]

const keys = ['Q1', 'Q2', 'Q3']

<ParentSize>
  {({ width, height }) => (
    <BarGroupHorizontalChart
      data={data}
      keys={keys}
      yKey="team"
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
