export class Section {
  constructor({ items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(element) {
    document.querySelector(this._containerSelector).prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach(element => {
      this._renderer(element);
    });
  }

}
