import { Popup } from "./Popup.js";
import { formSelector } from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(formSelector);
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _submit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submit);
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
