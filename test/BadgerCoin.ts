import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import debug from 'debug'
const log = debug('console');


describe("BadgerCoin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
  


    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
    const badgerCoin = await BadgerCoin.deploy();

    return { badgerCoin,  owner, otherAccount };
  }

  describe("Deploy and test", function () {
    const TOTAL_SUPPLY = 1000000n;
    const  DECIMALS = 10n**18n;

    it("Should set the right total supply", async function () {
      const { badgerCoin, owner } = await loadFixture(deployFixture);
      expect(await badgerCoin.totalSupply()).to.equal(TOTAL_SUPPLY*DECIMALS);
    });

    it("Should set the right owner", async function () {
      const { badgerCoin, owner } = await loadFixture(deployFixture);
      expect(await badgerCoin.owner()).to.equal(owner.address);
    });
    it("Owner balance should be equal to total suppl", async function () {
      const { badgerCoin, owner } = await loadFixture(deployFixture);

      const ownerBalance = await badgerCoin.balanceOf(owner.address);
      expect(await badgerCoin.totalSupply()).to.equal(ownerBalance);

    });
    it("Transfer from owner to other account ", async function () {
      const { badgerCoin, owner,otherAccount } = await loadFixture(deployFixture);
      const transferAmount=1000;
      const totalSupply = await badgerCoin.totalSupply();

      const ownerBalanceBeforeTransfer = await badgerCoin.balanceOf(owner.address);
      const otherBalanceBeforeTransfer = await badgerCoin.balanceOf(otherAccount.address);
      
      

      await expect(
        badgerCoin.transfer(otherAccount.address, transferAmount)
      ).to.changeTokenBalances(badgerCoin, [owner, otherAccount], [-transferAmount, transferAmount]);

      const ownerBalanceAfterTransfer = await badgerCoin.balanceOf(owner.address);
      const otherBalanceAfterTransfer = await badgerCoin.balanceOf(otherAccount.address);
      expect(otherBalanceBeforeTransfer).to.equal(0);
      expect(otherBalanceAfterTransfer).to.equal(transferAmount);
      expect(ownerBalanceBeforeTransfer).to.equal(totalSupply);
      //expect(ownerBalanceAfterTransfer).to.equal(ownerBalanceBeforeTransfer-transferAmount);
    });

    it("Inc total supply", async function () { 
      const { badgerCoin, owner,otherAccount } = await loadFixture(deployFixture);
      const  IncAmount=1000;
      const totalSupplyBefore = await badgerCoin.totalSupply();
      badgerCoin.increaseTotalSupply(IncAmount)
      const totalSupplyAfter = await badgerCoin.totalSupply();
      expect(totalSupplyAfter).equal(totalSupplyBefore.add(IncAmount));
      await expect(
        badgerCoin.connect(otherAccount).increaseTotalSupply(IncAmount)
      ).to.be.reverted;
      const totalSupplyAfter2 = await badgerCoin.totalSupply();
      expect(totalSupplyAfter).equal(totalSupplyAfter2);
   
    });
  }); 
});
