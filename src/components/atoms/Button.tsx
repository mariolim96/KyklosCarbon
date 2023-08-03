'use client'
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { IconName, DynamicIconName, StaticImgName } from './Icon'
import atoms from '../atoms'

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
      neutral: 'btn-neutral',
      glass: 'glass',
    },
    shadow: {
      xs: 'shadow-xs',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
    shadowType: {
      outer: 'shadow',
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
      wide: 'btn-wide',
      block: 'btn-block',
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
    rounded: false,
    disabled: false,
    circle: false,
    square: false,
    outline: false,
  },
})

type Icon = {
  name: IconName
  position?: 'left' | 'right'
  type: 'static' | 'dynamic'
  width?: number
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Omit<VariantProps<typeof ButtonStyle>, 'disabled'> {
  children?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  icon?: Icon
}

function Button(props: ButtonProps) {
  const {
    children,
    onClick,
    type = 'button',
    intent,
    size,
    rounded,
    disabled,
    circle,
    square,
    active,
    loading,
    className,
    outline,
    icon,
    ...rest
  } = props

  const { StaticIcon, DynamicIcon } = atoms
  const cIcon = icon ? (
    icon.type === 'dynamic' ? (
      <DynamicIcon name={icon.name as DynamicIconName} />
    ) : (
      <StaticIcon name={icon.name as StaticImgName} width={icon?.width ?? 10} />
    )
  ) : null
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${ButtonStyle({
        intent,
        size,
        rounded,
        disabled,
        circle,
        square,
        active,
        loading,
        outline,
        className,
      })}`}
      {...rest}>
      {(icon?.position ?? 'left') === 'left' && cIcon}
      {children}
      {icon?.position === 'right' && cIcon}
    </button>
  )
}

export default Button
