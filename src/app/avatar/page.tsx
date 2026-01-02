import { Avatar } from '@/components/ui'
import { User, Shield, Star, Heart } from 'lucide-react'

export default function AvatarPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Avatar Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            Explore colorful avatar variants, sizes, and fallback content.
          </p>
        </header>

        {/* Color Variants */}
        <section className="space-y-100">
          <h2 className="heading-h5">Color Variants</h2>
          <div className="flex flex-wrap gap-100 p-100 bg-surface rounded-md border border-border-subtle">
            <div className="space-y-25 text-center">
              <Avatar fallback="N" variant="neutral" size="xl" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">Neutral</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="B" variant="brand" size="xl" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">Brand</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="P" variant="pink" size="xl" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">Pink</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="V" variant="violet" size="xl" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">Violet</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="T" variant="teal" size="xl" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">Teal</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="L" variant="lime" size="xl" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">Lime</p>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-100">
          <h2 className="heading-h5">Sizes</h2>
          <div className="flex flex-wrap items-end gap-100">
            <div className="space-y-25 text-center">
              <Avatar fallback="SM" size="sm" variant="brand" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">SM</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="MD" size="md" variant="brand" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">MD</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="LG" size="lg" variant="brand" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">LG</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="XL" size="xl" variant="brand" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">XL</p>
            </div>
            <div className="space-y-25 text-center">
              <Avatar fallback="2XL" size="2xl" variant="brand" />
              <p className="label-fixed-2-x-small text-fg-subtle uppercase">2XL</p>
            </div>
          </div>
        </section>

        {/* Icons Support */}
        <section className="space-y-100">
          <h2 className="heading-h5">Icon Fallbacks</h2>
          <div className="flex flex-wrap gap-75">
            <Avatar fallback={<User className="size-1/2" />} variant="neutral" size="lg" />
            <Avatar fallback={<Shield className="size-1/2" />} variant="brand" size="lg" />
            <Avatar fallback={<Star className="size-1/2" />} variant="pink" size="lg" />
            <Avatar fallback={<Heart className="size-1/2" />} variant="violet" size="lg" />
          </div>
        </section>

        {/* Initials Combinations */}
        <section className="space-y-100">
          <h2 className="heading-h5">Initials</h2>
          <div className="flex flex-wrap gap-75">
            <Avatar fallback="JD" variant="teal" size="xl" />
            <Avatar fallback="SK" variant="lime" size="xl" />
            <Avatar fallback="AB" variant="pink" size="xl" />
          </div>
        </section>
      </main>
    </div>
  )
}
