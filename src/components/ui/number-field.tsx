'use client'

import * as React from 'react'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'

/**
 * NumberField Root - Groups all parts and manages state
 */
const NumberField = BaseNumberField.Root

export interface NumberFieldProps extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Root> {}

/**
 * NumberField Group variants
 */
const numberFieldGroupVariants = tv({
  base: 'flex',
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface NumberFieldGroupProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Group>,
    VariantProps<typeof numberFieldGroupVariants> {}

const NumberFieldGroup = React.forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  ({ className, size, ...props }, ref) => (
    <BaseNumberField.Group
      ref={ref}
      className={cn(numberFieldGroupVariants({ size }), className)}
      {...props}
    />
  )
)
NumberFieldGroup.displayName = 'NumberFieldGroup'

/**
 * NumberField Input variants
 */
const numberFieldInputVariants = tv({
  base: [
    'border-t border-b border-border-subtle',
    'text-center text-fg-primary tabular-nums',
    'bg-transparent',
    'focus:z-10 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-brand-primary',
    'disabled:opacity-disabled disabled:cursor-not-allowed',
    'data-[invalid]:border-negative-primary',
  ],
  variants: {
    size: {
      sm: 'h-ui-sm w-75 text-[length:var(--text-body-fixed-small)]',
      md: 'h-ui-md w-100 text-[length:var(--text-body-fixed-base)]',
      lg: 'h-ui-lg w-125 text-[length:var(--text-body-fixed-medium)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface NumberFieldInputProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Input>,
    VariantProps<typeof numberFieldInputVariants> {}

const NumberFieldInput = React.forwardRef<HTMLInputElement, NumberFieldInputProps>(
  ({ className, size, ...props }, ref) => (
    <BaseNumberField.Input
      ref={ref}
      className={cn(numberFieldInputVariants({ size }), className)}
      {...props}
    />
  )
)
NumberFieldInput.displayName = 'NumberFieldInput'

/**
 * Stepper button variants (shared by Increment and Decrement)
 */
const stepperButtonVariants = tv({
  base: [
    'flex items-center justify-center',
    'border border-border-subtle bg-primary text-fg-primary',
    'select-none cursor-pointer',
    'transition-colors duration-standard ease-default',
    'hover:bg-secondary',
    'active:bg-muted',
    'disabled:opacity-disabled disabled:cursor-not-allowed',
    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-brand-primary focus-visible:z-10',
  ],
  variants: {
    size: {
      sm: 'size-ui-sm',
      md: 'size-ui-md',
      lg: 'size-ui-lg',
    },
    position: {
      left: 'rounded-l-md',
      right: 'rounded-r-md',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface NumberFieldDecrementProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Decrement>,
    VariantProps<typeof stepperButtonVariants> {}

const NumberFieldDecrement = React.forwardRef<HTMLButtonElement, NumberFieldDecrementProps>(
  ({ className, size, children, ...props }, ref) => (
    <BaseNumberField.Decrement
      ref={ref}
      className={cn(stepperButtonVariants({ size, position: 'left' }), className)}
      {...props}
    >
      {children ?? <Minus className="size-icon-md" />}
    </BaseNumberField.Decrement>
  )
)
NumberFieldDecrement.displayName = 'NumberFieldDecrement'

export interface NumberFieldIncrementProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Increment>,
    VariantProps<typeof stepperButtonVariants> {}

const NumberFieldIncrement = React.forwardRef<HTMLButtonElement, NumberFieldIncrementProps>(
  ({ className, size, children, ...props }, ref) => (
    <BaseNumberField.Increment
      ref={ref}
      className={cn(stepperButtonVariants({ size, position: 'right' }), className)}
      {...props}
    >
      {children ?? <Plus className="size-icon-md" />}
    </BaseNumberField.Increment>
  )
)
NumberFieldIncrement.displayName = 'NumberFieldIncrement'

/**
 * NumberField ScrubArea - Interactive area for click-drag value changes
 */
const numberFieldScrubAreaVariants = tv({
  base: 'cursor-ew-resize select-none',
})

export interface NumberFieldScrubAreaProps
  extends React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubArea> {}

const NumberFieldScrubArea = React.forwardRef<HTMLSpanElement, NumberFieldScrubAreaProps>(
  ({ className, ...props }, ref) => (
    <BaseNumberField.ScrubArea
      ref={ref}
      className={cn(numberFieldScrubAreaVariants(), className)}
      {...props}
    />
  )
)
NumberFieldScrubArea.displayName = 'NumberFieldScrubArea'

/**
 * NumberField ScrubAreaCursor - Custom cursor while scrubbing
 */
const NumberFieldScrubAreaCursor = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<typeof BaseNumberField.ScrubAreaCursor>
>(({ className, children, ...props }, ref) => (
  <BaseNumberField.ScrubAreaCursor
    ref={ref}
    className={cn('drop-shadow-[0_1px_1px_#0008] filter', className)}
    {...props}
  >
    {children ?? <ScrubCursorIcon />}
  </BaseNumberField.ScrubAreaCursor>
))
NumberFieldScrubAreaCursor.displayName = 'NumberFieldScrubAreaCursor'

/**
 * Default scrub cursor icon
 */
function ScrubCursorIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="currentColor"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  )
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
}
