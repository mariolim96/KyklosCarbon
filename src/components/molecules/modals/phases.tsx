'use client'
import React from 'react'
import { IoAlert } from 'react-icons/io5'
import { Input, Carousel, Select2 } from 'components/atoms'
import { useMultiStep } from 'hooks'

interface Props {
  step: number
}
const styles = {
  slide: {
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
}

function Phases() {
  const multiStep = useMultiStep(4)
  const { values, setValues, step } = multiStep
  console.log('step:', step)
  const providers = [
    { id: 'verra', label: 'Verra', disabled: false },
    { id: 'gold standard', label: 'Gold Standard', disabled: false },
  ]
  return (
    <Carousel currentIndex={step} enableMouseSwipe={true}>
      <div className="m-4 duration-1000">
        <h1 className=" pl-1 text-bc text-2xl">Initiate new batch</h1>
        <div className="flex  rounded-md bg-in p-2">
          <div className="h-8 w-8 flex-none ">
            <IoAlert className=" text-bold mt-1 ml-1  rounded-full bg-wa text-wac" />
          </div>
          <p className="text-inc">
            Please note Before bridging, make sure you have read and understood the acceptance criteria for our BCT pool and NCT pool if you’re
            planning to deposit your bridged credits into them. New: Bridging credits with a difference of more than 10 years between vintage end date
            and issuance date will be rejected. For details, see here.
          </p>
        </div>
        <div>
          <h2 className="pl-1 text-xl text-bc font-medium">Provider</h2>
          <h3 className=" text-l pl-1 font-normal text-bc text-first-100">Select the registry from which you are bridging the credits from</h3>
          <Select2 onChange={(e) => setValues?.({ ...values, provider: e.id })} options={providers}></Select2>
        </div>
      </div>
      <div className="m-4 duration-1000">
        <div className="flex gap-2">
          <div className="p-2 pt-3">
            <div className="align-center text-l flex h-[25px] w-[25px] items-center justify-center rounded-[50%] bg-first-700 text-first-50 ">1</div>
          </div>
          <div className="p-2">
            <h1 className="text-2xl">Retire credits with {values?.provider ?? 'chosen provider'}</h1>
            <h2 className="text-l text-blue-300">
              to bridge carbon credits you need to retire them. Head over to your verifier to retire you carbon credits.
            </h2>
            <div className=" rounded-md border-2 border-blue-500 bg-first-800 p-2 shadow-lg shadow-first-700">
              {['Beneficial owner', 'quantity', 'uri', 'status'].map((item) => (
                <>
                  <h2 className="text-sm tracking-wide text-blue-300">{item}</h2>
                  <Input onChange={(e) => setValues?.({ ...values, [item]: e.target.value })}></Input>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div key="2" style={Object.assign({}, styles.slide, styles.slide3)}>
        slide n°3
      </div>
    </Carousel>
  )
}

export default Phases

//   <div className="m-4 duration-1000">
//     <h1 className="text-2xl">Bridge Retired credits</h1>
//     <h2 className="text-l text-blue-300">Add serial number of the credits you want to bridge</h2>
//     <Input onChange={(e) => setValues?.({ ...values, serial: e.target.value })}></Input>
//   </div>
//   <div>
//     <pre>{JSON.stringify(values, null, 2)}</pre>
//   </div>
