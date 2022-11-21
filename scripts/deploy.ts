import { ethers } from "hardhat";

async function main() {
  const SLABVALUES = [100, 200, 300, 400, 500];
  const contractFactory = await ethers.getContractFactory("TokenSlabs");
  const TokenSlabs = await contractFactory.deploy(SLABVALUES);
  await TokenSlabs.deployed();


  console.log("tokenSlabs address", TokenSlabs.address);
  console.log("contract deployed")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});