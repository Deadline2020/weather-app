import { Injectable, OnDestroy } from '@angular/core';
import { Observable, forkJoin, Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IInfoLocation } from '../models/info-location';
import { IForecast } from '../models/forecast';
import { IInfoRequest } from '../models/info-request';
import { IAppState } from '../store/state/app.state';
import { selectBgImage } from '../store/selectors/bg-image.selector';
import { GetInfoLocationService } from './get-info-location.service';
import { GetBgImageService } from './get-info-bg-image.service';
import { HelpersService } from './helpers.service';
import { GetInfoForecastService } from './get-info-forecast.service';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class GetAllInfoService implements OnDestroy {
	private destroySubject$: Subject<boolean> = new Subject();
	private currentBgImg$: Observable<string> = this._store.pipe(select(selectBgImage), takeUntil(this.destroySubject$));
	private currentBgImg: string;

	constructor(
		private _store: Store<IAppState>,
		private _getInfoLocation: GetInfoLocationService,
		private _getInfoBgImageService: GetBgImageService,
		private _getInfoForecastService: GetInfoForecastService,
		private _helpers: HelpersService,
		private translator: TranslocoService,
	) {
		this.currentBgImg$.subscribe((bgImg: string) => {
			this.currentBgImg = bgImg;
		});
	}

	public getAllInfo = ({ latitude, longitude, withBgImg, language = this.translator.getActiveLang() }: IInfoRequest):
		Observable<[Array<IInfoLocation | string>, IForecast]> => {
		return forkJoin([
			this._getInfoLocation.getInfoLocation(latitude, longitude, language).pipe(
				mergeMap((info: IInfoLocation) => {
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
		]);

	}
	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
