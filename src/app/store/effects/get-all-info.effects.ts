import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IForecast } from 'src/app/models/forecast';
import { IInfoLocation } from 'src/app/models/info-location';
import { IGetAllInfoActions, EGetAllInfoActions } from '../actions/get-all-info.actions';
import { getBgImageSuccess, IBgImageActions } from '../actions/bg-image.actions';
import { getInfoLocationSuccess, IInfoLocationActions } from '../actions/info-location.actions';
import { getDayForecastSuccess, IForecastShortActions } from '../actions/forecast.actions';
import { loadDataFinish, ILoadDataActions } from '../actions/isLoad.actions';
import { setIsInitTrue, IIsInitActions } from '../actions/is-init.actions';
import { GetAllInfoService } from '../../services/get-all-info.service';

@Injectable()
export class GetAllInfoEffects {

	@Effect()
	public getAllInfo$: Observable<IInfoLocationActions | IBgImageActions |
		IForecastShortActions | ILoadDataActions | IIsInitActions> = this._actions$.pipe(
			ofType<IGetAllInfoActions>(EGetAllInfoActions.GetAllInfo),
			switchMap((data: IGetAllInfoActions) => this._getAllInfoService.getAllInfo(data.payload)),
			switchMap((data: [[IInfoLocation, string], IForecast]) => [
				getInfoLocationSuccess(data[0][0]),
				getBgImageSuccess(data[0][1]),
				getDayForecastSuccess(data[1]),
				loadDataFinish(),
				setIsInitTrue(),
			]),
		);

	constructor(
		private _actions$: Actions,
		private _getAllInfoService: GetAllInfoService,
	) { }
}
