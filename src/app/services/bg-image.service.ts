import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBgImageJson } from '../models/bg-image-json';
import { IBgImage } from '../models/bg-image';
import getRandomNum from '../helpers/getRandomNum';

@Injectable()
export class BgImageService {
	private _KEY: string = '1283f155c23f4f366cadd9b1f392059c';
	private _BASE_URL: string = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this._KEY}`;

	constructor(
		private _httpClient: HttpClient
	) { }
	// public bgImage$:Observable<any>=this.getUrlImage()

	public getBGImg([season, dayTime]: [string, string]): Observable<IBgImage> {
		const queryUrl: string = `${this._BASE_URL}&tags=${season}%2C${dayTime}%2Cweather%2Cnature&tag_mode=all&per_page=300&extras=url_l&format=json&nojsoncallback=1`;
		return this._httpClient.get<IBgImageJson>(queryUrl).pipe<IBgImage>(
			map((data: IBgImageJson): IBgImage => {
				const arr: [{ url_l: string }] = data.photos.photo;
				const resultState: IBgImage = {
					urlBgImg: arr[getRandomNum(arr.length)].url_l,
					isLoaded: true,
				};
				return resultState;
			})
		);
	}
}
