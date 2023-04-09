import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
  const { signLink, signText, userEmail } = props;
  const { menu, setMenu } = React.useState(false);
  const navigate = useNavigate();

  function onExitProfile() {
    localStorage.removeItem("token");
    navigate("/sign-in");
  }

  function onMenuStatus() {
    setMenu(true);
  }

  function offMenuStatus() {
    setMenu(false);
  }

  return (
    <header className={`header ${menu && "header_active"}`}>
      <Link to="/" className="header__logo" title="Место - Россия"></Link>
      {localStorage.getItem("token") ?
      <>
      <div className={`header__container ${menu && "header__container_active"}`}>
        <p className="header__user-email">{userEmail}</p>
        <button onClick={onExitProfile} type="button" className="header__profile-exit">Выйти</button>
      </div>
      <button onClick={menu ? offMenuStatus : onMenuStatus} type="button" className={`header__menu-container ${menu && "header__menu-container_active"}`}>
        <div className="header__menu" style={menu ? {display: "none"} : {display: "flex"}}>
          <div className="header__menu-line"></div>
          <div className="header__menu-line"></div>
          <div className="header__menu-line"></div>
        </div>
      </button>
      </> :
      <Link to={signLink} className="header__sign">{signText}</Link> }
    </header>
  );
}