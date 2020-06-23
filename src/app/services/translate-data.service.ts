import { Injectable } from '@angular/core';
import { ITranslateData } from '../models/translate-data';

@Injectable()
export class DictService {

	public get searchBtn(): ITranslateData {
		return {
			en: 'SEARCH',
			ru: 'ПOИСК',
			be: 'ПОШУК',
		};
	}

	public get searchPlaceholder(): ITranslateData {
		return {
			en: 'Search city',
			ru: 'Поиск города',
			be: 'Пошук горада',
		};
	}

	public get dayOfWeek(): ITranslateData {
		return {
			en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
			be: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
		};
	}

	public get month(): ITranslateData {
		return {
			en: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
				'August', 'September', 'October', 'November', 'December'],
			ru: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
				'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
			be: ['Студзеня', 'Лютага', 'Сакавіка', 'Красавіка', 'Мая', 'Чэрвеня',
				'Ліпеня', 'Жніўня', 'Верасня', 'Кастрычніка', 'Лістапада', 'Снежня'],
		};
	}

	public get apparentTemperature(): ITranslateData {
		return {
			en: ['Feels like: '],
			ru: ['Ощущается как: '],
			be: ['Адчуваецца як: '],
		};
	}

	public get windSpeed(): ITranslateData {
		return {
			en: ['Wind: ', 'm/s'],
			ru: ['Ветер: ', 'м/с'],
			be: ['Вецер: ', 'м/с'],
		};
	}

	public get humidity(): ITranslateData {
		return {
			en: ['Humidity: '],
			ru: ['Влажность: '],
			be: ['Вільготнасць: '],
		};
	}

	public get errorNameCity(): ITranslateData {
		return {
			en: 'The request failed! Please repeat.',
			ru: 'Ошибка запроса! Повторите пожалуйста.',
			be: 'Памылка запыту! Паўтарыце калі ласка.',
		};
	}
}
