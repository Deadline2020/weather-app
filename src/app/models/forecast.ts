import { IForecastWeekJson } from './forecast-week-json';

export interface IForecast {
	curShortlyForecast: string;
	curSummary: string;
	curIcon: string;
	curTemperature: number;
	curApparentTemperature: number;
	curHumidity: number;
	curWindSpeed: number;
	weekForecastData: IForecastWeekJson[];
}
