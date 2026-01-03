'use client'

import * as React from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export default function AlertDialogPage() {
  const [open, setOpen] = React.useState(false)

  // Note: Base UI Trigger might not support asChild polylmorphims in the preview version yet. 
  // We will refrain from using asChild and Button inside Trigger if it errors.
  // Instead we style the Trigger or just use it. 
  // However, usually we want to use our Button component.
  // If asChild is missing, we might need a workaround or just use the Trigger directly styled.
  // For this verification pass, I will simple use Trigger with classes or text.
  
  return (
    <div className="p-300">
      <div className="mb-300">
        <h1 className="text-heading-h2 mb-100">Alert Dialog</h1>
        <p className="text-body-fixed-base text-secondary-fg">
          A modal dialog that interrupts the user with important content and expects a response.
        </p>
      </div>

      <div className="flex flex-col gap-300">
        <section className="p-300 border border-border-subtle rounded-xl">
          <h2 className="text-heading-h6 mb-200">Basic Example</h2>
          <div className="flex gap-100">
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger className="inline-flex items-center justify-center rounded-pill font-medium transition-colors duration-standard ease-default cursor-pointer bg-negative text-fg-on-accent hover:bg-negative-strong active:bg-negative-emphasis h-control-md px-75 gap-50 text-label-sm">
                Delete Account
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
                <div className="flex justify-end gap-100">
                  <AlertDialogCancel className="inline-flex items-center justify-center rounded-pill font-medium transition-colors duration-standard ease-default cursor-pointer bg-surface text-fg-primary border border-border-subtle hover:bg-primary active:bg-secondary h-control-md px-75 gap-50 text-label-sm">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="inline-flex items-center justify-center rounded-pill font-medium transition-colors duration-standard ease-default cursor-pointer bg-negative text-fg-on-accent hover:bg-negative-strong active:bg-negative-emphasis h-control-md px-75 gap-50 text-label-sm">
                     Yes, delete account
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>
      </div>
    </div>
  )
}
