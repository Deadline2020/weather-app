import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IForecastState } from '../state/forecast.state';
import { IForecastDayJson } from 'src/app/models/forecast-day-json';

const forecastState: (state: IAppState) => IForecastState = (state: IAppState) => state.forecast;

export const selectForecastShort: MemoizedSelector<IAppState, IForecastDayJson[]> = createSelector(
	forecastState,
	(state: IForecastState) => state.forecast.weeklyForecastData
);
