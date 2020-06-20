import { Action } from '@ngrx/store';
import { IForecastDay } from 'src/app/models/forecast-day';

export enum EForecastActions {
	GetDayForecastSuccess = '[Forecast] Get Day Forecast Success',
	GetWeekForecastSuccess = '[Forecast] Get Week Forecast Info Success',
	GetHourlyForecastSuccess = '[Forecast] Get Hourly Forecast Success',
}

export interface IForecastDayActions extends Action {
	type: string;
	payload: IForecastDay;
}

export function getDayForecastSuccess(payload: IForecastDay): IForecastDayActions {
	return {
		type: EForecastActions.GetDayForecastSuccess,
		payload,
	};
}
