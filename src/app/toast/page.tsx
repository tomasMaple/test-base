'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import React from 'react'

export default function ToastPage() {
  const { toast } = useToast()

  return (
    <div className="p-300 space-y-300">
      <div>
        <h1 className="heading-h2 mb-100">Toast Notifications</h1>
        <p className="body-fixed-base text-fg-secondary">
          Accessible toast notifications with multiple variants and stacking support.
        </p>
      </div>

      <div className="grid gap-200">
        <h2 className="heading-h4">Variants</h2>
        <div className="flex flex-wrap gap-100">
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Default Notification',
                description: 'This is a standard notification message.',
              })
            }
          >
            Default
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'success',
                title: 'Success!',
                description: 'Your changes have been saved successfully.',
              })
            }
          >
            Success
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'error',
                title: 'Error Occurred',
                description: 'Unable to save changes. Please try again.',
              })
            }
          >
            Error
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'warning',
                title: 'Warning',
                description: 'Your account subscription is expiring soon.',
              })
            }
          >
            Warning
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast({
                variant: 'info',
                title: 'Update Available',
                description: 'A new software update is available for download.',
              })
            }
          >
            Info
          </Button>
        </div>
      </div>

      <div className="grid gap-200">
        <h2 className="heading-h4">Advanced Usage</h2>
        <div className="flex flex-wrap gap-100">
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'File Uploaded',
                description: (
                  <div className="flex flex-col gap-25 mt-25">
                    <span>report-final-v2.pdf</span>
                    <span className="text-fg-tertiary">3.4 MB</span>
                  </div>
                ),
              })
            }
          >
            Custom Content
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              toast({
                title: 'Message 1',
                description: 'First message in the stack',
              })
              setTimeout(() => {
                toast({
                  title: 'Message 2',
                  description: 'Second message in the stack',
                  variant: 'info'
                })
              }, 500)
              setTimeout(() => {
                toast({
                  title: 'Message 3',
                  description: 'Third message in the stack',
                  variant: 'success'
                })
              }, 1000)
            }}
          >
            Trigger Stack
          </Button>
        </div>
      </div>
    </div>
  )
}
