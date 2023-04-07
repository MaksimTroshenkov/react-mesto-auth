import React from 'react'; 
 
export default function PopupWithForm(props) { 
  return ( 
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_active" : ""}`}> 
      <div className="popup__container"> 
        <h2 className="popup__title">{props.title}</h2> 
        <button 
          className="popup__close-button button-opacity" onClick={props.onClose} 
          type="button" 
        ></button> 
        <form className="popup__form" name={`${props.name}`} noValidate onSubmit={props.onSubmit}> 
          {props.children} 
          <button className={`popup__submit ${props.buttonSelector ? props.buttonSelector : ""}`} type="submit">
            {props.buttonText}
          </button>
        </form> 
      </div> 
    </div>  
  ); 
} 