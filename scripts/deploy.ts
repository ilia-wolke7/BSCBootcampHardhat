import * as hh from "hardhat";
import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  //const lockedAmount = hh.ethers.utils.parseEther("1");
  const [deployer] =await ethers.getSigners();
  console.log(`Deploying contract with deployer address: ${deployer.address}`);

  const balance=await deployer.getBalance();
  console.log(`Deployer balance${balance}`);

  const BC = await hh.ethers.getContractFactory("BadgerCoin");
  const bc = await BC.deploy();
  console.log(`BC total supply ${(await bc.totalSupply()).toBigInt()} deployed to ${(await bc.owner()).toString()} balance ${(await bc.balanceOf(bc.owner())).toBigInt()}`);
  //const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  //await lock.deployed();

  //console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
