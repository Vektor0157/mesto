import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { InitialCards } from "../components/InitialCards.js";

const className = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__submit-btn',
	inactiveButtonClass: 'popup__submit-btn_disable',
	inputErrorClass: 'popup__input-error',
	errorClass: 'popup__input-error_active',
	blockInputSelector: '.popup__block-input'
};

const popupOpenProfileBtn = document.querySelector('.profile__btn');
const userInputName = document.querySelector('.popup__input_item_name');
const userInputInfo = document.querySelector('.popup__input_item_info');
const popupFormProfile = document.forms["popup-form-profile"];

const popupOpenAddBtn = document.querySelector('.profile__add-btn');
const popupFormAddCard = document.forms["popup-form-add-card"];

function createCard(item) {
	const card = new Card(item, '.template', handleCardClick);
	const cardElement =  card.generateCard()
	cardSection.addItem(cardElement)
}

const cardSection = new Section({
	items: InitialCards,
		render(item) {
			createCard(item)
	},
}, '.elements')

function handleCardClick(cardData) {
	const popupWithImage = new PopupWithImage('.popup_type_photo');
	popupWithImage.open(cardData);
}



const userInfo = new UserInfo('.profile__name', '.profile__description');
const formProfileEdit = new PopupWithForm({
	handleFormSubmit: (data) => {
		userInfo.setUserInfo(data);
	}
}, '.popup_type_profile');

popupOpenProfileBtn.addEventListener('click', () => {
	const profileInfo = userInfo.getUserInfo();
	userInputName.value = profileInfo.name;
	userInputInfo.value = profileInfo.about;
	formProfileEdit.open();
});

const formAddCard = new PopupWithForm({
	handleFormSubmit: (formData) => {
		const card = createCard({
			'name': formData.popupInputTitle,
			'link': formData.popupInputLink
		}, handleCardClick);
		const cardElement = card.generateCard();
		cardSection.addItem(cardElement);
		formAddCard.close();
	}
}, '.popup_type_add-card');

popupOpenAddBtn.addEventListener('click', () => {
	formAddCard.open();
});

const openPopupPhoto = new PopupWithImage('.popup_type_photo');

cardSection.renderItems();
formProfileEdit.setEventListeners();
formAddCard.setEventListeners();
openPopupPhoto.setEventListeners();


const profileFormValidity = new FormValidator(className, popupFormProfile);
const cardFormValidity = new FormValidator(className, popupFormAddCard);

profileFormValidity.enableValidation();
cardFormValidity.enableValidation();