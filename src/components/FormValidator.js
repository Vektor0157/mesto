export class FormValidator {
	constructor(className, formElement) {
		this._formElement = formElement;
		this._inputSelector = className.inputSelector;
		this._submitButtonSelector = className.submitButtonSelector;
		this._inactiveButtonClass = className.inactiveButtonClass;
		this._inputErrorClass = className.inputErrorClass;
		this._errorClass = className.errorClass;
		this._blockInputSelector = '.popup__block-input';
	}

	_showInputError(inputElement, errorMessage) {
		const errorElement = inputElement.closest(this._blockInputSelector).querySelector(this._inputErrorClass);
		if (errorElement) {
			errorElement.textContent = errorMessage;
			errorElement.classList.add(this._errorClass);
		}
	}

	_hideInputError(inputElement) {
		this._errorElement = inputElement.closest(this._blockInputSelector).querySelector(this._inputErrorClass);
		if (this._errorElement) {
			this._errorElement.textContent = '';
			this._errorElement.classList.remove(this._errorClass);
		}
	}

	_isValid(inputElement) {
		const errorMessage = inputElement.validationMessage;
		if (inputElement.validity.valid && (inputElement.value !== '' || !inputElement.hasAttribute('required'))) {
			this._hideInputError(inputElement);
		} else {
			this._showInputError(inputElement, errorMessage, inputElement.validationMessage);
		}
		this._toggleButtonState(this._inputList);
	}

	_hasInvalidInput(inputList) {
		return inputList.some(inputElement => !inputElement.validity.valid);
	}

	_disableSubmitButton() {
		this._buttonElement.classList.add(this._inactiveButtonClass);
		this._buttonElement.disabled = true;
	}
	
	_enableSubmitButton() {
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

	_clearErrors() {
		const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		inputList.forEach(inputElement => {
			this._hideInputError(inputElement);
		});
	}

	_setEventListener() {
		this._formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
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