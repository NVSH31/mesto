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

const config = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error'
};

const cardTemplateSelector = '#card-template';

const popupProfileElement = document.querySelector('.popup_profile');
const profileFormElement = popupProfileElement.querySelector('.popup__form');
const nameInputElement = popupProfileElement.querySelector('.popup__field_name');
const jobInputElement = popupProfileElement.querySelector('.popup__field_job');

const popupCardElement = document.querySelector('.popup_card');
const cardFormElement = popupCardElement.querySelector('.popup__form');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileJobElement = profileElement.querySelector('.profile__job');

const cardListSelector = '.elements__list';
const popupProfileSelector = '.popup_profile';
const popupCardSelector = '.popup_card';
const popupImageSelector = '.popup_image';
const imageSelector = '.popup__image';
const signatureSelector = '.popup__signature';
const formSelector = '.popup__form';
const popupOpenedClass = 'popup_opened';
const popupCloseIconSelector = '.popup__close-icon';
const popupContainerSelector = '.popup__container';

export {
  initialCards,
  config,
  cardTemplateSelector,
  profileFormElement,
  nameInputElement,
  jobInputElement,
  popupCardElement,
  cardFormElement,
  buttonEditProfile,
  buttonAddCard,
  profileElement,
  profileNameElement,
  profileJobElement,
  cardListSelector,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  imageSelector,
  signatureSelector,
  formSelector,
  popupOpenedClass,
  popupCloseIconSelector,
  popupContainerSelector
}
