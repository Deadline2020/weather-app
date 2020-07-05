import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { IAppState } from 'src/app/store/state/app.state';
import { IInfoLocation } from 'src/app/models/info-location';
import { IForecast } from 'src/app/models/forecast';
import { IForecastParams } from 'src/app/models/forecast-params';
import { selectInfoLocation } from 'src/app/store/selectors/info-location.selector';
import { selectForecast } from 'src/app/store/selectors/forecast.selector';
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit.selector';
import { HelpersService } from 'src/app/services/helpers.service';
import { RouterService } from 'src/app/services/router.service';

@Injectable()
export class DailyForecastService {

	private MILLISEC_IN_SEC: number = 1000;
	private currentTempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit));
	private forecastInfo$: Observable<IForecast> = this._store.pipe(select(selectForecast));
	public locationInfo$: Observable<IInfoLocation> = this._store.pipe(select(selectInfoLocation));

	public dateInLocation$: Observable<string> = combineLatest([
		timer(0, this.MILLISEC_IN_SEC),
		this.locationInfo$,
	]).pipe(
		map((data: [number, IInfoLocation]) => this.getFormattedDateInLocation(data[1].timeShift)
		));

	public forecastParams$: Observable<IForecastParams> = combineLatest([
		this.forecastInfo$,
		this.currentTempUnit$,
	]).pipe(
		map((data: [IForecast, string]) => this.getFormattedForecastParams(data[0], data[1]))
	);

	constructor(
		private _store: Store<IAppState>,
		private _helperService: HelpersService,
		private _routerService: RouterService,
		private translator: TranslocoService,
	) { }

	private getFormattedDateInLocation = (timeShift: number): string => {
		const TWO_DIGIT_NUMBER: number = 10;
		const currentDate: Date = new Date(Date.now() + timeShift);
		const day: number = currentDate.getDate();
		const dayOfWeek: number = currentDate.getDay();
		const month: number = currentDate.getMonth();
		const hour: number = currentDate.getHours();
		const min: number = currentDate.getMinutes();
		const sec: number = currentDate.getSeconds();
		const dateToString: string = `${this.translator.translate(`dayOfWeek.${dayOfWeek}`)} - ${day} ${this.translator.translate(`month.${month}`)} - `;
		const timeToString: string = ` ${(hour < TWO_DIGIT_NUMBER) ? `0${hour}` : `${hour}`}:${(min < TWO_DIGIT_NUMBER) ? `0${min}` : `${min}`}:${(sec < TWO_DIGIT_NUMBER) ? `0${sec}` : `${sec}`}`;
		return dateToString + timeToString;
	};

	private getFormattedForecastParams = (forecast: IForecast, tempUnit: string) => {
		const curTemperature: string = this._helperService.getTempAsString(tempUnit, forecast.curTemperature);
		const curApparentTemperature: string = this._helperService.getTempAsString(tempUnit, forecast.curApparentTemperature);
		const curIcon: string = `assets/img/${forecast.curIcon}.svg`;
		const curSummary: string = forecast.curSummary;
		const curWindSpeed: number = Math.round(forecast.curWindSpeed);
		const curHumidity: number = forecast.curHumidity;
		return { curTemperature, curIcon, curSummary, curApparentTemperature, curWindSpeed, curHumidity };
	};

	public goToHourlyForecast = (): void => {
		this._routerService.goToHourlyForecast(0);
	}
}
