import Popup from './Popup.js';
import { defaultFormConfig as config } from '../helpers/constants.js';

export default class PopupWithForm extends Popup {
	
	constructor({popupSelector, submitHandler}) {
		super(popupSelector);
		this._formElement = this._popup.querySelector(config.formSelector);
		this._fromSubmitHandler = submitHandler;
		this._inputList = this._formElement.querySelectorAll(config.inputSelector);
	}
	// private methods
	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach(input => {
		  this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}
	
	// метод для очистки вывода ошибок
	_resetFormErrors() {
		const errorItems = this._formElement.querySelectorAll(`.${config.errorClass}`);
		errorItems.forEach(item => {
			item.textContent = '';
			item.classList.remove(config.errorClass);
		});
		const errorFields = this._formElement.querySelectorAll(`.${config.inputErrorClass}`);
		errorFields.forEach(item => {
			item.textContent = '';
			item.classList.remove(config.inputErrorClass);
		});
	}

	// public methods
	setInputValues(valuesObject) {
		Object.keys(valuesObject).forEach(key => {
			this._formElement.querySelector(`[name=${key}]`).value = valuesObject[key];
		});
	}

	setEventListeners() {
		super.setEventListeners();
		this._formElement.addEventListener("submit", (evt) => {
			evt.preventDefault();
			this._fromSubmitHandler(this._getInputValues());
			this.close();
		});
	}

	close() {
		super.close();
		this._formElement.reset();
		this._resetFormErrors();
	}
}