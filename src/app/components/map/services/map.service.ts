import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { ICoords } from 'src/app/models/coords';
import { IAppState } from 'src/app/store/state/app.state';
import { getAllInfo } from '../../../store/actions/get-all-info.actions';
import { loadDataStart } from 'src/app/store/actions/isLoad.actions';
import { getCoordsSuccess } from 'src/app/store/actions/get-coords.actions';
import { setNeedNewRequest } from 'src/app/store/actions/is-new-request.actions';
import { selectCoords } from 'src/app/store/selectors/coords.selector';

@Injectable()
export class MapService {

	public currentCoords$: Observable<ICoords> = this._store.pipe(select(selectCoords));
	constructor(private _store: Store<IAppState>) { }

	public getInfoAboutLocation = (e: { lngLat: { wrap: () => { lng: number, lat: number } } }): void => {
		if (e.lngLat !== undefined) {
			const latitude: number = e.lngLat.wrap().lat;
			const longitude: number = e.lngLat.wrap().lng;
			this._store.dispatch(getCoordsSuccess({ latitude, longitude }));
			this._store.dispatch(setNeedNewRequest());
			this._store.dispatch(loadDataStart());
			this._store.dispatch(getAllInfo({ latitude, longitude, withBgImg: true }));
		}
	}
}
