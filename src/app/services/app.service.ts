import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../store/state/app.state';
import { selectBgImage } from '../store/selectors/bg-image.selector';
import { getCurrentCoords } from '../store/actions/get-coords.actions';

@Injectable()
export class AppService {
	private _keyLS: string = 'appWeatherSnapshot';
	public bgImage$: Observable<string> = this._store.pipe(select(selectBgImage));

	constructor(
		private _store: Store<IAppState>,
	) {
		this.initApp();
	}
	// ! нужна заглушка на картинку - вроде иногда траблы?, проверь
	public initApp = (): void => {
		const dataFromLS: string | null = localStorage.getItem(this._keyLS);
		if (dataFromLS !== null) {
			// ! DISPATCH температуру и язык
		}
		this._store.dispatch(getCurrentCoords());
	}
}
