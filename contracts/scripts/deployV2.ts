import { ethers } from 'hardhat'
import * as fs from 'fs'
import hardhat from 'hardhat'
import { VintageDataStruct } from '../typechain-types/interfaces/IProjectVintages'

async function main() {
  const accounts = await ethers.getSigners()
  const [deployer, account1, account2] = accounts
  console.log(deployer.address, account1.address, account2.address)

  const Registry = await ethers.getContractFactory('Registry')

  const registry = await Registry.connect(deployer).deploy()
  await registry.deployed()

  const CarbonProject = await ethers.getContractFactory('CarbonProject')
  const carbonProject = await CarbonProject.connect(deployer).deploy()
  await carbonProject.deployed()

  // const kyklosToken = await ethers.getContractFactory('KyklosToken')
  // const kyklosTokenInstance = await kyklosToken.connect(deployer).deploy()

  const ProjectVintages = await ethers.getContractFactory('ProjectVintages')
  const projectVintages = await ProjectVintages.connect(deployer).deploy()
  await projectVintages.deployed()

  await carbonProject.setRegistry(registry.address)
  await projectVintages.setRegistry(registry.address)

  await registry.setCarbonProjectVintagesAddress(projectVintages.address)
  await registry.setCarbonProjectAddress(carbonProject.address)

  // const KyklosToken = await ethers.getContractFactory('KyklosToken')
  // const kyklosToken = await KyklosToken.connect(deployer).deploy()

  const KyklosTokenFactory = await ethers.getContractFactory('KyklosTokenFactory')
  const kyklosTokenFactory = await KyklosTokenFactory.connect(deployer).deploy(registry.address, deployer.address)
  console.log('creating new project')
  const transaction = await carbonProject.addNewProject(
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
  const receipt = await transaction.wait()
  const mintedEvent = receipt.events?.find((event) => event.event === 'ProjectMinted')
  const tokenId = mintedEvent?.args?.tokenId
  console.log('tokenId', tokenId)

  const vintageData: VintageDataStruct = {
    name: '2023 Q1',
    startTime: '1609459200',
    endTime: '1612137600',
    projectTokenId: tokenId,
    totalVintageQuantity: 100000,
    isCorsiaCompliant: true,
    isCCPcompliant: false,
    coBenefits: 'Enhanced soil fertility and crop yield',
    correspAdjustment: 'None',
    additionalCertification: 'Organic Certification',
    uri: 'https://example.com/vintage/2023q1',
  }

  await projectVintages.addNewVintage(account1.address, vintageData)
  await projectVintages.fractionalize(tokenId)
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
