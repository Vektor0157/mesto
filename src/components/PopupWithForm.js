import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor({popupSelector, submitBtns, handleFormSubmit}) {
		super(popupSelector);
		this._submitBtns = submitBtns;
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector(".popup__form");
		this._inputList = this._form.querySelectorAll('.popup__input');
		this._submitBtn = this._form.querySelector(".popup__submit-btn");
		this._submit = this._submitForm.bind(this);
		this._submitText = this._form.getAttribute('name');
	}

	_getInputValues() {
		const inputValues = {};
		this._inputList.forEach((input) => {
			inputValues[input.name] = input.value;
		});
		return inputValues;
	}

	setButtonName() {
		this._submitBtn.textContent = this._submitBtns.initial[`${this._submitText}`];
	}

	renameButtonName() {
		this._submitBtn.textContent = this._submitBtns.changed[`${this._submitText}`];
	}

	_submitForm(evt){
		evt.preventDefault();
		this._handleFormSubmit(this._getInputValues());
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', this._submit);
	}

	openPopup() {
		super.open();
	}

	closePopup() {
		super.close();
		this._form.reset();
	}
}