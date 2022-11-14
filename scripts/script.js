const popupElement = document.querySelector('.popup');
const openPopupElement = document.querySelector('.profile__edit-button');
const closePopupElement = popupElement.querySelector('.popup__close-icon');
let formElement = popupElement.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__field_about_name');
let jobInput = formElement.querySelector('.popup__field_about_job');
let profileElement = document.querySelector('.profile');
let profileNameElement = profileElement.querySelector('.profile__name');
let profileJobElement = profileElement.querySelector('.profile__job');

function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}


openPopupElement.addEventListener('click', openPopup);
closePopupElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
