"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@typechain/hardhat");
const default_config_1 = require("hardhat/internal/core/config/default-config");
const deploy_1 = require("./tasks/deploy");
const { MNEMONIC } = process.env;
(0, config_1.task)('deploy', 'deploy GigaCommunis contract')
    .setAction(deploy_1.main);
const settings = {
    optimizer: {
        enabled: true,
        runs: 200000,
    },
};
const config = {
    solidity: {
        compilers: [{
                version: "0.8.20",
                settings: settings,
            }],
    },
    networks: {
        hardhat: {
            forking: {
                url: 'https://eth.merkle.io',
                blockNumber: 18286243,
            },
            accounts: {
                mnemonic: default_config_1.HARDHAT_NETWORK_MNEMONIC,
            },
        },
        // only planning on deploying to 1 network for now
        external: {
            url: 'https://eth.merkle.io',
            accounts: {
                mnemonic: MNEMONIC || default_config_1.HARDHAT_NETWORK_MNEMONIC,
            },
        },
    },
    typechain: {
        outDir: './artifacts/types',
        target: 'ethers-v6',
    },
};
exports.default = config;
