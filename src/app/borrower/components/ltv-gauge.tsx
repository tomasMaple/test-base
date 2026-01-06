'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// LTV GAUGE COMPONENT - With prominent threshold markers
// =============================================================================

interface LtvGaugeProps {
  currentLtv: number
  marginCallLtv: number
  liquidationLtv: number
  className?: string
  showLabels?: boolean
  size?: 'sm' | 'md' | 'lg'
}

function getLtvStatus(
  ltv: number,
  marginCallLtv: number
): 'healthy' | 'danger' {
  if (ltv >= marginCallLtv) return 'danger'
  return 'healthy'
}

export function LtvGauge({
  currentLtv,
  marginCallLtv,
  liquidationLtv,
  className,
  showLabels = false,
  size = 'sm',
}: LtvGaugeProps) {
  const status = getLtvStatus(currentLtv, marginCallLtv)

  const barColors = {
    healthy: 'bg-positive',
    danger: 'bg-negative',
  }

  const heightClass = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }[size]

  // Make gates very prominent
  const markerHeight = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  }[size]

  const markerWidth = {
    sm: 'w-1',
    md: 'w-1.5',
    lg: 'w-2',
  }[size]

  return (
    <div className={cn('w-full', className)}>
      {/* Gauge container */}
      <div className="relative py-25">
        {/* Background track */}
        <div className={cn('w-full rounded-full bg-secondary', heightClass)}>
          {/* Filled portion */}
          <div
            className={cn(
              'rounded-full transition-all duration-standard',
              heightClass,
              barColors[status]
            )}
            style={{ width: `${Math.min(currentLtv, 100)}%` }}
          />
        </div>

        {/* Margin call threshold gate - red */}
        <div
          className="absolute top-0 bottom-0 flex items-center"
          style={{ left: `${marginCallLtv}%`, transform: 'translateX(-50%)' }}
        >
          <div className={cn('rounded-sm bg-negative', markerHeight, markerWidth)} />
        </div>

        {/* Liquidation threshold gate - darker/bolder red */}
        <div
          className="absolute top-0 bottom-0 flex items-center"
          style={{ left: `${liquidationLtv}%`, transform: 'translateX(-50%)' }}
        >
          <div className={cn('rounded-sm bg-negative-emphasis', markerHeight, 'w-2')} />
        </div>
      </div>

      {/* Labels below the bar */}
      {showLabels && (
        <div className="relative h-100 mt-25">
          <span 
            className="absolute text-label-sm font-medium text-negative transform -translate-x-1/2"
            style={{ left: `${marginCallLtv}%` }}
          >
            {marginCallLtv}%
          </span>
          <span 
            className="absolute text-label-sm font-semibold text-negative transform -translate-x-1/2"
            style={{ left: `${liquidationLtv}%` }}
          >
            {liquidationLtv}%
          </span>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// LARGE LTV DISPLAY (for loan cards)
// =============================================================================

interface LtvDisplayProps {
  currentLtv: number
  marginCallLtv: number
  liquidationLtv: number
  className?: string
}

export function LtvDisplay({
  currentLtv,
  marginCallLtv,
  liquidationLtv,
  className,
}: LtvDisplayProps) {
  const status = getLtvStatus(currentLtv, marginCallLtv)

  const textColors = {
    healthy: 'text-positive',
    danger: 'text-negative',
  }

  return (
    <div className={cn('flex flex-col gap-50', className)}>
      {/* LTV Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-50">
          <span className="text-label-sm text-fg-muted">LTV</span>
          <span className={cn('text-heading-h6 font-semibold', textColors[status])}>
            {currentLtv}%
          </span>
        </div>
        <div className="flex items-center gap-100">
          <div className="flex items-center gap-25">
            <div className="w-2 h-2 rounded-sm bg-negative" />
            <span className="text-label-sm text-fg-muted">MC {marginCallLtv}%</span>
          </div>
          <div className="flex items-center gap-25">
            <div className="w-2.5 h-2.5 rounded-sm bg-negative-emphasis" />
            <span className="text-label-sm font-medium text-fg-muted">Liq {liquidationLtv}%</span>
          </div>
        </div>
      </div>
      
      {/* Gauge */}
      <LtvGauge
        currentLtv={currentLtv}
        marginCallLtv={marginCallLtv}
        liquidationLtv={liquidationLtv}
        size="md"
      />
    </div>
  )
}
