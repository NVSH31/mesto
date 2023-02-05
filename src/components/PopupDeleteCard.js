import { Popup } from "./Popup.js";
import { formSelector } from '../utils/constants.js'

export class PopupDeleteCard extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(formSelector);
  }

  _submit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._id, this._cardMarkup);
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submit);
  }
  open(id, cardMarkup) {
    super.open();
    this._id = id;
    this._cardMarkup = cardMarkup;
  }
}
