'use client'

import * as React from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

/**
 * Select Trigger variants matching Button styles
 */
const selectTriggerVariants = tv({
  base: [
    'inline-flex items-center justify-between gap-50 rounded-pill',
    'font-medium transition-colors duration-standard ease-default cursor-pointer',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand-primary',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'data-[popup-open]:bg-secondary', // Active state when open
  ],
  variants: {
    variant: {
      solid: [
        'bg-surface-secondary text-fg-primary',
        'border border-border-subtle',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-border-strong',
      ],
      outline: [
        'bg-surface text-fg-primary',
        'border border-border-strong',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-border-strong',
      ],
      ghost: [
        'bg-transparent text-fg-primary',
        'hover:bg-primary',
        'active:bg-secondary',
        'focus-visible:outline-fg-tertiary',
      ],
    },
    size: {
      sm: [
        'h-ui-sm',
        'px-75',
        'label-fixed-x-small',
      ],
      md: [
        'h-ui-md',
        'px-75',
        'label-fixed-x-small',
      ],
      lg: [
        'h-ui-lg',
        'px-75',
        'label-fixed-small',
      ],
    },
    error: {
      true: 'border-negative-primary focus-visible:outline-negative-primary',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    error: false,
  },
})

export interface SelectProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Root> {
  children?: React.ReactNode
}

const Select = BaseSelect.Root

export interface SelectTriggerProps 
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  placeholder?: string
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, variant, size, error, placeholder, ...props }, ref) => (
    <BaseSelect.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ variant, size, error }), className)}
      {...props}
    >
      <BaseSelect.Value>
        {children || placeholder}
      </BaseSelect.Value>
      <BaseSelect.Icon className="ml-2">
        <ChevronDown className="size-icon-md text-fg-tertiary" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
)
SelectTrigger.displayName = 'SelectTrigger'

// Content variants
const selectContentVariants = tv({
  base: [
    'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border-subtle bg-surface text-fg-primary shadow-elevation-200',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  ],
})

const SelectContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseSelect.Popup>>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={4}>
        <BaseSelect.Popup
          ref={ref}
          className={cn(selectContentVariants(), className)}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
)
SelectContent.displayName = 'SelectContent'

const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseSelect.Item>>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors',
        'focus:bg-primary focus:text-fg-primary',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="absolute right-2 flex items-center justify-center">
        {/* You might want a Check icon here */}
        <div className="size-1.5 rounded-full bg-brand-primary" /> 
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
)
SelectItem.displayName = 'SelectItem'

const SelectGroup = BaseSelect.Group

const SelectLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>>(
  ({ className, ...props }, ref) => (
    <BaseSelect.GroupLabel
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold text-fg-muted', className)}
      {...props}
    />
  )
)
SelectLabel.displayName = 'SelectLabel'

const SelectSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof BaseSelect.Separator>>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-border-subtle', className)}
      {...props}
    />
  )
)
SelectSeparator.displayName = 'SelectSeparator'

const SelectValue = BaseSelect.Value

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
