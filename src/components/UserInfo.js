export class UserInfo {
	constructor ({nameSelector, infoSelector, avatarSelector}) {
		this._nameSelector = document.querySelector(nameSelector);
		this._infoSelector = document.querySelector(infoSelector);
		this._avatarSelector = document.querySelector(avatarSelector);
	}

	getUserInfo() {
		return {
			name: this._nameSelector.textContent,
			about: this._infoSelector.textContent,
		};
	}

	setUserInfo({ name, about, _id, avatar}) {
		this._nameSelector.textContent = name;
		this._infoSelector.textContent = about;
		this._avatarSelector.src = avatar;
		this.id = _id;
	}
}