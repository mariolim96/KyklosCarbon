'use client'
import React from 'react'
import { BsChevronRight, BsBoxArrowInDown } from 'react-icons/bs'
import logo from '../../assets/icons/logo.png'
import { MdOutlineInsights } from 'react-icons/md'
import { TbHexagons } from 'react-icons/tb'
import { CgArrowsExchangeAlt } from 'react-icons/cg'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const style = {
  menuClassNameIcon: 'w-6 h-6',
}
interface Props {
  menu?: Array<{
    title: string
    src: JSX.Element
    href: string
  }>
}

const Sidebar = (props: Props) => {
  const {
    menu = [
      { title: 'OverView', src: <MdOutlineInsights className={style.menuClassNameIcon} />, href: '/overview' },
      { title: 'My Retirements', src: <BsBoxArrowInDown className={style.menuClassNameIcon} />, href: '/retirements' },
      { title: 'Pools', src: <TbHexagons className={style.menuClassNameIcon} />, href: '/pools' },
      { title: 'Exchange ', src: <CgArrowsExchangeAlt className={style.menuClassNameIcon} />, href: '/exchange' },
      // { title: 'Setting', src: 'Setting' },
    ],
  } = props
  const [open, setOpen] = React.useState(true)
  const [selected, setSelected] = React.useState(0)
  const navigate = useRouter()
  const onButtonClick = (index: number, href: string) => {
    setSelected(index)
    navigate.push(href)
  }
  return (
    <div className={` ${open ? 'w-72' : 'w-20 '} relative h-screen  p-5 pt-8  shadow-md shadow-first-700 duration-300`}>
      <BsChevronRight
        className={`absolute -right-3 top-10 h-6 w-6 cursor-pointer rounded-full border-2 border-white  p-1 ${!open ? 'rotate-180' : ''}`}
        onClick={() => setOpen(!open)}
      />
      <div
        className="flex items-center gap-x-4"
        onClick={() => navigate.push('/')}
        role="button"
        tabIndex={0}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            navigate.push('/')
          }
        }}>
        <Image alt="logo" src={logo} className={`h-10 w-10 cursor-pointer duration-500 ${open ? 'rotate-[360deg]' : ''}`} />
        <h1 className={`origin-right text-xl font-medium duration-200 ease-in-out ${!open ? 'scale-0' : ''}`}>GreenCoin</h1>
      </div>
      <ul className="pt-6">
        {menu.map((item, index) => (
          <li key={index}>
            <div
              tabIndex={0}
              onClick={() => onButtonClick(index, item.href)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onButtonClick(index, item.href)
              }}
              role="button"
              className={`mt-2 flex cursor-pointer items-center gap-x-4 whitespace-nowrap rounded-md p-2 text-lg hover:bg-first-0 ${
                index === selected ? 'bg-first-0' : ''
              } transition-bg-color shadow-inner shadow-first-900 duration-300 ease-in-out`}>
              <div>{item.src}</div>
              <h1 className={`${!open ? 'scale-0' : ''} origin-left duration-200 ease-in-out`}>{item.title}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
