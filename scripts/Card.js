export class Card {
	constructor(data, templateElem) {
		this._name = data.name;
		this._link = data.link;
		this._template = templateElem;
		this._newElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
		this._elemPhoto = this._newElement.querySelector('.element__photo');
		this._elemTitle = this._newElement.querySelector('.element__title');
		this._elemDelete = this._newElement.querySelector('.element__delete');
		this._elemLike = this._newElement.querySelector('.element__like')
	}

	_handleCardClick() {
		this._elemTitle.textContent = this._name;
		this._elemPhoto.src = this._link;
		this._elemPhoto.alt = this._name;
	}

	_handleDeleteClick() {
		this._newElement.remove();
		this._newElement = null;
	}

	_handleLikeClick() {
		this._elemLike.classList.toggle('element__like_active');
	}


	_setEventListeners() {
		this._elemPhoto.addEventListener('click', () => {
			this._handleCardClick();
		});

		this._elemDelete.addEventListener('click', () => {
			this._handleDeleteClick();
		});

		this._elemLike.addEventListener('click', () => {
			this._handleLikeClick();
		});
	}

	generateCard() {
		this._elemPhoto.src = this._link;
		this._elemPhoto.alt = this._name;
		this._elemTitle.textContent = this._name;
		this._setEventListeners();
		this._handleCardClick();
		return this._newElement;
	}
}