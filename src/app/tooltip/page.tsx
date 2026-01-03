'use client'

import * as React from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Info, HelpCircle, AlertTriangle, Settings, Bell, Heart } from 'lucide-react'

export default function TooltipPage() {
  return (
    <TooltipProvider>
      <div className="p-200 space-y-300">
        <div>
          <h1 className="heading-h3 mb-100">Tooltip</h1>
          <p className="body-fixed-medium text-fg-secondary mb-200">
            A popup that appears when an element is hovered or focused, showing a hint for sighted users.
          </p>
        </div>

        {/* Basic Tooltips */}
        <section className="space-y-150">
          <h2 className="heading-h5">Basic Usage</h2>
          <div className="flex flex-wrap gap-100">
            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary', size: 'small' }))}>
                <Info className="size-icon-md" aria-label="Info" />
              </TooltipTrigger>
              <TooltipContent>
                Information tooltip
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary', size: 'small' }))}>
                <HelpCircle className="size-icon-md" aria-label="Help" />
              </TooltipTrigger>
              <TooltipContent>
                Need help?
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary', size: 'small' }))}>
                <AlertTriangle className="size-icon-md" aria-label="Warning" />
              </TooltipTrigger>
              <TooltipContent>
                Warning: This action cannot be undone
              </TooltipContent>
            </Tooltip>
          </div>
        </section>

        {/* Tooltip Positions */}
        <section className="space-y-150">
          <h2 className="heading-h5">Positions</h2>
          <div className="flex flex-wrap gap-100 justify-center py-200">
            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary' }))}>
                Top (default)
              </TooltipTrigger>
              <TooltipContent side="top">
                Tooltip on top
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary' }))}>
                Bottom
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Tooltip on bottom
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary' }))}>
                Left
              </TooltipTrigger>
              <TooltipContent side="left">
                Tooltip on left
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary' }))}>
                Right
              </TooltipTrigger>
              <TooltipContent side="right">
                Tooltip on right
              </TooltipContent>
            </Tooltip>
          </div>
        </section>

        {/* Without Arrow */}
        <section className="space-y-150">
          <h2 className="heading-h5">Without Arrow</h2>
          <div className="flex flex-wrap gap-100">
            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary', size: 'small' }))}>
                <Settings className="size-icon-md" aria-label="Settings" />
              </TooltipTrigger>
              <TooltipContent showArrow={false}>
                Settings
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'secondary', size: 'small' }))}>
                <Bell className="size-icon-md" aria-label="Notifications" />
              </TooltipTrigger>
              <TooltipContent showArrow={false}>
                Notifications
              </TooltipContent>
            </Tooltip>
          </div>
        </section>

        {/* Icon Buttons with Tooltips */}
        <section className="space-y-150">
          <h2 className="heading-h5">Icon Button Toolbar</h2>
          <p className="body-fixed-small text-fg-secondary">
            Tooltips are commonly used to label icon buttons.
          </p>
          <div className="inline-flex gap-25 p-50 bg-secondary rounded-md border border-border-subtle">
            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'small' }))}>
                <Heart className="size-icon-md" aria-label="Like" />
              </TooltipTrigger>
              <TooltipContent>
                Like
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'small' }))}>
                <Bell className="size-icon-md" aria-label="Notifications" />
              </TooltipTrigger>
              <TooltipContent>
                Notifications
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'small' }))}>
                <Settings className="size-icon-md" aria-label="Settings" />
              </TooltipTrigger>
              <TooltipContent>
                Settings
              </TooltipContent>
            </Tooltip>
          </div>
        </section>
      </div>
    </TooltipProvider>
  )
}
