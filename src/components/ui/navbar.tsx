'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const navbarVariants = tv({
  base: [
    'w-full h-[64px]',
    'flex items-center justify-between',
    'px-150 gap-100',
    'border-b border-border-subtle',
    'transition-colors duration-fast ease-default',
  ],
  variants: {
    variant: {
      default: 'bg-surface',
    },
    sticky: {
      true: 'sticky top-0 z-50',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    sticky: true,
  },
})

const navLinkVariants = tv({
  base: [
    'px-75 py-50 rounded-md',
    'transition-colors duration-fast ease-default',
    'hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong',
  ],
  variants: {
    active: {
      true: 'text-fg-primary bg-primary text-label-sm',
      false: 'text-fg-muted hover:text-fg-secondary text-body-sm',
    },
  },
  defaultVariants: {
    active: false,
  },
})

// =============================================================================
// TYPES
// =============================================================================

type NavbarVariantProps = {
  variant?: 'default'
  sticky?: boolean
}

interface NavbarContextValue {
  pathname: string
}

const NavbarContext = React.createContext<NavbarContextValue | undefined>(undefined)

// =============================================================================
// NAVBAR ROOT
// =============================================================================

interface NavbarRootProps extends React.HTMLAttributes<HTMLElement>, NavbarVariantProps {
  children: React.ReactNode
}

const NavbarRoot = React.forwardRef<HTMLElement, NavbarRootProps>(
  ({ className, variant, sticky, children, ...props }, ref) => {
    const pathname = usePathname()

    return (
      <NavbarContext.Provider value={{ pathname }}>
        <nav
          ref={ref}
          className={cn(navbarVariants({ variant, sticky }), className)}
          {...props}
        >
          {children}
        </nav>
      </NavbarContext.Provider>
    )
  }
)
NavbarRoot.displayName = 'Navbar'

// =============================================================================
// NAVBAR LOGO
// =============================================================================

interface NavbarLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
}

const NavbarLogo = React.forwardRef<HTMLDivElement, NavbarLogoProps>(
  ({ className, href = '/', ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center shrink-0', className)} {...props}>
        <Link href={href} className="flex items-center">
          <Image
            src="/logos/Maple_Logo_black.svg"
            alt="Maple"
            width={100}
            height={24}
            priority
          />
        </Link>
      </div>
    )
  }
)
NavbarLogo.displayName = 'NavbarLogo'

// =============================================================================
// NAVBAR BRAND (Logo + Links wrapper)
// =============================================================================

interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const NavbarBrand = React.forwardRef<HTMLDivElement, NavbarBrandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-200', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
NavbarBrand.displayName = 'NavbarBrand'

// =============================================================================
// NAVBAR LINKS
// =============================================================================

interface NavbarLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const NavbarLinks = React.forwardRef<HTMLDivElement, NavbarLinksProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-50', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
NavbarLinks.displayName = 'NavbarLinks'

// =============================================================================
// NAVBAR LINK
// =============================================================================

interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, href, children, ...props }, ref) => {
    const context = React.useContext(NavbarContext)
    const isActive = context?.pathname === href

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(navLinkVariants({ active: isActive }), className)}
        {...props}
      >
        {children}
      </Link>
    )
  }
)
NavbarLink.displayName = 'NavbarLink'

// =============================================================================
// NAVBAR ACTIONS
// =============================================================================

interface NavbarActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const NavbarActions = React.forwardRef<HTMLDivElement, NavbarActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-50 shrink-0 ml-auto', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
NavbarActions.displayName = 'NavbarActions'

// =============================================================================
// EXPORTS
// =============================================================================

export const Navbar = Object.assign(NavbarRoot, {
  Logo: NavbarLogo,
  Brand: NavbarBrand,
  Links: NavbarLinks,
  Link: NavbarLink,
  Actions: NavbarActions,
})

export {
  NavbarRoot,
  NavbarLogo,
  NavbarBrand,
  NavbarLinks,
  NavbarLink,
  NavbarActions,
  navbarVariants,
  navLinkVariants,
}
