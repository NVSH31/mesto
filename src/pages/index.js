const logo = new URL('../images/logoheader.svg', import.meta.url);
const avatar = new URL('../images/profile_avatar.png', import.meta.url);

const localImages = [
  { name: 'Логотип Mesto Russia', image: logo },
  { name: 'Фото человека', image: avatar }
];

import '../pages/index.css';

import {
  config,
  cardTemplateSelector,
  cardListSelector,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  popupDeleteSelector,
  popupAvatarSelector,
  profileNameSelector,
  profileJobSelector,
  profileImageSelector,
  profileOverlaySelector,
  url,
  cohort,
  token
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { data } from 'autoprefixer';

const profileFormElement = document.forms["edit-profile"];

let myId = '';

const cardFormElement = document.forms["add-card"];

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const buttonEditAvatar = document.querySelector(profileOverlaySelector);
const avatarFormElement = document.forms["edit-avatar"];

const api = new Api(cohort, token, url);

const myInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  imageSelector: profileImageSelector
});

function createCard(cardData) {
  const card = new Card(cardData, myId, cardTemplateSelector, {
    handleCardClick: () => {
      popupImageElement.open(cardData);
    },
    handleTrashClick: (id, cardMarkup) => {
      popupDeleteCardElement.open(id, cardMarkup);
    },
    handleLikeClick: (id, myId, likes, cardMarkup) => {
      if (likes.find(user => user._id === myId)) {
        api.deleteLike(id)
          .then(data => {
            card.setCountLikes(data.likes.length);
            card.setStatusMyLike(data.likes);
            card.likes = data.likes;
          })
          .catch(Error => console.log(Error));
      } else {
        api.addLike(id)
          .then(data => {
            card.setCountLikes(data.likes.length);
            card.setStatusMyLike(data.likes);
            card.likes = data.likes;
          })
          .catch(Error => console.log(Error));
      }
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

Promise.all([api.getMe(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    myInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      image: userData.avatar,
      userId: userData._id
    });
    myId = myInfo.getUserInfo().userId;
    cardsList.renderItems(cardsData);
  })
  .catch(Error => console.log(Error));

const popupCardFormElement = new PopupWithForm(
  popupCardSelector, {
  handleFormSubmit: (formData) => {
    popupCardFormElement.renderLoading(true);
    api.addCard(formData['title-input'], formData['url-input'])
      .then((data) => {
        cardsList.renderItems([data,]);
        popupCardFormElement.close();
      })
      .catch(Error => console.log(Error))
      .finally(() => popupCardFormElement.renderLoading(false));
  }
}
);
popupCardFormElement.setEventListeners();

const popupAvatarFormElement = new PopupWithForm(
  popupAvatarSelector, {
  handleFormSubmit: (formData) => {
    popupAvatarFormElement.renderLoading(true);
    api.editAvatar(formData['avatar-url-input'])
      .then(data => {
        myInfo.setUserInfo({
          name: data.name,
          job: data.about,
          image: data.avatar,
          userId: data._id
        });
        popupAvatarFormElement.close();
      })
      .catch(Error => console.log(Error))
      .finally(() => popupAvatarFormElement.renderLoading(false));
  }
}
);
popupAvatarFormElement.setEventListeners();

const popupDeleteCardElement = new PopupDeleteCard(
  popupDeleteSelector, {
  handleFormSubmit: (id, cardMarkup) => {
    api.deleteCard(id)
      .then(() => {
        cardMarkup.remove();
      })
      .catch((Error => console.log(Error)));
    popupDeleteCardElement.close();
  }
}
);
popupDeleteCardElement.setEventListeners();

const popupProfileFormElement = new PopupWithForm(
  popupProfileSelector, {
  handleFormSubmit: (formData) => {
    popupProfileFormElement.renderLoading(true);
    api.editMe(formData['name-input'], formData['job-input'])
      .then(data => {
        myInfo.setUserInfo({
          name: data.name,
          job: data.about,
          image: data.avatar,
          userId: data._id
        });
        popupProfileFormElement.close();
      })
      .catch(Error => console.log(Error))
      .finally(() => popupProfileFormElement.renderLoading(false));
  }
}
);
popupProfileFormElement.setEventListeners();

const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm.enableValidation();

const validatorCardForm = new FormValidator(config, cardFormElement);
validatorCardForm.enableValidation();

const validatatorAvatarForm = new FormValidator(config, avatarFormElement);
validatatorAvatarForm.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  popupProfileFormElement.open();
  const dataInputs = {};
  dataInputs['name-input'] = myInfo.getUserInfo().name;
  dataInputs['job-input'] = myInfo.getUserInfo().job;
  popupProfileFormElement.setInputValues(dataInputs);
});
buttonAddCard.addEventListener('click', () => {
  popupCardFormElement.open();
  validatorCardForm.resetValidation();
});

buttonEditAvatar.addEventListener('click', () => {
  popupAvatarFormElement.open();
  validatatorAvatarForm.resetValidation();
});
