import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IForecastDay } from 'src/app/models/forecast-day';
import { IInfoLocation } from 'src/app/models/info-location';
import { IGetAllInfoActions, EGetAllInfoActions } from '../actions/get-all-info.actions';
import { getBgImageSuccess, IBgImageActions } from '../actions/bg-image.actions';
import { getInfoLocationSuccess, IInfoLocationActions } from '../actions/info-location.actions';
import { getDayForecastSuccess, IForecastDayActions } from '../actions/forecast.actions';
import { GetAllInfoService } from '../../services/get-all-info.service';

@Injectable()
export class GetAllInfoEffects {

	@Effect()
	public getAllInfo$: Observable<IInfoLocationActions | IBgImageActions | IForecastDayActions> = this._actions$.pipe(
		ofType<IGetAllInfoActions>(EGetAllInfoActions.GetAllInfo),
		switchMap((data: IGetAllInfoActions) => {
			return this._getAllInfoService.getAllInfo(data.payload);
		}),
		switchMap((data: [[IInfoLocation, string], IForecastDay]) => [
			getInfoLocationSuccess(data[0][0]),
			getBgImageSuccess(data[0][1]),
			getDayForecastSuccess(data[1]),
		]),
	);

	constructor(
		private _actions$: Actions,
		private _getAllInfoService: GetAllInfoService,
	) { }
}
