import React from "react";
export const ShoppingCartItem = ({ item }) => (
    <div className="cart-item">
      <p>{item.name} - ${item.price.toFixed(2)}</p>
    </div>
  );
