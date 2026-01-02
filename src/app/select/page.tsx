'use client'

import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup, SelectSeparator } from '@/components/ui/select'

export default function SelectPage() {
  return (
    <div className="p-200">
      <main className="mx-auto max-w-4xl space-y-200">
        {/* Header */}
        <header className="space-y-50">
          <h1 className="heading-h3">Select Component</h1>
          <p className="body-fixed-medium text-fg-secondary">
            Displays a list of options for the user to pick from—triggered by a button.
          </p>
        </header>

        {/* Variants */}
        <section className="space-y-100">
          <h2 className="heading-h5">Select Variants</h2>
          <div className="flex flex-wrap items-end gap-75">
            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Solid (Default)</p>
              <Select>
                <SelectTrigger placeholder="Select an option" />
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Outline</p>
              <Select>
                <SelectTrigger variant="outline" placeholder="Select an option" />
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Ghost</p>
              <Select>
                <SelectTrigger variant="ghost" placeholder="Select an option" />
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Groups */}
        <section className="space-y-100">
          <h2 className="heading-h5">Groups & Separators</h2>
          <div className="flex flex-wrap gap-75">
            <Select>
              <SelectTrigger placeholder="Select a food" />
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Vegetables</SelectLabel>
                  <SelectItem value="carrot">Carrot</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* States */}
        <section className="space-y-100">
          <h2 className="heading-h5">Select States</h2>
          <div className="flex flex-wrap gap-75">
            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Error State</p>
              <Select>
                <SelectTrigger error placeholder="Select an option" />
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-25">
              <p className="label-fixed-x-small text-fg-secondary">Disabled</p>
              <Select disabled>
                <SelectTrigger placeholder="Disabled select" />
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
