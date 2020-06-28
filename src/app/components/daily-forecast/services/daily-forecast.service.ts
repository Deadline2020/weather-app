import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { DictService } from 'src/app/services/translate-data.service';
import { IAppState } from 'src/app/store/state/app.state';
import { IInfoLocation } from 'src/app/models/info-location';
import { IForecast } from 'src/app/models/forecast';
import { selectLanguage } from 'src/app/store/selectors/language.selector';
import { selectInfoLocation } from 'src/app/store/selectors/info-location.selector';
import { selectForecast } from 'src/app/store/selectors/forecast.selector';
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit.selector';
import { HelpersService } from 'src/app/services/helpers.service';

@Injectable()
export class DailyForecastService {

	private MILLISEC_IN_SEC: number = 1000;
	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage));
	private currentTempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit));
	private forecastInfo$: Observable<IForecast> = this._store.pipe(select(selectForecast));
	public locationInfo$: Observable<IInfoLocation> = this._store.pipe(select(selectInfoLocation));

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
		map((data: [string, IForecast, string]) => { // ! может вынести в отдельную функцию?
			const curTemperature: string = this._helperService.getTempAsString(data[0], data[1].curTemperature);
			const apparentTemperature: string = this._helperService.getApparentTempAsString(data[0], data[1].curTemperature, data[2]);
			return { curTemperature, apparentTemperature };
		}));

	public forecastParams$: Observable<{ curIcon: string, curSummary: string, curWind: string, curHumidity: string }> = combineLatest([
		this.forecastInfo$,
		this.currentLang$,
	]).pipe(
		map((data: [IForecast, string]) => {// ! может вынести в отдельную функцию?
			const curIcon: string = `assets/img/${data[0].curIcon}.svg`;
			const curSummary: string = data[0].curSummary;
			const curWind: string = this._helperService.getWindSpeedAsString(data[0].curWindSpeed, data[1]);
			const curHumidity: string = this._helperService.getHumidityAsString(data[0].curHumidity, data[1]);
			return { curIcon, curSummary, curWind, curHumidity };
		}));

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
		private _helperService: HelpersService,
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
	};

}
