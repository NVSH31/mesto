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
  likeSelector,
  likeClassActive,
  likeCounterSelector,
  url,
  cohort,
  token,
  textInTimeRequest
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

const popupProfileElement = document.querySelector('.popup_profile');
const profileFormElement = popupProfileElement.querySelector('.popup__form');
const nameInputElement = popupProfileElement.querySelector('.popup__field_name');
const jobInputElement = popupProfileElement.querySelector('.popup__field_job');

const profileElement = document.querySelector('.profile');
const profileImageElement = profileElement.querySelector(profileImageSelector);
const profileNameElement = profileElement.querySelector(profileNameSelector);
const profileJobElement = profileElement.querySelector(profileJobSelector);
let myId = '';

const popupCardElement = document.querySelector('.popup_card');
const cardFormElement = popupCardElement.querySelector('.popup__form');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const popupEditAvatar = document.querySelector(popupAvatarSelector);
const buttonEditAvatar = document.querySelector(profileOverlaySelector);
const avatarFormElement = popupEditAvatar.querySelector('.popup__form');

let textSubmitButton = '';

const api = new Api(cohort, token, url);

api.getMe()
  .then(res => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  })
  .then(data => {
    profileNameElement.textContent = data.name;
    profileJobElement.textContent = data.about;
    profileImageElement.src = data.avatar;
    myId = data._id;
  })
  .catch(Error => {
    console.log(Error);
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
          .then(res => {
            return res.ok? res.json() : Promise.reject(`Error: ${res.status}`);
          })
          .then(data => {
            cardMarkup.querySelector(likeCounterSelector).textContent = data.likes.length;
            cardMarkup.querySelector(likeSelector).classList.remove(likeClassActive);
            card._likes = data.likes;
          })
          .catch(Error => console.log(Error));
      } else {
        api.addLike(id)
          .then(res => {
            return res.ok? res.json() : Promise.reject(`Error: ${res.status}`);
          })
          .then(data => {
            cardMarkup.querySelector(likeCounterSelector).textContent = data.likes.length;
            cardMarkup.querySelector(likeSelector).classList.add(likeClassActive);
            card._likes = data.likes;
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

Promise.all([api.getMe(),])
  .then(() => {
    api.getInitialCards()
      .then(res => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .then(data => {
        cardsList.renderItems(data);
      })
      .catch(Error => console.log(Error));
  });


const popupCardFormElement = new PopupWithForm(
  popupCardSelector, {
    handleFormSubmit: (formData) => {
      const popupSubmitElement = cardFormElement.querySelector('.popup__submit');
      textSubmitButton = popupSubmitElement.textContent;
      popupSubmitElement.textContent = textInTimeRequest;
      api.addCard(formData['title-input'], formData['url-input'])
        .then(res => {
          return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        })
        .then((data) => {
          cardsList.renderItems([data,]);
        })
        .catch(Error => console.log(Error))
        .finally(() => popupSubmitElement.textContent = textSubmitButton);
      popupCardFormElement.close();
      validatorCardForm.resetValidation();
    }
  }
);
popupCardFormElement.setEventListeners();

const popupAvatarFormElement = new PopupWithForm(
  popupAvatarSelector, {
    handleFormSubmit: (formData) => {
      const popupSubmitElement = avatarFormElement.querySelector('.popup__submit');
      textSubmitButton = popupSubmitElement.textContent;
      popupSubmitElement.textContent = textInTimeRequest;
      api.editAvatar(formData['url-input'])
        .then(res => {
          return res.ok? res.json() : Promise.reject(`Error: ${res.status}`);
        })
        .then(data => {
          profileImageElement.src = data.avatar;
        })
        .catch(Error => console.log(Error))
        .finally(() => popupSubmitElement.textContent = textSubmitButton);
      popupAvatarFormElement.close();
      validatatorAvatarForm.resetValidation();
    }
  }
);
popupAvatarFormElement.setEventListeners();

const popupDeleteCardElement = new PopupDeleteCard(
  popupDeleteSelector, {
    handleFormSubmit: (id, cardMarkup) => {
      api.deleteCard(id)
        .then(res => {
          return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        })
        .then((data) => {
          cardMarkup.innerHTML = '';
        })
        .catch((Error => console.log(Error)));
      popupDeleteCardElement.close();
    }
  }
);
popupDeleteCardElement.setEventListeners();


const myInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector
});

const popupProfileFormElement = new PopupWithForm(
  popupProfileSelector, {
  handleFormSubmit: (formData) => {
    const popupSubmitElement = profileFormElement.querySelector('.popup__submit');
    textSubmitButton = popupSubmitElement.textContent;
    popupSubmitElement.textContent = textInTimeRequest;
    api.editMe(formData['name-input'], formData['job-input'])
      .then(res => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .then(data => {
        myInfo.setUserInfo({ name: data.name, job: data.about });
      })
      .catch(Error => console.log(Error))
      .finally(() => popupSubmitElement.textContent = textSubmitButton);
    popupProfileFormElement.close();
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
  const { name, job } = myInfo.getUserInfo();
  nameInputElement.value = name;
  jobInputElement.value = job;
});
buttonAddCard.addEventListener('click', () => { popupCardFormElement.open(); });

buttonEditAvatar.addEventListener('click', () => { popupAvatarFormElement.open();});
