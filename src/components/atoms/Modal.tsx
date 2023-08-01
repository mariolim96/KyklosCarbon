'use client'
import React from 'react'
import cn from 'classnames'
// import { useModal } from '../../hooks/useModal'
import { isModalOpenAtom } from 'hooks/modalAtoms'
import { useAtom } from 'jotai'
interface Props {
  id?: string
  children?: React.ReactNode
  overlayClassName?: string
  modalClassName?: string
  closeOnOverlayClick?: boolean
}

const Modal = ({ children, overlayClassName, modalClassName, closeOnOverlayClick, id }: Props) => {
  const [isModalOpen] = useAtom(isModalOpenAtom)
  const overlayClass = cn(`modal  ${overlayClassName}`, {
    'modal-open': isModalOpen,
  })

  return (
    <dialog id={id} className={overlayClass}>
      <div className={`modal-box ${modalClassName}`}>{children}</div>
      {closeOnOverlayClick && (
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      )}
    </dialog>
  )
}

export default Modal
