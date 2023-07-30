import Bridger from 'components/molecules/modals/bridger'
import { createContext, useContext } from 'react'

interface ModalContext {
  // map of modals
  modals: { [k: string]: any }
}

const modals = {
  modal1: () => (
    <dialog id="modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  ),
  bridger: () => <Bridger />,
}
type ModalStrings = keyof typeof modals
// context for modal
const ModalContext = createContext<ModalContext>({
  modals,
})

const useModal = (modalName: ModalStrings) => {
  const { modals } = useContext(ModalContext)
  console.log('modals:', modals)

  const ModalComponent = modals[modalName]
  const modal = window.modal
  const showModal = () => {
    debugger
    modal?.showModal()
  }
  const closeModal = () => {
    modal.close()
  }
  return { showModal, closeModal, ModalComponent }
}

export { ModalContext, useModal, modals }
