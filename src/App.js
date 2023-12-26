import React, { useState } from 'react';
import { ShoppingCart } from './components/shoppingcart';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PictureContainer } from './components/PictureContainer';
import { Navbar } from './components/Navbar';

const pictures = [
  { id: 1, name: 'Picture 1', price: 10.00 },
  { id: 2, name: 'Picture 2', price: 15.00 },
  { id: 3, name: 'Picture 3', price: 20.00 },
  { id: 4, name: 'Picture 4', price: 30.00 },
  { id: 5, name: 'Picture 5', price: 25.00 },
  // Add more pictures as needed
];

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [displayedPictures, setDisplayedPictures] = useState(pictures);

  const addToCart = (picture) => {
    setCartItems([...cartItems, picture]);
    setTotalPrice(totalPrice + picture.price);
  };

  const pay = () => {
    // Remove items in the cart from the displayed pictures
    const remainingPictures = displayedPictures.filter(picture => !cartItems.includes(picture));
    setDisplayedPictures(remainingPictures);

    // Clear the shopping cart
    setCartItems([]);
    setTotalPrice(0);

    alert('Payment successful! Pictures removed from the website.');
  };

  return (
    <div>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PictureContainer displayedPictures={displayedPictures} onBuy={addToCart} />} />
            <Route path="/cart" element={<ShoppingCart cartItems={cartItems} totalPrice={totalPrice} onPay={pay} />} />
          </Routes>
        </Router>
      
      
    </div>
  );
};

export default App;
