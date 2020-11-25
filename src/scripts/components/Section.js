export default class Section {
	constructor({ items, renderer }, container) {
		this._items = items;
		this._renderer = renderer;
		this._container = container;
	}
	//private methods
	_clear() {
		this._container.innerHTML = "";
	}
	//public methods
	renderItems() {
		this._clear();
		this._items.forEach( item => this._renderer(item) );
	}
	addItem(element) {
		this._container.append(element);
	}
}