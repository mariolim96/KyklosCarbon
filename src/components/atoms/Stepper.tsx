import React from 'react'

interface Props {
  steps: string[]
  active: number
}

const Stepper = ({ steps, active }: Props) => {
  return (
    <div className="flex h-16 justify-center rounded-t-lg bg-n align-baseline mb-1 ">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`grid w-full place-content-center rounded-t-xl border-b-4 text-nc font-semibold border-n transition-all duration-500 ease-out ${
            index === active ? 'border-b-nf' : ''
          }`}>
          {step}
        </div>
      ))}
    </div>
  )
}

export default Stepper
