'use client'

import React, { useMemo, useCallback } from 'react'
import { AreaClosed, Line, Bar } from '@visx/shape'
import { curveMonotoneX } from '@visx/curve'
import { scaleTime, scaleLinear } from '@visx/scale'
import { LinearGradient } from '@visx/gradient'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'
import { max, extent, bisector } from 'd3-array'

// Types
export interface AreaDataPoint {
  date: string | Date
  value: number
}

export interface AreaChartProps {
  data: AreaDataPoint[]
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  showTooltip?: boolean
  showAxes?: boolean
  showGrid?: boolean
}

// Accessors
const getDate = (d: AreaDataPoint) => new Date(d.date)
const getValue = (d: AreaDataPoint) => d.value
const bisectDate = bisector<AreaDataPoint, Date>((d) => new Date(d.date)).left

// Design tokens
const areaColor = 'var(--sem-brand)'
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

export function AreaChart({
  data,
  width,
  height,
  margin = defaultMargin,
  showTooltip: enableTooltip = true,
  showAxes = true,
  showGrid = true,
}: AreaChartProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<AreaDataPoint>()

  // Bounds
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // Scales
  const xScale = useMemo(
    () =>
      scaleTime({
        range: [0, innerWidth],
        domain: extent(data, getDate) as [Date, Date],
      }),
    [innerWidth, data]
  )

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: [0, (max(data, getValue) || 0) * 1.1],
        nice: true,
      }),
    [innerHeight, data]
  )

  // Tooltip handler
  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x } = localPoint(event) || { x: 0 }
      const x0 = xScale.invert(x - margin.left)
      const index = bisectDate(data, x0, 1)
      const d0 = data[index - 1]
      const d1 = data[index]
      let d = d0
      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(getDate(d)) + margin.left,
        tooltipTop: yScale(getValue(d)) + margin.top,
      })
    },
    [showTooltip, xScale, yScale, data, margin]
  )

  if (width < 100) return null

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Area chart showing data over time"
      >
        <LinearGradient
          id="area-gradient"
          from={areaColor}
          to={areaColor}
          fromOpacity={0.4}
          toOpacity={0.05}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Grid */}
          {showGrid && (
            <GridRows
              scale={yScale}
              width={innerWidth}
              stroke={gridColor}
              strokeOpacity={0.5}
              strokeDasharray="2,4"
            />
          )}

          {/* Area */}
          <AreaClosed<AreaDataPoint>
            data={data}
            x={(d) => xScale(getDate(d)) ?? 0}
            y={(d) => yScale(getValue(d)) ?? 0}
            yScale={yScale}
            strokeWidth={2}
            stroke={areaColor}
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />

          {/* Tooltip overlay */}
          {enableTooltip && (
            <Bar
              x={0}
              y={0}
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => hideTooltip()}
            />
          )}

          {/* Tooltip indicator */}
          {tooltipData && (
            <g>
              <Line
                from={{ x: xScale(getDate(tooltipData)), y: 0 }}
                to={{ x: xScale(getDate(tooltipData)), y: innerHeight }}
                stroke={areaColor}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="4,2"
              />
              <circle
                cx={xScale(getDate(tooltipData))}
                cy={yScale(getValue(tooltipData))}
                r={6}
                fill={areaColor}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}

          {/* Axes */}
          {showAxes && (
            <>
              <AxisBottom
                top={innerHeight}
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
        </g>
      </svg>

      {/* Tooltip */}
      {enableTooltip && tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div className="text-label-sm font-medium">
            {new Date(tooltipData.date).toLocaleDateString()}
          </div>
          <div className="text-body-sm">{getValue(tooltipData).toFixed(2)}</div>
        </TooltipWithBounds>
      )}
    </div>
  )
}
