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

function savePopupAddCard(evt){
	evt.preventDefault();
	elementCard.prepend(getItem({name: popupInputTitle.value, link: popupInputLink.value}));
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
	openPopup(popupPhoto)
};

const closePopupPhoto = (evt) =>{
	if (evt.target === evt.currentTarget)
	closePopup(popupPhoto);
};

popupContainerPhoto.addEventListener('click', closePopupPhoto);


const initialCards = [
	{
		name: 'Древний город Петра',
		link: 'https://images.unsplash.com/photo-1579208679245-1636894560fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
	},
	{
		name: 'Храмы Ангкора',
		link: 'https://images.unsplash.com/photo-1650696322307-4cc9ecf4ebe5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80'
	},
	{
		name: 'Озеро Байкал',
		link: 'https://images.unsplash.com/photo-1551845041-73527e65adc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
	},
	{
		name: 'Рисовые террасы Му Кан Чай',
		link: 'https://images.unsplash.com/photo-1606801868003-de8a28651af9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
	},
	{
		name: 'Скала Язык Тролля',
		link: 'https://images.unsplash.com/photo-1566230724840-0fe03c62884d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
	},
	{
		name: 'Национальный парк Йеллоустон',
		link: 'https://images.unsplash.com/photo-1580501402975-45081e052155?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
	}
];

function deleteItem(evt){
	const targetElement = evt.target;
	const targetItem = targetElement.closest('.element');
	targetItem.remove();
};

function toggleLike(evt){
	evt.target.classList.toggle('element__like_active');
};

function getItem(item){
	const newItem = elementTemplate.content.cloneNode(true);
	const elemTitle = newItem.querySelector('.element__title');
	elemTitle.textContent = item.name;
	const elemPhoto = newItem.querySelector('.element__photo');
	elemPhoto.src = item.link;
	elemPhoto.alt = item.name;
	elemPhoto.addEventListener('click', openPopupPhoto);
	const elemDelete = newItem.querySelector('.element__delete');
	elemDelete.addEventListener('click', deleteItem);
	const elemLike = newItem.querySelector('.element__like');
	elemLike.addEventListener('click', toggleLike);
	return newItem;
};

function renderElements (){
	const addElement = initialCards.map(getItem);
	elementCard.append(...addElement);
};

renderElements();