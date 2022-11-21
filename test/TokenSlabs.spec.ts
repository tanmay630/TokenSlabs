import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";


describe("TokenSlabs", function () {
    let TestERC20: Contract;
    let contractFactory: ContractFactory;
    let TokenSlabs: Contract;
    let owner: Signer, otherAccount: Signer;
    const SLABVALUES = [100, 200, 300, 400, 500];
    
    async function init() {
      const [owner, otherAccount] = await ethers.getSigners();
      contractFactory = await ethers.getContractFactory("TokenSlabs");
      TokenSlabs = await contractFactory.deploy(SLABVALUES);
      contractFactory = await ethers.getContractFactory("TestERC20");
      TestERC20 = await contractFactory.deploy();
      await TestERC20.mint(await owner.getAddress(), 1000);
      return [owner,otherAccount];
    }