import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="edit-avatar" children={ 
      <> 
        <input 
          className="popup__input popup__input_type_avatar-link" 
          id="url-avatar-input" 
          type="url" 
          name="avatar" 
          placeholder="Ссылка на аватар" 
          required
          ref={avatarRef}
        /> 
        <span className="form-input-error url-avatar-input-error"></span> 
      </> 
      } isOpen={props.isOpen} 
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit} />
  ); 
}