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
		const errorElement = inputElement.closest(this._blockInputSelector).querySelector(`.${this._inputErrorClass}`);
		if (errorElement) {
			errorElement.textContent = errorMessage;
			errorElement.classList.add(this._errorClass);
		}
	}

	_hideInputError(inputElement) {
		this._errorElement = inputElement.closest(this._blockInputSelector).querySelector(`.${this._inputErrorClass}`);
		if (this._errorElement) {
			this._errorElement.textContent = '';
			this._errorElement.classList.remove(this._errorClass);
		}
	}

	_isValid(inputElement) {
		const errorMessage = inputElement.validationMessage;
		if (inputElement.validity.valid) {
			this._hideInputError(inputElement);
		} else {
			this._showInputError(inputElement, errorMessage); // Удалите inputElement.validationMessage
		}
		this._toggleButtonState();
	}

	_hasInvalidInput(inputList) {
		return inputList.some(inputElement => !inputElement.validity.valid);
	}

	_checkEmptyInputs() {
		return this._inputList.some(inputElement => inputElement.value.trim() === '');
	}

	_disableSubmitButton() {
		this._buttonElement.classList.add(this._inactiveButtonClass);
		this._buttonElement.disabled = true;
	}
	
	_enableSubmitButton() {
		if (!this._checkEmptyInputs()) {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.disabled = false;
		} else {
			this._disableSubmitButton();
		}
	}

	_toggleButtonState() {
		this._hasNotValidInput = this._hasInvalidInput(this._inputList);
		if (!this._hasNotValidInput && !this._checkEmptyInputs()) {
			this._enableSubmitButton();
		} else {
			this._disableSubmitButton();
		}
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
				this._toggleButtonState(this._inputList, this._buttonElement);
			});
		});
		this._formElement.addEventListener('reset', () => {
			this._toggleButtonState(this._inputList);
			this._disableSubmitButton();
		});
		this._toggleButtonState(this._inputList, this._buttonElement);
	}

	enableValidation() {
		this._setEventListener();
		this._disableSubmitButton();
	}
}