import { ILanguageData } from 'src/app/models/language-data';

export interface ILanguageState {
	languageData: ILanguageData;
}

export const initialLanguageState: ILanguageState = {
	languageData: {
		lang: 'en',
		dict: {
			searchBtn: {
				en: 'SEARCH',
				ru: 'ПOИСК',
				be: 'ПОШУК',
			},
			searchPlaceholder: {
				en: 'Search city',
				ru: 'Поиск города',
				be: 'Пошук горада',
			},
			dayOfWeek: {
				en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
				be: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
			},
			month: {
				en: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
					'August', 'September', 'October', 'November', 'December'],
				ru: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
					'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
				be: ['Студзеня', 'Лютага', 'Сакавіка', 'Красавіка', 'Мая', 'Чэрвеня',
					'Ліпеня', 'Жніўня', 'Верасня', 'Кастрычніка', 'Лістапада', 'Снежня'],
			},
			weatherProps: {
				en: ['Feels like: ', 'Wind:', 'm/s', 'Humidity:'],
				ru: ['Ощущается как: ', 'Ветер:', 'м/с', 'Влажность:'],
				be: ['Адчуваецца як: ', 'Вецер:', 'м/с', 'Вільготнасць:'],
			},
			errorCity: {
				en: 'The request failed. Please repeat.',
				ru: 'Ошибка запроса. Повторите пожалуйста.',
				be: 'Памылка запыту. Паўтарыце калі ласка.',
			},
		},
	}
};
