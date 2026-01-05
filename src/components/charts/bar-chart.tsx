'use client'

import React, { useMemo } from 'react'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'

// Types
export interface BarDataPoint {
  label: string
  value: number
}

export interface BarChartProps {
  data: BarDataPoint[]
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  showTooltip?: boolean
  showAxes?: boolean
  showGrid?: boolean
}

// Accessors
const getLabel = (d: BarDataPoint) => d.label
const getValue = (d: BarDataPoint) => d.value

// Design tokens
const barColor = 'var(--sem-brand)'
const axisColor = 'var(--sem-border-subtle)'
const labelColor = 'var(--sem-fg-tertiary)'
const gridColor = 'var(--sem-border-weak)'

const tooltipStyles = {
  ...defaultStyles,
  background: 'var(--sem-bg-inverse)',
  color: 'var(--sem-fg-inverse)',
  fontSize: 14,
  fontFamily: 'var(--primitive-font-sans)',
  padding: '8px 12px',
  borderRadius: 8,
}

const defaultMargin = { top: 24, right: 24, bottom: 40, left: 48 }

export function BarChart({
  data,
  width,
  height,
  margin = defaultMargin,
  showTooltip: enableTooltip = true,
  showAxes = true,
  showGrid = true,
}: BarChartProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<BarDataPoint>()

  // Bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  // Scales
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map(getLabel),
        padding: 0.3,
      }),
    [xMax, data]
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, Math.max(...data.map(getValue)) * 1.1],
        nice: true,
      }),
    [yMax, data]
  )

  if (width < 100) return null

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Bar chart showing categorical data"
      >
        <Group top={margin.top} left={margin.left}>
          {/* Grid */}
          {showGrid && (
            <GridRows
              scale={yScale}
              width={xMax}
              stroke={gridColor}
              strokeOpacity={0.5}
              strokeDasharray="2,4"
            />
          )}

          {/* Bars */}
          {data.map((d) => {
            const label = getLabel(d)
            const barWidth = xScale.bandwidth()
            const barHeight = yMax - (yScale(getValue(d)) ?? 0)
            const barX = xScale(label) ?? 0
            const barY = yMax - barHeight

            return (
              <Bar
                key={`bar-${label}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={barColor}
                rx={4}
                onMouseMove={(event) => {
                  if (!enableTooltip) return
                  const coords = localPoint(event)
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: (coords?.x ?? 0) + margin.left,
                    tooltipTop: coords?.y ?? 0,
                  })
                }}
                onMouseLeave={() => hideTooltip()}
              />
            )
          })}

          {/* Axes */}
          {showAxes && (
            <>
              <AxisBottom
                top={yMax}
                scale={xScale}
                stroke={axisColor}
                tickStroke={axisColor}
                tickLabelProps={{
                  fill: labelColor,
                  fontSize: 12,
                  fontFamily: 'var(--primitive-font-sans)',
                  textAnchor: 'middle',
                }}
              />
              <AxisLeft
                scale={yScale}
                stroke={axisColor}
                tickStroke={axisColor}
                tickLabelProps={{
                  fill: labelColor,
                  fontSize: 12,
                  fontFamily: 'var(--primitive-font-sans)',
                  textAnchor: 'end',
                  dx: -4,
                  dy: 4,
                }}
              />
            </>
          )}
        </Group>
      </svg>

      {/* Tooltip */}
      {enableTooltip && tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div className="text-label-sm font-medium">{tooltipData.label}</div>
          <div className="text-body-sm">{tooltipData.value.toFixed(2)}</div>
        </TooltipWithBounds>
      )}
    </div>
  )
}
