import Popup from "../components/Popup.js";

export class PopupWithForm extends Popup {
	constructor({ handleFormSubmit }, popupSelector) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector('.popup__form');
		this._inputList = this._form.querySelectorAll('.popup__input');
		this._submitButton = this._form.querySelector('.popup__submit-btn');
	}

	_getInputValues() {
		const inputValues = {};
		this._inputList.forEach((input) => {
			inputValues[input.name] = input.value;
		});
		return inputValues;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
			this.close();
		});
	}

	close() {
		super.close();
		this._form.reset();
	}
}