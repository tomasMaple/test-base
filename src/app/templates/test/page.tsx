'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DashboardCard } from '@/components/ui/dashboard-card'
import { TokenLogo } from '@/components/ui/token-logo'
import { Wallet, Info, ChevronUp, ArrowUpRight, Droplets } from 'lucide-react'

// =============================================================================
// MOCK DATA
// =============================================================================

const ASSETS = [
  { id: 'btc', name: 'syrupBTC', balance: '0.000000', value: '$0.00', subtext: '0 syrupBTC' },
  { id: 'usdc', name: 'syrupUSDC', balance: '$0.00', value: '$0.00', subtext: '0 syrupUSDC' },
  { id: 'usdt', name: 'syrupUSDT', balance: '$0.00', value: '$0.00', subtext: '0 syrupUSDT' },
]

const PROTOCOLS = [
  { id: 'pendle', name: 'Pendle', description: 'Add Liquidity', icon: 'pendle' },
  { id: 'morpho', name: 'Morpho', description: 'Add Liquidity', icon: 'morpho' },
  { id: 'spark', name: 'Spark', description: 'Add Liquidity', icon: 'spark' },
  { id: 'superform', name: 'Superform', description: 'Add Liquidity', icon: 'superform' },
  { id: 'balancer', name: 'Balancer', description: 'Swap', icon: 'balancer' },
  { id: 'uniswap', name: 'Uniswap', description: 'Swap', icon: 'uni' },
]

export default function TestPage() {
  return (
    <main className="min-w-[640px] mx-auto px-150 py-200 space-y-200">
      
      {/* Top Section: Balance & Assets */}
      <DashboardCard className="overflow-visible">
        <DashboardCard.Content>
          {/* Balance Header */}
          <div className="flex justify-between items-start mb-200">
            <div>
              <div className="text-label-sm text-fg-secondary mb-25">Total Balance</div>
              <div className="text-heading-h2 font-semibold text-fg-primary mb-100">$0.00</div>
              
              <div className="flex gap-150">
                <div>
                  <div className="flex items-center gap-25 text-label-xs text-fg-secondary mb-25">
                    Total Earnings <Info className="size-icon-sm" />
                  </div>
                  <div className="text-body-lg font-medium text-fg-primary">$0</div>
                </div>
                <div>
                  <div className="text-label-xs text-fg-secondary mb-25">Drips Earned</div>
                  <div className="flex items-center gap-25 text-body-lg font-medium text-fg-primary">
                    <span className="text-brand flex items-center"><Droplets className="size-icon-md mr-12" /></span> 0
                  </div>
                </div>
              </div>
            </div>
            
            <Button size="md" beforeIcon={<Wallet className="size-icon-md" />}>
              Deposit
            </Button>
          </div>

          <hr className="border-border-weak mb-150" />

          {/* Tabs Section */}
          <Tabs defaultValue="balance">
            <TabsList padding="noPadding" className="bg-subtle p-25 rounded-lg mb-150">
              <TabsTrigger value="balance" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm px-100 py-50">
                Balance
              </TabsTrigger>
              <TabsTrigger value="transactions" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm px-100 py-50">
                Transactions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="balance" className="space-y-100 mt-0">
              {ASSETS.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between py-50">
                  <div className="flex items-center gap-100">
                    <TokenLogo token={asset.id as any} size="md" />
                    <div>
                      <div className="text-label-md font-medium text-fg-primary">{asset.balance}</div>
                      <div className="text-label-xs text-fg-secondary">{asset.subtext}</div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-0 py-200 text-center text-fg-secondary text-body-sm">
              No transactions yet.
            </TabsContent>
          </Tabs>
        </DashboardCard.Content>
      </DashboardCard>

      {/* Bottom Section: Earn In DeFi */}
      <DashboardCard>
        <DashboardCard.Header 
          title="Earn In DeFi"
          action={
            <Button size="sm" variant="ghost" className="text-fg-primary">
              <ChevronUp className="size-icon-md" />
            </Button>
          }
        />
        
        <DashboardCard.Content>
          <Tabs defaultValue="syrupUSD">
            <div className="mb-150">
              <TabsList padding="noPadding" className="bg-subtle p-25 rounded-lg">
                <TabsTrigger value="syrupUSD" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm px-100 py-50">
                  syrupUSD
                </TabsTrigger>
                <TabsTrigger value="syrupBTC" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm px-100 py-50">
                  syrupBTC
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="syrupUSD" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-100">
                {PROTOCOLS.map((protocol) => (
                  <div 
                    key={protocol.id} 
                    className="flex items-center justify-between p-100 border border-border-weak 
                    rounded-xl hover:border-border-subtle hover:bg-subtle transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-100">
                      <TokenLogo token={protocol.icon as any} size="md" />
                      <div>
                        <div className="text-label-md font-medium text-fg-primary">{protocol.name}</div>
                        <div className="text-label-xs text-fg-secondary">{protocol.description}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="size-icon-md text-fg-tertiary group-hover:text-fg-primary transition-colors" />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="syrupBTC" className="mt-0 py-200 text-center text-fg-secondary text-body-sm">
              No syrupBTC protocols available yet.
            </TabsContent>
          </Tabs>
        </DashboardCard.Content>
      </DashboardCard>
    </main>
  )
}
