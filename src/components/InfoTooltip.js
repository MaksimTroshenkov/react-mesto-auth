import React from 'react';
import successIcon from "../images/success-min.svg";
import errorIcon from "../images/error-min.svg";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_active" : ""}`}>
      <div className="popup__container">
        <button 
          className="popup__close-button" 
          type="button" 
          onClick={onClose}>
        </button>
        <img 
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Регистрация успешна" : "Ошибка регистрации"}
          className="popup__signup-icon"
        />
        <h2 className="popup__signup">{isSuccess? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2> 
      </div>
    </div>
  );
}