import React from 'react'
import Organism from 'components/organism'

interface Props {
  Sidebar?: JSX.Element
  Navbar?: JSX.Element
  children: JSX.Element
}

const DefaultLayout = ({ Sidebar = <Organism.Sidebar />, Navbar = <Organism.NavBar />, children }: Props) => (
  <div className="flex h-screen overflow-hidden">
    {Sidebar}
    <div className=" h-screen w-full flex-col justify-end self-start overflow-y-scroll  pt-8 pb-8">
      {Navbar}
      <div className="h-full">
        <div className="mx-4 my-4 flex flex-col gap-4 ">{children}</div>
      </div>
    </div>
  </div>
)

export default DefaultLayout
