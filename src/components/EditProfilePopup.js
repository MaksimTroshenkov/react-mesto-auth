import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [userName, setUserName] = React.useState('');
  const [userAbout, setUserAbout] = React.useState('');

  React.useEffect(() => {
    setUserName(currentUser.name ?? '');
    setUserAbout(currentUser.about ?? '');
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt) {
    setUserName(evt.target.value);
  }

  function handleChangeDesc(evt) {
    setUserAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: userName,
      about: userAbout
    });
  }

  return ( 
    <PopupWithForm title="Редактировать профиль" name="edit" children={ 
      <> 
        <input 
          required 
          placeholder="Имя" 
          name="name" 
          minLength="2" 
          maxLength="40" 
          className="popup__input popup__input_type_name" 
          id="names-input" 
          type="text"
          value={userName}
          onChange={handleChangeName}
        /> 
        <span className="form-input-error names-input-error"></span> 
        <input 
          required 
          placeholder="О себе" 
          name="about" 
          minLength="2" 
          maxLength="200" 
          className="popup__input popup__input_type_text" 
          id="about-input" 
          type="text"
          value={userAbout}
          onChange={handleChangeDesc}
        /> 
        <span className="form-input-error about-input-error"></span> 
      </> 
      } isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Cохранить"
      onSubmit={handleSubmit} /> 
  ); 
}