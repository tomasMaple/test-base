'use client'

import { Button, IconButton } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TokenLogo } from '@/components/ui/token-logo'
import { Avatar } from '@/components/ui/avatar'
import { TabsRoot, TabsList, TabsTrigger, TabsPanel } from '@/components/ui/tabs'
import { Users, Building2, Pencil, Plus, MoreHorizontal, Eye } from 'lucide-react'

// =============================================================================
// MOCK DATA
// =============================================================================

const entity = {
  name: 'Galaxy Fund I LP',
  status: 'Active',
  icon: 'maple',
}

const borrowerWallets = [
  {
    id: 1,
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f3f8a',
    network: 'Ethereum',
    networkIcon: 'eth',
  },
]

const collateralReturnWallets = [
  {
    id: 1,
    address: '8KxH2MZT9Yfsgg7vP2R8CqzjLQ5eTnqfYJH8wzvop3kD',
    network: 'Solana',
    networkIcon: 'sol',
  },
]

const mapleCollateralWallets = {
  count: 5,
  networks: ['eth', 'usdc', 'usdt', 'sol', 'btc'] as const,
}

// =============================================================================
// WALLET ROW COMPONENT
// =============================================================================

function WalletRow({
  address,
  network,
  networkIcon,
  showOverflow = true,
}: {
  address: string
  network: string
  networkIcon: string
  showOverflow?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-75">
      <div className="flex items-center gap-75">
        <TokenLogo token={networkIcon as 'eth' | 'sol'} size="sm" />
        <div className="flex flex-col">
          <span className="text-label-sm font-medium text-fg-primary">
            {address}
          </span>
          <span className="text-body-sm text-fg-secondary">{network}</span>
        </div>
      </div>
      {showOverflow && (
        <button className="p-50 rounded-md hover:bg-primary transition-colors">
          <MoreHorizontal className="size-icon-md text-fg-muted" />
        </button>
      )}
    </div>
  )
}

// =============================================================================
// PAGE
// =============================================================================

export default function AccountSettingsPage() {
  return (
    <main className="max-w-3xl mx-auto px-150 py-200">
      {/* Page Header */}
      <h1 className="text-heading-h3 font-semibold text-fg-primary mb-150">
        Account settings
      </h1>

      {/* Tabs and Edit Button Row */}
      <div className="flex items-center justify-between mb-150">
        <TabsRoot defaultValue="entities">
          <TabsList padding="withPadding" variant="canvas">
            <TabsTrigger value="team-members">
              <Users className="size-icon-sm mr-50" />
              Team Members
            </TabsTrigger>
            <TabsTrigger value="entities">
              <Building2 className="size-icon-sm mr-50" />
              Entities
            </TabsTrigger>
          </TabsList>
        </TabsRoot>

        <Button variant="primary" size="sm" beforeIcon={<Pencil />}>
          Edit
        </Button>
      </div>

      {/* Entity Card */}
      <div className="bg-surface rounded-lg border border-border-subtle p-150">
        {/* Entity Header */}
        <div className="flex items-center gap-100 mb-150">
          <Avatar
            size="lg"
            type="teal"
            appearance="default"
            fallback={<Building2 className="size-icon-lg" />}
          />
          <div className="flex flex-col">
            <span className="text-label-md font-semibold text-fg-primary">
              {entity.name}
            </span>
            <span className="text-body-sm text-positive">{entity.status}</span>
          </div>
        </div>

        {/* Borrower Wallets Section */}
        <div className="mb-150">
          <div className="flex items-center justify-between mb-75">
            <span className="text-label-xs text-fg-secondary">
              Your Borrower wallets
            </span>
            <button className="flex items-center gap-25 text-label-xs text-fg-secondary hover:text-fg-primary transition-colors">
              <Plus className="size-icon-sm" />
              Add
            </button>
          </div>
          <div className="bg-canvas rounded-md px-100">
            {borrowerWallets.map((wallet) => (
              <WalletRow
                key={wallet.id}
                address={wallet.address}
                network={wallet.network}
                networkIcon={wallet.networkIcon}
              />
            ))}
          </div>
        </div>

        {/* Collateral Return Wallets Section */}
        <div className="mb-150">
          <div className="flex items-center justify-between mb-75">
            <span className="text-label-xs text-fg-secondary">
              Your Collateral Return wallets
            </span>
            <button className="flex items-center gap-25 text-label-xs text-fg-secondary hover:text-fg-primary transition-colors">
              <Plus className="size-icon-sm" />
              Add
            </button>
          </div>
          <div className="bg-canvas rounded-md px-100">
            {collateralReturnWallets.map((wallet) => (
              <WalletRow
                key={wallet.id}
                address={wallet.address}
                network={wallet.network}
                networkIcon={wallet.networkIcon}
              />
            ))}
          </div>
        </div>

        {/* Maple Collateral Deposit Wallets Section */}
        <div>
          <div className="mb-75">
            <span className="text-label-xs text-fg-secondary">
              Maple Collateral Deposit wallets
            </span>
          </div>
          <div className="bg-canvas rounded-md px-100 py-75">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-75">
                <TokenLogo token="maple" size="sm" />
                <div className="flex flex-col">
                  <span className="text-label-sm font-medium text-fg-primary">
                    {mapleCollateralWallets.count} Maple Collateral deposit wallets
                  </span>
                  <div className="flex items-center gap-25">
                    <span className="text-body-sm text-fg-secondary">Networks</span>
                    <div className="flex -space-x-25">
                      {mapleCollateralWallets.networks.map((network, idx) => (
                        <TokenLogo
                          key={network}
                          token={network}
                          size="3xs"
                          className="border-2 border-canvas"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button className="text-label-sm text-fg-secondary hover:text-fg-primary transition-colors">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
