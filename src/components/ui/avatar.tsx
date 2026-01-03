'use client'

import * as React from 'react'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'
// Base UI might not have a dedicated Avatar primitive yet, often it's just a div with img or fallback.
// Assuming standard accessible implementation:

const avatarVariants = tv({
  base: [
    'relative flex shrink-0 overflow-hidden rounded-full',
  ],
  variants: {
    size: {
      '3xs': 'size-control-3xs text-[8px]',
      '2xs': 'size-control-2xs text-[10px]',
      xs: 'size-control-xs text-label-xs',
      sm: 'size-control-sm text-label-xs',
      md: 'size-control-md text-label-sm',
      lg: 'size-control-lg text-label-md',
      xl: 'size-control-xl text-label-lg',
      '2xl': 'size-control-2xl text-heading-h6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const avatarImageVariants = tv({
  base: 'aspect-square h-full w-full object-cover',
})

const avatarFallbackVariants = tv({
  base: [
    'flex h-full w-full items-center justify-center rounded-full',
    'font-medium',
  ],
  variants: {
    appearance: {
      default: [],
      subtle: [],
    },
    type: {
      primary: [],
      secondary: [],
      brand: [],
      pink: [],
      fuchsia: [],
      violet: [],
      teal: [],
      lime: [],
      aave: [],
      cowswap: [],
      fluid: [],
    }
  },
  compoundVariants: [
    // Default (Solid/Strong)
    { appearance: 'default', type: 'primary', class: 'bg-primary text-fg-primary' }, // or bg-strong text-inverse? 'primary' usually means neutral in this context
    { appearance: 'default', type: 'secondary', class: 'bg-secondary text-fg-secondary' },
    { appearance: 'default', type: 'brand', class: 'bg-brand text-fg-on-brand' },
    { appearance: 'default', type: 'pink', class: 'bg-pink text-fg-on-brand' }, // Using on-brand (white) for strong colors
    { appearance: 'default', type: 'fuchsia', class: 'bg-fuchsia text-fg-on-brand' },
    { appearance: 'default', type: 'violet', class: 'bg-violet text-fg-on-brand' },
    { appearance: 'default', type: 'teal', class: 'bg-teal text-fg-on-brand' },
    { appearance: 'default', type: 'lime', class: 'bg-lime text-fg-on-brand' },
    { appearance: 'default', type: 'aave', class: 'bg-partner-aave text-fg-on-brand' },
    { appearance: 'default', type: 'cowswap', class: 'bg-partner-cowswap text-fg-on-brand' },
    { appearance: 'default', type: 'fluid', class: 'bg-partner-fluid text-fg-on-brand' },

    // Subtle (Soft)
    { appearance: 'subtle', type: 'primary', class: 'bg-weak text-fg-primary' },
    { appearance: 'subtle', type: 'secondary', class: 'bg-muted text-fg-secondary' },
    { appearance: 'subtle', type: 'brand', class: 'bg-brand-weak text-brand-strong' },
    { appearance: 'subtle', type: 'pink', class: 'bg-pink-weak text-pink-strong' },
    { appearance: 'subtle', type: 'fuchsia', class: 'bg-fuchsia-weak text-fuchsia-strong' },
    { appearance: 'subtle', type: 'violet', class: 'bg-violet-weak text-violet-strong' },
    { appearance: 'subtle', type: 'teal', class: 'bg-teal-weak text-teal-strong' },
    { appearance: 'subtle', type: 'lime', class: 'bg-lime-weak text-lime-strong' },
    { appearance: 'subtle', type: 'aave', class: 'bg-partner-aave-weak text-partner-aave-strong' },
    { appearance: 'subtle', type: 'cowswap', class: 'bg-partner-cowswap-weak text-partner-cowswap-strong' },
    // Fluid might not have subtle tokens defined in globals.css based on previous view, checking... 
    // Fluid had only base color. fallback to brand or special handling if needed.
    { appearance: 'subtle', type: 'fluid', class: 'bg-partner-fluid text-fg-primary' },
  ],
  defaultVariants: {
    appearance: 'default',
    type: 'primary',
  },
})

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof avatarVariants>,
  VariantProps<typeof avatarFallbackVariants> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, appearance, type, src, alt, fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className={avatarImageVariants()}
            onError={() => setImageError(true)}
          />
        ) : (
            <div className={avatarFallbackVariants({ appearance, type })}>
            {fallback || (alt ? alt.slice(0, 2).toUpperCase() : '??')}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar, avatarVariants, avatarFallbackVariants }
