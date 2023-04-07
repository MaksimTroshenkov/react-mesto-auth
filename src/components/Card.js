import React from "react"; 
import { CurrentUserContext } from "../contexts/CurrentUserContext";
 
export default function Card(props) { 
  const currentUser = React.useContext(CurrentUserContext);
  const ownCard = currentUser._id === props.card.owner._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return ( 
    <li className="element__list"> 
      <div className="element__trash-container"> 
        <img className="element__image" onClick={handleClick} src={props.card.link} alt={props.card.name} /> 
        {ownCard && <button type="button" className="element__trash card-item__action_type_delete button-opacity" onClick={handleDeleteClick}></button>}
      </div>
      <div className="element__container"> 
        <h2 className="element__text">{props.card.name}</h2> 
        <div className="element__container-for-like"> 
          <button className={`element__button ${isLiked && "element__button_active"}`} type="button" onClick={handleLikeClick}></button> 
          <span className="element__button-likes">{props.card.likes.length}</span> 
        </div> 
      </div> 
    </li>
  ); 
}