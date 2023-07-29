/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { AiOutlineCheck } from 'react-icons/ai'
import { HiChevronUpDown } from 'react-icons/hi2'

interface StyledProps {
  listBoxButton?: string
  listBoxOptions?: string
  optionHover?: string
  optionHoverText?: string
  textColor?: string
  optionSelectedIconColor?: string
}

interface Props extends StyledProps {
  name?: string
  onChange?: (e: { value: string; label: string }) => void
  values?: Array<{ value: string; label: string }>
  defaultValue?: string
}

export default function Select(props: Props) {
  const {
    listBoxButton = '#263555',
    listBoxOptions = 'bg-first-600',
    optionHover = 'bg-amber-100 text-amber-900',
    textColor = 'text-gray-900',
    optionSelectedIconColor = 'text-gray-400',
    values = [{ value: '1', label: 'no choices' }],
    onChange,
  } = props
  const [selected, setSelected] = useState(values[0])
  const onSelectChange = (e: { value: string; label: string }) => {
    console.log('hello', e)
    setSelected(e)
    onChange?.(e)
  }

  return (
    <div>
      <Listbox value={selected} onChange={onSelectChange}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`focus-visible:ring-offset-orange-300 relative w-full cursor-default rounded-lg  
              py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500
              focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 
              focus-visible:ring-offset-2 sm:text-sm`}
            style={{ backgroundColor: `${listBoxButton}` }}>
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AiOutlineCheck className={`${optionSelectedIconColor} h-5 w-5`} aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options
              className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md ${listBoxOptions} py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
              {values.map((val, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }: { active: boolean }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? optionHover : textColor}`
                  }
                  value={val}
                  onChange={(e: any) => console.log('hello')}>
                  {({ selected }: { selected: boolean }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{val.label}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <HiChevronUpDown className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
