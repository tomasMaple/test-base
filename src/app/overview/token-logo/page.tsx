'use client'

import { TokenLogo, TOKEN_LOGOS, type TokenId } from '@/components/ui/token-logo'
import { Button } from '@/components/ui/button'

export default function TokenLogoPage() {
  // Group tokens for display
  const popularTokens: TokenId[] = ['btc', 'eth', 'usdc', 'usdt', 'dai', 'wbtc', 'weth', 'sol']
  
  return (
    <div className="p-200 space-y-200">
      <h1 className="text-heading-h4 text-fg-primary">Token Logo</h1>
      <p className="text-body-base text-fg-secondary">
        Reusable token/crypto logo component with size variants.
      </p>

      {/* Size Scale */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Size Scale</h2>
        <div className="flex items-end gap-100 p-100 bg-primary rounded-md">
          {(['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-50">
              <TokenLogo token="btc" size={size} />
              <span className="text-label-xs text-fg-muted">{size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Tokens */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Popular Tokens</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          {popularTokens.map((token) => (
            <div key={token} className="flex flex-col items-center gap-50">
              <TokenLogo token={token} size="3xl" />
              <span className="text-label-xs text-fg-muted uppercase">{token}</span>
            </div>
          ))}
        </div>
      </section>

      {/* All Available Tokens */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">All Tokens ({TOKEN_LOGOS.length})</h2>
        <div className="flex flex-wrap gap-75 p-100 bg-primary rounded-md">
          {TOKEN_LOGOS.map((token) => (
            <div key={token} className="flex flex-col items-center gap-25 w-[60px]">
              <TokenLogo token={token} size="2xl" />
              <span className="text-label-2xs text-fg-muted truncate w-full text-center">{token}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Button Integration */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Button Integration</h2>
        <p className="text-body-sm text-fg-secondary">
          Use TokenLogo with Button's <code className="bg-primary px-25 rounded-sm">beforeIcon</code> prop.
        </p>
        <div className="flex flex-wrap gap-100">
          <Button variant="primary" beforeIcon={<TokenLogo token="btc" size="lg" />}>
            Buy Bitcoin
          </Button>
          <Button variant="secondary" beforeIcon={<TokenLogo token="eth" size="lg" />}>
            Stake ETH
          </Button>
          <Button variant="tertiary" beforeIcon={<TokenLogo token="usdc" size="lg" />}>
            Send USDC
          </Button>
        </div>
      </section>
    </div>
  )
}
