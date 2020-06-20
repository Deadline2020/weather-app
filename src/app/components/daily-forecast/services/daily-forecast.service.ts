import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { DictService } from 'src/app/services/translate-data.service';
import { IAppState } from 'src/app/store/state/app.state';
import { IInfoLocation } from 'src/app/models/info-location';
import { IForecastDay } from 'src/app/models/forecast-day';
import { selectLanguage } from 'src/app/store/selectors/language.selector';
import { selectInfoLocation } from 'src/app/store/selectors/info-location.selector';
import { selectForecastDay } from 'src/app/store/selectors/forecast-day.selector';
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit';

@Injectable()
export class DailyForecastService {

	private MILLISEC_IN_SEC: number = 1000;
	public currentLang$: Observable<string> = this._store.pipe(select(selectLanguage));
	public currentTempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit));
	public locationInfo$: Observable<IInfoLocation> = this._store.pipe(select(selectInfoLocation));
	public forecastInfo$: Observable<IForecastDay> = this._store.pipe(select(selectForecastDay));

	public dateInLocation$: Observable<string> = combineLatest([
		timer(0, this.MILLISEC_IN_SEC),
		this.locationInfo$,
		this.currentLang$,
	]).pipe(
		map((data: [number, IInfoLocation, string]) => this.getFormattedDateInLocation(data[1].timeShift, data[2]))
	);

	public temperature$: Observable<{ curTemperature: string, apparentTemperature: string }> = combineLatest([
		this.currentTempUnit$,
		this.forecastInfo$,
		this.currentLang$,
	]).pipe(
		map((data: [string, IForecastDay, string]) => {
			const curTemperature: string = this.getTempAsString(data[0], data[1].curTemperature);
			const apparentTemperature: string = this.getApparentTempAsString(data[0], data[1].curTemperature, data[2]);
			return { curTemperature, apparentTemperature };
		}));

	public forecastParams$: Observable<{ curIcon: string, curSummary: string, curWind: string, curHumidity: string }> = combineLatest([
		this.forecastInfo$,
		this.currentLang$,
	]).pipe(
		map((data: [IForecastDay, string]) => {
			const curIcon: string = this.getIconPath(data[0].curIcon);
			const curSummary: string = data[0].curSummary;
			const curWind: string = this.getWindSpeedAsString(data[0].curWindSpeed, data[1]);
			const curHumidity: string = this.getHumidityAsString(data[0].curHumidity, data[1]);
			return { curIcon, curSummary, curWind, curHumidity };
		}));

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
	) { }

	private getFormattedDateInLocation = (timeShift: number, lang: string): string => {

		const TWO_DIGIT_NUMBER: number = 10;
		const currentDate: Date = new Date(Date.now() + timeShift);

		const day: number = currentDate.getDate();
		const dayOfWeek: number = currentDate.getDay();
		const month: number = currentDate.getMonth();
		const hour: number = currentDate.getHours();
		const min: number = currentDate.getMinutes();
		const sec: number = currentDate.getSeconds();

		const dateToString: string = `${this._dict.dayOfWeek[lang][dayOfWeek]} - ${day} ${this._dict.month[lang][month]} - `;
		const timeToString: string = ` ${(hour < TWO_DIGIT_NUMBER) ? `0${hour}` : `${hour}`}:${(min < TWO_DIGIT_NUMBER) ? `0${min}` : `${min}`}:${(sec < TWO_DIGIT_NUMBER) ? `0${sec}` : `${sec}`}`;

		return dateToString + timeToString;
	}

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

	public getIconPath = (forecast: string): string => {
		return `assets/img/${forecast}.svg`;
	};

	public getWindSpeedAsString = (speed: number, lang: string): string => {
		return `${this._dict.windSpeed[lang][0]} ${Math.round(speed)} ${this._dict.windSpeed[lang][1]}`;
	};

	public getHumidityAsString = (value: number, lang: string): string => {
		const PERCENT: number = 100;
		return `${this._dict.humidity[lang]} ${value * PERCENT}%`;
	};

}
