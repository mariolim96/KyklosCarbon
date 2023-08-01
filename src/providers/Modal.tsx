'use client'
import { modalNameAtom, Modals } from 'hooks/modalAtoms'
import { useAtom } from 'jotai'
import React from 'react'

const ModalProvider = () => {
  const [modalName] = useAtom(modalNameAtom)

  const RenderModal = () => {
    const CurrentModal = Modals[modalName]
    return <CurrentModal />
  }
  return <>{<RenderModal />}</>
}

export default ModalProvider
