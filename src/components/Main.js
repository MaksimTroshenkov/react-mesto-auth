import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Ваш аватар" />
          <div className="profile__avatar-edit-btn-container">
            <button className="profile__avatar-edit-btn" type="button"></button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-info">
            <h1 className="profile__name">{currentUser.userName}</h1>
            <button className="profile__edit-button button-opacity" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button className="profile__add-button button-opacity" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <div className="element">
          {props.cards.map(item => (
            <Card onCardClick={props.onCardClick} key={item._id} card={item} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          ))};
        </div>
      </section>
    </main>
  )
}