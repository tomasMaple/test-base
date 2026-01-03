'use client'

import * as React from 'react'
import { Select as BaseSelect } from '@base-ui-components/react/select'
import { type VariantProps } from 'tailwind-variants'
import { ChevronDown, Check } from 'lucide-react'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// VARIANTS
// =============================================================================

const selectTriggerVariants = tv({
  base: [
    'flex items-center justify-between',
    'rounded-md border',
    'transition-colors duration-standard ease-default',
    'cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'data-[placeholder]:text-fg-secondary',
  ],
  variants: {
    variant: {
      primary: [
        'bg-surface text-fg-primary border-border-strong',
        'hover:bg-subtle',
      ],
      ghost: [
        'bg-transparent text-fg-primary border-transparent',
        'hover:bg-subtle',
      ],
    },
    size: {
      xs: 'h-control-xs px-25 text-label-xs min-w-control-xs',
      sm: 'h-control-sm px-50 text-label-xs min-w-control-sm',
      md: 'h-control-md px-75 text-label-sm min-w-control-md',
      lg: 'h-control-lg px-100 text-label-sm min-w-control-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

const selectPopupVariants = tv({
  base: [
    'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border-subtle bg-surface text-fg-primary shadow-300',
    'p-50',
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  ],
})

const selectItemVariants = tv({
  base: [
    'relative flex w-full cursor-default select-none items-center rounded-sm py-50 pl-200 pr-50 text-label-sm outline-none',
    'data-[highlighted]:bg-subtle data-[highlighted]:text-fg-primary',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled',
  ],
})

// =============================================================================
// COMPONENT COMPOSITION
// =============================================================================

const SelectRoot = BaseSelect.Root
const SelectValue = BaseSelect.Value
const SelectGroup = BaseSelect.Group
const SelectLabel = BaseSelect.GroupLabel
const SelectSeparator = BaseSelect.Separator

// Re-exporting Trigger with variants
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size, variant, children, ...props }, ref) => (
    <BaseSelect.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      <BaseSelect.Icon>
        <ChevronDown className="size-icon-xs opacity-50" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
)
SelectTrigger.displayName = 'SelectTrigger'

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Portal>
    <BaseSelect.Positioner sideOffset={4}>
      <BaseSelect.Popup
        ref={ref}
        className={cn(selectPopupVariants(), className)}
        {...props}
      >
        {children}
      </BaseSelect.Popup>
    </BaseSelect.Positioner>
  </BaseSelect.Portal>
))
SelectContent.displayName = 'SelectContent'

// Replacing Option with Item
const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(selectItemVariants(), className)}
    {...props}
  >
    <BaseSelect.ItemIndicator className="absolute left-50 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="size-icon-xs" />
    </BaseSelect.ItemIndicator>
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
))
SelectItem.displayName = 'SelectItem'

// Simplified Wrapper for common usage
interface SelectProps extends React.ComponentProps<typeof SelectRoot> {
  options?: { value: string; label: string }[]
  placeholder?: string
  size?: VariantProps<typeof selectTriggerVariants>['size']
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
  triggerClassName?: string
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, placeholder, size, variant, triggerClassName, children, ...props }, ref) => {
    // If children provided, render as composition root (headless-like)
    if (children) {
      return <SelectRoot {...props}>{children}</SelectRoot>
    }

    // Otherwise render simplified preset
    return (
      <SelectRoot {...props}>
        <SelectTrigger ref={ref} className={triggerClassName} size={size} variant={variant}>
          <SelectValue>{placeholder}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    )
  }
)
Select.displayName = 'Select'

export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItem as SelectOption,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
}
