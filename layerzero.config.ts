import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'TechOFT',
}

const avaxContract: OmniPointHardhat = {
    eid: EndpointId.AVALANCHE_V2_MAINNET,
    contractName: 'OFTAdapterTech',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: avaxContract,
        },
        {
            contract: baseContract,
        },
    ],
    connections: [
        {
            from: baseContract,
            to: avaxContract,
        },
        {
            from: avaxContract,
            to: baseContract,
        },
    ],
}

export default config
