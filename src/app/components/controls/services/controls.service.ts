import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from 'src/app/store/state/app.state';
import { Subject, Observable } from 'rxjs';
import { ILanguageData } from 'src/app/models/language-data';
import { selectLanguage } from 'src/app/store/selectors/language.selector';

@Injectable()
export class ControlsService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	public currentLang$: Observable<ILanguageData> = this._store.pipe(select(selectLanguage));

	public searchBtn: string = null;
	public searchPlaceholder: string = null;

	constructor(
		private _store: Store<IAppState>,
	) {
		this.currentLang$.subscribe((langData: ILanguageData) => {
			this.searchBtn = langData.dict.searchBtn[langData.lang];
			this.searchPlaceholder = langData.dict.searchPlaceholder[langData.lang];
		});
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
