import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './InitialCards.js';
//Profile
const popupOpenProfileBtn = document.querySelector('.profile__btn');
const popupProfile = document.querySelector('.popup_type_profile');
const popupContainerProfile = document.querySelector('.popup__container_profile');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const userInputName = document.querySelector('.popup__input_item_name');
const userInputInfo = document.querySelector('.popup__input_item_info');
const popupFormProfile = document.forms["popup-form-profile"];
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const openPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEscape);
}

const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEscape);
};

const closeByEscape = (evt) => {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened')
		closePopup(openedPopup);
	}
}

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => { 
	const popup = button.closest('.popup');
	button.addEventListener('click', () => closePopup(popup));
});


const openPopupProfile = () => {
	userInputName.value = profileName.textContent;
	userInputInfo.value = profileDescription.textContent;
	openPopup(popupProfile);
}

const closePopupProfile = (evt) => {
	if (evt.target === evt.currentTarget)
	closePopup(popupProfile);
};

function savePopupProfile(evt){
	evt.preventDefault();
	profileName.textContent = userInputName.value;
	profileDescription.textContent = userInputInfo.value;
	closePopup(popupProfile);
}

popupOpenProfileBtn.addEventListener('click', openPopupProfile);
popupContainerProfile.addEventListener('click', closePopupProfile)
popupFormProfile.addEventListener('submit', savePopupProfile);

//Add-card
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupContainerAddCard = document.querySelector('.popup__container_add-card');
const popupCloseAddCard = document.querySelector('.popup__close_add-card');
const popupOpenAddBtn = document.querySelector('.profile__add-btn');
const popupInputTitle = document.querySelector('.popup__input_item_title');
const popupInputLink = document.querySelector('.popup__input_item_link');
const popupFormAddCard = document.forms["popup-form-add-btn"];
const popupAddCardSubmit = popupFormAddCard.querySelector('.popup__submit-btn')


const openPopupAddCard = () => {
	openPopup(popupAddCard);
}

const closePopupAddCard = (evt) => {
	if (evt.target === evt.currentTarget)
	closePopup(popupAddCard);
}

const renderCard = function (data, templateSelector) {
	const card = new Card(data, templateSelector);
	return card.generateCard();
}

function savePopupAddCard(evt){
	evt.preventDefault();
	elementCard.prepend(renderCard({name: popupInputTitle.value, link: popupInputLink.value}, '.template'));
	popupInputTitle.value = '';
	popupInputLink.value = '';
	closePopup(popupAddCard);
	popupAddCardSubmit.classList.add('popup__submit-btn_disable');
	popupAddCardSubmit.disabled = true;
}

popupFormAddCard.addEventListener('submit', savePopupAddCard);
popupOpenAddBtn.addEventListener('click', openPopupAddCard);
popupContainerAddCard.addEventListener('click', closePopupAddCard)
//Photo
const popupPhoto = document.querySelector('.popup_type_photo');
const popupOpenPhoto = document.querySelector('.element__photo');
const popupClosePhoto = document.querySelector('.popup__close_photo');
const popupContainerPhoto = document.querySelector('.popup__container_photo')
const popupImage = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__name');
const elementCard = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template');


const openPopupPhoto = (evt) => {
	const targetElement = evt.target;
	const targetPhoto = targetElement.closest('.element__photo');
	const targetTitle = targetElement.closest('.element').querySelector('.element__title');
	popupImage.src = targetPhoto.src;
	popupImage.alt = targetPhoto.alt;
	popupName.textContent = targetTitle.textContent;
	openPopup(popupPhoto);
};

const closePopupPhoto = (evt) =>{
	if (evt.target === evt.currentTarget)
	closePopup(popupPhoto);
};

elementCard.addEventListener('click', openPopupPhoto);
popupClosePhoto.addEventListener('click', closePopupPhoto)
popupContainerPhoto.addEventListener('click', closePopupPhoto);

initialCards.forEach((item) => {
	const card = new Card(item, '.template');
	const cardElement = card.generateCard();
	elementCard.prepend(cardElement);
	popupClosePhoto.addEventListener('click', closePopupPhoto);
	popupContainerPhoto.addEventListener('click', closePopupPhoto);
})

const className ={
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__submit-btn',
	inactiveButtonClass: 'popup__submit-btn_disable',
	inputErrorClass: '.popup__input-error',
	errorClass: 'popup__input-error_active',
	blockInputSelector: '.popup__block-input'
};

const profileFormValidity = new FormValidator(className, popupFormProfile);
const cardFormValidity = new FormValidator(className, popupFormAddCard);

profileFormValidity.enableValidation()
cardFormValidity.enableValidation()