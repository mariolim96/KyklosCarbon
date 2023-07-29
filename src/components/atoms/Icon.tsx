import React from 'react'
import logo from 'assets/icons/logo.png'
import Image, { type StaticImageData } from 'next/image'

export type logos = 'logo'
type iconMapper = {
  [key in logos]: StaticImageData
}
const Icons: iconMapper = {
  logo,
}

interface Props {
  name: logos
}

function Icon({ name }: Props) {
  return <Image src={Icons[name]} alt="logo" className="logo" />
}

export default Icon
