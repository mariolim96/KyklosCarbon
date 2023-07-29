'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const SelectStyle = cva('select w-full max-w-xs', {
  variants: {
    intent: {
      ghost: 'select-ghost',
      border: 'select-bordered',
      normal: '',
    },
    color: {
      primary: 'select-primary',
      secondary: 'select-secondary',
      accent: 'select-accent',
      success: 'select-success',
      warning: 'select-warning',
      error: 'select-error',
    },
    size: {
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
    },
  },
  defaultVariants: {
    intent: 'border',
    size: 'md',
  },
})

interface Props extends VariantProps<typeof SelectStyle> {
  options: string[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selected?: string
  disabled?: boolean
}

const Select = ({ options, selected, onChange, disabled, intent, size, color, ...rest }: Props & React.HTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      className={`${SelectStyle({
        intent,
        size,
        color,
      })} appearance-none bg-gray-200 rounded-md px-4 py-2 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
      disabled={disabled}
      onChange={onChange}
      {...rest}
      defaultValue={selected}>
      {options.map((option, i) => {
        return (
          <option key={i} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )
}
export default Select
