'use client'

import React, { useMemo } from 'react'
import { Group } from '@visx/group'
import { BarStackHorizontal } from '@visx/shape'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridColumns } from '@visx/grid'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import type { SeriesPoint } from '@visx/shape/lib/types'

// Types
export interface BarStackHorizontalDataPoint {
  [key: string]: string | number
}

export interface BarStackHorizontalChartProps {
  data: BarStackHorizontalDataPoint[]
  keys: string[]
  yKey: string
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  showTooltip?: boolean
  showAxes?: boolean
  showGrid?: boolean
  showLegend?: boolean
}

// Design tokens - categorical colors
const categoricalColors = [
  'var(--sem-brand)',
  'var(--sem-info)',
  'var(--sem-teal)',
  'var(--sem-violet)',
  'var(--sem-pink)',
  'var(--sem-lime)',
]

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

const defaultMargin = { top: 24, right: 24, bottom: 40, left: 80 }

interface TooltipData {
  bar: SeriesPoint<BarStackHorizontalDataPoint>
  key: string
  color: string
}

export function BarStackHorizontalChart({
  data,
  keys,
  yKey,
  width,
  height,
  margin = defaultMargin,
  showTooltip: enableTooltip = true,
  showAxes = true,
  showGrid = true,
  showLegend = true,
}: BarStackHorizontalChartProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>()

  // Bounds
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom - (showLegend ? 40 : 0)

  // Calculate totals for x-scale domain
  const totals = data.reduce((acc, cur) => {
    const total = keys.reduce((sum, key) => sum + (Number(cur[key]) || 0), 0)
    acc.push(total)
    return acc
  }, [] as number[])

  // Scales
  const yScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, yMax],
        domain: data.map((d) => String(d[yKey])),
        padding: 0.2,
      }),
    [yMax, data, yKey]
  )

  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [0, xMax],
        domain: [0, Math.max(...totals) * 1.1],
        nice: true,
      }),
    [xMax, totals]
  )

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: categoricalColors.slice(0, keys.length),
  })

  if (width < 100) return null

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Horizontal stacked bar chart showing multiple series"
      >
        <Group top={margin.top} left={margin.left}>
          {/* Grid */}
          {showGrid && (
            <GridColumns
              scale={xScale}
              height={yMax}
              stroke={gridColor}
              strokeOpacity={0.5}
              strokeDasharray="2,4"
            />
          )}

          {/* Horizontal Stacked Bars */}
          <BarStackHorizontal<BarStackHorizontalDataPoint, string>
            data={data}
            keys={keys}
            y={(d) => String(d[yKey])}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-h-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    rx={2}
                    onMouseMove={(event) => {
                      if (!enableTooltip) return
                      const coords = localPoint(event)
                      showTooltip({
                        tooltipData: {
                          bar: bar.bar,
                          key: bar.key,
                          color: bar.color,
                        },
                        tooltipLeft: (coords?.x ?? 0) + margin.left,
                        tooltipTop: coords?.y ?? 0,
                      })
                    }}
                    onMouseLeave={() => hideTooltip()}
                  />
                ))
              )
            }
          </BarStackHorizontal>

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

      {/* Legend */}
      {showLegend && (
        <div className="flex justify-center gap-100 mt-50">
          {keys.map((key) => (
            <div key={key} className="flex items-center gap-50">
              <div
                className="size-icon-md rounded-xs"
                style={{ backgroundColor: colorScale(key) }}
              />
              <span className="text-label-sm text-fg-secondary">{key}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tooltip */}
      {enableTooltip && tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div className="flex items-center gap-50">
            <div
              className="size-icon-sm rounded-xs"
              style={{ backgroundColor: tooltipData.color }}
            />
            <span className="text-label-sm font-medium">{tooltipData.key}</span>
          </div>
          <div className="text-body-sm">
            {Number(tooltipData.bar.data[tooltipData.key]).toFixed(2)}
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}
