import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { takeUntil, map } from 'rxjs/operators';

import { ICoords } from '../models/coords';
import { IForecastDayJson } from '../models/forecast-day-json';
import { IForecastHour } from '../models/forecast-hour';
import { IInfoLocation } from '../models/info-location';
import { IForecastDay } from '../models/forecast-day';
import { IAppState } from '../store/state/app.state';
import { selectIsNewRequest } from '../store/selectors/is-new-request.selector';
import { selectCoords } from '../store/selectors/coords.selector';
import { selectLanguage } from '../store/selectors/language.selector';
import { selectTempUnit } from '../store/selectors/temperature-unit.selector';
import { selectInfoLocation } from '../store/selectors/info-location.selector';
import { selectForecastShort } from '../store/selectors/forecast-short.selector';
import { selectForecastHourly } from '../store/selectors/forecast-hourly.selector';
import { HelpersService } from './helpers.service';
import { DictService } from './translate-data.service';

@Injectable()
export class FutureForecastService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	private isNewRequest$: Observable<boolean> = this._store.pipe(select(selectIsNewRequest), takeUntil(this.destroySubject$));
	private coords$: Observable<ICoords> = this._store.pipe(select(selectCoords, takeUntil(this.destroySubject$)));
	private currentTempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit));
	private forecastShortData$: Observable<IForecastDayJson[]> = this._store.pipe(select(selectForecastShort));
	private forecastHoursData$: Observable<IForecastHour[][]> = this._store.pipe(select(selectForecastHourly));
	private locationInfo$: Observable<IInfoLocation> = this._store.pipe(select(selectInfoLocation));
	public currentLang$: Observable<string> = this._store.pipe(select(selectLanguage));

	public latitude: number;
	public longitude: number;
	public isNewRequest: boolean;
	public arrIndex: string[] = 'service'.split('');

	public arrForecastDay$: Observable<IForecastDay[]> = combineLatest([
		this.locationInfo$,
		this.forecastShortData$,
		this.currentTempUnit$,
		this.currentLang$
	]).pipe(
		map((data: [IInfoLocation, IForecastDayJson[], string, string]) => {
			const ARR_INDEX: number = 3;
			const timeShift: number = data[0].timeShift;
			const forecast: IForecastDayJson[] = data[1];
			const tempUnit: string = data[2];
			const curLang: string = data[ARR_INDEX] as string;
			return this.getFormattedForecastWeek(timeShift, forecast, tempUnit, curLang);
		}
		));

	public arrForecastHour$: Observable<IForecastHour[][]> = combineLatest([
		this.forecastHoursData$,
		this.currentTempUnit$,
		this.currentLang$
	]).pipe(
		map((data: [IForecastHour[][], string, string]) => {
			const arrForecastArr: IForecastHour[][] = data[0];
			const tempUnit: string = data[1];
			const curLang: string = data[2];
			return arrForecastArr.map((arrForecast: IForecastHour[]) => {
				return arrForecast.map((forecast: IForecastHour) => {
					return this.getFormattedForecastHour(forecast, tempUnit, curLang);
				});
			});
		}
		));

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
		private _helperService: HelpersService,
	) {
		this.isNewRequest$.subscribe((value: boolean) => {
			this.isNewRequest = value;
		});
		this.coords$.subscribe(({ latitude, longitude }: ICoords) => {
			this.latitude = latitude;
			this.longitude = longitude;
		});
	}

	private getFormattedForecastWeek = (timeShift: number, forecastWeek: IForecastDayJson[],
		tempUnit: string, curLang: string): IForecastDay[] => {
		const MILLISEC_IN_DAY: number = 8.64e7;
		return forecastWeek.map((forecast: IForecastDayJson, index: number) => {
			const date: Date = new Date(Date.now() + timeShift + ((index) * MILLISEC_IN_DAY));
			const dayOfWeek: number = date.getDay();
			const dayAsString: string = `${this._dict.dayOfWeek[curLang][dayOfWeek]}`;
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

	private getFormattedForecastHour = (forecastHour: IForecastHour, tempUnit: string, curLang: string): IForecastHour => {
		const hour: number = forecastHour.hour;
		const temperature: string = this._helperService.getTempAsString(tempUnit, forecastHour.temperature as number);
		const icon: string = `assets/img/${forecastHour.icon}.svg`;
		const windSpeed: string = `${Math.round(forecastHour.windSpeed as number)} ${this._dict.windSpeed[curLang][1]}`;
		const humidity: number = forecastHour.humidity;
		return {
			hour,
			temperature,
			icon,
			windSpeed,
			humidity,
		};
	};

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
