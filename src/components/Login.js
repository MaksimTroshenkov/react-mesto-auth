import React from "react";
import Header from "./Header";
import SignMain from "./SignMain";
import signApi from "../utils/signApi";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();

  function setData(data) {
    signApi.signIn({
      pass: data.pass.current.value,
      email: data.current.value
    })
    .then(res => {
      localStorage.setItem("token", res.token);
      props.setHandleLogin();
      navigate("/");
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <>
    <Header signLink="/sign-up" signText="Регистрация" />
    <SignMain title="Вход" submitText="Войти" setData={setData} />
    </>
  );
}