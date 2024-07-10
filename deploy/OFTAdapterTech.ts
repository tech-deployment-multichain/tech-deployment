import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'OFTAdapterTech'

const deployAdapter: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    const AVAX_TECH_ADDRESS = '0x5Ac04b69bDE6f67C0bd5D6bA6fD5D816548b066a'
    assert(deployer, 'Missing named deployer account')
    assert(hre.network.name == 'avalanche', 'This deployment is only available on Avalanche Network')

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)
    console.log(AVAX_TECH_ADDRESS)

    const endpointV2Deployment = await hre.deployments.get('EndpointV2')
    const constructor_args = [
        AVAX_TECH_ADDRESS,
        endpointV2Deployment.address, // LayerZero's EndpointV2 address
        deployer // owner
    ]

    const { address } = await deploy(contractName, {
        from: deployer,
        args: constructor_args,
        log: true,
        skipIfAlreadyDeployed: true,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deployAdapter.tags = [contractName]

export default deployAdapter
