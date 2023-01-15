import {
  initialCards,
  config,
  cardTemplateSelector,
  allPopups,
  popupProfileElement,
  profileFormElement,
  nameInputElement,
  jobInputElement,
  popupCardElement,
  cardFormElement,
  titleInputElement,
  urlInputElement,
  // popupImageElement,
  // imageElement,
  // signatureElement,
  buttonEditProfile,
  buttonAddCard,
  profileElement,
  profileNameElement,
  profileJobElement,
  // cardsListElement,
  buttonCloseList,
  cardListSelector,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  popupOpenedClass,
  titleInputSelector,
  urlInputSelector,
  nameInputSelector,
  jobInputSelector,
} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';

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



// function openProfileForm() {
//   openPopup(popupProfileElement);
//   nameInputElement.value = profileNameElement.textContent;
//   jobInputElement.value = profileJobElement.textContent;
//   validatorProfileForm.resetValidation();
// }

const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm.enableValidation();

// function openCardForm() {
//   openPopup(popupCardElement);
//   validatorCardForm.resetValidation();
// }

const validatorCardForm = new FormValidator(config, cardFormElement);
validatorCardForm.enableValidation();

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileNameElement.textContent = nameInputElement.value;
//   profileJobElement.textContent = jobInputElement.value;
//   closePopup(popupProfileElement);
// }


//   cardsListElement.prepend(createCard(newCardData));

//   evt.target.reset();
//   closePopup(popupCardElement);
// }

// buttonEditProfile.addEventListener('click', openProfileForm);
buttonAddCard.addEventListener('click', () => { popupCardFormElement.open(); });
