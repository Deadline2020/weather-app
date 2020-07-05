import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { IAppState } from 'src/app/store/state/app.state';
import { IForecast } from 'src/app/models/forecast';
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit.selector';
import { selectForecast } from 'src/app/store/selectors/forecast.selector';
import { HelpersService } from 'src/app/services/helpers.service';

@Injectable()
export class VoiceService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	private tempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit, takeUntil(this.destroySubject$)));
	private _tempUnit: string;
	private forecast$: Observable<IForecast> = this._store.pipe(select(selectForecast, takeUntil(this.destroySubject$)));
	private _forecast: IForecast;

	constructor(
		private _store: Store<IAppState>,
		private _helperService: HelpersService,
		private translator: TranslocoService,

	) {
		this.tempUnit$.subscribe((unit: string) => {
			this._tempUnit = unit;
		});
		this.forecast$.subscribe((forecast: IForecast) => {
			this._forecast = forecast;
		});
	}

	public getLangLocal = (): string => {
		if (this.translator.getActiveLang() === 'en') { return 'en-US'; }
		return 'ru-RU';
	}

	public getTextVoiceMessage = (): string => {
		const PERCENT: number = 100;
		const tempWord: string = this.translator.translate('temperature');
		const tempValue: string = this._helperService.getTempAsString(this._tempUnit, this._forecast.curTemperature);
		const shortSummary: string = this._forecast.curShortlyForecast;
		const wing: string = `${this.translator.translate('wind')} ${Math.round(this._forecast.curWindSpeed)}${this.translator.translate('speed')}`;
		const humidity: string = `${this.translator.translate('humidity')} ${Math.round(this._forecast.curHumidity * PERCENT)}%`;
		return `${tempWord}${tempValue}${this._tempUnit}. ${shortSummary} ${wing}, ${humidity}`;
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
