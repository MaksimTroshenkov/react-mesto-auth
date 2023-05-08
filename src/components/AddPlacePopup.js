import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "./useForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();
  
  React.useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
    enteredValues.title = "";
    enteredValues.link = "";
  }, [resetForm, isOpen, currentUser]);
  
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: enteredValues.title,
      link: enteredValues.link,
    });
  }
  
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="card"
      title="Новое место"
      subtitle="Создать"
      loadingSubtitle="Создание..."
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isFormValid={!isFormValid}
    >
      <>
        <input
          className="popup__input popup__input_type_name-card"
          id="title"
          type="text"
          name="title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="40"
          value={enteredValues.title || ""}
          onChange={handleChange}
        />
        <span className="form-input-error name-input-error">
          {errors.title}
        </span>
        <input
          className="popup__input popup__input_type_link-card"
          id="link"
          type="url"
          name="link"
          placeholder="Ссылка на изображение"
          required
          value={enteredValues.link || ""}
          onChange={handleChange}
        />
        <span className="form-input-error url-input-error">
          {errors.link}
        </span>
      </>
    </PopupWithForm>
  );
}