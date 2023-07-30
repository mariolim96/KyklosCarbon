'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const ButtonStyle = cva('btn shadow-md', {
  variants: {
    intent: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
      ghost: 'btn-ghost',
      link: 'btn-link',
      square: 'btn-square',
      circle: 'btn-circle',
    },
    shadow: {
      xs: 'shadow-xs',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
    shadowType: {
      inner: 'shadow-inner',
      inherit: 'shadow-inherit',
      none: 'shadow-none',
    },
    outline: {
      true: 'btn-outline',
      false: '',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
    wide: {
      true: 'btn-wide',
      false: '',
    },
    rounded: {
      true: 'btn-rounded',
      false: '',
    },
    disabled: {
      true: 'btn-disabled',
      false: '',
    },
    circle: {
      true: 'btn-circle',
      false: '',
    },
    square: {
      true: 'btn-square',
      false: '',
    },
    active: {
      true: 'btn-active',
      false: '',
    },
    loading: {
      true: 'btn-loading',
      false: '',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    wide: false,
    rounded: false,
    disabled: false,
    circle: false,
    square: false,
  },
})

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Omit<VariantProps<typeof ButtonStyle>, 'disabled'> {
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button(props: ButtonProps) {
  const { children, onClick, type = 'button', intent, size, wide, rounded, disabled, circle, square, active, loading, className, ...rest } = props
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${ButtonStyle({
        intent,
        size,
        wide,
        rounded,
        disabled,
        circle,
        square,
        active,
        loading,
        className,
      })}`}
      {...rest}>
      {children}
    </button>
  )
}

export default Button
