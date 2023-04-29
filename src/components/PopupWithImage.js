import Popup from "../components/Popup.js";

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._title = this._popup.querySelector('.popup__name');
		this._image = this._popup.querySelector('.popup__image');
	}

	open(item) {
		this._image.src = item.link;
		this._image.alt = item.link;
		this._title.textContent = item.name;
		super.open();
	}
}