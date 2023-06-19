import { ethers } from 'hardhat'
import * as fs from 'fs'
import registryArtifact from '../artifacts/contracts/registry/registry.sol/Registry.json'
import nftBatchArtifact from '../artifacts/contracts/tokenization/batch.sol/NFTRetirementBatch.json'
import hardhat from 'hardhat'
export function toWei(n: number) {
  return ethers.utils.parseEther(n.toString())
}
// token deploy
async function main() {
  // fetch the smart contract and deploy it
  // it get info from artifact file
  const Registry = await ethers.getContractFactory('Registry')
  const NftBatch = await ethers.getContractFactory('NFTRetirementBatch')
  // const Exchange = await ethers.getContractFactory('Exchange');
  const accounts = await ethers.getSigners()
  const [deployer, account1, account2] = accounts
  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account 1:', account1.address)
  // deploy the contract
  const registry = await Registry.deploy()
  const nftBatch = await NftBatch.deploy()
  // // wait until the contract is deployed
  await registry.deployed()
  await nftBatch.deployed()
  console.log('Registry address:', registry.address)
  console.log('NftBatch address:', nftBatch.address)
  // set the registry address into nftBatch
  await nftBatch.setRegistry(registry.address)
  await registry.setCarbonOffsetBatchesAddress(nftBatch.address)
  // condole log registry address
  // console.log('registry nft', await nftBatch.getRegistry())
  // mint an empty batch
  await nftBatch.mintEmptyBatch(account1.address)
  await nftBatch.mintEmptyBatch(account2.address)
  await nftBatch.mintEmptyBatch(account1.address)
  // update batch with data
  await nftBatch.updateBatchWithData(1, '000', 111000, '1')
  // creating a json config file
  const { chainId } = await ethers.provider.getNetwork()

  const config = {
    [chainId]: {
      registry: {
        address: registry.address,
        abi: registryArtifact.abi,
      },
      nftBatch: {
        address: nftBatch.address,
        abi: nftBatchArtifact.abi,
      },
    },
  }
  // create a ts file if doesn't exist
  // if (!fs.existsSync('src')) {
  //   fs.mkdirSync('src')
  // }

  // writing the config in ts config file
  fs.writeFileSync(
    '../src/configuration.ts',
    `/* eslint-disable prettier/prettier */ \n
  export default ${JSON.stringify(config, null, 2)};
  `
  )
  // // seed the exchange
  // await seed(GSC.address, CRT.address, exchange.address);
}

function writeDeploymentInfo(contract: any, filename = '') {
  const data = {
    network: hardhat.network.name,
    contract: {
      address: contract.address,
      signerAddress: contract.signer.address,
      abi: contract.interface.format(),
    },
  }
  const content = JSON.stringify(data, null, 2)
  fs.writeFileSync(filename, content, { encoding: 'utf8' })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
