'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function TabsPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Tabs</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A set of layered sections of content—known as tab panels—that are displayed one at a time.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
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
