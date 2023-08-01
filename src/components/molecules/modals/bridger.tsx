'use client'
// import React, { useContext, useEffect } from 'react'
// import { Button } from 'components/atoms'
// import * as yup from 'yup'
// import Phases from './Phases'
// import { MultiStep } from 'hooks/useMultiStep'
// import tw, { styled } from 'twin.macro'
// import { useBatchEvent, useMintBatch, useUpdateUserBatch } from 'hooks/contracts/Contracts'
// import { ethers } from 'ethers'

// const Overlay = tw.div`absolute top-0 left-0 grid h-screen w-screen place-items-center bg-first-500 bg-opacity-50 transition-all ease-in-out`
// const Modal = styled.div(() => [tw`h-auto w-[55%] rounded-xl bg-first-500 transition-all ease-in shadow-2xl shadow-first-900`])
// const Stepper = tw.div`flex h-16 justify-center rounded-t-lg bg-first-100 align-baseline `
// const StepperElement = styled.div(({ active }: { active: boolean }) => [
//   tw`grid w-full place-content-center rounded-t-xl border-b-4 border-first-200 transition-all duration-500 ease-in`,
//   active && tw`border-b-amber-600`,
// ])
// const Bottom = tw.div`flex justify-end gap-2 m-4 mt-auto`

// const Bridger = NiceModal.create(() => {
//   const modal = useModal()
//   const phases = ['1 initiate', '2 retire', '3 bridge', '4 submit']
//   const [step, setStep] = React.useState(0)
//   const [values, setValues] = React.useState<{ [k: string]: any }>({ provider: 'verra' })
//   const { data: mintedTokenId, isLoading, write, isSuccess, ...rest } = useMintBatch()

//   const batchEvent = useBatchEvent('BatchMinted')
//   const updateBatch = useUpdateUserBatch(values.tokenId, values.serialNumber, ethers.utils.parseEther(values.quantity), values.uri)

//   // phases.length,
//   // [yup.object().shape({}), yup.object().shape({}), yup.object().shape({}), yup.object().shape({})],
//   // {},'Beneficial owner', 'quantity', 'uri'

//   const schema = yup.object().shape({
//     provider: yup.string().required(),
//     quantity: yup.number().required().positive().integer(),
//     'Beneficial owner': yup.string().required(),
//     uri: yup.string().required(),
//   })
//   useEffect(() => {
//     if (isSuccess && batchEvent.length > 0) {
//       setValues({ ...values, tokenId: batchEvent[batchEvent.length - 1].args.tokenId })
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [batchEvent])

//   const stepCloseButtonLabel = ['Close', 'Back', 'Back', 'Back']
//   const stepNextButtonLabel = ['Initiate batch', 'I have my serial', 'Confirm serial', 'Submit']
//   return (
//     <MultiStep.Provider value={{ values, setValues, step, setStep }}>
//       <Overlay
//         onClick={(e) => {
//           if (e.target === e.currentTarget) {
//             modal.remove()
//           }
//         }}>
//         <Modal>
//           <Stepper>
//             {phases.map((phase, i) => (
//               <StepperElement active={(step ?? 0) > -1 + i} key={i}>
//                 {phase}
//               </StepperElement>
//             ))}
//           </Stepper>
//           <Phases step={step} />
//           <Bottom>
//             <Button
//               intent={'outlined'}
//               onClick={(e) => {
//                 e.stopPropagation()
//                 if (step === 0) {
//                   modal.remove()
//                   return
//                 }
//                 setStep?.(step - 1)
//               }}
//               loading={isLoading}>
//               {stepCloseButtonLabel[step]}
//             </Button>
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 try {
//                   if (step === 0) {
//                     void write?.()
//                     // if (!isLoading && !isSuccess) {
//                     //   throw new Error(rest.error?.message);
//                     // }
//                   }
//                   if (step === 3) {
//                     void updateBatch.write?.()
//                     modal.remove()
//                   }
//                   setStep?.(step + 1)
//                 } catch (error) {
//                   console.log('Bridger ~ error', error as string)
//                   // modal.remove();
//                 }
//               }}
//               loading={isLoading}>
//               {stepNextButtonLabel[step]}
//             </Button>
//           </Bottom>
//         </Modal>
//       </Overlay>
//     </MultiStep.Provider>
//   )
// })

// export default Bridger

// create a modal similar to the one in the example

import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'components/atoms'
// import * as yup from 'yup'
import Phases from './phases'
import { useMultiStep, MultiStepProvider } from 'hooks'
import { useAtom } from 'jotai'
import { closeModalAtom } from 'hooks/modalAtoms'

const Bridger = () => {
  const phases = ['1 initiate', '2 retire', '3 bridge', '4 submit']
  const [step, setStep] = React.useState(0)
  const [values, setValues] = React.useState<{ [k: string]: any }>({ provider: 'verra' })
  const stepCloseButtonLabel = ['Close', 'Back', 'Back', 'Back']
  const stepNextButtonLabel = ['Initiate batch', 'I have my serial', 'Confirm serial', 'Submit']
  const [, closeModal] = useAtom(closeModalAtom)

  // const { data: mintedTokenId, isLoading, write, isSuccess, ...rest } = useMintBatch()
  // const batchEvent = useBatchEvent('BatchMinted')
  // const updateBatch = useUpdateUserBatch(values.tokenId, values.serialNumber, ethers.utils.parseEther(values.quantity), values.uri)
  //   // phases.length,
  //   // [yup.object().shape({}), yup.object().shape({}), yup.object().shape({}), yup.object().shape({})],
  //   // {},'Beneficial owner', 'quantity', 'uri'

  //   const schema = yup.object().shape({
  //     provider: yup.string().required(),
  //     quantity: yup.number().required().positive().integer(),
  //     'Beneficial owner': yup.string().required(),
  //     uri: yup.string().required(),
  //   })

  return (
    <Modal>
      <MultiStepProvider.Provider value={{ values, setValues, step, setStep }}>
        hello
        <Button
          intent={'primary'}
          onClick={() => {
            closeModal()
          }}>
          close
        </Button>
      </MultiStepProvider.Provider>
    </Modal>
  )
}

export default Bridger
