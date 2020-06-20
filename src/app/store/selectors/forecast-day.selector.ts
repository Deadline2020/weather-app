import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IForecastDayState } from '../state/forecast-day.state';
import { IForecastDay } from 'src/app/models/forecast-day';

const forecastDayState: (state: IAppState) => IForecastDayState = (state: IAppState) => state.forecastDay;

export const selectForecastDay: MemoizedSelector<IAppState, IForecastDay> = createSelector(
  forecastDayState,
  (state: IForecastDayState) => state.forecastDay
);
