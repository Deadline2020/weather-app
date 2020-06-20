import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IForecastDay } from '../models/forecast-day';
import { IForecastJson } from '../models/forecast-json';

@Injectable()
export class GetInfoForecastService {
	private _KEY: string = '5043e44170f7e8e95d5f736f5f1fb149';
	private _PROXY: string = 'https://cors-anywhere.herokuapp.com/';

	constructor(
		private _httpClient: HttpClient,
	) { }
	public getForecastData(lat: number, long: number, lang: string): Observable<IForecastDay> {

		const queryUrl: string = `${this._PROXY}https://api.darksky.net/forecast/${this._KEY}/${lat},${long}?extend=daily,flags&units=si&lang=${lang}`;
		return this._httpClient.get(queryUrl).pipe(
			map((data: IForecastJson) =>
				({
					curShortlyForecast: data.hourly.summary,
					curSummary: data.currently.summary,
					curIcon: data.currently.icon,
					curTemperature: data.currently.temperature,
					curApparentTemperature: data.currently.apparentTemperature,
					curHumidity: data.currently.humidity,
					curWindSpeed: data.currently.windSpeed,
				})
			)
		);
	}
}
