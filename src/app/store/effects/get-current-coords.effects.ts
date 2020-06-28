import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
	ICoordsActions, ECoordsActions, getCoordsSuccess,
	ICurrentCoordsActions
} from '../actions/get-coords.actions';
import { GetCoordsService } from '../../services/get-coords.service';
import { ICoords } from 'src/app/models/coords';
import { getAllInfo, IGetAllInfoActions } from '../actions/get-all-info.actions';

@Injectable()
export class GetCurCoordsEffects {

	@Effect()
	public getCurrentCoords$: Observable<ICoordsActions | IGetAllInfoActions> = this._actions$.pipe(
		ofType<ICurrentCoordsActions>(ECoordsActions.GetCurrentCoords),
		switchMap(() => this._getCoordsService.getCurLocation()),
		switchMap((data: ICoords) => {
			return [
				getCoordsSuccess(data),
				getAllInfo({ latitude: data.latitude, longitude: data.longitude, withBgImg: true }),
			];
		}),
	);

	constructor(
		private _actions$: Actions,
		private _getCoordsService: GetCoordsService,
	) { }
}
