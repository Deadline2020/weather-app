import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

	private setTempToFahrenheit = (value: number): number => {
		const COEFFICIENT1: number = 1.8;
		const COEFFICIENT2: number = 32;
		return Math.round((value * COEFFICIENT1) + COEFFICIENT2);
	};

	public getTempAsString = (unit: string, temp: number): string => {
		if (unit === 'F') {
			temp = this.setTempToFahrenheit(temp);
		}
		return `${(temp > 0) ? '+' : ''}${Math.round(temp)}°`;
	};

	public getRandomNum = (num: number): number => {
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

	public getTimeShift = (offsetInSeconds: number): number => {
		const SEC_IN_MIN: number = 60;
		const MILLISEC_IN_SEC: number = 1000;
		const curPositionOffset: number = offsetInSeconds;
		const localOffset: number = new Date().getTimezoneOffset() * SEC_IN_MIN;
		const timeShift: number = (curPositionOffset + localOffset) * MILLISEC_IN_SEC;
		return timeShift;
	}
}
