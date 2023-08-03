import React from 'react'
import logo from 'assets/icons/logo.png'
import Image from 'next/image'
import { PiBridge } from 'react-icons/pi'
import type { ImageLoaderProps } from 'next/image'
import { IconBaseProps } from 'react-icons'

const StaticIcons = {
  logo,
}
type StaticImgName = keyof typeof StaticIcons

interface StaticIconProps extends Omit<ImageLoaderProps, 'src'> {
  name: StaticImgName
}

const StaticIcon = (props: StaticIconProps) => {
  const { name, ...rest } = props
  const IconComponent = StaticIcons[name]
  return <Image src={IconComponent} alt={name} {...rest} />
}

// images from react icons
type DynamicIconName = keyof typeof Icons

const Icons = {
  bridge: PiBridge,
  'bridge-2': PiBridge,
}

interface IconProps extends IconBaseProps {
  name: DynamicIconName
}
function isImgName(name: string): name is DynamicIconName {
  return name in Icons
}

const DynamicIcon = (props: IconProps) => {
  const { name, ...rest } = props
  if (!isImgName(name)) {
    return null
  }
  const IconComponent = Icons[name]
  return <IconComponent {...rest} />
}
const Icon = { StaticIcon, DynamicIcon }
export default Icon

type IconName = DynamicIconName | StaticImgName
// export default Icon
export type { DynamicIconName, StaticImgName, IconName }
