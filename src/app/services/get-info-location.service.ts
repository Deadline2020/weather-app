import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IInfoLocation } from '../models/info-location';
import { IInfoLocationJson } from '../models/info-location-json';

@Injectable()
export class GetInfoLocationService {
	private _KEY: string = 'ee777d789cfd4d6a963c567d1f4ff27c';

	constructor(
		private _httpClient: HttpClient,
	) { }

	public getInfoLocation(lat: number, long: number, lang: string): Observable<IInfoLocation> {
		const queryUrl: string = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C%20${long}&key=${this._KEY}&language=${lang}&pretty=1`;
		return this._httpClient.get(queryUrl).pipe(
			map((data: IInfoLocationJson) => {
				const SEC_IN_MIN: number = 60;
				const MILLISEC_IN_SEC: number = 1000;
				const country: string = data.results[0].components.country;
				let city: string;
				if (data.results[0].components.hasOwnProperty('city')) {
					city = data.results[0].components.city;
				} else if (data.results[0].components.hasOwnProperty('town')) {
					city = data.results[0].components.town;
				} else if (data.results[0].components.hasOwnProperty('village')) {
					city = data.results[0].components.village;
				} else if (data.results[0].components.hasOwnProperty('county')) {
					city = data.results[0].components.county;
				} else if (data.results[0].components.hasOwnProperty('suburb')) {
					city = data.results[0].components.suburb;
				} else if (data.results[0].components.hasOwnProperty('hamlet')) {
					city = data.results[0].components.hamlet;
				}
				const curPositionOffset: number = data.results[0].annotations.timezone.offset_sec;
				const localOffset: number = new Date().getTimezoneOffset() * SEC_IN_MIN;
							const timeShift: number = (curPositionOffset + localOffset) * MILLISEC_IN_SEC;

				return { country, city, timeShift };
			})
		);
	}
}
