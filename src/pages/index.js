import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, className } from "../utils/constants.js";

// DOM Elements
const popupOpenProfileBtn = document.querySelector('.profile__btn');
const userInputName = document.querySelector('.popup__input_item_name');
const userInputInfo = document.querySelector('.popup__input_item_info');
const popupFormProfile = document.forms["popup-form-profile"];

const popupOpenAddBtn = document.querySelector('.profile__add-btn');
const popupFormAddCard = document.forms["popup-form-add-card"];

const userInfo = new UserInfo({
	nameSelector: '.profile__name',
	infoSelector: '.profile__description'
});

const formProfileEdit = new PopupWithForm({
	handleFormSubmit: (formData) => {
		const userData = {
			name: formData.popupInputName,
			about: formData.popupInputInfo
		};
		userInfo.setUserInfo(userData);
	}
}, '.popup_type_profile');

const formAddCard = new PopupWithForm({
	handleFormSubmit: (formData) => {
		const card = createCard({
			'name': formData.popupInputTitle,
			'link': formData.popupInputLink
		});
		cardSection.addItem(card, true);
	}
}, '.popup_type_add-card');

function createCard(item) {
	const card = new Card(item, '.template', handleCardClick);
	return card.generateCard();
}

function handleCardClick(cardData) {
	popupWithImage.open(cardData);
}

const cardSection = new Section({
	items: initialCards,
	renderer: (item) => {
		const cardElement = createCard(item);
		cardSection.addItem(cardElement);
	}
}, '.elements');

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

popupOpenProfileBtn.addEventListener('click', () => {
	const profileInfo = userInfo.getUserInfo();
	userInputName.value = profileInfo.name;
	userInputInfo.value = profileInfo.info;
	formProfileEdit.open();
});

popupOpenAddBtn.addEventListener('click', () => {
	formAddCard.open();
});

const openPopupPhoto = new PopupWithImage('.popup_type_add-card');

const profileFormValidity = new FormValidator(className, popupFormProfile);
const cardFormValidity = new FormValidator(className, popupFormAddCard);

cardSection.renderItems();
formProfileEdit.setEventListeners();
formAddCard.setEventListeners();
openPopupPhoto.setEventListeners();
profileFormValidity.enableValidation();
cardFormValidity.enableValidation();