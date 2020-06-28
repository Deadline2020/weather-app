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
import { selectTempUnit } from 'src/app/store/selectors/temperature-unit.selector';
import { setTemperatureUnit } from 'src/app/store/actions/temperature-unit.actions';
import { getAllInfo } from 'src/app/store/actions/get-all-info.actions';
import { selectCoords } from 'src/app/store/selectors/coords.selector';
import { ICoords } from 'src/app/models/coords';
import { SpeechRecognitionService } from './speech-recognition.service';
import { SpeechSynthesisService } from './speech-synthesis.service';
import { VoiceService } from './voice.service';

@Injectable()
export class ControlsService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	private currentLang$: Observable<string> = this._store.pipe(select(selectLanguage, takeUntil(this.destroySubject$)));
	public isRecordOn: boolean = false;
	public _currentLang: string;
	public isLoaded$: Observable<boolean> = this._store.pipe(select(selectIsLoaded, takeUntil(this.destroySubject$)));
	public tempUnit$: Observable<string> = this._store.pipe(select(selectTempUnit, takeUntil(this.destroySubject$)));
	public coords$: Observable<ICoords> = this._store.pipe(select(selectCoords, takeUntil(this.destroySubject$)));
	public searchBtn: string = null;
	public searchPlaceholder: string = null;
	public inputSearchValue: string;
	public coords: ICoords;

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
		private _errorMsg: ErrorMsgService,
		private _recognition: SpeechRecognitionService,
		private _speaker: SpeechSynthesisService,
		private _voiceMsgService: VoiceService,
	) {
		this.currentLang$.subscribe((lang: string) => {
			this._currentLang = lang;
			this.searchBtn = this._dict.searchBtn[lang];
			this.searchPlaceholder = this._dict.searchPlaceholder[lang];
		});
		this.isLoaded$.subscribe((flag: boolean) => {
			if (flag) { this.inputSearchValue = ''; }
		});
		this.coords$.subscribe((coords: ICoords) => {
			this.coords = coords;
		});
	}


	public searchCity = (nameCity: string): void => {
		if (nameCity.length < 2) {
			this._errorMsg.onErrorMessage(this._dict.errorNameCity[this._currentLang]);
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
		this._store.dispatch(getAllInfo({
			latitude: this.coords.latitude,
			longitude: this.coords.longitude,
			withBgImg: false,
			language: lang,
		}));
	};

	public recordStart = (): void => {
		this.isRecordOn = true;
		this._recognition.recordOn$()
			.subscribe(
				(nameCity: string) => {
					this.inputSearchValue = nameCity;
					this._store.dispatch(loadDataStart());
					this._store.dispatch(getCityCoords(nameCity));
				},
				(err: Error) => {
					console.log(err);
					this.isRecordOn = false;
				},
				() => {
					this.isRecordOn = false;
				}
			);
	}

	public speakerStart = (): void => {
		const msg: string = this._voiceMsgService.getTextVoiceMessage();
		const langLocal: string = this._voiceMsgService.getLangLocal();
		this._speaker.startSpeaker(msg, langLocal);
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
