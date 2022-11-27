import initialCards from "./data.js";

const popupElement = document.querySelector('.popup');
const editProfileElement = document.querySelector('.profile__edit-button');
const addCardElement = document.querySelector('.profile__add-button');
const closePopupElement = popupElement.querySelector('.popup__close-icon');
let formElement = popupElement.querySelector('.popup__form');
let profileElement = document.querySelector('.profile');
let profileNameElement = profileElement.querySelector('.profile__name');
let profileJobElement = profileElement.querySelector('.profile__job');
const formTitleElement = formElement.querySelector('.popup__title');
const inputFields = formElement.querySelectorAll('.popup__field');

const cardsListElement = document.querySelector('.elements__list');
const templateCardElement = document.querySelector('#card-template').content.querySelector('li');


function createCard(item) {
  const card = templateCardElement.cloneNode(true);
  const cardText = card.querySelector('.element__text');
  const cardImage = card.querySelector('img');
  const cardLikeButton = card.querySelector('.element__like');
  const cardDeleteButton = card.querySelector('.element__trash');

  cardText.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardLikeButton.addEventListener('click', toggleLikeButton);
  cardDeleteButton.addEventListener('click', deleteCard);

  return card;
}

function toggleLikeButton (evt) {
  evt.target.classList.toggle('element__like_active');
}

const deleteCard = (evt) => {
  evt.target.closest('li').remove();
}

const renderCard = (item, wrapElement) => {
  const card = createCard(item);
  wrapElement.append(card);
}

initialCards.forEach(function(item) {
  renderCard(item, cardsListElement);
} );

function editProfile() {
  popupElement.classList.add('popup_opened');
  formElement.name = 'edit-profile__form';
  inputFields[0].classList.add('popup__field_about_name');
  inputFields[0].type = 'text';
  inputFields[1].classList.add('popup__field_about_job');
  inputFields[1].type = 'text';

  formTitleElement.textContent = 'Редактировать профиль';
  formElement.querySelector('.popup__submit').textContent = 'Сохранить';
  inputFields[0].value = profileNameElement.textContent;
  inputFields[1].value = profileJobElement.textContent;
}

function addCard() {
  popupElement.classList.add('popup_opened');
  formElement.name = 'add-card__form';
  inputFields[0].classList.add('popup__field_about_name');
  inputFields[0].type = 'text';
  inputFields[0].value = '';
  inputFields[0].placeholder = 'Название';
  inputFields[1].classList.add('popup__field_about_job');
  inputFields[1].type = 'url';
  inputFields[1].value = '';
  inputFields[1].placeholder = 'Ссылка на картинку';
  formTitleElement.textContent = 'Новое место';
  formElement.querySelector('.popup__submit').textContent = 'Создать';
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  const currentFormName = evt.target.closest('form').name;
  if (currentFormName === 'edit-profile__form') {
    profileNameElement.textContent = inputFields[0].value;
    profileJobElement.textContent = inputFields[1].value;
  } else if (currentFormName === 'add-card__form') {
    const newCardData = {
      name: inputFields[0].value,
      link: inputFields[1].value
    };
    if (newCardData['name'] && newCardData['link']) {
      const newCard = createCard(newCardData);
      cardsListElement.prepend(newCard);
    }
  }
  closePopup();
}


editProfileElement.addEventListener('click', editProfile);
addCardElement.addEventListener('click', addCard);

closePopupElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
