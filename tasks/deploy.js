"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const main = async (args, hre) => {
    const GigaCommunis = await hre.ethers.getContractFactory('GigaCommunis');
    const gigaCommunis = await GigaCommunis.deploy();
    const result = await gigaCommunis.waitForDeployment();
    const tx = result.deploymentTransaction();
    if (!tx) {
        throw new Error('contract did not deploy');
    }
    console.log('GigaCommunis() -> %o @ %o', await gigaCommunis.getAddress(), tx.hash);
    await tx.wait();
    console.log('mined');
};
exports.main = main;
