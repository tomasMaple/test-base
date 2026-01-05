'use client'

import React, { useMemo } from 'react'
import { Group } from '@visx/group'
import { BarGroup } from '@visx/shape'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'

// Types
export interface BarGroupDataPoint {
  [key: string]: string | number
}

export interface BarGroupChartProps {
  data: BarGroupDataPoint[]
  keys: string[]
  xKey: string
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

const defaultMargin = { top: 24, right: 24, bottom: 40, left: 48 }

interface TooltipData {
  key: string
  value: number
  color: string
  x: string
}

export function BarGroupChart({
  data,
  keys,
  xKey,
  width,
  height,
  margin = defaultMargin,
  showTooltip: enableTooltip = true,
  showAxes = true,
  showGrid = true,
  showLegend = true,
}: BarGroupChartProps) {
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

  // Get max value across all keys
  const maxValue = Math.max(
    ...data.flatMap((d) => keys.map((key) => Number(d[key]) || 0))
  )

  // Scales
  const x0Scale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map((d) => String(d[xKey])),
        padding: 0.2,
      }),
    [xMax, data, xKey]
  )

  const x1Scale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, x0Scale.bandwidth()],
        domain: keys,
        padding: 0.1,
      }),
    [x0Scale, keys]
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, maxValue * 1.1],
        nice: true,
      }),
    [yMax, maxValue]
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
        aria-label="Grouped bar chart showing multiple series"
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

          {/* Grouped Bars */}
          <BarGroup
            data={data}
            keys={keys}
            height={yMax}
            x0={(d) => String(d[xKey])}
            x0Scale={x0Scale}
            x1Scale={x1Scale}
            yScale={yScale}
            color={colorScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup) => (
                <Group key={`bar-group-${barGroup.index}`} left={barGroup.x0}>
                  {barGroup.bars.map((bar) => (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={4}
                      onMouseMove={(event) => {
                        if (!enableTooltip) return
                        const coords = localPoint(event)
                        showTooltip({
                          tooltipData: {
                            key: bar.key,
                            value: bar.value,
                            color: bar.color,
                            x: String(data[barGroup.index][xKey]),
                          },
                          tooltipLeft: barGroup.x0 + bar.x + bar.width / 2 + margin.left,
                          tooltipTop: coords?.y ?? 0,
                        })
                      }}
                      onMouseLeave={() => hideTooltip()}
                    />
                  ))}
                </Group>
              ))
            }
          </BarGroup>

          {/* Axes */}
          {showAxes && (
            <>
              <AxisBottom
                top={yMax}
                scale={x0Scale}
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
          <div className="text-label-xs text-fg-inverse/70">{tooltipData.x}</div>
          <div className="flex items-center gap-50">
            <div
              className="size-icon-sm rounded-xs"
              style={{ backgroundColor: tooltipData.color }}
            />
            <span className="text-label-sm font-medium">{tooltipData.key}</span>
          </div>
          <div className="text-body-sm">{tooltipData.value.toFixed(2)}</div>
        </TooltipWithBounds>
      )}
    </div>
  )
}
