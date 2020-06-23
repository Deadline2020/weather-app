import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { IAppState } from 'src/app/store/state/app.state';
import { selectLanguage } from 'src/app/store/selectors/language.selector';
import { DictService } from 'src/app/services/translate-data.service';
import { getCityCoords } from 'src/app/store/actions/get-coords.actions';
import { ErrorMsgService } from 'src/app/services/error-msg.service';
import { selectIsLoaded } from 'src/app/store/selectors/is-loaded.selector';
import { loadDataStart } from 'src/app/store/actions/isLoad.actions';
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit';
import { setTemperatureUnit } from 'src/app/store/actions/temperature-unit.actions';
import { setCurrentLanguage } from 'src/app/store/actions/language.actions';
import { getAllInfo } from 'src/app/store/actions/get-all-info.actions';
import { selectCoords } from 'src/app/store/selectors/coords.selector';
import { ICoords } from 'src/app/models/coords';

@Injectable()
export class ControlsService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage, takeUntil(this.destroySubject$)));
	public _currentLang: string;

	public isLoaded$: Observable<boolean> = this._store.pipe(select(selectIsLoaded, takeUntil(this.destroySubject$)));
	public tempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit, takeUntil(this.destroySubject$)));
	public coords$: Observable<ICoords> = this._store.pipe(select(selectCoords, takeUntil(this.destroySubject$)));
	public searchBtn: string = null;
	public searchPlaceholder: string = null;
	public inputSearchValue: string;
	public coords: ICoords;
	// public isLoaded: boolean;

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
		private _errorMsg: ErrorMsgService,
	) {
		this.currentLang$.subscribe((lang: string) => {
			this._currentLang = lang;
			this.searchBtn = this._dict.searchBtn[lang];
			this.searchPlaceholder = this._dict.searchPlaceholder[lang];
		});
		this.isLoaded$.subscribe((flag: boolean) => {
			// this.isLoaded = flag;
			if (flag) { this.inputSearchValue = ''; }
		});
		this.coords$.subscribe((coords: ICoords) => {
			this.coords = coords;
		});
	}

	public searchCity = (nameCity: string): void => {
		if (nameCity === '') {// ! проверь может и без этой проверки заработатет
			this._errorMsg.onErrorMessage(this._dict.errorNameCity[this._currentLang]);
			// this.inputSearchValue = '';
			return;
		}
		this.inputSearchValue = nameCity;
		this._store.dispatch(loadDataStart());
		this._store.dispatch(getCityCoords(nameCity));
	}

	public changeTempUnit = (unit: string): void => {
		this._store.dispatch(setTemperatureUnit(unit));
	}

	public changeLang = (lang: string): void => {
		// this._store.dispatch(setCurrentLanguage(lang));
		this._store.dispatch(getAllInfo({
			latitude: this.coords.latitude,
			longitude: this.coords.longitude,
			withBgImg: false,
			language: lang,
		}));
	};

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
