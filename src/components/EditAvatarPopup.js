import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "./useForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = React.useRef();
  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      subtitle="Сохранить"
      loadingSubtitle="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onLoading={onLoading}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar-link"
        id="avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span className="form-input-error url-avatar-input-error">{errors.link}</span>
    </PopupWithForm>
  );
}