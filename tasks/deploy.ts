import { HardhatRuntimeEnvironment } from "hardhat/types"

type Input = {}

export const main = async (args: Input, hre: HardhatRuntimeEnvironment) => {
  const GigaCommunis = await hre.ethers.getContractFactory('GigaCommunis')
  const gigaCommunis = await GigaCommunis.deploy()
  const result = await gigaCommunis.waitForDeployment()
  const tx = result.deploymentTransaction()
  if (!tx) {
    throw new Error('contract did not deploy')
  }
  console.log('GigaCommunis() -> %o @ %o', await gigaCommunis.getAddress(), tx.hash)
  await tx.wait()
  console.log('mined')
}
