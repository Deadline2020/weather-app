import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { takeUntil, map } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { ICoords } from '../models/coords';
import { IForecastShortJson } from '../models/forecast-short-json';
import { IForecastHour } from '../models/forecast-hour';
import { IInfoLocation } from '../models/info-location';
import { IForecastShort } from '../models/forecast-short';
import { IAppState } from '../store/state/app.state';
import { selectIsNewRequest } from '../store/selectors/is-new-request.selector';
import { selectCoords } from '../store/selectors/coords.selector';
import { selectTempUnit } from '../store/selectors/temperature-unit.selector';
import { selectInfoLocation } from '../store/selectors/info-location.selector';
import { selectForecastShort } from '../store/selectors/forecast-short.selector';
import { selectForecastHourly } from '../store/selectors/forecast-hourly.selector';
import { HelpersService } from './helpers.service';

@Injectable()
export class FutureForecastService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	private isNewRequest$: Observable<boolean> = this._store.pipe(select(selectIsNewRequest), takeUntil(this.destroySubject$));
	private coords$: Observable<ICoords> = this._store.pipe(select(selectCoords, takeUntil(this.destroySubject$)));
	private currentTempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit));
	private forecastShortData$: Observable<IForecastShortJson[]> = this._store.pipe(select(selectForecastShort));
	private forecastHoursData$: Observable<IForecastHour[][]> = this._store.pipe(select(selectForecastHourly));
	private locationInfo$: Observable<IInfoLocation> = this._store.pipe(select(selectInfoLocation));

	public latitude: number;
	public longitude: number;
	public isNewRequest: boolean;
	public arrForecastWeek: IForecastShort[];
	public arrIndex: string[] = 'service'.split('');

	public arrForecastWeek$: Observable<IForecastShort[]> = combineLatest([
		this.locationInfo$,
		this.forecastShortData$,
		this.currentTempUnit$,
	]).pipe(
		map((data: [IInfoLocation, IForecastShortJson[], string]) => {
			const timeShift: number = data[0].timeShift;
			const forecast: IForecastShortJson[] = data[1];
			const tempUnit: string = data[2];
			return this.getFormattedForecastWeek(timeShift, forecast, tempUnit);
		}
		));

	public arrForecastHour$: Observable<IForecastHour[][]> = combineLatest([
		this.forecastHoursData$,
		this.currentTempUnit$,
	]).pipe(
		map((data: [IForecastHour[][], string]) => {
			const arrForecastArr: IForecastHour[][] = data[0];
			const tempUnit: string = data[1];
			return arrForecastArr.map((arrForecast: IForecastHour[]) => {
				return arrForecast.map((forecast: IForecastHour) => {
					return this.getFormattedForecastHour(forecast, tempUnit);
				});
			});
		}
		));

	constructor(
		private _store: Store<IAppState>,
		private _helperService: HelpersService,
		private translator: TranslocoService,
	) {
		this.arrForecastWeek$.pipe(takeUntil(this.destroySubject$)).subscribe((arrForecastWeek: IForecastShort[]) => {
			this.arrForecastWeek = arrForecastWeek;
		});
		this.isNewRequest$.subscribe((value: boolean) => {
			this.isNewRequest = value;
		});
		this.coords$.subscribe(({ latitude, longitude }: ICoords) => {
			this.latitude = latitude;
			this.longitude = longitude;
		});
	}

	private getFormattedForecastWeek = (timeShift: number, forecastWeek: IForecastShortJson[],
		tempUnit: string): IForecastShort[] => {
		const MILLISEC_IN_DAY: number = 8.64e7;
		return forecastWeek.map((forecast: IForecastShortJson, index: number) => {
			const date: Date = new Date(Date.now() + timeShift + ((index) * MILLISEC_IN_DAY));
			const dayOfWeek: number = date.getDay();
			const dayAsString: string = `${this.translator.translate(`dayOfWeek.${dayOfWeek}`)}`;
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

	private getFormattedForecastHour = (forecastHour: IForecastHour, tempUnit: string): IForecastHour => {
		const hour: number = forecastHour.hour;
		const temperature: string = this._helperService.getTempAsString(tempUnit, forecastHour.temperature as number);
		const icon: string = `assets/img/${forecastHour.icon}.svg`;
		const windSpeed: string = `${Math.round(forecastHour.windSpeed as number)}`;
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
