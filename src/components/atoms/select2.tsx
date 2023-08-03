// import React, { Fragment, useState } from 'react'
// import { Listbox, Transition } from '@headlessui/react'
import { AiOutlineCheck } from 'react-icons/ai'
import { HiChevronUpDown } from 'react-icons/hi2'

// interface Props {
//   // eslint-disable-next-line no-unused-vars
//   onChange?: (e: { value: string; label: string }) => void
//   options: Array<{ value: string; label: string }>
//   defaultValue?: string
// }

// export default function Example(props: Props) {
//   const {
//     options = [
//       { value: '1', label: 'no choices' },
//       { value: '1', label: 'no choices' },
//     ],
//     onChange,
//     defaultValue,
//   } = props
//   const [selected, setSelected] = useState(options.find(({ value }) => value === defaultValue) || options[0])
//   const onSelectChange = (e: { value: string; label: string }) => {
//     console.log('e:', e)
//     setSelected(e)
//     onChange?.(e)
//   }

//   return (
//     <div className="">
//       <Listbox value={selected} onChange={onSelectChange}>
//         <div className="relative mt-1">
//           <Listbox.Button className="relative w-full cursor-default rounded-lg bg-b1 py-2 pl-3 pr-10 text-left text-bc shadow-md sm:text-sm">
//             <span className="block truncate">{selected.label}</span>
//             <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//               <AiOutlineCheck className="h-5 w-5 text-nf" aria-hidden="true" />
//             </span>
//           </Listbox.Button>
//           <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
//             <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-b1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//               {options.map((option, idx) => (
//                 <Listbox.Option
//                   key={idx}
//                   className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-n text-nc' : 'text-bc'}`}
//                   value={option.value}>
//                   {({ selected }) => (
//                     <>
//                       <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
//                       {selected ? (
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
//                           <HiChevronUpDown className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       ) : null}
//                     </>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>
//           </Transition>
//         </div>
//       </Listbox>
//     </div>
//   )
// }
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const people = [
  { id: 1, label: 'Durward Reynolds', disabled: false },
  { id: 2, label: 'Kenton Towne', disabled: false },
  { id: 3, label: 'Therese Wunsch', disabled: false },
  { id: 43, label: 'Benedict Kessler', disabled: false },
  { id: 5, label: 'Katelyn Rohan', disabled: false },
]

interface Props {
  options: Array<{ id: string | number; label: string; disabled?: boolean }>
  style?: {
    listbox?: string
    button?: string
    option?: (active: boolean, disable?: boolean, selected?: boolean) => string
    allOptions?: string
  }
  onChange?: (e: { id: string | number; label: string }) => void
}

export default function MyListbox(props: Props) {
  const { options, style } = props
  const {
    button = 'relative w-full cursor-default rounded-lg bg-b1 py-2 pl-3 pr-10 text-left text-bc shadow-md sm:text-sm',
    option = (active: boolean) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-n text-nc' : 'text-bc'}`,
    allOptions = 'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-b1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
  } = style || {}
  const [selectedPerson, setSelectedPerson] = useState(options[0])

  const onChange = (e: { id: string | number; label: string }) => {
    setSelectedPerson(e)
    props.onChange?.(e)
  }

  return (
    <Listbox value={selectedPerson} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className={button}>
          <span className="block truncate">{selectedPerson.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronUpDown className="h-5 w-5 text-nc" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className={allOptions}>
            {people.map((person) => (
              <Listbox.Option key={person.id} value={person} disabled={person.disabled} className={({ active }) => option(active)}>
                {({ selected }) => (
                  <>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-nc">
                        <AiOutlineCheck className="h-5 w-5 text-nc" aria-hidden="true" />
                      </span>
                    )}
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{person.label}</span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
