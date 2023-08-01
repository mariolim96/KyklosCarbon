// 'use client'
// import Bridger from 'components/molecules/modals/bridger'
// import { atom, useAtom, createStore, Provider } from 'jotai'

// const isModalOpenAtom = atom(false)

// const modalNameAtom = atom<ModalName>('')

// const setModalOpenAtom = atom(null, (_get, set, name: ModalName) => {
//   set(modalNameAtom, name)
//   set(isModalOpenAtom, true)
// })

// const closeModalAtom = atom(null, (_get, set) => {
//   set(isModalOpenAtom, false)
//   set(modalNameAtom, '')
// })

// const modals = {
//   bridger: () => <Bridger />,
//   bridger2: () => <Bridger />,
// }
// type ModalName = keyof typeof modals | ''

// const currentModalAtom = atom((get) => {
//   const modalName = get(modalNameAtom)
//   return modalName ? modals[modalName] : null
// })

// const useModal = () => {
//   const [isModalOpen] = useAtom(isModalOpenAtom)
//   const [modalName] = useAtom(modalNameAtom)
//   const [, setModalOpen] = useAtom(setModalOpenAtom)
//   const [, closeModal] = useAtom(closeModalAtom)
//   const [currentModal] = useAtom(currentModalAtom)

//   return { isModalOpen, modalName, setModal: setModalOpen, closeModal, currentModal }
// }

export {}
