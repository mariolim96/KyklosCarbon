import React, { useContext } from 'react'

interface MultiStepContext {
  values: { [k: string]: any }
  setValues: React.Dispatch<React.SetStateAction<{ [k: string]: any }>>
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}
export const MultiStepProvider = React.createContext<MultiStepContext | null>(null)

export const useMultiStep = (phases: number) => {
  const contextStep = useContext(MultiStepProvider)
  const canStepNext = contextStep?.step != null ? contextStep.step <= phases - 1 : false
  const canStepBack = contextStep?.step != null ? contextStep.step > 0 : false

  return {
    values: contextStep?.values,
    setValues: contextStep?.setValues,
    step: contextStep?.step,
    setStep: contextStep?.setStep,
    canStepNext,
    canStepBack,
  }
}
