'use client'
import { Button, Modal } from 'components/atoms'
import Bridger from 'components/molecules/modals/bridger'
import { atom, useAtom, createStore, Provider } from 'jotai'

const isModalOpenAtom = atom(false)

const modalNameAtom = atom<ModalName>('')

const setModalOpenAtom = atom(null, (_get, set, name: ModalName) => {
  set(modalNameAtom, name)
  set(isModalOpenAtom, true)
})

const closeModalAtom = atom(null, (_get, set) => {
  set(isModalOpenAtom, false)
  set(modalNameAtom, '')
})

const Modals = {
  bridger: () => <Bridger />,
  '': () => null,
  example: () => (
    <Modal>
      hi
      <Button
        intent={'primary'}
        onClick={() => {
          // closeModal()
        }}>
        close
      </Button>
    </Modal>
  ),
}
type ModalName = keyof typeof Modals

// const useModal = () => {
//   const [isModalOpen] = useAtom(isModalOpenAtom)
//   const [modalName] = useAtom(modalNameAtom)
//   const [, setModalOpen] = useAtom(setModalOpenAtom)
//   const [, closeModal] = useAtom(closeModalAtom)
//   const [currentModal] = useAtom(currentModalAtom)

//   return { isModalOpen, modalName, setModal: setModalOpen, closeModal, currentModal }
// }

export { isModalOpenAtom, modalNameAtom, setModalOpenAtom, closeModalAtom, Modals }
