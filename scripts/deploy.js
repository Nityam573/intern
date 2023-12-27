const { ethers, JsonRpcProvider } = require('ethers');
const fs = require('fs');

async function deployContract() {
  // Connect to the Ethereum network (for example, using Infura)
  const provider = new JsonRpcProvider('https://sepolia.infura.io/v3/cd2d78b4c2b045a89ba19f10a826a796');

  // Replace with your Ethereum wallet private key
  const privateKey = '2bbb7142078408c900e004f259c0e97c865b22e7aa4013bb8888934e134c187d';
  const wallet = new ethers.Wallet(privateKey, provider);

  // Read the compiled contract artifact
  const contractArtifact = require('../artifacts/contracts/pay.sol/PaymentContract.json');

  // Create a contract factory
  const contractFactory = new ethers.ContractFactory(
    contractArtifact.abi,
    contractArtifact.bytecode,
    wallet
  );

  // Deploy the contract
  const contract = await contractFactory.deploy('0xAfea78500e17401588f6ecD5aE89e2380d126573'); // Pass your Ethereum wallet address as an argument

  // Wait for the contract to be mined
  await contract.waitForDeployment();

  console.log('Contract deployed to:', contract.target);
}

deployContract();
