import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IForecastHourlyState } from '../state/forecast-hourly.state';
import { IForecastHour } from 'src/app/models/forecast-hour';

const forecastHourlyState: (state: IAppState) => IForecastHourlyState = (state: IAppState) => state.forecastHourly;

export const selectForecastHourly: MemoizedSelector<IAppState, IForecastHour[][]> = createSelector(
	forecastHourlyState,
	(state: IForecastHourlyState) => state.forecastHourly
);
