import React from 'react'; 
 
export default function PopupWithForm({
  name,
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  onSubmit,
  onLoading,
  isFormValid,
  loadingSubtitle,
}) {

  return ( 
    <div className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`}> 
      <div className="popup__container"> 
        <h2 className="popup__title">{title}</h2> 
        <button 
          className="popup__close-button button-opacity" onClick={onClose} type="button" 
        ></button> 
        <form className="popup__form form" name={`${name}`} noValidate onSubmit={onSubmit}> 
          {children} 
          <button className={`popup__submit ${isFormValid ? "button_inactive" : ""}`} type="submit" disabled={isFormValid}>
            {onLoading ? loadingSubtitle : subtitle}
          </button>
        </form> 
      </div> 
    </div>  
  ); 
} 