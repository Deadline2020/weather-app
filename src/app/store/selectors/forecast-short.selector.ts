import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IForecastState } from '../state/forecast.state';
import { IForecastShortJson } from 'src/app/models/forecast-short-json';

const forecastState: (state: IAppState) => IForecastState = (state: IAppState) => state.forecast;

export const selectForecastShort: MemoizedSelector<IAppState, IForecastShortJson[]> = createSelector(
	forecastState,
	(state: IForecastState) => state.forecast.weeklyForecastData
);
