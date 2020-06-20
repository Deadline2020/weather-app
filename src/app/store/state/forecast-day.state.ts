import { IForecastDay } from 'src/app/models/forecast-day';

export interface IForecastDayState {
	forecastDay: IForecastDay;
}

export const initialForecastDayState: IForecastDayState = {
	forecastDay: null,
};
