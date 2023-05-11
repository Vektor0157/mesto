export class Card {
	constructor({name, link, likes, owner, _id},
					templateSelector, handleCardClick,
					{handleDeleteClick, handleCardLike, handleCardDislike},
					{id}) {
		this._name = name;
		this._link = link;
		this._usersWhoLikes = likes;
		this._owner = owner;
		this._id = _id;
		this._template = templateSelector;
		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._myId = id;
		this._handleCardLike = handleCardLike;
		this._handleCardDislike = handleCardDislike;
	}

	_getTemplate() {
		return document
			.querySelector(this._template)
			.content
			.querySelector('.element')
			.cloneNode(true)
	}

	_getElementsCard() {
		return {
			cardImg: this._element.querySelector('.element__photo'),
			cardTitle: this._element.querySelector('.element__title'),
			btnLike: this._element.querySelector('.element__like'),
			likesCalculator: this._element.querySelector('.element__calculator'),
			btnDelete: this._element.querySelector('.element__delete'),
		};
	}

	_setEventListeners() {
		this._cardElement.btnLike.addEventListener('click', () => this._handleLike());
		this._cardElement.btnDelete.addEventListener('click', () => this._handleDeleteClick());
		this._cardElement.cardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link))
	}

	_handleLike() {
		if (!this._cardElement.btnLike.classList.contains('element__like_active')) {
			this._cardElement.btnLike.classList.add('element__like_active')
			this._handleCardLike();
		} else {
			this._cardElement.btnLike.classList.remove('element__like_active')
			this._handleCardDislike();
		}
	}

	setCounterOfLikes(num){
		this._cardElement.likesCalculator.textContent = num;
	}

	_visibleDeleteCard() {
		if (this._owner._id !== this._myId) {
			this._cardElement.btnDelete.style.display = 'none'
		}
	}

	_usersLikedCard() {
		if (this._usersWhoLikes.some(user => user._id === this._myId)) {
			this._cardElement.btnLike.classList.add('element__like_active');
		}
	}

	deleteCard() {
		this._element.remove();
		this._element = null;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._cardElement = this._getElementsCard();
		this._cardElement.cardImg.src = this._link;
		this._cardElement.cardImg.alt = this._name;
		this._cardElement.cardTitle.textContent = this._name;
		this._cardElement.likesCalculator.textContent = this._usersWhoLikes.length;
		this._usersLikedCard();
		this._visibleDeleteCard();
		this._setEventListeners();
		return this._element;
	}
}