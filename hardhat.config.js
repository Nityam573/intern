require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/BTe6dWbbuBBCvLBLx6o4JePNBkh3Ndkq",
      accounts: ["2bbb7142078408c900e004f259c0e97c865b22e7aa4013bb8888934e134c187d"],
    },
  },
};
