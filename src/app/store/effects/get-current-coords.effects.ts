import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ICoordsActions, ECoordsActions, getCoordsSuccess } from '../actions/coords.actions';
import { GetCoordsService } from '../../services/get-coords';
import { ICoords } from 'src/app/models/coords';
import { getAllInfo, IGetAllInfoActions } from '../actions/get-all-info.actions';

@Injectable()
export class GetCurCoordsEffects {

	@Effect()
	public getCoords$: Observable<ICoordsActions | IGetAllInfoActions> = this._actions$.pipe(
		ofType<ICoordsActions>(ECoordsActions.GetCoords),
		switchMap(() => this._getCoordsService.getCurLocation()),
		switchMap((data: ICoords) => [
			getCoordsSuccess(data),
			getAllInfo(data),
		]),
	);

	constructor(
		private _actions$: Actions,
		private _getCoordsService: GetCoordsService,
	) { }
}
