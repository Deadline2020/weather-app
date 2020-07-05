import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IForecast } from '../models/forecast';
import { IForecastJson } from '../models/forecast-json';
import { IForecastShortJson } from '../models/forecast-short-json';
import { ICoords } from '../models/coords';
import { IForecastHourJson } from '../models/forecast-hour-json';
import { IForecastHour } from '../models/forecast-hour';
import { HelpersService } from './helpers.service';

@Injectable()
export class GetInfoForecastService {
	private _KEY: string = '5043e44170f7e8e95d5f736f5f1fb149';
	private _PROXY: string = 'https://api.allorigins.win/raw?url=';

	constructor(
		private _httpClient: HttpClient,
		private _helpersServices: HelpersService,
	) { }

	private getWeeklyForecastData = (data: IForecastJson): IForecastShortJson[] => {
		const result: IForecastShortJson[] = [];
		data.daily.data.forEach((forecastOnDay: IForecastShortJson) => {
			result.push({
				summary: forecastOnDay.summary,
				icon: forecastOnDay.icon,
				temperatureHigh: forecastOnDay.temperatureHigh,
				temperatureLow: forecastOnDay.temperatureLow,
			});
		});
		return result;
	};

	private getFormattedHourlyForecast = (arrOneDayForecast: IForecastHour[], indexDay: number, startFromHour: number): IForecastHour[] => {
		return arrOneDayForecast.map((forecastData: IForecastHour, index: number) => {
			let hourShift: number = 0;
			if (indexDay === 0) { hourShift = startFromHour; }
			return {
				hour: index + hourShift,
				temperature: forecastData.temperature,
				icon: forecastData.icon,
				windSpeed: forecastData.windSpeed,
				humidity: forecastData.humidity,
			};
		});
	}

	public getForecastData = (lat: number, long: number, lang: string): Observable<IForecast> => {
		const url: string = encodeURIComponent(`https://api.darksky.net/forecast/${this._KEY}/${lat},${long}?exclude=hourly,flags&units=si&lang=${lang}`);
		const queryUrl: string = `${this._PROXY}${url}`;
		return this._httpClient.get(queryUrl).pipe(
			map((data: IForecastJson) => {
				const weeklyForecastData: IForecastShortJson[] = this.getWeeklyForecastData(data);
				return {
					curShortlyForecast: data.daily.data[0].summary,
					curSummary: data.currently.summary,
					curIcon: data.currently.icon,
					curTemperature: data.currently.temperature,
					curApparentTemperature: data.currently.apparentTemperature,
					curHumidity: data.currently.humidity,
					curWindSpeed: data.currently.windSpeed,
					weeklyForecastData,
				};
			}
			)
		);
	}

	public getHourlyForecast = ({ latitude, longitude }: ICoords): Observable<IForecastHour[][]> => {
		const url: string = encodeURIComponent(`https://api.darksky.net/forecast/${this._KEY}/${latitude},${longitude}?exclude=currently,daily,flags&extend=hourly&units=si&lang=en`);
		const queryUrl: string = `${this._PROXY}${url}`;
		return this._httpClient.get(queryUrl).pipe(
			map((data: IForecastHourJson) => {
				const SEC_IN_HOUR: number = 3600;
				const HOUR_IN_DAY: number = 24;
				const DAY_IN_WEEK: number = 7;
				const timeShift: number = this._helpersServices.getTimeShift(data.offset * SEC_IN_HOUR);
				const curLocationDate: Date = new Date(Date.now() + timeShift);
				const startFromHour: number = curLocationDate.getHours();
				let startIndex: number = 0;
				const numberHourUntilEndDay: number = HOUR_IN_DAY - startFromHour;
				const resultArrForecast: IForecastHour[][] = [];
				for (let indexDay: number = 0; indexDay <= DAY_IN_WEEK; indexDay++) {
					const endIndex: number = numberHourUntilEndDay + indexDay * HOUR_IN_DAY;
					const arrOneDayForecast: IForecastHour[] = data.hourly.data.slice(startIndex, (endIndex));
					resultArrForecast.push(this.getFormattedHourlyForecast(arrOneDayForecast, indexDay, startFromHour));
					startIndex = endIndex;
				}
				return resultArrForecast;
			})
		);
	}
}
