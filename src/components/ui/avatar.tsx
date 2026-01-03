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
    'bg-secondary text-fg-secondary font-medium',
  ],
})

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
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
          <div className={avatarFallbackVariants()}>
            {fallback || (alt ? alt.slice(0, 2).toUpperCase() : '??')}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar, avatarVariants }
