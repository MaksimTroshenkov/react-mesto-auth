import React from 'react';

export default function InfoTooltip(props) {
  const { signUpStatus, statusOpened, setStatusOpened } = props;

  function onClose() {
    setStatusOpened(false);
  }

  return (
    <div className={`popup ${statusOpened ? "popup_active" : ""}`}>
      <div className="popup__container popup__container_type_status">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <div className={`popup__status-icon ${signUpStatus ? "popup__status-icon_success" : "popup__status-icon_error"}`}></div>
        <h2 className="popup__title popup__title_type_status">{signUpStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  );
}