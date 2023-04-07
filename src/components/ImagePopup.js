import React from "react"; 
 
export default function ImagePopup({ card, onClose }) { 
  return ( 
    <div className={`popup popup_image ${card ? "popup_active" : ""}`}> 
      <div className="popup__container-image"> 
        <button 
          className="popup__close-button button-opacity" 
          type="button" 
          onClick={onClose} 
        ></button> 
        <img className="popup__image" src={card ? `${card.link}` : "#"} alt={card ? `${card.name}` : ""} /> 
        <h3 className="popup__image-title">{this.props.card?.name}</h3> 
      </div> 
    </div> 
  ); 
} 