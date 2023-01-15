import {
  popupOpenedClass,
  popupCloseIconClass
} from "../utils/constants.js";

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseElement = this._popupElement.querySelector(`.${popupCloseIconClass}`);
    this._listener = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add(popupOpenedClass);
    document.addEventListener('keydown', this._listener);
  }

  close() {
    this._popupElement.classList.remove(popupOpenedClass);
    document.removeEventListener('keydown', this._listener);
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(popupOpenedClass) || evt.target.classList.contains(popupCloseIconClass)) {
        this.close();
      }
    });
  }
}
