import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../store/state/app.state';
import { getCurrentCoords } from '../store/actions/get-coords.actions';
import { selectIsInit } from '../store/selectors/temperature-unit copy';
import { selectBgImage } from '../store/selectors/bg-image.selector';

@Injectable()
export class AppService {
	private _keyLS: string = 'appWeatherSnapshot';
	public appInit$: Observable<boolean> = this._store.pipe(select(selectIsInit));
	public bgImage$: Observable<string> = this._store.pipe(select(selectBgImage));

	constructor(
		private _store: Store<IAppState>,
	) {
		this.initApp();
		// ! нужна сохранение в LS
	}
	public initApp = (): void => {
		const dataFromLS: string | null = localStorage.getItem(this._keyLS);
		if (dataFromLS !== null) {
			// ! DISPATCH температуру и язык
		}
		this._store.dispatch(getCurrentCoords());
	}
}
