
import React from "react";
import { Picture } from "./Picture";
import "./picture.css";

export const PictureContainer = ({ displayedPictures, onBuy }) => (
  <>
    <div className="shopTitle">
      <h1>AMAZON</h1>
    </div>
    <div className="picture-container">
      {displayedPictures.map((picture) => (
        <Picture key={picture.id} picture={picture} onBuy={onBuy} />
      ))}
    </div>
  </>

);