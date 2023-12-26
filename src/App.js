import React, { useState } from 'react';

const pictures = [
  { id: 1, name: 'Picture 1', price: 10.00 },
  { id: 2, name: 'Picture 2', price: 15.00 },
  { id: 3, name: 'Picture 3', price: 20.00 },
  // Add more pictures as needed
];

const Picture = ({ picture, onBuy }) => (
  <div className="picture">
    <img src={`path/to/${picture.name}.jpg`} alt={picture.name} width="150" />
    <p>{picture.name}</p>
    <p>${picture.price.toFixed(2)}</p>
    <button className="buy-button" onClick={() => onBuy(picture)}>Buy</button>
  </div>
);

const ShoppingCartItem = ({ item }) => (
  <div className="cart-item">
    <p>{item.name} - ${item.price.toFixed(2)}</p>
  </div>
);

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
      <div className="picture-container">
        {displayedPictures.map((picture) => (
          <Picture key={picture.id} picture={picture} onBuy={addToCart} />
        ))}
      </div>

      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        {cartItems.map((item, index) => (
          <ShoppingCartItem key={index} item={item} />
        ))}
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <button className="pay-button" onClick={pay}>Pay</button>
      </div>
    </div>
  );
};

export default App;
