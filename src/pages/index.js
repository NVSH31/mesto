const logo = new URL('../images/logoheader.svg', import.meta.url);
const avatar = new URL('../images/profile_avatar.png', import.meta.url);

const localImages = [
  { name: 'Логотип Mesto Russia', image: logo },
  { name: 'Фото человека', image: avatar}
];

import '../pages/index.css';

import {
  initialCards,
  config,
  cardTemplateSelector,
  cardListSelector,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  profileNameSelector,
  profileJobSelector,
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const popupProfileElement = document.querySelector('.popup_profile');
const profileFormElement = popupProfileElement.querySelector('.popup__form');
const nameInputElement = popupProfileElement.querySelector('.popup__field_name');
const jobInputElement = popupProfileElement.querySelector('.popup__field_job');

const popupCardElement = document.querySelector('.popup_card');
const cardFormElement = popupCardElement.querySelector('.popup__form');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, {
    handleCardClick: () => {
      popupImageElement.open(cardData);
    }
  });
  return card;
}

function generateCard(cardData) {
  const cardElement = createCard(cardData).generateCard();
  cardsList.addItem(cardElement);
}

const popupImageElement = new PopupWithImage(popupImageSelector);
popupImageElement.setEventListeners();

const cardsList = new Section(
  {
    renderer: cardData => {
      generateCard(cardData);
    }
  }, cardListSelector
);
cardsList.renderItems(initialCards);

const popupCardFormElement = new PopupWithForm(
  popupCardSelector, {
    handleFormSubmit: (formData) => {
      const cardData = { name: formData['title-input'], link: formData['url-input'] };
      generateCard(cardData);
      popupCardFormElement.close();
      validatorCardForm.resetValidation();
    }
  }
);
popupCardFormElement.setEventListeners();

const myInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector
});

const popupProfileFormElement = new PopupWithForm(
  popupProfileSelector, {
    handleFormSubmit: (formData) => {
      const profileData = { name: formData['name-input'], job: formData['job-input'] };
      myInfo.setUserInfo(profileData);
      popupProfileFormElement.close();
    }
  }
);
popupProfileFormElement.setEventListeners();

const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm.enableValidation();

const validatorCardForm = new FormValidator(config, cardFormElement);
validatorCardForm.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  popupProfileFormElement.open();
  const { name, job } = myInfo.getUserInfo();
  nameInputElement.value = name;
  jobInputElement.value = job;
});
buttonAddCard.addEventListener('click', () => { popupCardFormElement.open(); });
