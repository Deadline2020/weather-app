import { IForecastShortJson } from './forecast-short-json';

export interface IForecast {
	curShortlyForecast: string;
	curSummary: string;
	curIcon: string;
	curTemperature: number;
	curApparentTemperature: number;
	curHumidity: number;
	curWindSpeed: number;
	weeklyForecastData: IForecastShortJson[];
}
