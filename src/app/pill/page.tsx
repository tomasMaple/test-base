'use client'

import { Pill } from '@/components/ui/pill'
import { TokenLogo } from '@/components/ui/token-logo'
import { Check, X, AlertTriangle, Info, Star } from 'lucide-react'

export default function PillPage() {
  const types = ['primary', 'secondary', 'brand', 'info', 'positive', 'warning', 'negative'] as const
  const appearances = ['default', 'subtle', 'ghost'] as const
  const sizes = ['32', '24', '20', '16'] as const

  return (
    <div className="p-200 space-y-200">
      <h1 className="text-heading-h4 text-fg-primary">Pill</h1>
      <p className="text-body-base text-fg-secondary">
        A display-only badge/tag component with multiple type and appearance variants.
      </p>

      {/* Types with Default Appearance */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Types (Default Appearance)</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          {types.map((type) => (
            <Pill key={type} type={type} appearance="default">
              {type}
            </Pill>
          ))}
        </div>
      </section>

      {/* Types with Subtle Appearance */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Types (Subtle Appearance)</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          {types.map((type) => (
            <Pill key={type} type={type} appearance="subtle">
              {type}
            </Pill>
          ))}
        </div>
      </section>

      {/* Types with Ghost Appearance */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Types (Ghost Appearance)</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-surface border border-border-subtle rounded-md">
          {types.map((type) => (
            <Pill key={type} type={type} appearance="ghost">
              {type}
            </Pill>
          ))}
        </div>
      </section>

      {/* Size Scale */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Sizes</h2>
        <div className="flex items-center gap-100 p-100 bg-primary rounded-md">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-50">
              <Pill size={size} type="primary">Label</Pill>
              <span className="text-label-xs text-fg-muted">{size}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">With Icons</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          <Pill type="positive" beforeIcon={<Check />}>
            Approved
          </Pill>
          <Pill type="negative" beforeIcon={<X />}>
            Rejected
          </Pill>
          <Pill type="warning" beforeIcon={<AlertTriangle />}>
            Pending
          </Pill>
          <Pill type="info" beforeIcon={<Info />}>
            Info
          </Pill>
          <Pill type="brand" afterIcon={<Star />}>
            Featured
          </Pill>
        </div>
      </section>

      {/* With Token Logos */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">With Token Logos</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          <Pill type="secondary" beforeIcon={<TokenLogo token="btc" size="md" />}>
            Bitcoin
          </Pill>
          <Pill type="secondary" beforeIcon={<TokenLogo token="eth" size="md" />}>
            Ethereum
          </Pill>
          <Pill type="secondary" beforeIcon={<TokenLogo token="usdc" size="md" />}>
            USDC
          </Pill>
          <Pill type="secondary" beforeIcon={<TokenLogo token="sol" size="md" />}>
            Solana
          </Pill>
        </div>
      </section>

      {/* Full Matrix */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Full Type × Appearance Matrix</h2>
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
                      <Pill type={type} appearance={appearance}>
                        Label
                      </Pill>
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
