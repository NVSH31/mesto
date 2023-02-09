import { likeCounterSelector } from '../utils/constants.js';

export class Card {
  constructor(data, myId, templateSelector, {
    handleCardClick, handleTrashClick, handleLikeClick }) {
    this._name = data.name;
    this._link = data.link;
    this.likes = data.likes;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._iLiked = false;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._handleLikeClick(this._id,  this._myId, this.likes, this._cardElement);
  }

  setStatusMyLike(likes) {
    if (likes.find(user => user._id === this._myId)) {
      this._buttonLike.classList.add('element__like_active');
      this._iLiked = true;
    } else {
      this._buttonLike.classList.remove('element__like_active');
      this._iLiked = false;
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });

    if(this._ownerId == this._myId) {
      this._buttonTrash.addEventListener('click', () => {
        this._handleTrashClick(this._id, this._cardElement);
      });
    }

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  setCountLikes(count) {
    this._counterLikes.textContent = count;
  }
  generateCard() {
    this._cardElement = this._getTemplate();
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._counterLikes = this._cardElement.querySelector(likeCounterSelector);
    this._buttonTrash = this._cardElement.querySelector('.element__trash');
    this._image = this._cardElement.querySelector('img');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._cardElement.querySelector('.element__text').textContent = this._name;
    if (this._ownerId != this._myId) {
      this._buttonTrash.remove();
    }
    this.setCountLikes(this.likes.length);
    this._setEventListeners();
    this.setStatusMyLike(this.likes);

    return this._cardElement;
  }
}
