import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../store/state/app.state';
import { getCurrentCoords } from '../store/actions/get-coords.actions';
import { selectIsInit } from '../store/selectors/temperature-unit copy';
import { selectBgImage } from '../store/selectors/bg-image.selector';
import { selectLanguage } from '../store/selectors/language.selector';
import { selectTempUnit } from '../store/selectors/temperature-unit';
import { takeUntil } from 'rxjs/operators';
import { setTemperatureUnit } from '../store/actions/temperature-unit.actions';
import { setCurrentLanguage } from '../store/actions/language.actions';

@Injectable()
export class AppService implements OnDestroy {
	private destroySubject$: Subject<boolean> = new Subject();
	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage), takeUntil(this.destroySubject$));
	private currentTempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit), takeUntil(this.destroySubject$));
	private _keyLS: string = 'appWeatherSnapshot';
	private _currentLang: string;
	private _currentTempUnit: string;
	public appInit$: Observable<boolean> = this._store.pipe(select(selectIsInit));
	public bgImage$: Observable<string> = this._store.pipe(select(selectBgImage));

	constructor(
		private _store: Store<IAppState>,
	) {
		this.initApp();
		this.currentLang$.subscribe((lang: string) => {
			this._currentLang = lang;
		});
		this.currentTempUnit$.subscribe((unit: string) => {
			this._currentTempUnit = unit;
		});
	}
	public initApp = (): void => {
		const dataFromLS: string | null = localStorage.getItem(this._keyLS);
		if (dataFromLS !== null) {
			const [lang, unitTemp]: string[] = JSON.parse(localStorage.getItem(this._keyLS));
			this._store.dispatch(setTemperatureUnit(unitTemp));
			this._store.dispatch(setCurrentLanguage(lang));
		}
		this._store.dispatch(getCurrentCoords());
	}

	public ngOnDestroy(): void {
		localStorage.setItem(this._keyLS, JSON.stringify([this._currentLang, this._currentTempUnit]));
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
