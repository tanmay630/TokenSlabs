import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();


const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.STAGING_QUIKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

export default config;
