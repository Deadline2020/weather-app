import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IForecastState } from '../state/forecast.state';
import { IForecastWeekJson } from 'src/app/models/forecast-week-json';

const forecastState: (state: IAppState) => IForecastState = (state: IAppState) => state.forecast;

export const selectForecastShort: MemoizedSelector<IAppState, IForecastWeekJson[]> = createSelector(
	forecastState,
	(state: IForecastState) => state.forecast.weekForecastData
);
