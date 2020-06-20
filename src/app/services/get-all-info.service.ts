import { Injectable, OnDestroy } from '@angular/core';
import { Observable, forkJoin, Subject } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IInfoLocation } from '../models/info-location';
import { GetInfoLocationService } from './get-info-location.service';
import { GetBgImageService } from './get-info-bg-image.service';
import { HelpersService } from './helpers.service';
import { GetInfoForecastService } from './get-info-forecast.service';
import { IForecastDay } from '../models/forecast-day';
import { IAppState } from '../store/state/app.state';
import { selectLanguage } from '../store/selectors/language.selector';
import { ICoords } from '../models/coords';

@Injectable()
export class GetAllInfoService implements OnDestroy {
	private destroySubject$: Subject<boolean> = new Subject();
	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage), takeUntil(this.destroySubject$));
	private currentLang: string;

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
	}

	public getAllInfo({ latitude, longitude }: ICoords): Observable<[Array<IInfoLocation | string>, IForecastDay]> {
		return forkJoin([
			this._getInfoLocation.getInfoLocation(latitude, longitude, this.currentLang).pipe(
				mergeMap((info: IInfoLocation) => { // ! а если switchMap?
					const curDate: Date = new Date(Date.now() + info.timeShift);
					const timeOfDay: string = this._helpers.getTimeOfDay(curDate);
					const season: string = this._helpers.getSeason(curDate);
					return this._getInfoBgImageService.getBGImgData([season, timeOfDay]).pipe(
						map((imgUrl: string) => [info, imgUrl])
					);
				})),
			this._getInfoForecastService.getForecastData(latitude, longitude, this.currentLang).pipe(
				map((forecastData: IForecastDay) => forecastData)
			)
		]);

	}
	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
