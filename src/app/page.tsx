'use client'

export default function LandingPage() {
  return (
    <main className="max-w-7xl mx-auto px-150 py-200 flex flex-col gap-200">
      <div className="flex flex-col gap-100">
        <h1 className="text-heading-h1 font-semibold text-fg-primary">
          Welcome to Maple 🍁
        </h1>
        <p className="text-body-lg text-fg-secondary">
          Your design system playground for building beautiful, consistent interfaces.
        </p>
      </div>
      <div className="p-200 bg-surface-secondary rounded-lg border border-weak">
        <p className="text-body-md text-fg-tertiary">
          Explore the component library using the sidebar navigation to see all available UI components in action.
        </p>
      </div>
    </main>
  )
}
