import { IForecast } from 'src/app/models/forecast';

export interface IForecastState {
	forecast: IForecast;
}

export const initialForecastState: IForecastState = {
	forecast: null,
};
