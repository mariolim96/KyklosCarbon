/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react'

type Toast = {
  id: number
  content: React.ReactNode
  type?: 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error'
}

type ToastAction = { type: 'add'; id: number; content: React.ReactNode; metadata?: any } | { type: 'remove'; id: number }

const toastReducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: action.id,
          content: action.content,
          type: action.metadata,
        },
      ]

    case 'remove':
      return [...state.filter((toast) => toast.id !== action.id)]

    default:
      return state
  }
}

const timers: { [key: number]: NodeJS.Timeout } = {}
const startTimer = (id: number, removeToast: (id: number) => void, delay: number) => {
  if (!timers[id]) {
    timers[id] = setTimeout(() => removeToast(id), delay)
  }
}

const dismiss = (id: number, removeToast: (id: number) => void) => {
  if (timers[id]) {
    clearTimeout(timers[id])
    delete timers[id]
  }
  removeToast(id)
}

let uid = 0

const useToaster = (delay: number = 15000) => {
  const [toastList, dispatch] = useReducer(toastReducer, [])

  const removeToast = (id: number) => dispatch({ type: 'remove', id })

  const addToast = (content: React.ReactNode, metadata?: any) => {
    uid += 1
    startTimer(uid, removeToast, delay)
    dispatch({ type: 'add', id: uid, content, metadata })
  }

  const Toaster: React.FC<{}> = () => (
    <div className={'toast toast-top toast-end'}>
      {toastList.map(({ id, content, type }) => {
        const remove = () => dismiss(id, removeToast)
        return (
          <div key={id} className={`alert ${type} m-2`} onClick={remove}>
            {content}
          </div>
        )
      })}
    </div>
  )

  return [Toaster, addToast, toastList] as const
}

export default useToaster
