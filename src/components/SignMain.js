import React from "react";
import { Link } from "react-router-dom";

export default function SignMain(props) {
  const { title, submitText, signUp, setData } = props;
  const inputPass = React.useRef;
  const inputEmail = React.useRef;

  function onSubmitForm(evt) {
    evt.preventDefault();
    setData({inputPass, inputEmail});
  }

  return (
    <main className="sign-content">
      <h1 className="sign-content__title">{title}</h1>
      <form method="post" className="sign-content__form" onSubmit={onSubmitForm}>
        <input className="sign-content__input" ref={inputEmail} type="email" placeholder="Email" required name="email" />
        <input className="sign-content__input" ref={inputPass} type="password" placeholder="Пароль" required name="password" />
        <button type="submit" className="sign-content__submit">{submitText}</button>
      </form>
      {signUp ? <p className="sign-content__sign-in">Уже зарегистрированы? <Link to='/sign-in' className="sign-content__link-sign-in">Войти</Link></p> : ''}
    </main>
  );
}