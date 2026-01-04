'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { IconButton } from '@/components/ui/icon-button'
import { DashboardCard } from '@/components/ui/dashboard-card'
import { TokenLogo } from '@/components/ui/token-logo'
import { Badge } from '@/components/ui/badge'
import { 
  Briefcase, 
  Users, 
  Building2, 
  Edit, 
  Plus, 
  MoreHorizontal, 
  Wallet,
  Bitcoin,
  CircleDollarSign
} from 'lucide-react'

// =============================================================================
// MOCK DATA
// =============================================================================

const BORROWER_WALLETS = [
  {
    id: '1',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f3f8a',
    network: 'Ethereum',
    icon: <Users className="size-icon-lg text-fg-inverse" />,
    iconBg: 'bg-brand-solid',
  }
]

const COLLATERAL_WALLETS = [
  {
    id: '1',
    address: '8KxH2MZT9Yfsgg7vP2R8CqzjLQ5eTnqfYJH8wzvop3kD',
    network: 'Solana',
    icon: <CircleDollarSign className="size-icon-lg text-fg-inverse" />,
    iconBg: 'bg-positive-solid',
  }
]

// =============================================================================
// PAGE
// =============================================================================

export default function BorrowTestPage() {
  return (
    <main className="max-w-[640px] mx-auto px-150 py-200">
      
      {/* Page Header */}
      <h1 className="text-heading-h3 font-semibold text-fg-primary mb-200">
        Account settings
      </h1>

      <Tabs defaultValue="entities">
        {/* Controls Row */}
        <div className="flex items-center justify-between mb-200">
          <TabsList padding="noPadding" variant="primary" className="bg-subtle p-25 rounded-pill inline-flex">
            <TabsTrigger 
              value="team" 
              className="rounded-pill px-150 py-50 text-label-sm font-medium text-fg-secondary data-[state=active]:bg-surface data-[state=active]:text-fg-primary data-[state=active]:shadow-sm transition-all"
            >
              <Users className="size-icon-sm mr-50" />
              Team Members
            </TabsTrigger>
            <TabsTrigger 
              value="entities" 
              className="rounded-pill px-150 py-50 text-label-sm font-medium text-fg-secondary data-[state=active]:bg-surface data-[state=active]:text-fg-primary data-[state=active]:shadow-sm transition-all"
            >
              <Briefcase className="size-icon-sm mr-50" />
              Entities
            </TabsTrigger>
          </TabsList>

          <Button size="sm" variant="primary" beforeIcon={<Edit className="size-icon-sm" />}>
            Edit
          </Button>
        </div>

        <TabsContent value="entities" className="mt-0 space-y-200">
          
          {/* Entity Card */}
          <DashboardCard>
            {/* Card Header */}
            <div className="p-150 border-b border-border-weak flex items-start gap-100">
              <div className="size-control-md rounded-full bg-positive-subtle flex items-center justify-center shrink-0">
                <Briefcase className="size-icon-lg text-positive" />
              </div>
              <div>
                <div className="text-label-lg font-semibold text-fg-primary">Galaxy Fund I LP</div>
                <div className="text-label-sm text-fg-secondary">Active</div>
              </div>
            </div>

            {/* Sections */}
            <DashboardCard.Content className="p-0">
              
              {/* Borrower Wallets */}
              <div className="p-150 border-b border-border-weak">
                <div className="flex items-center justify-between mb-100">
                  <h3 className="text-label-sm text-fg-secondary">Your Borrower wallets</h3>
                  <Button size="xs" variant="ghost" beforeIcon={<Plus />}>
                    Add
                  </Button>
                </div>
                
                <div className="space-y-50">
                  {BORROWER_WALLETS.map((wallet) => (
                    <div key={wallet.id} className="bg-subtle rounded-lg p-100 flex items-center justify-between group">
                      <div className="flex items-center gap-100 overflow-hidden">
                        <div className={`size-control-md rounded-full ${wallet.iconBg} flex items-center justify-center shrink-0`}>
                          {wallet.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-label-md font-medium text-fg-primary truncate">
                            {wallet.address}
                          </div>
                          <div className="flex items-center gap-50 text-label-xs text-fg-secondary">
                            {wallet.network === 'Ethereum' && <TokenLogo token="eth" size="3xs" />} 
                            {wallet.network}
                          </div>
                        </div>
                      </div>
                      <IconButton size="sm" variant="ghost" className="text-fg-secondary hover:text-fg-primary">
                        <MoreHorizontal />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collateral Return Wallets */}
              <div className="p-150 border-b border-border-weak">
                <div className="flex items-center justify-between mb-100">
                  <h3 className="text-label-sm text-fg-secondary">Your Collateral Return wallets</h3>
                  <Button size="xs" variant="ghost" beforeIcon={<Plus />}>
                    Add
                  </Button>
                </div>
                
                <div className="space-y-50">
                  {COLLATERAL_WALLETS.map((wallet) => (
                    <div key={wallet.id} className="bg-subtle rounded-lg p-100 flex items-center justify-between group">
                      <div className="flex items-center gap-100 overflow-hidden">
                        <div className={`size-control-md rounded-full ${wallet.iconBg} flex items-center justify-center shrink-0`}>
                          {wallet.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-label-md font-medium text-fg-primary truncate">
                            {wallet.address}
                          </div>
                          <div className="flex items-center gap-50 text-label-xs text-fg-secondary">
                            {wallet.network === 'Solana' && <TokenLogo token="sol" size="3xs" />}
                            {wallet.network}
                          </div>
                        </div>
                      </div>
                      <IconButton size="sm" variant="ghost" className="text-fg-secondary hover:text-fg-primary">
                        <MoreHorizontal />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maple Collateral Deposit Wallets */}
              <div className="p-150">
                <h3 className="text-label-sm text-fg-secondary mb-100">Maple Collateral Deposit wallets</h3>
                
                <div className="bg-subtle rounded-lg p-100 flex items-center justify-between group">
                  <div className="flex items-center gap-100">
                    <div className="size-control-md rounded-full bg-brand-solid flex items-center justify-center shrink-0">
                      <Wallet className="size-icon-lg text-fg-inverse" />
                    </div>
                    <div>
                      <div className="text-label-md font-medium text-fg-primary">
                        5 Maple Collateral deposit wallets
                      </div>
                      <div className="flex items-center gap-25 text-label-xs text-fg-secondary mt-25">
                        Networks
                        <div className="flex -space-x-12 ml-50">
                          <div className="relative z-30 ring-2 ring-subtle rounded-full"><TokenLogo token="btc" size="3xs" /></div>
                          <div className="relative z-20 ring-2 ring-subtle rounded-full"><TokenLogo token="eth" size="3xs" /></div>
                          <div className="relative z-10 ring-2 ring-subtle rounded-full"><TokenLogo token="sol" size="3xs" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-fg-secondary hover:text-fg-primary">
                    View
                  </Button>
                </div>
              </div>

            </DashboardCard.Content>
          </DashboardCard>

        </TabsContent>

        <TabsContent value="team">
          <DashboardCard>
             <DashboardCard.Content className="p-200 text-center text-fg-secondary">
               Team members content placeholder
             </DashboardCard.Content>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </main>
  )
}
