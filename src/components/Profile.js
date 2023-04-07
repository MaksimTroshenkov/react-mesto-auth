import React from 'react';
import Header from "./Header";
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isEditProfilePopupOpen: false, 
      isAddPlacePopupOpen: false, 
      isEditAvatarPopupOpen: false, 
      selectedCard: null, 
      currentUser: {},
      cards: [],
    }

    this.closeAllPopups = this.closeAllPopups.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this);
    this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this);
  }

  handleEditProfileClick() { 
    this.setState({isEditProfilePopupOpen: true}); 
  } 

  handleAddPlaceClick() { 
    this.setState({isAddPlacePopupOpen: true}); 
  } 

  handleEditAvatarClick() { 
    this.setState({isEditAvatarPopupOpen: true}); 
  } 

  handleCardClick(card) { 
    this.setState({selectedCard: card}); 
  } 

  closeAllPopups() { 
    this.setState({ 
      isEditProfilePopupOpen: false, 
      isAddPlacePopupOpen: false, 
      isEditAvatarPopupOpen: false, 
      selectedCard: null, 
    }); 
  }

  handleUpdateUser(data) {
    api.editUserInfo(data)
    .then(res => {
      this.setState({ currentUser: res });
      this.closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  handleUpdateAvatar(data) {
    api.editAvatar(data.avatar)
    .then(res => {
      this.setState({ currentUser: res });
      this.closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  handleAddPlaceSubmit(data) {
    api.addCard(data)
    .then(res => {
      this.setState({ cards: [res, ...this.state.cards] });
      this.closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
    this.requestLike = res => {
      this.setState({
        cards: this.state.cards.map(item => item._id === card._id ? res : item)
      });
    }
    if (!isLiked) {
      api.likeCard(card._id)
      .then(res => {
        this.requestLike(res);
      })
      .catch(err => console.log(err))
    } else {
      api.deleteLikeCard(card._id)
      .then(res => {
        this.requestLike(res);
      })
      .catch(err => console.log(err))
    }
  }

  handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      this.setState({
        cards: this.state.cards.filter(item => item !== card)
      });
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
    .then(([user, card]) => {
      this.setState({
        currentUser: user,
        cards: card
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header userEmail={this.props.userEmail} />
        <Main
        onEditProfile={this.handleEditProfileClick.bind(this)}
        onAddPlace={this.handleAddPlaceClick.bind(this)}
        onEditAvatar={this.handleEditAvatarClick.bind(this)}
        onCardClick={this.handleCardClick.bind(this)}
        onCardLike={this.handleCardLike.bind(this)}
        onCardDelete={this.handleCardDelete.bind(this)}
        cards={this.state.cards}
        />
        <Footer />
        <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} />
        <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar} />
        <PopupWithForm title="Вы уверены?" name="delete" buttonText='Да' buttonSelector="popup__submit_type_delete" />
        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
      </CurrentUserContext.Provider>
    );
  }
}