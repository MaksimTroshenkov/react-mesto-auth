import React from "react"; 
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Login } from "./Login";
import { Register } from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
import api from "../utils/api";
import * as auth from "../utils/auth";

export default function App() { 
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  const [authorizationEmail, setAuthorizationEmail] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [removedCardId, setRemovedCardId] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }, []);

  function handleEditProfileClick() { 
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen); 
  } 

  function handleAddPlaceClick() { 
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen); 
  }

  function handleEditAvatarClick() { 
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen); 
  } 

  function handleCardClick(card) { 
    setSelectedCard(card); 
  }

  function openInfoTooltip() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }
  function handleCardDeleteClick(cardId) {
    setIsPopupWithConfirmationOpen(!isPopupWithConfirmationOpen);
    setRemovedCardId(cardId);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api.deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(newData) {
    setIsLoading(true);
    api
      .setUserInfo(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newData) {
    setIsLoading(true);
    api.setUserAvatar(newData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newData) {
    setIsLoading(true);
    api.addNewCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupWithConfirmationOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  function handleRegisration(data) {
    return auth.register(data)
      .then((data) => {
        setIsRegistrationSuccessful(true);
        openInfoTooltip();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRegistrationSuccessful(false);
        openInfoTooltip();
      })
  }

  function handleAuthorization(data) {
    return auth.authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        handleTokenCheck();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        openInfoTooltip();
      })
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    auth.checkToken(jwt)
      .then((data) => {
        setAuthorizationEmail(data.data.email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <>
          <Header
            loggedIn={isLoggedIn}
            userEmail={authorizationEmail}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route path="/sign-up" element={<Register onRegister={handleRegisration} />} />
            <Route path="/sign-in" element={<Login onLogin={handleAuthorization} />} />
            <Route path="/" element={<ProtectedRoute element={Main} 
              loggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onWithConfirmation={handleCardDeleteClick}
              cards={cards} />}
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />
          <PopupWithConfirmation
            onLoading={isLoading}
            isOpen={isPopupWithConfirmationOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId}
          />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isSuccess={isRegistrationSuccessful}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </>
      </div>
    </CurrentUserContext.Provider>
        );
}