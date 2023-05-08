import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onWithConfirmation,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={avatar} alt="Аватар" />
          <div className="profile__avatar-edit-btn-container">
            <button
              onClick={onEditAvatar} className="profile__avatar-edit-btn" type="button"></button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-info">
            <h1 className="profile__name">{name}</h1>
            <button onClick={onEditProfile} className="profile__edit-button button-opacity" aria-label="Открыть" type="button"></button>
          </div>
        <p className="profile__text">{about}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button button-opacity" aria-label="Открыть"></button>
      </section>

      <section className="elements" aria-label="Карточки с интересными местами в России">
        <div className="element">
          {cards.map((card) => {
            return (
              <Card
                onCardClick={onCardClick}
                key={card._id}
                card={card}
                onCardLike={onCardLike}
                onWithConfirmation={onWithConfirmation}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}