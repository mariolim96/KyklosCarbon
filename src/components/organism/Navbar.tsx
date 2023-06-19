import { PassportScore } from 'components/layout/PassportScore'
import { ConnectKitButton } from 'connectkit'
import React from 'react'
import ThemeChanger from 'components/atoms/ThemeChanger'

function NavBar() {
  return (
    <div className="flex justify-end">
      {/* <PassportScore /> */}
      <ConnectKitButton />
      <ThemeChanger />
    </div>
  )
}

export default NavBar
