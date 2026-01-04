'use client'

import * as React from 'react'
import { Field as BaseField } from '@base-ui-components/react/field'
import { type VariantProps } from 'tailwind-variants'
import { cn, tv } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

type FieldSize = 'xs' | 'sm' | 'md' | 'lg'

// =============================================================================
// VARIANTS
// =============================================================================

const fieldRootVariants = tv({
  base: 'flex flex-col gap-25',
  variants: {
    size: {
      xs: 'min-w-[200px]',
      sm: 'min-w-[240px]',
      md: 'min-w-[280px]',
      lg: 'min-w-[320px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const fieldLabelVariants = tv({
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

const fieldDescriptionVariants = tv({
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

const fieldControlVariants = tv({
  base: [
    'w-full rounded-md border bg-surface text-fg-primary',
    'placeholder:text-fg-muted',
    'transition-colors duration-standard ease-default',
    'focus-visible:outline focus-visible:[outline-width:var(--spacing-focus-outline)] focus-visible:[outline-offset:var(--spacing-focus-offset)] focus-visible:outline-brand',
    'disabled:pointer-events-none disabled:opacity-disabled',
    'data-[invalid]:border-negative data-[invalid]:focus-visible:outline-negative',
  ],
  variants: {
    size: {
      xs: 'h-control-xs px-50 text-body-xs',
      sm: 'h-control-sm px-50 text-body-xs',
      md: 'h-control-md px-75 text-body-sm',
      lg: 'h-control-lg px-100 text-body-sm',
    },
    variant: {
      primary: 'border-border-strong hover:bg-subtle',
      ghost: 'border-transparent hover:bg-subtle',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

const fieldErrorVariants = tv({
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

// =============================================================================
// FIELD COMPONENTS
// =============================================================================

interface FieldRootProps extends React.ComponentPropsWithoutRef<typeof BaseField.Root> {
  size?: FieldSize
}

const FieldRoot = React.forwardRef<HTMLDivElement, FieldRootProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <BaseField.Root
      ref={ref}
      className={cn(fieldRootVariants({ size }), className)}
      {...props}
    />
  )
)
FieldRoot.displayName = 'FieldRoot'

interface FieldLabelProps extends React.ComponentPropsWithoutRef<typeof BaseField.Label> {
  size?: FieldSize
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <BaseField.Label
      ref={ref}
      className={cn(fieldLabelVariants({ size }), className)}
      {...props}
    />
  )
)
FieldLabel.displayName = 'FieldLabel'

interface FieldDescriptionProps extends React.ComponentPropsWithoutRef<typeof BaseField.Description> {
  size?: FieldSize
}

const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <BaseField.Description
      ref={ref}
      className={cn(fieldDescriptionVariants({ size }), className)}
      {...props}
    />
  )
)
FieldDescription.displayName = 'FieldDescription'

interface FieldControlProps 
  extends React.ComponentPropsWithoutRef<typeof BaseField.Control>,
    VariantProps<typeof fieldControlVariants> {
  size?: FieldSize
}

const FieldControl = React.forwardRef<HTMLInputElement, FieldControlProps>(
  ({ className, size = 'md', variant, ...props }, ref) => (
    <BaseField.Control
      ref={ref}
      className={cn(fieldControlVariants({ size, variant }), className)}
      {...props}
    />
  )
)
FieldControl.displayName = 'FieldControl'

interface FieldErrorProps extends React.ComponentPropsWithoutRef<typeof BaseField.Error> {
  size?: FieldSize
}

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <BaseField.Error
      ref={ref}
      className={cn(fieldErrorVariants({ size }), className)}
      {...props}
    />
  )
)
FieldError.displayName = 'FieldError'

// =============================================================================
// SIMPLIFIED FIELD COMPONENT
// =============================================================================

interface FieldProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseField.Root>, 'children'> {
  /** Label text displayed above the input */
  label?: string
  /** Description text below the label */
  description?: string
  /** Placeholder text for the input */
  placeholder?: string
  /** Size variant */
  size?: FieldSize
  /** Input variant */
  variant?: VariantProps<typeof fieldControlVariants>['variant']
  /** Whether the field is required */
  required?: boolean
  /** Input type */
  type?: React.HTMLInputTypeAttribute
  /** Default value */
  defaultValue?: string
  /** Controlled value */
  value?: string
  /** Change handler */
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /** Custom error message (when invalid prop is true) */
  errorMessage?: string
  /** Additional className for the input */
  inputClassName?: string
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ 
    label,
    description,
    placeholder,
    size = 'md',
    variant,
    required,
    type = 'text',
    defaultValue,
    value,
    onChange,
    errorMessage,
    inputClassName,
    className,
    invalid,
    ...props 
  }, ref) => {
    return (
      <FieldRoot size={size} invalid={invalid} className={className} {...props}>
        {label && <FieldLabel size={size}>{label}</FieldLabel>}
        {description && <FieldDescription size={size}>{description}</FieldDescription>}
        <FieldControl
          ref={ref}
          size={size}
          variant={variant}
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className={inputClassName}
        />
        {errorMessage && (
          <FieldError size={size} match={true}>
            {errorMessage}
          </FieldError>
        )}
      </FieldRoot>
    )
  }
)
Field.displayName = 'Field'

// =============================================================================
// EXPORTS
// =============================================================================

export {
  Field,
  FieldRoot,
  FieldLabel,
  FieldDescription,
  FieldControl,
  FieldError,
  fieldRootVariants,
  fieldLabelVariants,
  fieldDescriptionVariants,
  fieldControlVariants,
  fieldErrorVariants,
}

export type {
  FieldSize,
  FieldProps,
  FieldRootProps,
  FieldLabelProps,
  FieldDescriptionProps,
  FieldControlProps,
  FieldErrorProps,
}
