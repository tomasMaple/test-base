'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function TabsPage() {
  return (
    <div className="p-300 bg-strong">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Tabs</h1>
        <p className="text-body-base text-fg-secondary">
          A set of layered sections of content—known as tab panels—that are displayed one at a time.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        {/* noPadding Variants */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">noPadding Variants</h2>
          <div className="flex flex-col gap-200">
            {/* noPadding + canvas */}
            <div>
              <p className="text-label-sm text-fg-muted mb-100">variant="canvas" (default)</p>
              <Tabs defaultValue="tab1">
                <TabsList padding="noPadding" variant="canvas">
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Password</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* noPadding + primary */}
            <div>
              <p className="text-label-sm text-fg-muted mb-100">variant="primary"</p>
              <Tabs defaultValue="tab1">
                <TabsList padding="noPadding" variant="primary">
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Password</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* noPadding + secondary */}
            <div>
              <p className="text-label-sm text-fg-muted mb-100">variant="secondary"</p>
              <Tabs defaultValue="tab1">
                <TabsList padding="noPadding" variant="secondary">
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Password</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* withPadding Variants */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">withPadding Variants</h2>
          <div className="flex flex-col gap-200">
            {/* withPadding + canvas */}
            <div>
              <p className="text-label-sm text-fg-muted mb-100">variant="canvas"</p>
              <Tabs defaultValue="tab1">
                <TabsList padding="withPadding" variant="canvas">
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Password</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* withPadding + primary */}
            <div>
              <p className="text-label-sm text-fg-muted mb-100">variant="primary"</p>
              <Tabs defaultValue="tab1">
                <TabsList padding="withPadding" variant="primary">
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Password</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* withPadding + secondary */}
            <div>
              <p className="text-label-sm text-fg-muted mb-100">variant="secondary"</p>
              <Tabs defaultValue="tab1">
                <TabsList padding="withPadding" variant="secondary">
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Password</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* With Content Example */}
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">With Content</h2>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList padding="withPadding" variant="primary">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="p-200 bg-surface border border-border-subtle rounded-md mt-100">
                <h3 className="text-label-md font-medium mb-50">Account</h3>
                <p className="text-body-sm text-fg-secondary">Make changes to your account here.</p>
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div className="p-200 bg-surface border border-border-subtle rounded-md mt-100">
                <h3 className="text-label-md font-medium mb-50">Password</h3>
                <p className="text-body-sm text-fg-secondary">Change your password here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  )
}
