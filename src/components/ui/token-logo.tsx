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
      sm: 'size-icon-sm',   // 12px
      md: 'size-icon-md',   // 14px
      lg: 'size-icon-lg',   // 16px
      xl: 'size-icon-xl',   // 18px
      '2xl': 'size-icon-2xl', // 20px
      '3xl': 'size-icon-3xl', // 24px
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

/**
 * Size to pixel mapping for Next.js Image
 */
const sizePixelMap = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
} as const

export type TokenLogoProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tokenLogoVariants> & {
    /** Token identifier matching filename in /public/logos/ */
    token: TokenId
  }

const TokenLogo = React.forwardRef<HTMLSpanElement, TokenLogoProps>(
  ({ className, token, size = 'lg', ...props }, ref) => {
    const pixels = sizePixelMap[size ?? 'lg']
    
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
