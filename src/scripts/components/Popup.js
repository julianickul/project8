import { ESC_KEYCODE } from '../helpers/constants.js';

export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscUp = this._handleEscUp.bind(this);
	}

	// private methods
	_handleEscUp(event) {
		event.preventDefault();
		if (event.which === ESC_KEYCODE) {
			event.preventDefault();
			this.close();
		}
	}
	
	// public methods
	open() {
		document.addEventListener('keyup', this._handleEscUp);
		this._popup.classList.add('popup_is-opened');
	}
	close() {
		document.removeEventListener('keyup', this._handleEscUp);
		this._popup.classList.remove('popup_is-opened');
	}
	setEventListeners() {
		this._popup.addEventListener('click', (evt) => {
			const classes = evt.target.classList;
			if (classes.contains('popup') || classes.contains('popup__close')) {
				this.close();
			}
		})
	}
}