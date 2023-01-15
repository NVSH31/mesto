export class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.elements__item')
    .cloneNode(true);

    return cardElement;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._buttonTrash = this._cardElement.querySelector('.element__trash');
    this._image = this._cardElement.querySelector('img');

    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });

    this._buttonTrash.addEventListener('click', () => {
      this._deleteCard();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('img').src = this._link;
    this._cardElement.querySelector('.element__text').textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
}
