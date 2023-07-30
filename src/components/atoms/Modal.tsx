import { useModal } from '@ebay/nice-modal-react'
import React from 'react'

interface Props {
  children?: React.ReactNode
  overlayClassName?: string
  modalClassName?: string
  overlayOnClick?: () => void
}
// pointer-events: none;
// position: fixed;
// inset: 0;
// margin: 0;
// display: grid;
// height: 100%;
// max-height: none;
// width: 100%;
// max-width: none;
// justify-items: center;
// padding: 0;
// opacity: 0;
// overscroll-behavior: contain;
// z-index: 999;
// background-color: transparent;
// color: inherit;
// transition-duration: .2s;
// transition-timing-function: cubic-bezier(0,0,.2,1);
// transition-property: transform,opacity,visibility;
// overflow-y: hidden;
// add this prop to the div

const Modal = ({ children, overlayClassName, modalClassName, overlayOnClick }: Props) => {
  return (
    <dialog id="modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default Modal

// <dialog className="modal">
//   <form method="dialog" className="modal-box">
//     <h3 className="font-bold text-lg">Hello!</h3>
//     <p className="py-4">Press ESC key or click the button below to close</p>
//     <div className="modal-action">
//       {/* if there is a button in form, it will close the modal */}
//       <button className="btn">Close</button>
//     </div>
//   </form>
// </dialog>
