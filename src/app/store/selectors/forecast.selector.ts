import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IForecastState } from '../state/forecast.state';
import { IForecast } from 'src/app/models/forecast';

const forecastState: (state: IAppState) => IForecastState = (state: IAppState) => state.forecast;

export const selectForecast: MemoizedSelector<IAppState, IForecast> = createSelector(
  forecastState,
  (state: IForecastState) => state.forecast
);
