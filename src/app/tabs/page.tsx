'use client'

import { 
  Tabs, 
  TabsList, 
  TabsTab, 
  TabsIndicator, 
  TabsPanel 
} from '@/components/ui/tabs'
import { LayoutDashboard, FolderKanban, User } from 'lucide-react'

export default function TabsPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Tabs Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            A component for toggling between related panels on the same page.
          </p>
        </header>

        {/* Basic Example */}
        <section className="space-y-100">
          <h2 className="heading-h5">Basic Example</h2>
          <div className="rounded-lg border border-border-subtle bg-surface">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTab value="overview">Overview</TabsTab>
                <TabsTab value="projects">Projects</TabsTab>
                <TabsTab value="account">Account</TabsTab>
                <TabsIndicator />
              </TabsList>
              <TabsPanel value="overview">
                <div className="flex h-200 items-center justify-center">
                  <LayoutDashboard className="size-icon-3xl text-fg-tertiary" />
                </div>
              </TabsPanel>
              <TabsPanel value="projects">
                <div className="flex h-200 items-center justify-center">
                  <FolderKanban className="size-icon-3xl text-fg-tertiary" />
                </div>
              </TabsPanel>
              <TabsPanel value="account">
                <div className="flex h-200 items-center justify-center">
                  <User className="size-icon-3xl text-fg-tertiary" />
                </div>
              </TabsPanel>
            </Tabs>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Sizes</h2>
          <div className="space-y-150">
            {/* Small */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Small</p>
              <div className="rounded-lg border border-border-subtle bg-surface">
                <Tabs defaultValue="tab1">
                  <TabsList size="sm">
                    <TabsTab size="sm" value="tab1">Tab 1</TabsTab>
                    <TabsTab size="sm" value="tab2">Tab 2</TabsTab>
                    <TabsTab size="sm" value="tab3">Tab 3</TabsTab>
                    <TabsIndicator size="sm" />
                  </TabsList>
                  <TabsPanel size="sm" value="tab1">Small tab content 1</TabsPanel>
                  <TabsPanel size="sm" value="tab2">Small tab content 2</TabsPanel>
                  <TabsPanel size="sm" value="tab3">Small tab content 3</TabsPanel>
                </Tabs>
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Medium (Default)</p>
              <div className="rounded-lg border border-border-subtle bg-surface">
                <Tabs defaultValue="tab1">
                  <TabsList size="md">
                    <TabsTab size="md" value="tab1">Tab 1</TabsTab>
                    <TabsTab size="md" value="tab2">Tab 2</TabsTab>
                    <TabsTab size="md" value="tab3">Tab 3</TabsTab>
                    <TabsIndicator size="md" />
                  </TabsList>
                  <TabsPanel size="md" value="tab1">Medium tab content 1</TabsPanel>
                  <TabsPanel size="md" value="tab2">Medium tab content 2</TabsPanel>
                  <TabsPanel size="md" value="tab3">Medium tab content 3</TabsPanel>
                </Tabs>
              </div>
            </div>

            {/* Large */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Large</p>
              <div className="rounded-lg border border-border-subtle bg-surface">
                <Tabs defaultValue="tab1">
                  <TabsList size="lg">
                    <TabsTab size="lg" value="tab1">Tab 1</TabsTab>
                    <TabsTab size="lg" value="tab2">Tab 2</TabsTab>
                    <TabsTab size="lg" value="tab3">Tab 3</TabsTab>
                    <TabsIndicator size="lg" />
                  </TabsList>
                  <TabsPanel size="lg" value="tab1">Large tab content 1</TabsPanel>
                  <TabsPanel size="lg" value="tab2">Large tab content 2</TabsPanel>
                  <TabsPanel size="lg" value="tab3">Large tab content 3</TabsPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="space-y-100">
          <h2 className="heading-h5">List Variants</h2>
          <div className="space-y-150">
            {/* Solid */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Solid (Default)</p>
              <div className="rounded-lg border border-border-subtle bg-surface">
                <Tabs defaultValue="tab1">
                  <TabsList variant="solid">
                    <TabsTab value="tab1">Tab 1</TabsTab>
                    <TabsTab value="tab2">Tab 2</TabsTab>
                    <TabsIndicator />
                  </TabsList>
                  <TabsPanel value="tab1">Solid variant content 1</TabsPanel>
                  <TabsPanel value="tab2">Solid variant content 2</TabsPanel>
                </Tabs>
              </div>
            </div>

            {/* Outline */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Outline</p>
              <Tabs defaultValue="tab1">
                <TabsList variant="outline">
                  <TabsTab value="tab1">Tab 1</TabsTab>
                  <TabsTab value="tab2">Tab 2</TabsTab>
                  <TabsIndicator />
                </TabsList>
                <TabsPanel value="tab1">Outline variant content 1</TabsPanel>
                <TabsPanel value="tab2">Outline variant content 2</TabsPanel>
              </Tabs>
            </div>

            {/* Ghost */}
            <div className="space-y-50">
              <p className="label-fixed-x-small text-fg-secondary">Ghost</p>
              <Tabs defaultValue="tab1">
                <TabsList variant="ghost">
                  <TabsTab value="tab1">Tab 1</TabsTab>
                  <TabsTab value="tab2">Tab 2</TabsTab>
                  <TabsIndicator />
                </TabsList>
                <TabsPanel value="tab1">Ghost variant content 1</TabsPanel>
                <TabsPanel value="tab2">Ghost variant content 2</TabsPanel>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Disabled Tab */}
        <section className="space-y-100">
          <h2 className="heading-h5">Disabled Tab</h2>
          <div className="rounded-lg border border-border-subtle bg-surface">
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTab value="tab1">Enabled</TabsTab>
                <TabsTab value="tab2" disabled>Disabled</TabsTab>
                <TabsTab value="tab3">Enabled</TabsTab>
                <TabsIndicator />
              </TabsList>
              <TabsPanel value="tab1">First tab is enabled</TabsPanel>
              <TabsPanel value="tab2">This panel will never show</TabsPanel>
              <TabsPanel value="tab3">Third tab is also enabled</TabsPanel>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}
