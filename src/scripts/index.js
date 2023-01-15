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
  profileFormElement,
  nameInputElement,
  jobInputElement,
  cardFormElement,
  buttonEditProfile,
  buttonAddCard,
  cardListSelector,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector
} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

function generateCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, {
    handleCardClick: () => {
      popupImageElement.open(cardData);
    }
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

const popupImageElement = new PopupWithImage(popupImageSelector);

const cardsList = new Section(
  {
    items: initialCards,
    renderer: cardData => {
      generateCard(cardData);
    }
  }, cardListSelector
);
cardsList.renderItems();

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

const myInfo = new UserInfo();
myInfo.setUserInfo({
  name: 'Жак-Ив Кусто Очень Длинное Имя',
  job: 'Исследователь океана, изобретатель акваланга, режиссёр, владелец корабля, банкрот'
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

const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm.enableValidation();

const validatorCardForm = new FormValidator(config, cardFormElement);
validatorCardForm.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  popupProfileFormElement.open();
  nameInputElement.value = myInfo.getUserInfo().name;
  jobInputElement.value = myInfo.getUserInfo().job;
});
buttonAddCard.addEventListener('click', () => { popupCardFormElement.open(); });
