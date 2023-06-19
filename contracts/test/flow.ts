import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { BigNumber, ContractReceipt } from 'ethers'
import { ethers } from 'hardhat'
import { NFTRetirementBatch, NFTRetirementBatch__factory, Registry, Registry__factory } from '../typechain-types'

describe('MyToken', () => {
  /* create named accounts for contract roles */

  beforeEach(async () => {
    /* before each context */
  })

  it('should mint an nftBatch', async () => {
    const accounts = await ethers.getSigners()
    const creatorAddress = accounts[0]
    const firstOwnerAddress = accounts[1]
    // const secondOwnerAddress = accounts[2];
    // const externalAddress = accounts[3];
    // const unprivilegedAddress = accounts[4];
    console.log('creatorAddress', creatorAddress.address)
    console.log('firstOwnerAddress', firstOwnerAddress.address)
    const NFTretirementBatch: NFTRetirementBatch__factory = await ethers.getContractFactory('NFTRetirementBatch')
    const nftBatch: NFTRetirementBatch = await NFTretirementBatch.deploy()
    const registryAddress = await ethers.getContractFactory('Registry')
    const registry: Registry = await registryAddress.deploy()
    await registry.deployed()
    await nftBatch.deployed()
    await registry.setCarbonOffsetBatchesAddress(nftBatch.address)
    await nftBatch.connect(creatorAddress).setRegistry(registry.address)
    // await nftBatch.setRegistry(registry.address);
    // mint an empty batch
    await nftBatch.connect(firstOwnerAddress).mintEmptyBatch(firstOwnerAddress.address)
    console.log(await nftBatch.connect(firstOwnerAddress).getAllNftOfUser(firstOwnerAddress.address))
    // mint a batch with 1 token
    await nftBatch.connect(firstOwnerAddress).updateBatchWithData(1, '000', 111000, '1')
  })
})
