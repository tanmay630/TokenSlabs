import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://soft-wispy-water.ethereum-goerli.discover.quiknode.pro/978ad9caccfc810fae587d02c27af840fb66a938/",
      accounts: ["65179b0ee32530f0e97eb9147ce7d0d26e9932f8afc3cefc692785c9e067d2fc"]
    },
  },
};

export default config;
