'use client'

import { useState } from 'react'
import { ConfirmationModal, FormModal, InfoModal } from '@/components/ui/modal-presets'
import { Button } from '@/components/ui/button'

export default function ModalPresetsDemoPage() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [dangerConfirmOpen, setDangerConfirmOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-canvas p-200">
      <div className="max-w-4xl mx-auto space-y-200">
        <h1 className="text-heading-h3 text-fg-primary font-semibold">Modal Presets</h1>
        <p className="text-body-base text-fg-secondary">
          Pre-composed modal patterns for common use cases: confirmations, forms, and info displays.
        </p>

        {/* Confirmation Modals */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Confirmation Modal</h2>
          <p className="text-body-sm text-fg-secondary">
            For confirming user actions, especially destructive ones.
          </p>
          <div className="flex gap-75">
            <Button onClick={() => setConfirmOpen(true)}>
              Open Confirmation
            </Button>
            <Button variant="negative" onClick={() => setDangerConfirmOpen(true)}>
              Danger Confirmation
            </Button>
          </div>

          <ConfirmationModal
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="Confirm Action"
            description="Are you sure you want to proceed? This action can be undone."
            variant="info"
            confirmLabel="Proceed"
            onConfirm={() => console.log('Confirmed!')}
          />

          <ConfirmationModal
            open={dangerConfirmOpen}
            onOpenChange={setDangerConfirmOpen}
            title="Delete Position"
            description="This will permanently remove your position. This action cannot be undone."
            variant="danger"
            confirmLabel="Delete"
            onConfirm={() => console.log('Deleted!')}
          />
        </section>

        {/* Form Modal */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Form Modal</h2>
          <p className="text-body-sm text-fg-secondary">
            For collecting user input in a modal context.
          </p>
          <Button onClick={() => setFormOpen(true)}>
            Open Form Modal
          </Button>

          <FormModal
            open={formOpen}
            onOpenChange={setFormOpen}
            title="Deposit"
            description="Enter the amount you want to deposit."
            submitLabel="Deposit"
            onSubmit={(e) => {
              console.log('Form submitted!')
              setFormOpen(false)
            }}
          >
            <div className="space-y-75">
              <label className="block">
                <span className="text-label-sm text-fg-secondary mb-25 block">Amount</span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full h-control-md px-75 bg-surface border border-border-subtle rounded-lg text-body-base text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </label>
              <label className="block">
                <span className="text-label-sm text-fg-secondary mb-25 block">Token</span>
                <input
                  type="text"
                  placeholder="USDC"
                  className="w-full h-control-md px-75 bg-surface border border-border-subtle rounded-lg text-body-base text-fg-primary placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </label>
            </div>
          </FormModal>
        </section>

        {/* Info Modal */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Info Modal</h2>
          <p className="text-body-sm text-fg-secondary">
            For displaying read-only information.
          </p>
          <Button onClick={() => setInfoOpen(true)}>
            Open Info Modal
          </Button>

          <InfoModal
            open={infoOpen}
            onOpenChange={setInfoOpen}
            title="Transaction Details"
            description="View the details of your recent transaction."
          >
            <div className="space-y-75 bg-subtle rounded-lg p-100">
              <div className="flex justify-between">
                <span className="text-label-sm text-fg-secondary">Status</span>
                <span className="text-label-sm text-positive font-medium">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-label-sm text-fg-secondary">Amount</span>
                <span className="text-label-sm text-fg-primary">1,000 USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-label-sm text-fg-secondary">Transaction Hash</span>
                <span className="text-label-sm text-fg-primary font-mono">0x1a2b...3c4d</span>
              </div>
              <div className="flex justify-between">
                <span className="text-label-sm text-fg-secondary">Time</span>
                <span className="text-label-sm text-fg-primary">2 hours ago</span>
              </div>
            </div>
          </InfoModal>
        </section>

        {/* Variants */}
        <section className="space-y-100">
          <h2 className="text-heading-h5 text-fg-primary font-medium">Confirmation Variants</h2>
          <p className="text-body-sm text-fg-secondary">
            Confirmation modals support <code className="text-brand">danger</code>, <code className="text-warning">warning</code>, <code className="text-info">info</code>, and <code className="text-positive">success</code> variants.
          </p>
        </section>
      </div>
    </div>
  )
}
