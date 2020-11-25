export default class UserInfo {
	constructor({ userNameSelector, userAboutSelector }) {
		this._userName = document.querySelector(userNameSelector);
		this._userAbout = document.querySelector(userAboutSelector);
	}

	//public methods
	getUserInfo() {
		return {
			'name': this._userName.textContent,
			'description': this._userAbout.textContent
		}
	}

	setUserInfo({ 'name': name, 'description': about }) {
		this._userName.textContent = name;
		this._userAbout.textContent = about;
	}
}