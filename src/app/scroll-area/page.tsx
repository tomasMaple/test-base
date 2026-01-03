'use client'

import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from '@/components/ui/scroll-area'

export default function ScrollAreaPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Scroll Area Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            A native scroll container with custom scrollbars that appear on hover or scroll.
          </p>
        </header>

        {/* Basic Vertical Scroll */}
        <section className="space-y-100">
          <h2 className="heading-h5">Vertical Scroll</h2>
          <p className="body-fixed-small text-fg-tertiary">
            Hover over the scroll area to see the custom scrollbar.
          </p>
          <ScrollArea className="h-[200px] w-full max-w-lg rounded-md border border-border-subtle bg-surface">
            <ScrollAreaViewport>
              <ScrollAreaContent className="p-100">
                <p className="body-fixed-small text-fg-primary">
                  Vernacular architecture is building done outside any academic tradition, and without
                  professional guidance. It is not a particular architectural movement or style, but
                  rather a broad category, encompassing a wide range and variety of building types, with
                  differing methods of construction, from around the world, both historical and extant and
                  classical and modern. Vernacular architecture constitutes 95% of the world&apos;s built
                  environment, as estimated in 1995 by Amos Rapoport, as measured against the small
                  percentage of new buildings every year designed by architects and built by engineers.
                </p>
                <p className="body-fixed-small text-fg-primary">
                  This type of architecture usually serves immediate, local needs, is constrained by the
                  materials available in its particular region and reflects local traditions and cultural
                  practices. The study of vernacular architecture does not examine formally schooled
                  architects, but instead that of the design skills and tradition of local builders, who
                  were rarely given any attribution for the work. More recently, vernacular architecture
                  has been examined by designers and the building industry in an effort to be more energy
                  conscious with contemporary design and construction—part of a broader interest in
                  sustainable design.
                </p>
                <p className="body-fixed-small text-fg-primary">
                  Common examples include farmhouses, adobe structures, thatched cottages, and timber-frame
                  buildings. These structures often feature locally available materials like stone, clay,
                  thatch, and wood, shaped by generations of practical knowledge about local climate and
                  resources.
                </p>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </section>

        {/* Horizontal Scroll */}
        <section className="space-y-100">
          <h2 className="heading-h5">Horizontal Scroll</h2>
          <p className="body-fixed-small text-fg-tertiary">
            Scroll horizontally to see more items.
          </p>
          <ScrollArea className="w-full max-w-lg rounded-md border border-border-subtle bg-surface">
            <ScrollAreaViewport>
              <ScrollAreaContent className="flex-row gap-75 p-100">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="flex h-100 w-100 shrink-0 items-center justify-center rounded-md bg-primary text-fg-secondary label-fixed-small"
                  >
                    {i + 1}
                  </div>
                ))}
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="horizontal">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </section>

        {/* Both Scrollbars */}
        <section className="space-y-100">
          <h2 className="heading-h5">Both Scrollbars</h2>
          <p className="body-fixed-small text-fg-tertiary">
            Grid content with both vertical and horizontal scroll.
          </p>
          <ScrollArea className="h-[300px] w-[300px] rounded-md border border-border-subtle bg-surface">
            <ScrollAreaViewport>
              <ScrollAreaContent className="p-75">
                <div className="grid grid-cols-[repeat(8,80px)] grid-rows-[repeat(8,80px)] gap-50">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center rounded-md bg-primary text-fg-secondary label-fixed-x-small"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaScrollbar orientation="horizontal">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollArea>
        </section>
      </main>
    </div>
  )
}
