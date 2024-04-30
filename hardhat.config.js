require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const {ALCHEMI_KEY, PRIVATE_KEY} = process.env;
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMI_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};