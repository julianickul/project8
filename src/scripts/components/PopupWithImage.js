import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	// public method redefined
	open({name, link}) {
		const imgElement = this._popup.querySelector('.popup__image');
		const captionElement = this._popup.querySelector('.popup__caption');

		imgElement.src = link;
		captionElement.alt = name;
		captionElement.textContent = name;

		super.open();
	}
}