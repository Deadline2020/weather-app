import { Action } from '@ngrx/store';

import { IForecast } from 'src/app/models/forecast';
import { IForecastHour } from 'src/app/models/forecast-hour';
import { ICoords } from 'src/app/models/coords';

export enum EForecastActions {
	GetDayForecastSuccess = '[Forecast] Get Day Forecast Success',
	GetHourlyForecast = '[Forecast] Get Hourly Forecast',
	GetHourlyForecastSuccess = '[Forecast] Get Hourly Forecast Success',
}

export interface IForecastShortActions extends Action {
	type: string;
	payload: IForecast;
}

export interface IForecastHourRequestActions extends Action {
	type: string;
	payload: ICoords;
}

export interface IForecastHourActions extends Action {
	type: string;
	payload: IForecastHour[][];
}

export function getDayForecastSuccess(payload: IForecast): IForecastShortActions {
	return {
		type: EForecastActions.GetDayForecastSuccess,
		payload,
	};
}

export function getHourlyForecast(payload: ICoords): IForecastHourRequestActions {
	return {
		type: EForecastActions.GetHourlyForecast,
		payload,
	};
}

export function getHourlyForecastSuccess(payload: IForecastHour[][]): IForecastHourActions {
	return {
		type: EForecastActions.GetHourlyForecastSuccess,
		payload,
	};
}
