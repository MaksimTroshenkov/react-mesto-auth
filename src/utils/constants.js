const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const openProfileBtn = document.querySelector(".profile__edit-button");
const openCardBtn = document.querySelector(".profile__add-button");
const popupBtnAvatar = document.querySelector('.profile__avatar-edit-btn');

const nameInput = document.querySelector(".popup__input_type_name");
const textInput = document.querySelector(".popup__input_type_text");
const dataUser = {};


export {dataUser, openProfileBtn, popupBtnAvatar, openCardBtn, textInput, nameInput, setting};