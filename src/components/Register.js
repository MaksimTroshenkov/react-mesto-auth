import React from "react";
import Header from "./Header";
import SignMain from './SignMain';
import InfoTooltip from "./InfoTooltip";
import signApi from "../utils/signApi";

export default function Register() {
  const [signUpStatus, setSignUpStatus] = React.useState(null);
  const [statusOpened, setStatusOpened] = React.useState(false);

  function setData(data) {
    signApi.signUp({
      pass: data.inputPass.current.value,
      email: data.inputEmail.current.value
    })
    .then(() => {
      setSignUpStatus(true);
    })
    .catch(() => {
      setSignUpStatus(false);
    })
    .finally(() => {
      setStatusOpened(true);
    })
  }

  return (
    <>
      <Header signLink="/sign-in" signText="Войти" />
      <SignMain title="Регистрация" submitText="Зарегистрироваться" signUp={true} setData={setData} />
      <InfoTooltip signUpStatus={signUpStatus} statusOpened={statusOpened} setStatusOpened={setStatusOpened} />
    </>
  );
}