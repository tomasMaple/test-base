'use client'

import { Badge } from '@/components/ui/badge'
import { Check, X, AlertTriangle, Info, Star, Bell, Heart, Zap } from 'lucide-react'

export default function BadgePage() {
  const types = ['primary', 'secondary', 'brand', 'info', 'positive', 'warning', 'negative'] as const
  const appearances = ['default', 'subtle'] as const
  const sizes = ['56', '48', '40', '36', '32', '24', '20', '16', '12'] as const

  return (
    <div className="p-200 space-y-200">
      <h1 className="text-heading-h4 text-fg-primary">Badge</h1>
      <p className="text-body-base text-fg-secondary">
        Circular badge component for displaying numbers or icons.
      </p>

      {/* Size Scale with Numbers */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Sizes (with numbers)</h2>
        <div className="flex items-end gap-100 p-100 bg-primary rounded-md">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-50">
              <Badge size={size} type="primary">
                {parseInt(size) > 20 ? '99' : '9'}
              </Badge>
              <span className="text-label-xs text-fg-muted">{size}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Size Scale with Icons */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Sizes (with icons)</h2>
        <div className="flex items-end gap-100 p-100 bg-primary rounded-md">
          {sizes.slice(0, 7).map((size) => (
            <div key={size} className="flex flex-col items-center gap-50">
              <Badge size={size} type="brand" icon={<Star />} />
              <span className="text-label-xs text-fg-muted">{size}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Types - Default Appearance */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Types (Default Appearance)</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          {types.map((type) => (
            <div key={type} className="flex flex-col items-center gap-50">
              <Badge size="40" type={type}>5</Badge>
              <span className="text-label-xs text-fg-muted capitalize">{type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Types - Subtle Appearance */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Types (Subtle Appearance)</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          {types.map((type) => (
            <div key={type} className="flex flex-col items-center gap-50">
              <Badge size="40" type={type} appearance="subtle">5</Badge>
              <span className="text-label-xs text-fg-muted capitalize">{type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">With Icons</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          <Badge size="40" type="positive" icon={<Check />} />
          <Badge size="40" type="negative" icon={<X />} />
          <Badge size="40" type="warning" icon={<AlertTriangle />} />
          <Badge size="40" type="info" icon={<Info />} />
          <Badge size="40" type="brand" icon={<Star />} />
          <Badge size="40" type="primary" icon={<Bell />} />
          <Badge size="40" type="secondary" icon={<Heart />} />
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Use Cases</h2>
        <div className="flex flex-wrap items-center gap-200 p-100 bg-primary rounded-md">
          {/* Notification count */}
          <div className="flex flex-col items-center gap-50">
            <div className="relative">
              <Bell className="size-icon-3xl text-fg-secondary" />
              <Badge 
                size="16" 
                type="negative" 
                className="absolute -top-6 -right-6"
              >
                3
              </Badge>
            </div>
            <span className="text-label-xs text-fg-muted">Notification</span>
          </div>
          
          {/* Status indicator */}
          <div className="flex flex-col items-center gap-50">
            <Badge size="24" type="positive" icon={<Check />} />
            <span className="text-label-xs text-fg-muted">Complete</span>
          </div>
          
          {/* Counter */}
          <div className="flex flex-col items-center gap-50">
            <Badge size="32" type="brand">12</Badge>
            <span className="text-label-xs text-fg-muted">Items</span>
          </div>
        </div>
      </section>

      {/* Full Matrix */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Type × Appearance Matrix</h2>
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="p-50 text-label-xs text-fg-muted text-left">Type</th>
                {appearances.map((app) => (
                  <th key={app} className="p-50 text-label-xs text-fg-muted text-left capitalize">{app}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {types.map((type) => (
                <tr key={type}>
                  <td className="p-50 text-label-xs text-fg-secondary capitalize">{type}</td>
                  {appearances.map((appearance) => (
                    <td key={appearance} className="p-50">
                      <Badge size="32" type={type} appearance={appearance}>
                        7
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
