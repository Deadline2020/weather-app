import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { getBgImage } from '../store/actions/bg-image.actions';
import { IBgImage } from '../models/bg-image';
import { selectBgImage } from '../store/selectors/bg-image.selector';

@Injectable()
export class AppService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	// private bgImgUrl: string;
	public bgImage$: Observable<IBgImage> = this._store.pipe(select(selectBgImage));

	constructor(
		private _store: Store<IAppState>,
	) {
		this._store.dispatch(getBgImage(['winter', 'day']));
		// this.changeBG('winter', 'day');
		// console.log((this.bgImage$ | async).urlBgImg);
	}

	// private getRandom = (num: number): number => {
	// 	return Math.floor(Math.random() * num);
	// }

	public changeBG = (season: string, daytime: string) => {
		// this._bgImageService.getBGImg(season, daytime)
		// 	.subscribe((data: IBgImageData) => {
		// 		const arr: [{ url_l: string }] = data.photos.photo;
		// 		const bgImgUrl: string = arr[this.getRandom(arr.length)].url_l;

		// const bgImgUrl: string = 'https://live.staticflickr.com/65535/49115109712_135b796202_b.jpg';
		// const img: HTMLImageElement = document.createElement('img');
		// img.src = bgImgUrl;
		// img.onload = () => {
		// 	const obj: HTMLElement = document.getElementById('app');
		// 	obj.style.backgroundImage = `url('${bgImgUrl}')`;
		// };

		// this._bgImageService.getBGImg(season, daytime)
		// 	.subscribe((urlImg: string) => {
		// 		const img: HTMLImageElement = document.createElement('img');
		// 		img.src = urlImg;
		// 		img.onload = () => {
		// 			const obj: HTMLElement = document.getElementById('app');
		// 			obj.style.backgroundImage = `url('${urlImg}')`;
		// 		};
		// 	});
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}

}
