import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

	constructor() { }
//! Есть ли необходимость в этом отдельном модуле? Проверить как часто и где применяются методы отсюда
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
