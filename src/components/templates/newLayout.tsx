import React from 'react'
import { NavBar as Nav, Sidebar as Side } from 'components/organism'

interface Props {
  Sidebar?: JSX.Element
  Navbar?: JSX.Element
  children: JSX.Element
}

const DefaultLayout = ({ Sidebar = <Side />, Navbar = <Nav />, children }: Props) => (
  <div className="flex h-screen overflow-hidden">
    {Sidebar}
    <div className="mt-1 h-screen w-full flex-col justify-end self-start overflow-hidden pt-8">
      {Navbar}
      <div className="h-full overflow-hidden pb-8">{children}</div>
    </div>
  </div>
)

export default DefaultLayout
