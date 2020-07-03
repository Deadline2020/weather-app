import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { Observable, Subscriber, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ICoords } from '../models/coords';
import { ICoordsJson } from '../models/coords-json';
import { IAppState } from '../store/state/app.state';
import { loadDataFinish } from '../store/actions/isLoad.actions';
import { selectCoords } from '../store/selectors/coords.selector';
import { selectLanguage } from '../store/selectors/language.selector';
import { ErrorMsgService } from './error-msg.service';
import { DictService } from './translate-data.service';

@Injectable()
export class GetCoordsService implements OnDestroy {
	private destroySubject$: Subject<boolean> = new Subject();
	private curCoords$: Observable<ICoords> = this._store.pipe(select(selectCoords), takeUntil(this.destroySubject$));
	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage, takeUntil(this.destroySubject$)));
	private _currentLang: string;
	private _curCoords: ICoords;
	private _KEY: string = 'ee777d789cfd4d6a963c567d1f4ff27c';

	constructor(
		private _store: Store<IAppState>,
		private _httpClient: HttpClient,
		private _errorMsg: ErrorMsgService,
		private _dict: DictService,
	) {
		this.curCoords$.subscribe((curCoords: ICoords) => {
			this._curCoords = curCoords;
		});
		this.currentLang$.subscribe((Lang: string) => {
			this._currentLang = Lang;
		});
	}

	public getCurLocation = (): Observable<ICoords> => {
		const options: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};
		return new Observable((observer: Subscriber<ICoords>) => {
			navigator.geolocation.getCurrentPosition(
				(location: Position) => {
					const latitude: number = location.coords.latitude;
					const longitude: number = location.coords.longitude;
					observer.next({ latitude, longitude });
				},
				() => {
					observer.next(this._curCoords);
				},
				options);
		});
	}

	public getCityLocation = (nameCity: string): Observable<ICoordsJson> => {
		const queryUrl: string = `https://api.opencagedata.com/geocode/v1/json?q=${nameCity}&key=${this._KEY}&language=en&pretty=1`;
		return this._httpClient.get(queryUrl).pipe(
			map((data: ICoordsJson) => {
				if (!data.results.length) {
					this._errorMsg.onErrorMessage(this._dict.errorNameCity[this._currentLang]);
				}
				return data;
			}),
			catchError((err: Error) => {
				this._errorMsg.onErrorMessage(this._dict.errorNameCity[this._currentLang]);
				this._store.dispatch(loadDataFinish());
				return throwError(err);
			})
		);
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
