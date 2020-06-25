import { Injectable } from '@angular/core';
import { DictService } from './translate-data.service';

@Injectable()
export class HelpersService {

	constructor(
		private _dict: DictService,
	) { }
	//! Есть ли необходимость в этом отдельном модуле? Проверить как часто и где применяются методы отсюда

	private setTempToFahrenheit = (value: number): number => {
		const COEFFICIENT1: number = 1.8;
		const COEFFICIENT2: number = 32;
		return Math.round((value * COEFFICIENT1) + COEFFICIENT2);
	};

	public getTempAsString = (unit: string, temp: number): string => {
		if (unit === 'f') {
			temp = this.setTempToFahrenheit(temp);
		}
		return `${(temp > 0) ? '+' : ''}${Math.round(temp)}°`;
	};

	public getApparentTempAsString = (unit: string, temp: number, lang: string): string => {
		const temperature: string = this.getTempAsString(unit, temp);
		return `${this._dict.apparentTemperature[lang]} ${temperature}`;
	};

	public getWindSpeedAsString = (speed: number, lang: string): string => {
		return `${this._dict.windSpeed[lang][0]} ${Math.round(speed)} ${this._dict.windSpeed[lang][1]}`;
	};

	public getHumidityAsString = (value: number, lang: string): string => {
		const PERCENT: number = 100;
		return `${this._dict.humidity[lang]} ${Math.round(value * PERCENT)}%`;
	};

	public getRandomNum(num: number): number {
		return Math.floor(Math.random() * num);
	}

	public getTimeOfDay = (curDate: Date): string => {
		const hour: number = curDate.getHours();
		const startDay: number = 6;
		const finishDay: number = 22;
		if (hour > startDay && hour < finishDay) { return 'day'; }
		return 'night';
	};

	public getSeason = (curDate: Date): string => {
		enum Month {
			January, February, March, April, May, June,
			July, August, September, October, November, December
		}
		const monthNum: number = curDate.getMonth();
		let season: string;
		switch (monthNum) {
			case Month.December:
			case Month.January:
			case Month.February:
				season = 'winter';
				break;
			case Month.March:
			case Month.April:
			case Month.May:
				season = 'spring';
				break;
			case Month.June:
			case Month.July:
			case Month.August:
				season = 'summer';
				break;
			case Month.September:
			case Month.October:
			case Month.November:
				season = 'autumn';
				break;
			default:
				break;
		}
		return season;
	};

}
