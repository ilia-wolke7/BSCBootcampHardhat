import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
const TOTAL_SUPPLY = 1000000;
const ONE_GWEI = 1_000_000_000;

describe("BadgerCoin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
   
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
    const badgerCoin = await BadgerCoin.deploy();

    return { badgerCoin, owner, otherAccount };
  }

  describe("Deployment", async function () {
    const { badgerCoin, owner } = await loadFixture(deployFixture);

    it("Should set the right owner", async function () {
      expect(await badgerCoin.address).to.equal(owner.address); //what about owner()??
    });
    it("Should have right total supply the right owner", async function () {
      expect(await badgerCoin.totalSupply).to.equal(TOTAL_SUPPLY);
    });

  });
    

  describe("Withdrawals", function () {
    });
/*
    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });
*/
    describe("Transfers", function () {
  });
});
function deployOneYearLockFixture(): Promise<unknown> {
  throw new Error("Function not implemented.");
}

