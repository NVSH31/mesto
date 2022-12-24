import { initialCards, config } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const cardTemplateSelector = '#card-template';

const allPopups = document.querySelectorAll('.popup');

const popupProfileElement = document.querySelector('.popup_profile');
const profileFormElement = popupProfileElement.querySelector('.popup__form');
const nameInputElement = popupProfileElement.querySelector('.popup__field_name');
const jobInputElement = popupProfileElement.querySelector('.popup__field_job');

const popupCardElement = document.querySelector('.popup_card');
const cardFormElement = popupCardElement.querySelector('.popup__form');
const titleInputElement = popupCardElement.querySelector('.popup__field_title');
const urlInputElement = popupCardElement.querySelector('.popup__field_url');
const buttonCardFormSubmit = cardFormElement.querySelector('.popup__submit');

const popupImageElement = document.querySelector('.popup_image');
const imageElement = popupImageElement.querySelector('.popup__image');
const signatureElement = popupImageElement.querySelector('.popup__signature');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileJobElement = profileElement.querySelector('.profile__job');

const cardsListElement = document.querySelector('.elements__list');
const buttonCloseList = document.querySelectorAll('.popup__close-icon');

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');

    closePopup(currentPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

function openImage(cardData) {
  openPopup(popupImageElement);
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  signatureElement.textContent = cardData.name;
}

const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector, openImage);
  const cardElement = card.generateCard();

  return cardElement;
}

initialCards.forEach((cardData) => {
  cardsListElement.append(createCard(cardData));
});

function openProfileForm() {
  openPopup(popupProfileElement);
  nameInputElement.value = profileNameElement.textContent;
  jobInputElement.value = profileJobElement.textContent;
  validatorProfileForm.resetValidation();
}

const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm.enableValidation();

function openCardForm() {
  openPopup(popupCardElement);
  validatorCardForm.resetValidation();
}

const validatorCardForm = new FormValidator(config, cardFormElement);
validatorCardForm.enableValidation();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInputElement.value;
  profileJobElement.textContent = jobInputElement.value;
  closePopup(popupProfileElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: titleInputElement.value,
    link: urlInputElement.value
  };

  cardsListElement.prepend(createCard(newCardData));

  evt.target.reset();
  closePopup(popupCardElement);
}

buttonEditProfile.addEventListener('click', openProfileForm);
buttonAddCard.addEventListener('click', openCardForm);

buttonCloseList.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

allPopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (!evt.target.closest('.popup__container')) {
      closePopup(popup);
    }
  });
});
