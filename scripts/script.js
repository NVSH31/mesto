const popupElement = document.querySelector('.popup');
const openPopupElement = document.querySelector('.profile__edit-button');
const closePopupElement = popupElement.querySelector('.popup__close-icon');
let formElement = popupElement.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__field-name');
let jobInput = formElement.querySelector('.popup__field-job');
let profileElement = document.querySelector('.profile');
let elementsElement = document.querySelector('.elements');
let likeAllElement = [
  elementsElement.querySelector('#element__like-0'),
  elementsElement.querySelector('#element__like-1'),
  elementsElement.querySelector('#element__like-2'),
  elementsElement.querySelector('#element__like-3'),
  elementsElement.querySelector('#element__like-4'),
  elementsElement.querySelector('#element__like-5')
];

function toggleLike(likeElement) {
  likeElement.classList.toggle('element__like_active');
}

function openPopup() {
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileElement.querySelector('.profile__name').textContent = nameInput.value;
  profileElement.querySelector('.profile__job').textContent = jobInput.value;
  closePopup();
}

for (let i=0; i<likeAllElement.length; i++) {
  likeAllElement[i].addEventListener('click', () => toggleLike(likeAllElement[i]));
}

openPopupElement.addEventListener('click', openPopup);
closePopupElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
