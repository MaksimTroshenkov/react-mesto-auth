import React from "react"; 
import { CurrentUserContext } from "../contexts/CurrentUserContext";
 
export default function Card({ onCardClick, card, onCardLike, onWithConfirmation }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onWithConfirmation(card._id);
  }

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <li className="element__list">
      <div className="element__trash-container"> 
      <img
        onClick={handleClick}
        className="element__image"
        src={card.link}
        alt={card.name}
      />
      {isOwn && (
        <button
          className="element__trash card-item__action_type_delete button-opacity"
          onClick={handleDeleteClick}
          type="button"
          aria-label="Удалить"
        />
      )}
      </div>
      <div className="element__container">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__container-for-like">
          <button
            onClick={handleLikeClick}
            className={`element__button ${isLiked && "element__button_active"}`}
            type="button"
          ></button>
          <span className="element__button-likes">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}