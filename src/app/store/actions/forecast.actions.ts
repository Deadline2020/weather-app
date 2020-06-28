import { Action } from '@ngrx/store';

import { IForecast } from 'src/app/models/forecast';

export enum EForecastActions {
	GetDayForecastSuccess = '[Forecast] Get Day Forecast Success',
	GetWeekForecastSuccess = '[Forecast] Get Week Forecast Info Success',
	GetHourlyForecastSuccess = '[Forecast] Get Hourly Forecast Success',
}

export interface IForecastActions extends Action {
	type: string;
	payload: IForecast;
}

export function getDayForecastSuccess(payload: IForecast): IForecastActions {
	return {
		type: EForecastActions.GetDayForecastSuccess,
		payload,
	};
}
