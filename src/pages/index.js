import './index.css';
import { Card } from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import { className, submitBtns } from "../utils/constants.js";

const popupOpenProfileBtn = document.querySelector('.profile__btn');
const popupFormProfile = document.querySelector('.popup__form_profile');
const inputProfileName = document.querySelector('.popup__input_item_name');
const inputProfileInfo = document.querySelector('.popup__input_item_info');

const popupOpenAddBtn = document.querySelector('.profile__add-btn');
const popupFormAddCard = document.querySelector('.popup__form_add-card');

const popupFormAvatar = document.querySelector('.popup__form_avatar');
const popupOpenAvatar = document.querySelector('.profile__edit-avatar')

const profileFormValidity = new FormValidator(className, popupFormProfile);
const cardFormValidity = new FormValidator(className, popupFormAddCard);
const avatarFormValidity = new FormValidator(className, popupFormAvatar)

profileFormValidity.enableValidation();
cardFormValidity.enableValidation();
avatarFormValidity.enableValidation()

const api = new Api({
	baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
	headers: {
		authorization: "9b20c238-487b-494a-9d41-6bdaba921db5",
		'Content-Type': 'application/json',
	},
})

const userInfo = new UserInfo({
	nameSelector: '.profile__name',
	infoSelector: '.profile__description',
	avatarSelector: '.profile__avatar'
});

let cardToRemove = null;
function createCard(item, templateSelector) {
	const newCard = new Card(
		item,
		templateSelector,
		popupWithImage.open.bind(popupWithImage),
		{
			handleDeleteClick: () => {
				formPopupDelete.open();
				cardToRemove = newCard;
			},
			handleCardLike: () => {
				return api.setLike(newCard)
					.then((res) => {
						newCard.calculatorLikes(res);
						return res;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			handleCardDislike: () => {
				return api.deleteLike(newCard)
					.then((res) => {
						newCard.calculatorLikes(res);
						return res;
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
		{id: userInfo.id},
	);
	return newCard.generateCard();
}

const cardSection = new Section({
	renderer: item => {
		const generatedCard = createCard(item, '.template');
		cardSection.setItem(generatedCard, true);
	}
},'.elements');

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

const formProfileEdit = new PopupWithForm({
	popupSelector: '.popup_type_profile',
	submitBtns,
	handleFormSubmit: (formValues) => {
		formProfileEdit.renameButtonName();
		api.setUserInfo(formValues)
			.then((updatedUser) => {
				userInfo.setUserInfo(updatedUser);
				formProfileEdit.closePopup();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				formProfileEdit.setButtonName();
			});
	},
});

function getAvatar(formValues) {
	api.updateAvatar(formValues.link)
		.then((getData) => {
			userInfo.setUserInfo(getData);
			formPopupAvatar.closePopup();
		})
		.catch((err) => console.log(err))
		.finally(() => {
			formPopupAvatar.setButtonName();
	});
}

const formPopupAvatar = new PopupWithForm({
	popupSelector: '.popup_type_add-avatar',
	submitBtns,
	handleFormSubmit: (formValues) => {
		checkImage(formValues.link)
		.then(()=> {
			formPopupAvatar.renameButtonName();
			getAvatar(formValues);
		})
		.catch(() => console.log(err))
	},
});

api.getInitialData()
	.then(data => {
		const [initialCards, userData] = data;
		userInfo.setUserInfo(userData);
		cardSection.renderItems(initialCards);
	})
	.catch((err) => console.log(err));

function checkImage(link) {
	return new Promise((resolve,reject) => {
	const img = document.createElement('img');
	img.src = link;
	img.onload = resolve;
	img.onerror = reject;
	})
}

function addCardApi(formValues) {
	api.addCard({name:formValues.title, link:formValues.link})
		.then((newCard)=> {
			const generatedCard = createCard(newCard, '.template');
			cardSection.setItem(generatedCard);
			formAddCard.closePopup();
		})
		.catch((err) => console.log(err))
		.finally(() => {
			formAddCard.setButtonName();
		});
}

const formAddCard = new PopupWithForm({
	popupSelector: '.popup_type_add-card',
	submitBtns,
	handleFormSubmit: (formValues) => {
		checkImage(formValues.link)
			.then(()=> {
				formAddCard.renameButtonName();
				addCardApi(formValues);
			})
			.catch(() => console.log('Ошибка адреса'))
	}
});

const formPopupDelete = new PopupWithForm({
	popupSelector: '.popup_type_delete',
	submitBtns,
	handleFormSubmit: () => {
		formPopupDelete.renameButtonName();
		api.deleteCard(cardToRemove)
			.then(() => {
				cardToRemove.deleteCard();
				formPopupDelete.closePopup();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				formPopupDelete.setButtonName();
			});
	},
});

popupWithImage.setEventListeners();
formProfileEdit.setEventListeners();
formAddCard.setEventListeners();
formPopupDelete.setEventListeners();
formPopupAvatar.setEventListeners();

function setPopupProfileInputs() {
	const { about, name } = userInfo.getUserInfo();
	inputProfileName.value = name;
	inputProfileInfo.value = about;
}

function handleEditAvatar() {
	formPopupAvatar.open();
}

function handleEditProfile() {
	setPopupProfileInputs();
	formProfileEdit.open();
}

function handleAddCard() {
	formAddCard.open();
}

popupOpenAvatar.addEventListener('click', handleEditAvatar);
popupOpenProfileBtn.addEventListener('click', handleEditProfile);
popupOpenAddBtn.addEventListener('click', handleAddCard);