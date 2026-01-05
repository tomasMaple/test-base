# Visx Chart Implementation Rules

> **Rules for AI agents implementing charts using visx with the Maple Design System.**

---

## Core Principles

1. **visx for primitives** — Use visx low-level components for maximum customization
2. **Design tokens for styling** — All colors, spacing, and typography use Maple tokens
3. **CSS variables for fills/strokes** — Access CSS custom properties via `var(--token-name)`
4. **Responsive by default** — Charts should adapt to container width
5. **Tooltips and legends** — Use visx tooltip/legend packages or custom Maple components

---

## Required Packages

Install the visx packages you need. Common ones:

```bash
npm install @visx/shape @visx/group @visx/scale @visx/axis @visx/grid @visx/tooltip @visx/legend @visx/gradient @visx/curve @visx/event
```

| Package          | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| `@visx/shape`    | Bar, BarStack, BarGroup, AreaClosed, Line, Pie, Arc |
| `@visx/group`    | SVG `<g>` wrapper with transform support            |
| `@visx/scale`    | scaleBand, scaleLinear, scaleTime, scaleOrdinal     |
| `@visx/axis`     | AxisBottom, AxisLeft, AxisTop, AxisRight            |
| `@visx/grid`     | Grid, GridRows, GridColumns                         |
| `@visx/tooltip`  | useTooltip, TooltipWithBounds, Tooltip              |
| `@visx/legend`   | LegendOrdinal, LegendItem                           |
| `@visx/gradient` | LinearGradient, RadialGradient                      |
| `@visx/curve`    | curveMonotoneX, curveLinear, curveNatural           |
| `@visx/event`    | localPoint for mouse positioning                    |

---

## Design Token Integration

### Color Mapping

Use CSS custom properties from `globals.css` for all chart colors:

```tsx
// ✅ CORRECT: Use design tokens
const chartColors = {
  primary: "var(--sem-brand)",
  secondary: "var(--sem-info)",
  tertiary: "var(--sem-positive)",
  negative: "var(--sem-negative)",
  warning: "var(--sem-warning)",
  // Support colors for multi-series
  pink: "var(--sem-pink)",
  fuchsia: "var(--sem-fuchsia)",
  violet: "var(--sem-violet)",
  teal: "var(--sem-teal)",
  lime: "var(--sem-lime)",
};

// ❌ WRONG: Hardcoded colors
const badColors = {
  primary: "#f76231",
  secondary: "#3b82f6",
};
```

### Recommended Chart Color Palettes

```tsx
// For categorical data (up to 6 series)
const categoricalColors = [
  "var(--sem-brand)",
  "var(--sem-info)",
  "var(--sem-teal)",
  "var(--sem-violet)",
  "var(--sem-pink)",
  "var(--sem-lime)",
];

// For positive/negative comparisons
const divergingColors = {
  positive: "var(--sem-positive)",
  neutral: "var(--sem-fg-muted)",
  negative: "var(--sem-negative)",
};

// For sequential data (light to dark)
const sequentialColors = [
  "var(--sem-brand-weak)",
  "var(--sem-brand-subtle)",
  "var(--sem-brand-muted)",
  "var(--sem-brand)",
  "var(--sem-brand-strong)",
  "var(--sem-brand-emphasis)",
];
```

### Axis & Grid Styling

```tsx
// Axis line and tick styling
const axisStyles = {
  stroke: "var(--sem-border-subtle)",
  tickStroke: "var(--sem-border-subtle)",
};

// Grid styling
const gridStyles = {
  stroke: "var(--sem-border-weak)",
  strokeOpacity: 0.5,
  strokeDasharray: "2,4",
};

// Axis label styling
const tickLabelProps = {
  fill: "var(--sem-fg-tertiary)",
  fontSize: 12,
  fontFamily: "var(--primitive-font-sans)",
  textAnchor: "middle" as const,
};
```

---

## Chart Component Template

