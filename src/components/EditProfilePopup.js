import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "./useForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  React.useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about,
    });
  }

  return (
    <PopupWithForm
      name="username"
      title="Редактировать профиль"
      subtitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isFormValid={!isFormValid}
      loadingSubtitle="Сохранение..."
    >
      <>
        <input
          onChange={handleChange}
          className="popup__input popup__input_type_name"
          id="name"
          type="text"
          name="name"
          placeholder="Имя"
          value={enteredValues.name || ""}
          required
          minLength="2"
          maxLength="40"
        />
          <span className="form-input-error names-input-error">
            {errors.name}
          </span>
        <input
          onChange={handleChange}
          className="popup__input popup__input_type_text"
          id="about"
          type="text"
          name="about"
          placeholder="О себе"
          value={enteredValues.about || ""}
          required
          minLength="2"
          maxLength="200"
        />
          <span className="form-input-error about-input-error">
            {errors.about}
          </span>
      </>
    </PopupWithForm>
  );
}