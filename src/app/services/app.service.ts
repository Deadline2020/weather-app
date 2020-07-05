import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { IAppState } from '../store/state/app.state';
import { getCurrentCoords } from '../store/actions/get-coords.actions';
import { setTemperatureUnit } from '../store/actions/temperature-unit.actions';
import { selectIsInit } from '../store/selectors/is-init.selector';
import { selectBgImage } from '../store/selectors/bg-image.selector';
import { selectTempUnit } from '../store/selectors/temperature-unit.selector';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class AppService implements OnDestroy {
	private destroySubject$: Subject<boolean> = new Subject();
	private currentTempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit), takeUntil(this.destroySubject$));
	private _keyLS: string = 'appWeatherSnapshot';
	private currentLang: string = 'ru';
	private _currentTempUnit: string;

	public appInit$: Observable<boolean> = this._store.pipe(select(selectIsInit));
	public bgImage$: Observable<string> = this._store.pipe(select(selectBgImage));

	constructor(
		private _store: Store<IAppState>,
		private translator: TranslocoService,
	) {
		this.initApp();
		this.currentTempUnit$.subscribe((unit: string) => {
			this._currentTempUnit = unit;
		});
	}
	public initApp = (): void => {
		const dataFromLS: string | null = localStorage.getItem(this._keyLS);
		if (dataFromLS !== null) {
			const [lang, unitTemp]: string[] = JSON.parse(localStorage.getItem(this._keyLS));
			this.currentLang = lang;
			this._store.dispatch(setTemperatureUnit(unitTemp));
		}
		this.translator.load(this.currentLang).pipe(takeUntil(this.destroySubject$)).subscribe(() => {
			this.translator.setActiveLang(this.currentLang);
			this._store.dispatch(getCurrentCoords());
		});
	}

	public ngOnDestroy(): void {
		localStorage.setItem(this._keyLS, JSON.stringify([this.currentLang, this._currentTempUnit]));
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
