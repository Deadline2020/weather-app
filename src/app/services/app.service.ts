import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { getBgImage } from '../store/actions/bg-image.actions';
import { IBgImage } from '../models/bg-image';
import { selectBgImage } from '../store/selectors/bg-image.selector';
import { setCurrentLanguage } from '../store/actions/lang.actions';

@Injectable()
export class AppService implements OnDestroy {

	private destroySubject$: Subject<boolean> = new Subject();
	// private bgImgUrl: string;
	public bgImage$: Observable<IBgImage> = this._store.pipe(select(selectBgImage));

	constructor(
		private _store: Store<IAppState>,
	) {
		this.initApp();
	}

	public initApp = (): void => {
		this._store.dispatch(getBgImage(['winter', 'day']));
		this._store.dispatch(setCurrentLanguage('ru'));
	}

	public ngOnDestroy(): void {
		this.destroySubject$.next(true);
		this.destroySubject$.complete();
	}
}
