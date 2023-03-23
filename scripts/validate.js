const showInputError = (inputElement, errorMessage, inputErrorClass, errorClass, blockInputSelector) => {
	const errorElement = inputElement.closest(blockInputSelector).querySelector(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.toggle(errorClass, true); };

const hideInputError = (inputElement, inputErrorClass, errorClass, blockInputSelector) => {
	const errorElement = inputElement.closest(blockInputSelector).querySelector(inputErrorClass);
	errorElement.textContent = '';
	errorElement.classList.toggle(errorClass, false);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass, blockInputSelector) => {
	const isInputNotValid = !inputElement.validity.valid;
	const errorMessage = inputElement.validationMessage;
	if(isInputNotValid){
		showInputError(inputElement, errorMessage, inputErrorClass, errorClass, blockInputSelector);
	}else{
		hideInputError(inputElement, inputErrorClass, errorClass, blockInputSelector);
	}
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	const hasNotValidInput = inputList.some(inputElement => !inputElement.validity.valid);
	buttonElement.disabled = hasNotValidInput;
	buttonElement.classList.toggle(inactiveButtonClass, hasNotValidInput);
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, blockInputSelector) => {
	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
	});
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
		checkInputValidity(formElement, inputElement, inputErrorClass, errorClass, blockInputSelector);
		toggleButtonState(inputList, buttonElement, inactiveButtonClass);
		});
	});
	toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, blockInputSelector}) => {
	const formList = Array.from(document.querySelectorAll(formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, blockInputSelector);
	});
};

enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__submit-btn',
	inactiveButtonClass: 'popup__submit-btn_disable',
	inputErrorClass: '.popup__input-error',
	errorClass: 'popup__input-error_active',
	blockInputSelector: '.popup__block-input'
});