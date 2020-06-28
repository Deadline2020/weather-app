import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { selectLanguage } from 'src/app/store/selectors/language.selector';
import { DictService } from 'src/app/services/translate-data.service';
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { HelpersService } from 'src/app/services/helpers.service';
import { selectForecast } from 'src/app/store/selectors/forecast.selector';
import { IForecast } from 'src/app/models/forecast';

@Injectable()
export class VoiceService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage, takeUntil(this.destroySubject$)));
	private _currentLang: string;
	private tempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit, takeUntil(this.destroySubject$)));
	private _tempUnit: string;
	private forecast$: Observable<IForecast> = this._store.pipe(select(selectForecast, takeUntil(this.destroySubject$)));
	private _forecast: IForecast;

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
		private _helperService: HelpersService,

	) {
		this.currentLang$.subscribe((lang: string) => {
			this._currentLang = lang;
		});
		this.tempUnit$.subscribe((unit: string) => {
			this._tempUnit = unit;
		});
		this.forecast$.subscribe((forecast: IForecast) => {
			this._forecast = forecast;
		});
	}

	public getLangLocal = (): string => {
		if (this._currentLang === 'en') { return 'en-US'; }
		return 'ru-RU';
	}

	public getTextVoiceMessage = (): string => {
		const tempWord: string = this._dict.temperature[this._currentLang];
		const tempValue: string = this._helperService.getTempAsString(this._tempUnit, this._forecast.curTemperature);
		const shortSummary: string = this._forecast.curShortlyForecast;
		const wing: string = this._helperService.getWindSpeedAsString(this._forecast.curWindSpeed, this._currentLang);
		const humidity: string = this._helperService.getHumidityAsString(this._forecast.curHumidity, this._currentLang);

		return `${tempWord}${tempValue}${this._tempUnit}. ${shortSummary} ${wing}, ${humidity}`;
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
