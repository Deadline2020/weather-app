import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { IAppState } from 'src/app/store/state/app.state';
import { selectLanguage } from 'src/app/store/selectors/language.selector';
import { DictService } from 'src/app/services/translate-data.service';

@Injectable()
export class ControlsService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	public currentLang$: Observable<string> = this._store.pipe(select(selectLanguage, takeUntil(this.destroySubject$)));

	public searchBtn: string = null;
	public searchPlaceholder: string = null;

	constructor(
		private _store: Store<IAppState>,
		private _dict: DictService,
	) {
		this.currentLang$.subscribe((lang: string) => {
			this.searchBtn = this._dict.searchBtn[lang];
			this.searchPlaceholder = this._dict.searchPlaceholder[lang];
		});
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
