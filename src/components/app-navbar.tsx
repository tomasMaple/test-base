'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/ui/navbar'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export function AppNavbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isBorrowerMvp = pathname.startsWith('/borrower-mvp')
  const isBorrowerFull = pathname.startsWith('/borrower') && !isBorrowerMvp

  if (isHomePage) {
    return (
      <Navbar>
        <Navbar.Brand>
          <Navbar.Logo />
        </Navbar.Brand>
      </Navbar>
    )
  }

  if (isBorrowerMvp) {
    return (
      <Navbar>
        <Navbar.Brand>
          <Navbar.Logo />
          <Navbar.Links>
            <Navbar.Link href="/borrower-mvp">Borrower</Navbar.Link>
            <Navbar.Link href="/borrower-mvp/transactions">Transactions</Navbar.Link>
          </Navbar.Links>
        </Navbar.Brand>
        <Navbar.Actions>
          <Button size="md" beforeIcon={<Wallet />}>
            Connect Wallet
          </Button>
        </Navbar.Actions>
      </Navbar>
    )
  }

  if (isBorrowerFull) {
    return (
      <Navbar>
        <Navbar.Brand>
          <Navbar.Logo />
          <Navbar.Links>
            <Navbar.Link href="/borrower">Borrower</Navbar.Link>
            <Navbar.Link href="/borrower/calculator">LTV Calculator</Navbar.Link>
            <Navbar.Link href="/borrower/transactions">Transactions</Navbar.Link>
          </Navbar.Links>
        </Navbar.Brand>
        <Navbar.Actions>
          <Button size="md" beforeIcon={<Wallet />}>
            Connect Wallet
          </Button>
        </Navbar.Actions>
      </Navbar>
    )
  }

  // Default navbar for other pages (overview, etc.)
  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Logo />
        <Navbar.Links>
          <Navbar.Link href="/overview">Overview</Navbar.Link>
        </Navbar.Links>
      </Navbar.Brand>
      <Navbar.Actions>
        <Button size="md" beforeIcon={<Wallet />}>
          Connect Wallet
        </Button>
      </Navbar.Actions>
    </Navbar>
  )
}
