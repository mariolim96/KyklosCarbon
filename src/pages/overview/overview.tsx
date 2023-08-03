'use client'
import { type NextPage } from 'next'
import Head from 'next/head'
import Atoms from 'components/atoms'
import { setModalOpenAtom } from 'hooks/modalAtoms'
import { useAtom } from 'jotai'

const Home: NextPage = () => {
  const { Stats, Button, Table, DynamicIcon } = Atoms
  const [, setModal] = useAtom(setModalOpenAtom)
  return (
    <>
      <Stats></Stats>
      <div className="mx-1 my-4 flex items-center justify-between">
        <h1 className="text-2xl text-nf">My carbon asset</h1>
        <div className="flex justify-between gap-2">
          <Button intent="secondary" outline={true}>
            refresh
          </Button>
          <Button
            className="pb-0"
            intent={'primary'}
            onClick={() => {
              setModal('bridger')
            }}>
            <DynamicIcon name={'bridge'} size={20} />
            Start bridging
          </Button>
        </div>
      </div>
      <Table />
      <Table />
      <Table />
    </>
  )
}

export default Home
