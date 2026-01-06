'use client'

import { Navbar } from '@/components/ui/navbar'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export function AppNavbar() {
  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Logo />
        <Navbar.Links>
          <Navbar.Link href="/">Landing</Navbar.Link>
          <Navbar.Link href="/borrower">Borrower</Navbar.Link>
          <Navbar.Link href="/templates/test">Test</Navbar.Link>
          <Navbar.Link href="/overview/navbar">Overview</Navbar.Link>
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
