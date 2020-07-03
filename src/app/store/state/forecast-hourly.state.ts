import { IForecastHour } from 'src/app/models/forecast-hour';

export interface IForecastHourlyState {
	forecastHourly: IForecastHour[][];
}

export const initialForecastHourlyState: IForecastHourlyState = {
	forecastHourly: null,
};