```tsx
"use client";

import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";

// Types
interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

// Accessors
const getLabel = (d: DataPoint) => d.label;
const getValue = (d: DataPoint) => d.value;

// Design token colors
const barColor = "var(--sem-brand)";
const axisColor = "var(--sem-border-subtle)";
const labelColor = "var(--sem-fg-tertiary)";

const defaultMargin = { top: 24, right: 24, bottom: 40, left: 48 };

export function BarChart({
  data,
  width,
  height,
  margin = defaultMargin,
}: BarChartProps) {
  // Bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map(getLabel),
        padding: 0.3,
      }),
    [xMax, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, Math.max(...data.map(getValue))],
        nice: true,
      }),
    [yMax, data]
  );

  if (width < 100) return null;

  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {/* Bars */}
        {data.map((d) => {
          const label = getLabel(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getValue(d)) ?? 0);
          const barX = xScale(label) ?? 0;
          const barY = yMax - barHeight;

          return (
            <Bar
              key={`bar-${label}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={barColor}
              rx={4}
            />
          );
        })}

        {/* Axes */}
        <AxisBottom
          top={yMax}
          scale={xScale}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={{
            fill: labelColor,
            fontSize: 12,
            textAnchor: "middle",
          }}
        />
        <AxisLeft
          scale={yScale}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={{
            fill: labelColor,
            fontSize: 12,
            textAnchor: "end",
            dx: -4,
            dy: 4,
          }}
        />
      </Group>
    </svg>
  );
}
```

---

## Chart Types Reference

### 1. Bar Chart (Simple Vertical)

```tsx
import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";

// Key components:
// - scaleBand for x-axis (categorical)
// - scaleLinear for y-axis (numeric)
// - Bar component for each data point

<Bar
  x={barX}
  y={barY}
  width={barWidth}
  height={barHeight}
  fill="var(--sem-brand)"
  rx={4} // rounded corners
/>;
```

### 2. Stacked Bar Chart

```tsx
import { BarStack } from '@visx/shape'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'

// Required scales:
const xScale = scaleBand<string>({ domain: dates, padding: 0.2 })
const yScale = scaleLinear<number>({ domain: [0, maxTotal] })
const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [
    'var(--sem-brand)',
    'var(--sem-info)',
    'var(--sem-teal)',
  ],
})

<BarStack<DataType, KeyType>
  data={data}
  keys={keys}
  x={getDate}
  xScale={xScale}
  yScale={yScale}
  color={colorScale}
>
  {(barStacks) =>
    barStacks.map((barStack) =>
      barStack.bars.map((bar) => (
        <rect
          key={`bar-stack-${barStack.index}-${bar.index}`}
          x={bar.x}
          y={bar.y}
          height={bar.height}
          width={bar.width}
          fill={bar.color}
        />
      ))
    )
  }
</BarStack>
```

### 3. Grouped Bar Chart

```tsx
import { BarGroup } from '@visx/shape'

// Requires two band scales:
const dateScale = scaleBand<string>({ domain: dates, padding: 0.2 })
const categoryScale = scaleBand<string>({ domain: categories, padding: 0.1 })
const valueScale = scaleLinear<number>({ domain: [0, max] })

<BarGroup
  data={data}
  keys={keys}
  height={yMax}
  x0={getDate}
  x0Scale={dateScale}
  x1Scale={categoryScale}
  yScale={valueScale}
  color={colorScale}
>
  {(barGroups) =>
    barGroups.map((barGroup) => (
      <Group key={`bar-group-${barGroup.index}`} left={barGroup.x0}>
        {barGroup.bars.map((bar) => (
          <rect
            key={`bar-${bar.index}`}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            fill={bar.color}
            rx={4}
          />
        ))}
      </Group>
    ))
  }
</BarGroup>
```

### 4. Area Chart

```tsx
import { AreaClosed } from '@visx/shape'
import { curveMonotoneX } from '@visx/curve'
import { LinearGradient } from '@visx/gradient'

// Gradient for fill
<LinearGradient
  id="area-gradient"
  from="var(--sem-brand)"
  to="var(--sem-brand)"
  fromOpacity={0.4}
  toOpacity={0.05}
/>

<AreaClosed<DataPoint>
  data={data}
  x={(d) => xScale(getDate(d)) ?? 0}
  y={(d) => yScale(getValue(d)) ?? 0}
  yScale={yScale}
  strokeWidth={2}
  stroke="var(--sem-brand)"
  fill="url(#area-gradient)"
  curve={curveMonotoneX}
/>
```

### 5. Horizontal Bar Chart

```tsx
// Simply swap the scales:
const yScale = scaleBand<string>({
  domain: data.map(getLabel),
  padding: 0.3,
  range: [0, yMax],
})

