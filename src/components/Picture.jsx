import React from "react";

export const Picture = ({ picture, onBuy }) => (
    <div className="picture">
      <img src={`../assets/${picture.id}.jpg`} alt={picture.name} width="150" />
      <p>{picture.name}</p>
      <p>${picture.price.toFixed(2)}</p>
      <button className="buy-button" onClick={() => onBuy(picture)}>Buy</button>
    </div>
  );