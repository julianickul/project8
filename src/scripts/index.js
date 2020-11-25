import '../pages/index.css';
import '../images/avatar.jpg';

// пожключение классов
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

// импорт констант
import { 
	initialCards,
	placesWrap,
	cardSelector,
	modal,
	defaultFormConfig
} from './helpers/constants.js';


// Врапперы
const editFormModalWindow = document.querySelector(modal.type.editUser);
const cardFormModalWindow = document.querySelector(modal.type.createCard);

// Кнопки и прочие дом узлы
const openEditFormButton = document.querySelector(modal.opener.editUser);
const openCardFormButton = document.querySelector(modal.opener.createCard);


const renderCard = (data) => {
	const card = new Card(
		data,
		cardSelector,
		() => {
			popupImage.open(data);
		}
	);
	cards.addItem(card.getView());
};


//Инициализация блока данных о пользователе
const userData = new UserInfo({
	userNameSelector:'.profile__title',
	userAboutSelector:'.profile__description'
});

//Инициализация попапа для редактирования данных пользователя
const userDataPopup = new PopupWithForm({
	popupSelector: modal.type.editUser,
	submitHandler: (data) => {
		userData.setUserInfo(data);
	}
});
userDataPopup.setEventListeners();
openEditFormButton.addEventListener('click', () => {
	const user =  userData.getUserInfo();
	userDataPopup.setInputValues(user)
	userDataPopup.open();
});

//Инициализация попапа для создания новой карточки
const createCardPopup = new PopupWithForm({
	popupSelector: modal.type.createCard,
	submitHandler: ({'place-name':name, 'link':link}) => {
		renderCard({name, link});
	}
});
createCardPopup.setEventListeners();
openCardFormButton.addEventListener('click', () => {
	createCardPopup.open();
});

// Инициализация попапа для просмотра карточки
const popupImage = new PopupWithImage(modal.type.viewImage);
popupImage.setEventListeners();

// Инициализация
const cards = new Section({
		items: initialCards,
		renderer: (data) => {
			renderCard(data);
		}
	},
	placesWrap
);
cards.renderItems();

// в данной реализации имеет смысл перенести вызов метода enableValidation() в конструктор класса, 
//т.к. метод enableValidation() вызывается независимо от выполняемых действий и функций.
// Имело бы смысл вызывать этот метод отдельно, если бы инициализацию слушателей полей 
//нужно было бы делать, скажем, при открытии окна с формой
new FormValidator(defaultFormConfig, editFormModalWindow);
new FormValidator(defaultFormConfig, cardFormModalWindow);