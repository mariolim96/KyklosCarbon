import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

interface Helpers {
  goToNextStep: () => void
  goToPrevStep: () => void
  reset: () => void
  canGoToNextStep: boolean
  canGoToPrevStep: boolean
  setStep: Dispatch<SetStateAction<number>>
}

// eslint-disable-next-line no-unused-vars
type setStepCallbackType = (step: number | ((step: number) => number)) => void

export function useStep(maxStep: number, initialStep?: number): [number, Helpers] {
  const [currentStep, setCurrentStep] = useState(initialStep ?? 1)

  const canGoToNextStep = useMemo(() => currentStep + 1 <= maxStep, [currentStep, maxStep])

  const canGoToPrevStep = useMemo(() => currentStep - 1 >= 1, [currentStep])

  const setStep = useCallback<setStepCallbackType>(
    (step) => {
      // Allow value to be a function so we have the same API as useState
      const newStep = step instanceof Function ? step(currentStep) : step

      if (newStep >= (initialStep ?? 1) && newStep <= maxStep) {
        setCurrentStep(newStep)
        return
      }

      throw new Error('Step not valid')
    },
    [maxStep, currentStep, initialStep]
  )

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => step + 1)
    }
  }, [canGoToNextStep])

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep((step) => step - 1)
    }
  }, [canGoToPrevStep])

  const reset = useCallback(() => {
    setCurrentStep(initialStep ?? 1)
  }, [initialStep])

  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      canGoToNextStep,
      canGoToPrevStep,
      setStep,
      reset,
    },
  ]
}
