import React from 'react'
import { useModal } from '../hooks/useModal'

const ModalProvider = () => {
  const { currentModal } = useModal()
  return <>{currentModal}</>
}

export default ModalProvider
