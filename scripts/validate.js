const showInputError = (inputElement, errorMessage, inputErrorClass, errorClass) => {
	const errorElement = inputElement.closest('.popup__block-input').querySelector(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.toggle(errorClass, true); };

const hideInputError = (inputElement, inputErrorClass, errorClass) => {
	const errorElement = inputElement.closest('.popup__block-input').querySelector(inputErrorClass);
	errorElement.textContent = '';
	errorElement.classList.toggle(errorClass, false);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
	const isInputNotValid = !inputElement.validity.valid;
	const errorMessage = inputElement.type === 'text' ? 'Вы пропустили это поле' : 'Введите адрес сайта';
	if(isInputNotValid){
	showInputError(inputElement, errorMessage, inputErrorClass, errorClass);
	}else{
		hideInputError(inputElement, inputErrorClass, errorClass);
	}
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	const hasNotValidInput = inputList.some(inputElement => !inputElement.validity.valid);
	buttonElement.disabled = hasNotValidInput;
	buttonElement.classList.toggle(inactiveButtonClass, hasNotValidInput);
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
	});
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
		checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
		toggleButtonState(inputList, buttonElement, inactiveButtonClass);
		});
	});
	toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
	const formList = Array.from(document.querySelectorAll(formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
	});
};

enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__submit-btn',
	inactiveButtonClass: 'popup__submit-btn_disable',
	inputErrorClass: '.popup__input-error',
	errorClass: 'popup__input-error_active'
});