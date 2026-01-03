'use client'

import * as React from 'react'
import { Select as BaseSelect } from '@base-ui-components/react/select'
import { Field } from '@base-ui-components/react/field'
import { type VariantProps } from 'tailwind-variants'
import { ChevronDown, Check } from 'lucide-react'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

type SelectSize = 'xs' | 'sm' | 'md' | 'lg'

// =============================================================================
// VARIANTS
// =============================================================================

const selectTriggerVariants = tv({
  base: [
    'flex items-center justify-between w-full',
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
      xs: 'h-control-xs px-25 text-label-xs',
      sm: 'h-control-sm px-50 text-label-xs',
      md: 'h-control-md px-75 text-label-sm',
      lg: 'h-control-lg px-100 text-label-sm',
    },
    error: {
      true: 'border-negative focus-visible:outline-negative',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    error: false,
  },
})

const selectFieldVariants = tv({
  base: 'flex flex-col gap-25',
  variants: {
    size: {
      xs: 'min-w-[120px]',
      sm: 'min-w-[160px]',
      md: 'min-w-[200px]',
      lg: 'min-w-[240px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectLabelVariants = tv({
  base: 'font-medium text-fg-primary',
  variants: {
    size: {
      xs: 'text-label-2xs',
      sm: 'text-label-xs',
      md: 'text-label-sm',
      lg: 'text-label-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectDescriptionVariants = tv({
  base: 'text-fg-secondary',
  variants: {
    size: {
      xs: 'text-body-xs',
      sm: 'text-body-xs',
      md: 'text-body-xs',
      lg: 'text-body-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectHelperTextVariants = tv({
  base: 'text-fg-muted',
  variants: {
    size: {
      xs: 'text-body-xs',
      sm: 'text-body-xs',
      md: 'text-body-xs',
      lg: 'text-body-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const selectErrorVariants = tv({
  base: 'text-negative',
  variants: {
    size: {
      xs: 'text-body-xs',
      sm: 'text-body-xs',
      md: 'text-body-xs',
      lg: 'text-body-sm',
    },
  },
  defaultVariants: {
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
// FIELD COMPONENTS
// =============================================================================

interface SelectFieldProps extends React.ComponentPropsWithoutRef<typeof Field.Root> {
  size?: SelectSize
}

const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <Field.Root
      ref={ref}
      className={cn(selectFieldVariants({ size }), className)}
      {...props}
    />
  )
)
SelectField.displayName = 'SelectField'

interface SelectLabelProps extends React.ComponentPropsWithoutRef<typeof Field.Label> {
  size?: SelectSize
}

const SelectLabel = React.forwardRef<HTMLLabelElement, SelectLabelProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <Field.Label
      ref={ref}
      className={cn(selectLabelVariants({ size }), className)}
      {...props}
    />
  )
)
SelectLabel.displayName = 'SelectLabel'

interface SelectDescriptionProps extends React.ComponentPropsWithoutRef<typeof Field.Description> {
  size?: SelectSize
}

const SelectDescription = React.forwardRef<HTMLParagraphElement, SelectDescriptionProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <Field.Description
      ref={ref}
      className={cn(selectDescriptionVariants({ size }), className)}
      {...props}
    />
  )
)
SelectDescription.displayName = 'SelectDescription'

interface SelectHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: SelectSize
}

const SelectHelperText = React.forwardRef<HTMLParagraphElement, SelectHelperTextProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <p
      ref={ref}
      className={cn(selectHelperTextVariants({ size }), className)}
      {...props}
    />
  )
)
SelectHelperText.displayName = 'SelectHelperText'

interface SelectErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SelectSize
}

const SelectError = React.forwardRef<HTMLSpanElement, SelectErrorProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(selectErrorVariants({ size }), className)}
      {...props}
    />
  )
)
SelectError.displayName = 'SelectError'

// =============================================================================
// COMPONENT COMPOSITION
// =============================================================================

const SelectRoot = BaseSelect.Root
const SelectValue = BaseSelect.Value
const SelectGroup = BaseSelect.Group
const SelectGroupLabel = BaseSelect.GroupLabel
const SelectSeparator = BaseSelect.Separator

// Re-exporting Trigger with variants
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size, variant, error, children, ...props }, ref) => (
    <BaseSelect.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ variant, size, error }), className)}
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
  size?: SelectSize
  variant?: VariantProps<typeof selectTriggerVariants>['variant']
  triggerClassName?: string
  // Field props
  label?: string
  description?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ 
    options, 
    placeholder = 'Select', 
    size = 'md', 
    variant, 
    triggerClassName, 
    label,
    description,
    helperText,
    error,
    errorMessage,
    children, 
    ...props 
  }, ref) => {
    // If children provided, render as composition root (headless-like)
    if (children) {
      return <SelectRoot {...props}>{children}</SelectRoot>
    }

    // Determine if we should wrap with field components
    const hasFieldElements = label || description || helperText || error

    const selectContent = (
      <>
        <SelectTrigger ref={ref} className={triggerClassName} size={size} variant={variant} error={error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </>
    )

    // Render without field wrapper for simple usage
    if (!hasFieldElements) {
      return (
        <SelectRoot {...props}>
          {selectContent}
        </SelectRoot>
      )
    }

    // Render with field wrapper
    return (
      <SelectField size={size}>
        {label && <SelectLabel size={size}>{label}</SelectLabel>}
        {description && <SelectDescription size={size}>{description}</SelectDescription>}
        <SelectRoot {...props}>
          {selectContent}
        </SelectRoot>
        {helperText && <SelectHelperText size={size}>{helperText}</SelectHelperText>}
        {error && errorMessage && <SelectError size={size}>{errorMessage}</SelectError>}
      </SelectField>
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
  SelectGroupLabel,
  SelectLabel,
  SelectSeparator,
  SelectField,
  SelectDescription,
  SelectHelperText,
  SelectError,
}
