import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { EForecastActions, IForecastHourRequestActions, getHourlyForecastSuccess } from '../actions/forecast.actions';
import { GetInfoForecastService } from 'src/app/services/get-info-forecast.service';
import { IForecastHour } from 'src/app/models/forecast-hour';
import { setRequestSuccess, IIsNewRequestActions } from '../actions/is-new-request.actions';

@Injectable()
export class GetHourlyForecastEffects {

	@Effect()
	public getHourlyForecast$: Observable<IIsNewRequestActions> = this._actions$.pipe(
		ofType<IForecastHourRequestActions>(EForecastActions.GetHourlyForecast),
		switchMap((data: IForecastHourRequestActions) => this._getInfoForecastService.getHourlyForecast(data.payload)),
		switchMap((data: IForecastHour[][]) => [
			setRequestSuccess(),
			getHourlyForecastSuccess(data),
		]),
	);

	constructor(
		private _actions$: Actions,
		private _getInfoForecastService: GetInfoForecastService,
	) { }
}
