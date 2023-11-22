import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox"
import '@nomicfoundation/hardhat-ethers'
import '@typechain/hardhat'
import { HARDHAT_NETWORK_MNEMONIC } from 'hardhat/internal/core/config/default-config'

import { main as deploy } from './tasks/deploy'
import { SolcUserConfig } from "hardhat/types";

const { MNEMONIC, ETHERSCAN_API_KEY } = process.env

task('deploy', 'deploy GigaCommunis contract')
  .setAction(deploy)

const settings: SolcUserConfig["settings"] = {
  optimizer: {
    enabled: true,
    runs: 200_000,
  },
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: "0.8.20",
      settings: settings,
    }],
  },
  networks: {
    hardhat: {
      forking: {
        url: 'https://rpc.ankr.com/eth',
        blockNumber: 18625002,
      },
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    // only planning on deploying to 1 network for now
    external: {
      url: 'https://rpc.ankr.com/eth',
      accounts: {
        mnemonic: MNEMONIC || HARDHAT_NETWORK_MNEMONIC,
      },
    },
  },
  typechain: {
    outDir: './artifacts/types',
    target: 'ethers-v6',
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      external: ETHERSCAN_API_KEY as string,
    },
    customChains: [{
      network: 'external',
      chainId: 1,
      urls: {
        apiURL: 'https://api.etherscan.io/api',
        browserURL: 'https://etherscan.io/',
      },
    }],
  },
};

export default config;
