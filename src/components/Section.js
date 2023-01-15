export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach(element => {
      this._renderer(element);
    });
  }
}
