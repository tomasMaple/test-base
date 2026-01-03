'use client'

import * as React from 'react'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

/**
 * Avatar variants using Tailwind Variants with Supernova design tokens.
 * Focuses on colorful backgrounds for fallback content.
 */
const avatarVariants = tv({
  slots: {
    root: 'relative flex shrink-0 overflow-hidden rounded-pill select-none items-center justify-center',
    image: 'aspect-square h-full w-full object-cover',
    fallback: 'flex h-full w-full items-center justify-center font-medium uppercase',
  },
  variants: {
    variant: {
      brand: {
        fallback: 'bg-brand text-on-brand-fg',
      },
      pink: {
        fallback: 'bg-pink text-on-accent-fg',
      },
      violet: {
        fallback: 'bg-violet text-on-accent-fg',
      },
      teal: {
        fallback: 'bg-teal text-on-accent-fg',
      },
      lime: {
        fallback: 'bg-lime text-on-accent-fg',
      },
      neutral: {
        fallback: 'bg-strong text-primary-fg',
      },
    },
    size: {
      sm: {
        root: 'size-control-sm',
        fallback: 'text-label-fixed-2-x-small',
      },
      md: {
        root: 'size-control-md',
        fallback: 'text-label-fixed-x-small',
      },
      lg: {
        root: 'size-control-lg',
        fallback: 'text-label-fixed-small',
      },
      xl: {
        root: 'size-control-xl',
        fallback: 'text-label-fixed-medium',
      },
      '2xl': {
        root: 'size-control-2xl',
        fallback: 'text-label-fixed-x-large',
      },
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
  },
})

export type AvatarProps = React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> &
  VariantProps<typeof avatarVariants> & {
    src?: string
    alt?: string
    fallback?: React.ReactNode
    delay?: number
  }

/**
 * Styled Avatar component using Base UI primitives
 * with Tailwind Variants and Supernova design tokens.
 *
 * @example
 * ```tsx
 * // Default with fallback
 * <Avatar fallback="JD" variant="brand" />
 * 
 * // With image
 * <Avatar src="path/to/image.jpg" alt="User Name" fallback="JD" />
 * ```
 */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, variant, size, src, alt, fallback, delay, ...props }, ref) => {
    const { root, image, fallback: fallbackStyles } = avatarVariants({ variant, size })

    return (
      <BaseAvatar.Root
        ref={ref}
        className={cn(root(), className)}
        {...props}
      >
        {src && (
          <BaseAvatar.Image
            src={src}
            alt={alt}
            className={image()}
          />
        )}
        <BaseAvatar.Fallback
          delay={delay}
          className={fallbackStyles()}
        >
          {fallback}
        </BaseAvatar.Fallback>
      </BaseAvatar.Root>
    )
  }
)

Avatar.displayName = 'Avatar'
