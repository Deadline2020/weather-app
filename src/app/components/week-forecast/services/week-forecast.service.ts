import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DictService } from 'src/app/services/translate-data.service';
import { IAppState } from 'src/app/store/state/app.state';
import { IInfoLocation } from 'src/app/models/info-location';
import { IForecastWeek } from 'src/app/models/forecast-week';
import { selectLanguage } from 'src/app/store/selectors/language.selector';
import { selectInfoLocation } from 'src/app/store/selectors/info-location.selector';
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit';
import { IForecastWeekJson } from 'src/app/models/forecast-week-json';
import { selectForecastShort } from 'src/app/store/selectors/forecast-short.selector';
import { HelpersService } from 'src/app/services/helpers.service';

@Injectable()
export class WeekForecastService {

	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage));
	private currentTempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit));
	private forecastShortData$: Observable<IForecastWeekJson[]> = this._store.pipe(select(selectForecastShort));
	private locationInfo$: Observable<IInfoLocation> = this._store.pipe(select(selectInfoLocation));

	public arrForecast$: Observable<IForecastWeek[]> = combineLatest([
		this.locationInfo$,
		this.forecastShortData$,
		this.currentTempUnit$,
		this.currentLang$
	]).pipe(
		map((data: [IInfoLocation, IForecastWeekJson[], string, string]) => {
			const ARR_INDEX: number = 3;
			const timeShift: number = data[0].timeShift;
			const forecast: IForecastWeekJson[] = data[1];
			const tempUnit: string = data[2];
			const curLang: string = data[ARR_INDEX] as string;
			return this.getFormattedForecastWeek(timeShift, forecast, tempUnit, curLang);
		}
		));

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
		private _helperService: HelpersService,
	) { }

	private getFormattedForecastWeek = (timeShift: number, forecastWeek: IForecastWeekJson[],
		tempUnit: string, curLang: string): IForecastWeek[] => {
		const MILLISEC_IN_DAY: number = 8.64e7;
		return forecastWeek.map((forecast: IForecastWeekJson, index: number) => {
			const date: Date = new Date(Date.now() + timeShift + ((index + 1) * MILLISEC_IN_DAY));
			const dayOfWeek: number = date.getDay();
			const dayAsString: string =`${this._dict.dayOfWeek[curLang][dayOfWeek]}`;
			const avgTemp: number = Math.round((forecast.temperatureHigh + forecast.temperatureLow) / 2);
			const tempAsString: string = this._helperService.getTempAsString(tempUnit, avgTemp);
			const iconPath: string = `assets/img/${forecast.icon}.svg`;
			return {
				dayAsString,
				date,
				tempAsString,
				iconPath
			};
		});
	};
}
