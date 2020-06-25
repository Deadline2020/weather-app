import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IForecast } from '../models/forecast';
import { IForecastJson } from '../models/forecast-json';
import { IForecastWeekJson } from '../models/forecast-week-json';

@Injectable()
export class GetInfoForecastService {
	private _KEY: string = '5043e44170f7e8e95d5f736f5f1fb149';
	private _PROXY: string = 'https://cors-anywhere.herokuapp.com/';

	constructor(
		private _httpClient: HttpClient,
	) { }

	private getWeekForecastData = (data: IForecastJson): IForecastWeekJson[] => {
		const result: IForecastWeekJson[] = [];
		data.daily.data.forEach((forecastOnDay: IForecastWeekJson, index: number) => {
			if (index > 0) {
				result.push({
					summary: forecastOnDay.summary,
					icon: forecastOnDay.icon,
					temperatureHigh: forecastOnDay.temperatureHigh,
					temperatureLow: forecastOnDay.temperatureLow,
				});
			}
		});
		return result;
	};

	public getForecastData(lat: number, long: number, lang: string): Observable<IForecast> {
		const queryUrl: string = `${this._PROXY}https://api.darksky.net/forecast/${this._KEY}/${lat},${long}?exclude=hourly,flags&units=si&lang=${lang}`;
		return this._httpClient.get(queryUrl).pipe(
			map((data: IForecastJson) => {
				const weekForecastData: IForecastWeekJson[] = this.getWeekForecastData(data);
				return {
					curShortlyForecast: data.daily.data[0].summary,
					curSummary: data.currently.summary,
					curIcon: data.currently.icon,
					curTemperature: data.currently.temperature,
					curApparentTemperature: data.currently.apparentTemperature,
					curHumidity: data.currently.humidity,
					curWindSpeed: data.currently.windSpeed,
					weekForecastData,
				};
			}
			)
		);
	}
}
