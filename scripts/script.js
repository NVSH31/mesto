const allPopups = document.querySelectorAll('.popup');

const popupProfileElement = document.querySelector('.popup_profile');
const profileFormElement = popupProfileElement.querySelector('.popup__form');
const nameInputElement = popupProfileElement.querySelector('.popup__field_name');
const jobInputElement = popupProfileElement.querySelector('.popup__field_job');

const popupCardElement = document.querySelector('.popup_card');
const cardFormElement = popupCardElement.querySelector('.popup__form');
const titleInputElement = popupCardElement.querySelector('.popup__field_title');
const urlInputElement = popupCardElement.querySelector('.popup__field_url');

const popupImageElement = document.querySelector('.popup_image');
const imageElement = popupImageElement.querySelector('.popup__image');
const signatureElement = popupImageElement.querySelector('.popup__signature');

const editProfileElement = document.querySelector('.profile__edit-button');
const addCardElement = document.querySelector('.profile__add-button');
const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileJobElement = profileElement.querySelector('.profile__job');

const cardsListElement = document.querySelector('.elements__list');
const templateCardElement = document.querySelector('#card-template').content.querySelector('li');
const closeButtons = document.querySelectorAll('.popup__close-icon');

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

function closePopupByEscape(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => closePopupByEscape(evt, popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt) => closePopupByEscape(evt, popup));
}

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
  cardImage.addEventListener('click', () => openImage(item));

  return card;
}

function openImage(item) {
  openPopup(popupImageElement);
  imageElement.src = item.link;
  imageElement.alt = item.name;
  signatureElement.textContent = item.name;
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

function openProfileForm() {
  openPopup(popupProfileElement);
  nameInputElement.value = profileNameElement.textContent;
  jobInputElement.value = profileJobElement.textContent;
}

function openCardForm() {
  openPopup(popupCardElement);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  if (nameInputElement.value && jobInputElement.value) {
    profileNameElement.textContent = nameInputElement.value;
    profileJobElement.textContent = jobInputElement.value;
  }
  closePopup(popupProfileElement);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const newCardData = {
    name: titleInputElement.value,
    link: urlInputElement.value
  };
  if (titleInputElement.value && urlInputElement.value) {
    const newCard = createCard(newCardData);
    cardsListElement.prepend(newCard);
    evt.target.reset();
  }
  closePopup(popupCardElement);
}

editProfileElement.addEventListener('click', openProfileForm);
addCardElement.addEventListener('click', openCardForm);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

profileFormElement.addEventListener('submit', submitProfileForm);
cardFormElement.addEventListener('submit', submitCardForm);

allPopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (!evt.target.closest('.popup__container')) {
      closePopup(popup);
    }
  });
});
