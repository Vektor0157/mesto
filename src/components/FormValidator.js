export class FormValidator {
	constructor(config, formElement) {
		this._formElement = formElement;
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;
		this._blockInputSelector = '.popup__block-input';
	}

	_showInputError(inputElement, errorMessage) {
		this._errorElement = inputElement.closest(this._blockInputSelector).querySelector(`.${this._inputErrorClass}`);
		this._errorElement.textContent = errorMessage;
		this._errorElement.classList.add(this._errorClass);
	}

	_hideInputError(inputElement) {
		this._errorElement = inputElement.closest(this._blockInputSelector).querySelector(`.${this._inputErrorClass}`);
		this._errorElement.textContent = '';
		this._errorElement.classList.remove(this._errorClass);
	}

	_hasInvalidInput(inputList) {
		return inputList.some(inputElement => !inputElement.validity.valid);
	}

	_disableSubmitButton() {
		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		this._buttonElement.classList.add(this._inactiveButtonClass);
		this._buttonElement.disabled = true;
	}
	
	_enableSubmitButton() {
		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		this._buttonElement.classList.remove(this._inactiveButtonClass);
		this._buttonElement.disabled = false;
	}

	_toggleButtonState(inputList) {
		this._hasNotValidInput = this._hasInvalidInput(inputList);
		if (!this._hasNotValidInput) {
			this._enableSubmitButton();
		} else {
			this._disableSubmitButton();
		}
	}

	_isValid(inputElement) {
		const errorMessage = inputElement.validationMessage;
		if (inputElement.validity.valid) {
			this._hideInputError(inputElement);
		} else {
			this._showInputError(inputElement, errorMessage);
		}
		this._toggleButtonState(this._inputList);
	}

	_clearErrors() {
		this._inputList.forEach(inputElement => {
			this._hideInputError(inputElement);
		});
	}

	_setEventListener() {
		this._formElement.addEventListener('submit', (event) => {
			event.preventDefault();
			this._disableSubmitButton();
		});
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		this._inputList.forEach(inputElement => {
			inputElement.addEventListener('input', () => {
				this._isValid(inputElement);
				this._toggleButtonState(this._inputList);
			});
		});
		this._formElement.addEventListener('reset', () => {
			this._clearErrors();
			this._toggleButtonState(this._inputList);
		});
		this._toggleButtonState(this._inputList);
	}

	enableValidation() {
		this._setEventListener();
	}
}