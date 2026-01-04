'use client'

import { Link } from '@/components/ui/link'
import { ExternalLink, ArrowRight, FileText, Globe } from 'lucide-react'

export default function LinkPage() {
  const sizes = ['medium', 'small', 'x-small'] as const
  const types = ['primary', 'inverse-primary', 'secondary'] as const

  return (
    <div className="p-200 space-y-200">
      <h1 className="text-heading-h4 text-fg-primary">Link</h1>
      <p className="text-body-base text-fg-secondary">
        Inline text link component for external documentation and resources.
      </p>

      {/* Basic Usage */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Basic Usage</h2>
        <div className="p-100 bg-primary rounded-md space-y-50">
          <p className="text-body-base text-fg-secondary">
            Check out our{' '}
            <Link href="https://example.com" external>
              documentation
            </Link>{' '}
            for more details.
          </p>
          <p className="text-body-base text-fg-secondary">
            Read the{' '}
            <Link href="https://example.com" external underlined={false}>
              terms of service
            </Link>{' '}
            before continuing.
          </p>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Sizes</h2>
        <div className="flex flex-wrap items-center gap-100 p-100 bg-primary rounded-md">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-start gap-25">
              <Link href="#" size={size}>Link text</Link>
              <span className="text-label-xs text-fg-muted">{size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Types */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Types</h2>
        <div className="flex flex-wrap gap-100">
          <div className="flex flex-col items-start gap-25 p-100 bg-surface border border-border-subtle rounded-md">
            <Link href="#" type="primary">Primary link</Link>
            <span className="text-label-xs text-fg-muted">primary</span>
          </div>
          <div className="flex flex-col items-start gap-25 p-100 bg-inverse rounded-md">
            <Link href="#" type="inverse-primary">Inverse link</Link>
            <span className="text-label-xs text-fg-inverse/60">inverse-primary</span>
          </div>
          <div className="flex flex-col items-start gap-25 p-100 bg-surface border border-border-subtle rounded-md">
            <Link href="#" type="secondary">Secondary link</Link>
            <span className="text-label-xs text-fg-muted">secondary</span>
          </div>
        </div>
      </section>

      {/* Underlined */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Underlined</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          <Link href="#" underlined>Underlined</Link>
          <Link href="#" underlined={false}>Not underlined</Link>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">With Icons</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          <Link href="#" afterIcon={<ExternalLink />} external>
            External docs
          </Link>
          <Link href="#" afterIcon={<ArrowRight />}>
            Learn more
          </Link>
          <Link href="#" beforeIcon={<FileText />}>
            View file
          </Link>
          <Link href="#" beforeIcon={<Globe />} afterIcon={<ExternalLink />} external>
            Website
          </Link>
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">Disabled</h2>
        <div className="flex flex-wrap gap-100 p-100 bg-primary rounded-md">
          <Link href="#" disabled>Disabled link</Link>
          <Link href="#" disabled afterIcon={<ExternalLink />}>
            Disabled with icon
          </Link>
        </div>
      </section>

      {/* In Context */}
      <section className="space-y-100">
        <h2 className="text-heading-h6 text-fg-primary">In Context</h2>
        <div className="max-w-lg p-100 bg-surface border border-border-subtle rounded-md space-y-75">
          <p className="text-body-base text-fg-secondary">
            Welcome to the platform! Before getting started, please review our{' '}
            <Link href="#" size="small">privacy policy</Link> and{' '}
            <Link href="#" size="small">terms of service</Link>.
          </p>
          <p className="text-body-sm text-fg-muted">
            Need help? Visit our{' '}
            <Link href="#" size="x-small" afterIcon={<ExternalLink />} external>
              help center
            </Link>
            {' '}for guides and FAQs.
          </p>
        </div>
      </section>
    </div>
  )
}
