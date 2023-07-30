import { type NextPage } from 'next'
import Head from 'next/head'
import Atoms from 'components/atoms'
import Organism from 'components/organism'
import NiceModal from '@ebay/nice-modal-react'
import Bridger from 'components/molecules/modals/bridger'
import { useModal } from 'hooks'

const Home: NextPage = () => {
  const { Stats, Button, Table } = Atoms
  const { ModalComponent, closeModal, showModal } = useModal('modal1')

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stats></Stats>
      <div className="mx-4 my-4 flex items-center justify-between">
        <h1 className="text-2xl text-nf">My carbon asset</h1>
        <div className="flex justify-between gap-2">
          <Button intent="secondary" outline>
            refresh
          </Button>
          <Button className="pb-0" intent={'primary'} onClick={() => window.modal.showModal()}>
            Start bridging
          </Button>
          {ModalComponent && <ModalComponent />}
          {/* <dialog id="modal" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click outside to close</p>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog> */}
        </div>
      </div>
      <Table />
      <Table />
      <Table />
    </>
  )
}

export default Home

{
  /* <dialog id="my_modal_1" className="modal">
  <form method="dialog" className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      {/* if there is a button in form, it will close the modal
      <button className="btn">Close</button>
    </div>
  </form>
</dialog> */
}
{
  /* <div className="mx-4 my-4 flex flex-col gap-4 ">
<div className="mx-4 my-4 flex items-center justify-between">
<h1>My carbon asset</h1>
<div className="flex gap-2">
<Button
intent="outlined"
onClick={() => {
  void refetch({
    throwOnError: true,
    cancelRefetch: true,
  });
}}
>
refresh
</Button>
<Button
className="p-0"
intent="contained"
onClick={() => {
  void showModal();
}}
>
<TbBuildingBridge className="mr-2 h-6 w-6" />
      <span className="text-sm">start bridging</span>
    </Button>
  </div>
</div>
<Asset title="Nft batches" loading={isFetching || isLoading} columns={columns} defaultData={Rows}></Asset>
<Asset title="Tokens" loading={true}></Asset>
<Asset title="Pools tokens"></Asset>
</div> */
}
