'use client'

import { IconButton } from '@/components/ui/icon-button'
import { DashboardCard } from '@/components/ui/dashboard-card'
import { Plus, X, ChevronRight, Bell, Search, Settings } from 'lucide-react'

export default function IconButtonOverviewPage() {
  return (
    <div className="min-w-[800px] max-w-4xl mx-auto p-200 space-y-200">
      <div className="mb-200">
        <h1 className="text-heading-h3 font-semibold text-fg-primary mb-50">
          Icon Button
        </h1>
        <p className="text-body-base text-fg-secondary">
          A button component designed specifically for icons, enforcing a square/circular aspect ratio.
        </p>
      </div>

      <div className="space-y-200">
        {/* Variants */}
        <DashboardCard>
          <DashboardCard.Header title="Variants" />
          <DashboardCard.Content>
            <div className="flex flex-wrap gap-100 items-center">
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">Primary</span>
                <IconButton variant="primary" aria-label="Add">
                  <Plus />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">Secondary</span>
                <IconButton variant="secondary" aria-label="Close">
                  <X />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">Tertiary</span>
                <IconButton variant="tertiary" aria-label="Next">
                  <ChevronRight />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">Ghost</span>
                <IconButton variant="ghost" aria-label="Notifications">
                  <Bell />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">Outline</span>
                <IconButton variant="outline" aria-label="Search">
                  <Search />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">Negative</span>
                <IconButton variant="negative" aria-label="Remove">
                  <X />
                </IconButton>
              </div>
            </div>
          </DashboardCard.Content>
        </DashboardCard>

        {/* Sizes */}
        <DashboardCard>
          <DashboardCard.Header title="Sizes" />
          <DashboardCard.Content>
            <div className="flex flex-wrap items-end gap-100">
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">XS (24px)</span>
                <IconButton size="xs" variant="secondary">
                  <Plus />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">SM (32px)</span>
                <IconButton size="sm" variant="secondary">
                  <Plus />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">MD (36px)</span>
                <IconButton size="md" variant="secondary">
                  <Plus />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">LG (40px)</span>
                <IconButton size="lg" variant="secondary">
                  <Plus />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">XL (48px)</span>
                <IconButton size="xl" variant="secondary">
                  <Plus />
                </IconButton>
              </div>
            </div>
          </DashboardCard.Content>
        </DashboardCard>

        {/* States */}
        <DashboardCard>
          <DashboardCard.Header title="States" />
          <DashboardCard.Content>
            <div className="flex gap-100">
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">Disabled</span>
                <IconButton disabled variant="primary">
                  <Plus />
                </IconButton>
              </div>
              <div className="flex flex-col items-center gap-50">
                <span className="text-label-xs text-fg-secondary">Disabled (Ghost)</span>
                <IconButton disabled variant="ghost">
                  <Settings />
                </IconButton>
              </div>
            </div>
          </DashboardCard.Content>
        </DashboardCard>
      </div>
    </div>
  )
}
