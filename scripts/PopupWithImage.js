import { Popup } from "./Popup.js";
import {
  imageSelector,
  signatureSelector,
} from './constants.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(imageSelector);
    this._signature = this._popupElement.querySelector(signatureSelector);
  }
  open(cardData) {
    super.open();
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._signature.textContent = cardData.name;
  }
}
