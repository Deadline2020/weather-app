import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAppState } from 'src/app/store/state/app.state';
import { IInfoLocation } from 'src/app/models/info-location';
import { IForecast } from 'src/app/models/forecast';
import { selectLanguage } from 'src/app/store/selectors/language.selector';
import { selectInfoLocation } from 'src/app/store/selectors/info-location.selector';
import { selectForecast } from 'src/app/store/selectors/forecast.selector';
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit.selector';
import { DictService } from 'src/app/services/translate-data.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { RouterService } from 'src/app/services/router.service';

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
		map((data: [string, IForecast, string]) => this.getFormattedTemperature(data[0], data[1].curTemperature, data[2]))
	);

	public forecastParams$: Observable<{ curIcon: string, curSummary: string, curWind: string, curHumidity: string }> = combineLatest([
		this.forecastInfo$,
		this.currentLang$,
	]).pipe(
		map((data: [IForecast, string]) => this.getFormattedForecastParams(data[0], data[1]))
	);

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
		private _helperService: HelpersService,
		private _routerService: RouterService,
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

	private getFormattedTemperature = (tempUnit: string, temperature: number, lang: string) => {
		const curTemperature: string = this._helperService.getTempAsString(tempUnit, temperature);
		const apparentTemperature: string = this._helperService.getApparentTempAsString(tempUnit, temperature, lang);
		return { curTemperature, apparentTemperature };
	};

	private getFormattedForecastParams = (forecast: IForecast, lang: string) => {
		const curIcon: string = `assets/img/${forecast.curIcon}.svg`;
		const curSummary: string = forecast.curSummary;
		const curWind: string = this._helperService.getWindSpeedAsString(forecast.curWindSpeed, lang);
		const curHumidity: string = this._helperService.getHumidityAsString(forecast.curHumidity, lang);
		return { curIcon, curSummary, curWind, curHumidity };
	};

	public goToHourlyForecast = (): void => {
		this._routerService.goToHourlyForecast(0);
	}
}
