import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { IBgImageJson } from '../models/bg-image-json';
import { HelpersService } from './helpers.service';

@Injectable()
export class GetBgImageService {
	private _KEY: string = '1283f155c23f4f366cadd9b1f392059c';
	private _BASE_URL: string = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this._KEY}`;

	constructor(
		private _httpClient: HttpClient,
		private helpers: HelpersService,
	) { }
	public getBGImgData([season, dayTime]: [string, string]): Observable<string> {
		const queryUrl: string = `${this._BASE_URL}&tags=${season}%2C${dayTime}%2Cweather%2Cnature&tag_mode=all&per_page=100&extras=url_l&format=json&nojsoncallback=1`;
		return this._httpClient.get<IBgImageJson>(queryUrl).pipe<string>(
			map((data: IBgImageJson): string => {
				const arr: [{ url_l: string }] = data.photos.photo;
				return arr[this.helpers.getRandomNum(arr.length)].url_l;
			})
		);
	}
}
