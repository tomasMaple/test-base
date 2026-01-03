'use client'

import * as React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function DialogPage() {
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Dialog</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A window overlaid on either the primary window or another dialog window.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center rounded-pill font-medium transition-colors duration-standard ease-default cursor-pointer bg-inverse text-fg-inverse hover:bg-brand hover:text-fg-on-brand active:bg-brand-emphasis h-control-md px-75 gap-50 text-label-sm">
              Edit Profile
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
              <div className="flex justify-end gap-100 mt-200">
                <Button>Save changes</Button>
              </div>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </div>
  )
}
