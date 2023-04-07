import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const cardNameRef = React.useRef();
  const cardLinkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value
    })
  }

  return (
    <PopupWithForm title="Новое место" name="add" children={ 
      <> 
        <input 
          required 
          placeholder="Название" 
          name="name" 
          minLength="2" 
          maxLength="30" 
          className="popup__input popup__input_type_name-card" 
          id="name-input" 
          type="text"
          ref={cardNameRef}
        /> 
        <span className="form-input-error name-input-error"></span> 
        <input 
          required 
          type="url" 
          placeholder="Ссылка на картинку" 
          name="link" 
          className="popup__input popup__input_type_link-card" 
          id="url-input"
          ref={cardLinkRef}
        /> 
        <span className="form-input-error url-input-error"></span> 
      </> 
      } isOpen={props.isOpen} 
      onClose={props.onClose}
      buttonText="Cоздать"
      onSubmit={handleSubmit} /> 
  )
}