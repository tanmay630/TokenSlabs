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

    describe("Tests", function () {
        it("Deploys all relevant contracts", async () => {
          [owner, otherAccount] = await loadFixture(init);
        });
    
        it("Checks if ERC20 is minted", async () => {
          expect(await TestERC20.balanceOf(await owner.getAddress())).to.be.equal(1000);
        });
    
        it("Checks Current Slab",async()=>{
          expect(await TokenSlabs.tokenCurrentSlab(TestERC20.address)).to.be.equal(0);
        });
        
        it("Makes deposit to verify slab change",async()=>{
          await TestERC20.approve(TokenSlabs.address, 1000);
          
          await TokenSlabs.deposit(TestERC20.address, 99);
          expect(await TokenSlabs.tokenCurrentSlab(TestERC20.address)).to.be.equal(0);
          
          await TokenSlabs.deposit(TestERC20.address, 1);
          expect(await TokenSlabs.tokenCurrentSlab(TestERC20.address)).to.be.equal(0);
          
          await TokenSlabs.deposit(TestERC20.address, 2);
          expect(await TokenSlabs.tokenCurrentSlab(TestERC20.address)).to.be.equal(1);
    
          await TokenSlabs.deposit(TestERC20.address, 97);
          expect(await TokenSlabs.tokenCurrentSlab(TestERC20.address)).to.be.equal(1);
    
          await TokenSlabs.deposit(TestERC20.address, 3);
          expect(await TokenSlabs.tokenCurrentSlab(TestERC20.address)).to.be.equal(2);
        });
      });
    