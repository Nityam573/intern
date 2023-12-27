import React from "react";
import {ShoppingCartItem} from "./ShoppingCartItem";
import "./cart.css";

export const ShoppingCart = ({ cartItems, totalPrice, totalEth, onPay }) => (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <ShoppingCartItem key={index} item={item} />
      ))}
      <p>Total: ${totalPrice.toFixed(2)}</p>
      <p>Total: ${totalEth.toFixed(2)}</p>
      <button className="pay-button" onClick={onPay}>Pay</button>
    </div>
  )
  
  