const popupElement = document.querySelector('.popup');
const editProfileElement = document.querySelector('.profile__edit-button');
const addCardElement = document.querySelector('.profile__add-button');
const closePopupElement = popupElement.querySelector('.popup__close-icon');
let formElement = popupElement.querySelector('.popup__form');
let profileElement = document.querySelector('.profile');
let profileNameElement = profileElement.querySelector('.profile__name');
let profileJobElement = profileElement.querySelector('.profile__job');
const formTitleElement = formElement.querySelector('.popup__title');
const fields = formElement.querySelectorAll('.popup__field');


const cardsListElement = document.querySelector('.elements__list');
const templateCardElement = document.querySelector('#card-template').content.querySelector('li');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  fields[0].classList.add('popup__field_about_name');
  fields[0].type = 'text';
  fields[1].classList.add('popup__field_about_job');
  fields[1].type = 'text';

  formTitleElement.textContent = 'Редактировать профиль';
  formElement.querySelector('.popup__submit').textContent = 'Сохранить';
  fields[0].value = profileNameElement.textContent;
  fields[1].value = profileJobElement.textContent;
}

function addCard() {
  popupElement.classList.add('popup_opened');
  formElement.name = 'add-card__form';
  fields[0].classList.add('popup__field_about_name');
  fields[0].type = 'text';
  fields[0].value = '';
  fields[0].placeholder = 'Название';
  fields[1].classList.add('popup__field_about_job');
  fields[1].type = 'url';
  fields[1].value = '';
  fields[1].placeholder = 'Ссылка на картинку';
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
    profileNameElement.textContent = fields[0].value;
    profileJobElement.textContent = fields[1].value;
  } else if (currentFormName === 'add-card__form') {
    const newCardData = {
      name: fields[0].value,
      link: fields[1].value
    };
    const newCard = createCard(newCardData);
    console.log(newCard);
    cardsListElement.append(newCard);
  }
  closePopup();
}



editProfileElement.addEventListener('click', editProfile);
addCardElement.addEventListener('click', addCard);

closePopupElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