const xScale = scaleLinear<number>({
  domain: [0, Math.max(...data.map(getValue))],
  range: [0, xMax],
})

// Bar dimensions change:
<Bar
  x={0}
  y={yScale(label)}
  width={xScale(getValue(d))}
  height={yScale.bandwidth()}
  fill="var(--sem-brand)"
  rx={4}
/>
```

---

## Tooltip Implementation

```tsx
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";

const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: "var(--sem-bg-inverse)",
  color: "var(--sem-fg-inverse)",
  fontSize: 14,
  fontFamily: "var(--primitive-font-sans)",
  padding: "8px 12px",
  borderRadius: 8,
  boxShadow: "var(--sem-shadow-300)",
};

function ChartWithTooltip() {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<DataPoint>();

  const handleMouseMove = (event: React.MouseEvent, d: DataPoint) => {
    const coords = localPoint(event);
    showTooltip({
      tooltipData: d,
      tooltipLeft: coords?.x ?? 0,
      tooltipTop: coords?.y ?? 0,
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <svg>{/* Chart content with onMouseMove={handleMouseMove} */}</svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div>{tooltipData.label}</div>
          <div>{tooltipData.value}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
}
```

---

## Legend Implementation

```tsx
import { LegendOrdinal, LegendItem, LegendLabel } from '@visx/legend'

<LegendOrdinal
  scale={colorScale}
  direction="row"
  labelMargin="0 16px 0 0"
  shapeStyle={{ borderRadius: 4 }}
/>

// Or custom legend with Maple components:
<div className="flex gap-100">
  {keys.map((key, i) => (
    <div key={key} className="flex items-center gap-50">
      <div
        className="size-icon-md rounded-xs"
        style={{ backgroundColor: colorScale(key) }}
      />
      <span className="text-label-sm text-fg-secondary">{key}</span>
    </div>
  ))}
</div>
```

---

## Responsive Charts

Use a parent div with `ParentSize` from `@visx/responsive`:

```tsx
import { ParentSize } from "@visx/responsive";

export function ResponsiveChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="w-full h-[400px]">
      <ParentSize>
        {({ width, height }) => (
          <BarChart data={data} width={width} height={height} />
        )}
      </ParentSize>
    </div>
  );
}
```

---

## Forbidden Patterns

| ❌ Never Do                        | ✅ Instead                                     |
| ---------------------------------- | ---------------------------------------------- |
| `fill="#f76231"` hardcoded hex     | `fill="var(--sem-brand)"`                      |
| `stroke="black"`                   | `stroke="var(--sem-border-strong)"`            |
| `fontSize: 14` without font family | Use `fontFamily: 'var(--primitive-font-sans)'` |
| `style={{ color: 'gray' }}`        | `className="text-fg-muted"` for non-SVG        |
| Inline margin/padding values       | Design token spacing                           |

---

## Accessibility Requirements

1. **MUST**: Add `role="img"` and `aria-label` to chart `<svg>` element
2. **MUST**: Provide data table alternative for screen readers
3. **SHOULD**: Support keyboard navigation for interactive elements
4. **SHOULD**: Use patterns/textures in addition to color for print

```tsx
<svg
  width={width}
  height={height}
  role="img"
  aria-label="Bar chart showing monthly revenue"
>
  <title>Monthly Revenue Chart</title>
  <desc>A bar chart displaying revenue from January to December</desc>
  {/* Chart content */}
</svg>
```

---

## Completion Checklist

Before marking a chart complete:

- [ ] All colors use CSS custom properties from design tokens
- [ ] Axis labels use design token typography
- [ ] Tooltips styled with design tokens
- [ ] Chart is responsive using `ParentSize`
- [ ] Minimum width/height guards in place
- [ ] Accessibility attributes added
- [ ] Legend provided for multi-series charts
- [ ] Hover/interaction states implemented
- [ ] TypeScript types defined for data structure

---

## Reference Links

- [visx Documentation](https://airbnb.io/visx/)
- [visx Gallery](https://airbnb.io/visx/gallery)
- [visx GitHub Examples](https://github.com/airbnb/visx/tree/master/packages/visx-demo/src/sandboxes)
- [D3 Scale Reference](https://github.com/d3/d3-scale)
