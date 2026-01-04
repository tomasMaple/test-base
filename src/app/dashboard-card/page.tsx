'use client'

import { DashboardCard } from '@/components/ui/dashboard-card'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, ArrowUpRight } from 'lucide-react'

export default function DashboardCardDemoPage() {
  return (
    <div className="min-h-screen bg-canvas p-200">
      <div className="max-w-6xl mx-auto space-y-200">
        <h1 className="text-heading-h3 text-fg-primary font-semibold">Dashboard Card</h1>
        <p className="text-body-base text-fg-secondary">
          Flexible cards for displaying dashboard content with metrics, trends, and actions.
        </p>

        {/* Metric Cards Grid */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Metric Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-100">
            <DashboardCard>
              <DashboardCard.Metric
                label="Total Value Locked"
                value="$1,234,567"
                change="+12.5%"
                trend="positive"
              />
            </DashboardCard>

            <DashboardCard>
              <DashboardCard.Metric
                label="Total Earned"
                value="$45,678"
                change="+8.2%"
                trend="positive"
              />
            </DashboardCard>

            <DashboardCard>
              <DashboardCard.Metric
                label="Active Positions"
                value="12"
                change="-2"
                trend="negative"
              />
            </DashboardCard>
          </div>
        </section>

        {/* Card Variants */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-100">
            <DashboardCard variant="default">
              <DashboardCard.Header title="Default" />
              <DashboardCard.Content>
                <p className="text-body-sm text-fg-secondary">Standard border styling</p>
              </DashboardCard.Content>
            </DashboardCard>

            <DashboardCard variant="outlined">
              <DashboardCard.Header title="Outlined" />
              <DashboardCard.Content>
                <p className="text-body-sm text-fg-secondary">Stronger border, no background</p>
              </DashboardCard.Content>
            </DashboardCard>

            <DashboardCard variant="elevated">
              <DashboardCard.Header title="Elevated" />
              <DashboardCard.Content>
                <p className="text-body-sm text-fg-secondary">Shadow for emphasis</p>
              </DashboardCard.Content>
            </DashboardCard>
          </div>
        </section>

        {/* Card with Header Actions */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">With Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-100">
            <DashboardCard size="lg">
              <DashboardCard.Header
                title="Portfolio Performance"
                action={
                  <Button size="xs" variant="ghost">
                    <MoreHorizontal />
                  </Button>
                }
              />
              <DashboardCard.Metric
                value="$987,654"
                change="+5.4% this week"
                trend="positive"
              />
              <DashboardCard.Footer>
                <span className="text-label-xs text-fg-muted">Updated 5 min ago</span>
                <Button size="xs" variant="tertiary" afterIcon={<ArrowUpRight />}>
                  View Details
                </Button>
              </DashboardCard.Footer>
            </DashboardCard>

            <DashboardCard size="lg">
              <DashboardCard.Header title="Recent Activity" />
              <DashboardCard.Content>
                <div className="space-y-75">
                  <div className="flex justify-between items-center py-50 border-b border-border-subtle">
                    <span className="text-body-sm text-fg-primary">Deposited 1,000 USDC</span>
                    <span className="text-label-xs text-fg-muted">2h ago</span>
                  </div>
                  <div className="flex justify-between items-center py-50 border-b border-border-subtle">
                    <span className="text-body-sm text-fg-primary">Claimed rewards</span>
                    <span className="text-label-xs text-fg-muted">1d ago</span>
                  </div>
                  <div className="flex justify-between items-center py-50">
                    <span className="text-body-sm text-fg-primary">Withdrew 500 USDT</span>
                    <span className="text-label-xs text-fg-muted">3d ago</span>
                  </div>
                </div>
              </DashboardCard.Content>
            </DashboardCard>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-100">
            <DashboardCard size="sm">
              <DashboardCard.Metric label="Small" value="$123" trend="neutral" />
            </DashboardCard>
            <DashboardCard size="md">
              <DashboardCard.Metric label="Medium (default)" value="$456" trend="neutral" />
            </DashboardCard>
            <DashboardCard size="lg">
              <DashboardCard.Metric label="Large" value="$789" trend="neutral" />
            </DashboardCard>
          </div>
        </section>
      </div>
    </div>
  )
}
