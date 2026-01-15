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
  refundLtv?: number
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
  refundLtv,
  className,
  showLabels = false,
  size = 'sm',
}: LtvGaugeProps) {
  const status = getLtvStatus(currentLtv, marginCallLtv)

  const barColors = {
    healthy: 'bg-positive',
    danger: 'bg-negative',
  }

  // Use pixel values for guaranteed sizing
  const barHeight = { sm: 8, md: 12, lg: 16 }[size]
  const markerH = { sm: 20, md: 24, lg: 32 }[size]
  const markerW = { sm: 6, md: 8, lg: 10 }[size]
  const liqMarkerW = { sm: 8, md: 10, lg: 12 }[size]

  return (
    <div className={cn('w-full', className)}>
      {/* Gauge container */}
      <div 
        className="relative w-full"
        style={{ height: markerH, overflow: 'visible' }}
      >
        {/* Background track - vertically centered */}
        <div 
          className="absolute left-0 right-0 rounded-full bg-secondary"
          style={{ 
            height: barHeight, 
            top: '50%', 
            transform: 'translateY(-50%)' 
          }}
        >
          {/* Filled portion */}
          <div
            className={cn('rounded-full transition-all duration-standard', barColors[status])}
            style={{ 
              width: `${Math.min(currentLtv, 100)}%`,
              height: barHeight
            }}
          />
        </div>

        {/* Margin call threshold gate - red */}
        <div
          className="absolute rounded-sm bg-negative"
          style={{ 
            left: `${marginCallLtv}%`, 
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: markerW,
            height: markerH
          }}
        />

        {/* Liquidation threshold gate - darker/bolder red */}
        <div
          className="absolute rounded-sm bg-negative-emphasis"
          style={{
            left: `${liquidationLtv}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: liqMarkerW,
            height: markerH
          }}
        />

        {/* Refund level gate - green (left side of bar) */}
        {refundLtv && (
          <div
            className="absolute rounded-sm bg-positive"
            style={{
              left: `${refundLtv}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: markerW,
              height: markerH
            }}
          />
        )}
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
  refundLtv?: number
  className?: string
}

export function LtvDisplay({
  currentLtv,
  marginCallLtv,
  liquidationLtv,
  refundLtv,
  className,
}: LtvDisplayProps) {
  const status = getLtvStatus(currentLtv, marginCallLtv)

  const textColors = {
    healthy: 'text-positive',
    danger: 'text-negative',
  }

  return (
    <div className={cn('flex flex-col gap-75 overflow-visible', className)}>
      {/* LTV Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-50">
          <span className="text-label-sm text-fg-muted">LTV</span>
          <span className={cn('text-heading-h6 font-semibold', textColors[status])}>
            {currentLtv}%
          </span>
        </div>
        <div className="flex items-center gap-100">
          {refundLtv && (
            <div className="flex items-center gap-25">
              <div className="w-2 h-2 rounded-sm bg-positive" />
              <span className="text-label-sm text-fg-muted">Refund {refundLtv}%</span>
            </div>
          )}
          <div className="flex items-center gap-25">
            <div className="w-2 h-2 rounded-sm bg-negative" />
            <span className="text-label-sm text-fg-muted">Margin Call {marginCallLtv}%</span>
          </div>
          <div className="flex items-center gap-25">
            <div className="w-2.5 h-2.5 rounded-sm bg-negative-emphasis" />
            <span className="text-label-sm font-medium text-fg-muted">Liq. Level {liquidationLtv}%</span>
          </div>
        </div>
      </div>
      
      {/* Gauge */}
      <LtvGauge
        currentLtv={currentLtv}
        marginCallLtv={marginCallLtv}
        liquidationLtv={liquidationLtv}
        refundLtv={refundLtv}
        size="md"
      />
    </div>
  )
}
