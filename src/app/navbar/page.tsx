'use client'

import { Navbar } from '@/components/ui/navbar'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'

export default function NavbarDemoPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-6xl mx-auto p-200 space-y-200">
        <h1 className="text-heading-h3 text-fg-primary font-semibold">Navbar</h1>
        <p className="text-body-base text-fg-secondary">
          A top navigation bar with slots for logo, links, and actions.
        </p>

        {/* Default Navbar */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Default</h2>
          <div className="border border-border-subtle rounded-xl overflow-hidden">
            <Navbar sticky={false}>
              <Navbar.Logo>
                <span className="text-label-lg font-semibold">Maple</span>
              </Navbar.Logo>
              <Navbar.Links>
                <Navbar.Link href="/navbar">Portfolio</Navbar.Link>
                <Navbar.Link href="/lend">Lend</Navbar.Link>
                <Navbar.Link href="/borrow">Borrow</Navbar.Link>
              </Navbar.Links>
              <Navbar.Actions>
                <Button size="sm">Connect Wallet</Button>
              </Navbar.Actions>
            </Navbar>
          </div>
        </section>

        {/* Transparent Navbar */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Transparent Variant</h2>
          <div className="border border-border-subtle rounded-xl overflow-hidden bg-gradient-to-r from-brand-subtle to-info-subtle">
            <Navbar variant="transparent" sticky={false}>
              <Navbar.Logo>
                <span className="text-label-lg font-semibold">Maple</span>
              </Navbar.Logo>
              <Navbar.Links>
                <Navbar.Link href="/navbar">Portfolio</Navbar.Link>
                <Navbar.Link href="/lend">Lend</Navbar.Link>
                <Navbar.Link href="/borrow">Borrow</Navbar.Link>
              </Navbar.Links>
              <Navbar.Actions>
                <Avatar size="md" type="brand">JS</Avatar>
              </Navbar.Actions>
            </Navbar>
          </div>
        </section>

        {/* Usage Example */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Usage</h2>
          <pre className="bg-surface border border-border-subtle rounded-lg p-100 text-body-sm overflow-x-auto">
{`<Navbar>
  <Navbar.Logo>
    <span>Maple</span>
  </Navbar.Logo>
  <Navbar.Links>
    <Navbar.Link href="/portfolio">Portfolio</Navbar.Link>
    <Navbar.Link href="/lend">Lend</Navbar.Link>
  </Navbar.Links>
  <Navbar.Actions>
    <Button>Connect Wallet</Button>
  </Navbar.Actions>
</Navbar>`}
          </pre>
        </section>
      </div>
    </div>
  )
}
