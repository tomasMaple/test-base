'use client'

import { Button } from '@/components/ui/button'
import { DashboardCard } from '@/components/ui/dashboard-card'
import { Badge } from '@/components/ui/badge'
import { Pill } from '@/components/ui/pill'
import { TokenLogo } from '@/components/ui/token-logo'
import { ArrowUpRight, TrendingUp } from 'lucide-react'

// =============================================================================
// MOCK DATA
// =============================================================================

const positions = [
  {
    id: 1,
    token: 'syrupUSDC',
    deposited: 50000,
    earned: 1234.56,
    apy: 8.5,
    status: 'active',
  },
  {
    id: 2,
    token: 'syrupUSDT',
    deposited: 25000,
    earned: 567.89,
    apy: 7.2,
    status: 'active',
  },
  {
    id: 3,
    token: 'syrupDAI',
    deposited: 10000,
    earned: 234.12,
    apy: 6.8,
    status: 'pending',
  },
]

const totalValue = positions.reduce((acc, p) => acc + p.deposited + p.earned, 0)
const totalEarned = positions.reduce((acc, p) => acc + p.earned, 0)

// =============================================================================
// PAGE
// =============================================================================

export default function PortfolioPage() {
  return (
    <main className="max-w-7xl mx-auto px-150 py-200">
      {/* Header */}
      <div className="mb-200">
        <h1 className="text-heading-h3 font-semibold text-fg-primary mb-50">
          Portfolio
        </h1>
        <p className="text-body-base text-fg-secondary">
          Track your positions and earnings across Maple Finance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-100 mb-200">
        <DashboardCard>
          <DashboardCard.Metric
            label="Total Value"
            value={`$${totalValue.toLocaleString()}`}
            change="+12.5% this month"
            trend="positive"
          />
        </DashboardCard>

        <DashboardCard>
          <DashboardCard.Metric
            label="Total Earned"
            value={`$${totalEarned.toLocaleString()}`}
            change="+$456 this week"
            trend="positive"
          />
        </DashboardCard>

        <DashboardCard>
          <DashboardCard.Metric
            label="Active Positions"
            value={positions.filter(p => p.status === 'active').length.toString()}
            trend="neutral"
          />
        </DashboardCard>
      </div>

      {/* Positions Table */}
      <DashboardCard size="lg">
        <DashboardCard.Header
          title="Your Positions"
          action={
            <Button size="sm" variant="secondary" afterIcon={<ArrowUpRight />}>
              View All
            </Button>
          }
        />
        <DashboardCard.Content>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-75 text-label-xs font-medium text-fg-muted uppercase tracking-wide">
                    Asset
                  </th>
                  <th className="text-right py-75 text-label-xs font-medium text-fg-muted uppercase tracking-wide">
                    Deposited
                  </th>
                  <th className="text-right py-75 text-label-xs font-medium text-fg-muted uppercase tracking-wide">
                    Earned
                  </th>
                  <th className="text-right py-75 text-label-xs font-medium text-fg-muted uppercase tracking-wide">
                    APY
                  </th>
                  <th className="text-right py-75 text-label-xs font-medium text-fg-muted uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr
                    key={position.id}
                    className="border-b border-border-weak hover:bg-subtle transition-colors"
                  >
                    <td className="py-100">
                      <div className="flex items-center gap-75">
                        <TokenLogo token={position.token.replace('syrup', '').toLowerCase() as 'usdc' | 'usdt'} size="3xs" />
                        <div>
                          <div className="text-label-sm font-medium text-fg-primary">
                            {position.token}
                          </div>
                          <div className="text-label-xs text-fg-muted">
                            Maple Pool
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-100 text-right">
                      <span className="text-label-sm font-medium text-fg-primary">
                        ${position.deposited.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-100 text-right">
                      <div className="flex items-center justify-end gap-25">
                        <TrendingUp className="size-icon-sm text-positive" />
                        <span className="text-label-sm font-medium text-positive">
                          +${position.earned.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-100 text-right">
                      <Pill type="positive" size="16">
                        {position.apy}% APY
                      </Pill>
                    </td>
                    <td className="py-100 text-right">
                      <Badge
                        type={position.status === 'active' ? 'positive' : 'warning'}
                        appearance="subtle"
                        size="20"
                      >
                        {position.status === 'active' ? 'Active' : 'Pending'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard.Content>
        <DashboardCard.Footer>
          <span className="text-label-xs text-fg-muted">
            Last updated: 5 minutes ago
          </span>
          <Button size="xs" variant="ghost">
            Refresh
          </Button>
        </DashboardCard.Footer>
      </DashboardCard>

      {/* Quick Actions */}
      <div className="mt-200 flex gap-100">
        <Button size="lg" beforeIcon={<ArrowUpRight />}>
          Deposit
        </Button>
        <Button size="lg" variant="secondary">
          Withdraw
        </Button>
      </div>
    </main>
  )
}
