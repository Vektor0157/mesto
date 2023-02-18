let popupOpenBtn = document.querySelector('.profile__btn');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-icon');
let userInputName = document.querySelector('.popup__input_name');
let userInputInfo = document.querySelector('.popup__input_info');
let popupForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopup(){
	popup.classList.add('popup_opened');
	userInputName.value = profileName.textContent;
	userInputInfo.value = profileDescription.textContent;
}

function closePopup(){
	popup.classList.remove('popup_opened');
}

function savePopup(evt){
	evt.preventDefault();
	profileName.textContent = userInputName.value;
	profileDescription.textContent = userInputInfo.value;
	closePopup();
}

popupOpenBtn.addEventListener('click', openPopup);

popupCloseBtn.addEventListener('click', closePopup);

popupForm.addEventListener('submit', savePopup);