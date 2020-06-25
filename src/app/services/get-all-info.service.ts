import { Injectable, OnDestroy } from '@angular/core';
import { Observable, forkJoin, Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IInfoLocation } from '../models/info-location';
import { GetInfoLocationService } from './get-info-location.service';
import { GetBgImageService } from './get-info-bg-image.service';
import { HelpersService } from './helpers.service';
import { GetInfoForecastService } from './get-info-forecast.service';
import { IForecast } from '../models/forecast';
import { IAppState } from '../store/state/app.state';
import { selectLanguage } from '../store/selectors/language.selector';
import { ICoords } from '../models/coords';
import { selectBgImage } from '../store/selectors/bg-image.selector';
import { IInfoRequest } from '../models/info-request';

@Injectable()
export class GetAllInfoService implements OnDestroy {
	private destroySubject$: Subject<boolean> = new Subject();
	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage), takeUntil(this.destroySubject$));
	private currentLang: string;
	private currentBgImg$: Observable<string> = this._store.pipe(select(selectBgImage), takeUntil(this.destroySubject$));
	private currentBgImg: string;

	constructor(
		private _store: Store<IAppState>,
		private _getInfoLocation: GetInfoLocationService,
		private _getInfoBgImageService: GetBgImageService,
		private _getInfoForecastService: GetInfoForecastService,
		private _helpers: HelpersService,
	) {
		this.currentLang$.subscribe((langData: string) => {
			this.currentLang = langData;
		});
		this.currentBgImg$.subscribe((bgImg: string) => {
			this.currentBgImg = bgImg;
		});
	}

	public getAllInfo({ latitude, longitude, withBgImg, language = this.currentLang }: IInfoRequest):
		Observable<[Array<IInfoLocation | string>, IForecast, string]> {
		return forkJoin([// ! пробовал CombineLatest вроде тоже самое
			this._getInfoLocation.getInfoLocation(latitude, longitude, language).pipe(
				mergeMap((info: IInfoLocation) => { // ! а если switchMap?
					const curDate: Date = new Date(Date.now() + info.timeShift);
					const timeOfDay: string = this._helpers.getTimeOfDay(curDate);
					const season: string = this._helpers.getSeason(curDate);
					if (withBgImg) {
						return this._getInfoBgImageService.getBGImgData([season, timeOfDay]).pipe(
							map((imgUrl: string) => {
								if (imgUrl === undefined) {
									imgUrl = 'assets/img/default_bg.jpg';
								}
								return [info, imgUrl];
							})
						);
					}
					return [[info, this.currentBgImg]];
				})),
			this._getInfoForecastService.getForecastData(latitude, longitude, language).pipe(
				map((forecastData: IForecast) => forecastData)
			),
			[language],
		]);

	}
	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
