import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ECoordsActions, getCoordsSuccess, ICityCoordsActions, getCityCoordsMistake, ICoordsActions } from '../actions/get-coords.actions';
import { GetCoordsService } from '../../services/get-coords.service';
import { getAllInfo, IGetAllInfoActions } from '../actions/get-all-info.actions';
import { ICoordsJson } from 'src/app/models/coords-json';
import { loadDataFinish, ILoadDataActions } from '../actions/isLoad.actions';

@Injectable()
export class GetCityCoordsEffects {

	@Effect()
	public getCityCoords$: Observable<ILoadDataActions | ICityCoordsActions | ICoordsActions | IGetAllInfoActions> = this._actions$.pipe(
		ofType<ICityCoordsActions>(ECoordsActions.GetCityCoords),
		switchMap((data: ICityCoordsActions) => this._getCoordsService.getCityLocation(data.payload)),
		switchMap((data: ICoordsJson) => {
			if (!data.results.length) {
				return [
					getCityCoordsMistake(),
					loadDataFinish(),
				];
			} else {
				return [
					getCoordsSuccess({ latitude: data.results[0].geometry.lat, longitude: data.results[0].geometry.lng }),
					getAllInfo({ latitude: data.results[0].geometry.lat, longitude: data.results[0].geometry.lng, withBgImg: true }),
				];
			}
		}),
	);

	constructor(
		private _actions$: Actions,
		private _getCoordsService: GetCoordsService,
	) { }
}
