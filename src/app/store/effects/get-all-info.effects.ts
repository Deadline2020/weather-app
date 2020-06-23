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
import { loadDataFinish, ILoadDataActions } from '../actions/isLoad.actions';
import { setCurrentLanguage, ILanguageActions } from '../actions/language.actions';

@Injectable()
export class GetAllInfoEffects {

	@Effect()
	public getAllInfo$: Observable<IInfoLocationActions | IBgImageActions |
		IForecastDayActions | ILanguageActions | ILoadDataActions> = this._actions$.pipe(
			ofType<IGetAllInfoActions>(EGetAllInfoActions.GetAllInfo),
			switchMap((data: IGetAllInfoActions) => this._getAllInfoService.getAllInfo(data.payload)),
			switchMap((data: [[IInfoLocation, string], IForecastDay, string]) => [
				getInfoLocationSuccess(data[0][0]),
				getBgImageSuccess(data[0][1]),
				getDayForecastSuccess(data[1]),
				setCurrentLanguage(data[2]),
				loadDataFinish(),
			]),
		);

	constructor(
		private _actions$: Actions,
		private _getAllInfoService: GetAllInfoService,
	) { }
}
