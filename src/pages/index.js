import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, className } from "../utils/constants.js";

const popupOpenProfileBtn = document.querySelector('.profile__btn');
const userInputName = document.querySelector('.popup__input_item_name');
const userInputInfo = document.querySelector('.popup__input_item_info');
const formElement = document.querySelector('.popup__form');
const popupFormProfile = document.querySelector('.popup__form_profile');

const popupOpenAddBtn = document.querySelector('.profile__add-btn');
const popupFormAddCard = document.querySelector('.popup__form_add-card');

const userInfo = new UserInfo({
	nameSelector: '.profile__name',
	infoSelector: '.profile__description'
});

const formProfileEdit = new PopupWithForm({
	handleFormSubmit: (formData) => {
		const userData = {
			name: formData.name,
			info: formData.info
		};
		userInfo.setUserInfo(userData);
		formProfileEdit.close();
	}
}, '.popup_type_profile');

popupFormProfile.addEventListener('submit', (evt) => {
	evt.preventDefault();
});

popupOpenProfileBtn.addEventListener('click', () => {
	const profileInfo = userInfo.getUserInfo();
	userInputName.value = profileInfo.name;
	userInputInfo.value = profileInfo.info;
	formProfileEdit.open();
});

const cardSection = new Section({
	items: initialCards,
	renderer: (item) => {
		const cardElement = createCard(item);
		cardSection.addItem(cardElement);
	}
}, '.elements');

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

const formAddCard = new PopupWithForm({
	handleFormSubmit: (formData) => {
		const card = createCard({
			'name': formData.title,
			'link': formData.link
		});
		cardSection.addItem(card, true);
		formAddCard.close();
	}
}, '.popup_type_add-card');

popupFormAddCard.addEventListener('submit', (evt) => {
	evt.preventDefault();
});

function createCard(item) {
	const card = new Card(item, '.template', handleCardClick);
	return card.generateCard();
}

function handleCardClick(item) {
	popupWithImage.open(item);
}

cardSection.renderItems();

popupOpenAddBtn.addEventListener('click', () => {
	formAddCard.open();
});

const formValidator = new FormValidator(className, formElement);
const profileFormValidity = new FormValidator(className, popupFormProfile);
const cardFormValidity = new FormValidator(className, popupFormAddCard);

formValidator.enableValidation();
formProfileEdit.setEventListeners();
formAddCard.setEventListeners();
profileFormValidity.enableValidation();
cardFormValidity.enableValidation();
