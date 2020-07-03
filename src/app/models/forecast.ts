import { IForecastDayJson } from './forecast-day-json';

export interface IForecast {
	curShortlyForecast: string;
	curSummary: string;
	curIcon: string;
	curTemperature: number;
	curApparentTemperature: number;
	curHumidity: number;
	curWindSpeed: number;
	weeklyForecastData: IForecastDayJson[];
}
