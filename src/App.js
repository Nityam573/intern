import React, { useState, useEffect } from "react";
import { ShoppingCart } from "./components/shoppingcart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PictureContainer } from "./components/PictureContainer";
import { Navbar } from "./components/Navbar";
import Web3 from 'web3';

const pictures = [
  { id: 1, name: "Picture 1", price: 10.0, eth: 0.01 },
  { id: 2, name: "Picture 2", price: 15.0, eth: 0.01 },
  { id: 3, name: "Picture 3", price: 20.0, eth: 0.01 },
  { id: 4, name: "Picture 4", price: 30.0, eth: 0.01 },
  { id: 5, name: "Picture 5", price: 25.0, eth: 0.01 },
  // Add more pictures as needed
];

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalEth, setTotalEth] = useState(0);
  const [displayedPictures, setDisplayedPictures] = useState(pictures);

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null); 

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractAddress = "0x558A481f0794E7B9b367e5943b0f86e02e526cba";
          const contractABI = [
            {
              "inputs": [
                {
                  "internalType": "address payable",
                  "name": "_ethWallet",
                  "type": "address"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "buyer",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "PaymentReceived",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "ethWallet",
              "outputs": [
                {
                  "internalType": "address payable",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "pay",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "withdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ];

          const contractInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing web3", error);
        }
      } else {
        console.error("Web3 not found. Please install MetaMask.");
      }
    };

    initializeWeb3();
  }, []);

  const addToCart = (picture) => {
    setCartItems([...cartItems, picture]);
    setTotalPrice(totalPrice + picture.price);
    setTotalEth(totalEth + picture.eth);
  };

  const pay = async () => {
    // Remove items in the cart from the displayed pictures
    // const remainingPictures = displayedPictures.filter(
    //   (picture) => !cartItems.includes(picture)
    // );
    // setDisplayedPictures(remainingPictures);

    // // Clear the shopping cart
    // setCartItems([]);
    // setTotalPrice(0);
    try {
      // Convert amount to wei
      const amountInWei = web3.utils.toWei(totalEth.toString(), 'ether');

      // Send transaction to the contract
      const result = await contract.methods.pay().send({
        from: account,
        value: amountInWei,
      });

      console.log('Transaction successful:', result);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PictureContainer
                displayedPictures={displayedPictures}
                onBuy={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ShoppingCart
                cartItems={cartItems}
                totalPrice={totalPrice}
                totalEth={totalEth}
                onPay={pay}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
