'use client'
import React, { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'utils/mergeClasses'

const InputStyle = cva('input', {
  variants: {
    intent: {
      ghost: 'input-ghost',
      border: 'input-border',
      normal: '',
    },
    size: {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
      full: 'w-full',
    },
    color: {
      primary: 'input-primary',
      secondary: 'input-secondary',
      neutral: 'input-neutral',
      accent: 'input-accent',
      success: 'input-success',
      warning: 'input-warning',
      error: 'input-error',
    },
  },
  defaultVariants: {
    intent: 'border',
    size: 'md',
  },
})
type labelPosition = 'top' | 'bottom'
type labelJustify = 'left' | 'right'

interface Props extends VariantProps<typeof InputStyle>, Omit<React.ButtonHTMLAttributes<HTMLInputElement>, 'color'> {
  placeholder?: string
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  label?: string
  labelPosition?: labelPosition
  labelJustify?: labelJustify
}

function Input(props: Props) {
  const {
    placeholder,
    value,
    onChange,
    disabled,
    label,
    labelPosition = 'top',
    labelJustify = 'left',
    intent,
    size,
    color,
    className,
    ...rest
  } = props
  const [inputValue, setInputValue] = useState(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange && onChange(e)
  }
  return (
    // <div className="form-control w-full max-w-xs">
    <>
      {labelPosition === 'top' && (
        <label className="label">
          <span className={labelJustify === 'left' ? 'label-text' : 'label-text-alt'}>{label}</span>
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={cn(InputStyle({ intent, size, color }), className)}
        disabled={disabled}
        value={inputValue}
        onChange={handleChange}
        {...rest}
      />
      {labelPosition === 'bottom' && (
        <label className="label">
          <span className={labelJustify === 'left' ? 'label-text' : 'label-text-alt'}>{label}</span>
        </label>
      )}
    </>
    // </div>
  )
}

export default Input
