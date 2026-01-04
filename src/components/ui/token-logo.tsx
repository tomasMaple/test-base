'use client'

import * as React from 'react'
import Image from 'next/image'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

/**
 * Available token identifiers
 * Maps to SVG files in /public/logos/
 */
export const TOKEN_LOGOS = [
  'aave',
  'arbitrium',
  'balancer',
  'btc',
  'btc-gradient',
  'cbbtc',
  'cowswap',
  'dai',
  'drips',
  'eth',
  'fluid',
  'hype',
  'jitosol',
  'jupiter',
  'kamino',
  'lbtc',
  'lombard',
  'maple',
  'midas',
  'morpho',
  'orca',
  'pendle',
  'plasma',
  'sky',
  'sol',
  'spark',
  'superform',
  'susde',
  'syrupbtc',
  'syrupusdc',
  'syrupusdt',
  'teth',
  'uni',
  'usdc',
  'usde',
  'usds',
  'usdt',
  'usdt0',
  'usr',
  'ustb',
  'wbtc',
  'weth',
  'weth-1',
  'xrp',
] as const

export type TokenId = (typeof TOKEN_LOGOS)[number]

/**
 * Token logo size variants using icon size scale
 */
const tokenLogoVariants = tv({
  base: [
    'relative shrink-0 rounded-full overflow-hidden',
  ],
  variants: {
    size: {
      '3xs': 'size-control-3xs', // 16px
      '2xs': 'size-control-2xs', // 20px
      xs: 'size-control-xs',     // 24px
      sm: 'size-control-sm',     // 32px
      md: 'size-control-md',     // 36px
      lg: 'size-control-lg',     // 40px
      xl: 'size-control-xl',     // 48px
      '2xl': 'size-control-2xl', // 56px
    },
  },
  defaultVariants: {
    size: '2xs',
  },
})

/**
 * Size to pixel mapping for Next.js Image
 */
const sizePixelMap = {
  '3xs': 16,
  '2xs': 20,
  xs: 24,
  sm: 32,
  md: 36,
  lg: 40,
  xl: 48,
  '2xl': 56,
} as const

export type TokenLogoProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tokenLogoVariants> & {
    /** Token identifier matching filename in /public/logos/ */
    token: TokenId
  }

const TokenLogo = React.forwardRef<HTMLSpanElement, TokenLogoProps>(
  ({ className, token, size = '3xs', ...props }, ref) => {
    const pixels = sizePixelMap[size ?? '3xs']
    
    return (
      <span
        ref={ref}
        className={cn(tokenLogoVariants({ size }), className)}
        {...props}
      >
        <Image
          src={`/logos/${token}.svg`}
          alt={`${token} logo`}
          width={pixels}
          height={pixels}
          className="object-contain"
        />
      </span>
    )
  }
)
TokenLogo.displayName = 'TokenLogo'

export { TokenLogo, tokenLogoVariants }
