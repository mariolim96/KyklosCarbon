import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { BigNumber, ContractReceipt, ContractTransaction } from 'ethers'
import { ethers } from 'hardhat'
import { CarbonProject } from '../typechain-types/'

describe('CarbonProject', () => {
  let carbonProjectInstance: CarbonProject
  let accounts: SignerWithAddress[]
  beforeEach(async () => {
    /* before each context */
    accounts = await ethers.getSigners()
    const [deployer, account1, account2] = accounts
    // deploy contracts
    const registry = await ethers.getContractFactory('Registry')
    const registryInstance = await registry.connect(deployer).deploy()
    await registryInstance.deployed()
    const carbonProject = await ethers.getContractFactory('CarbonProject')
    carbonProjectInstance = await carbonProject.connect(deployer).deploy()
    await carbonProjectInstance.deployed()
    const projectVintages = await ethers.getContractFactory('ProjectVintages')
    const projectVintagesInstance = await projectVintages.connect(deployer).deploy()
    await projectVintagesInstance.deployed()
    await carbonProjectInstance.setRegistry(registryInstance.address)
    await projectVintagesInstance.setRegistry(registryInstance.address)
    await registryInstance.setCarbonProjectVintagesAddress(projectVintagesInstance.address)
    await registryInstance.setCarbonProjectAddress(carbonProjectInstance.address)
  })
  it('should create a new project', async () => {
    const [deployer, account1, account2] = accounts
    const data = await carbonProjectInstance
      .connect(deployer)
      .addNewProject(
        account1.address,
        '1',
        'verra',
        'Solar Energy Installation',
        'California, USA',
        'idk',
        'Photovoltaic Panels',
        'energy production',
        'renewable energy',
        'www.solar.com',
        account1.address
      )
    const receipt = await data.wait()
    console.log('receipt:', receipt)

    const projectIdEvent = receipt.events?.find((event) => event.event === 'ProjectMinted')

    expect(projectIdEvent).to.not.be.undefined
    const tokenId = projectIdEvent?.args?.tokenId

    const isAddedTokenId = await carbonProjectInstance.getProjectDataByTokenId(tokenId)
    expect(isAddedTokenId).to.not.be.undefined

    const isValidProjectTokenId = await carbonProjectInstance.isValidProjectTokenId(tokenId)
    expect(isValidProjectTokenId).to.equal(true, 'tokenId should be added to validProjectTokenIds mapping')
    const projectId = await carbonProjectInstance.getPidToTokenId('1')
    expect(projectId).to.equal(tokenId, 'tokenId should be added to projectTokenIdToProjectId mapping')
  })
})

// describe('MyToken', () => {
//   /* create named accounts for contract roles */

//   beforeEach(async () => {
//     /* before each context */
//   })

// it('should mint an nftBatch', async () => {
//   const accounts = await ethers.getSigners()
//   const creatorAddress = accounts[0]
//   const firstOwnerAddress = accounts[1]
//   // const secondOwnerAddress = accounts[2];
//   // const externalAddress = accounts[3];
//   // const unprivilegedAddress = accounts[4];
//   console.log('creatorAddress', creatorAddress.address)
//   console.log('firstOwnerAddress', firstOwnerAddress.address)
//   const NFTretirementBatch: NFTRetirementBatch__factory = await ethers.getContractFactory('NFTRetirementBatch')
//   const nftBatch: NFTRetirementBatch = await NFTretirementBatch.deploy()
//   const registryAddress = await ethers.getContractFactory('Registry')
//   const registry: Registry = await registryAddress.deploy()
//   await registry.deployed()
//   await nftBatch.deployed()
//   await registry.setCarbonOffsetBatchesAddress(nftBatch.address)
//   await nftBatch.connect(creatorAddress).setRegistry(registry.address)
//   // await nftBatch.setRegistry(registry.address);
//   // mint an empty batch
//   await nftBatch.connect(firstOwnerAddress).mintEmptyBatch(firstOwnerAddress.address)
//   console.log(await nftBatch.connect(firstOwnerAddress).getAllNftOfUser(firstOwnerAddress.address))
//   // mint a batch with 1 token
//   await nftBatch.connect(firstOwnerAddress).updateBatchWithData(1, '000', 111000, '1')
// })
// })
