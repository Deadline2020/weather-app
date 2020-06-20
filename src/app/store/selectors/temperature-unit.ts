import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ITemperatureUnitState } from '../state/temperature-unit.state';

const tempUnitState: (state: IAppState) => ITemperatureUnitState = (state: IAppState) => state.temperatureUnit;

export const selectTempUnit: MemoizedSelector<IAppState, string> = createSelector(
  tempUnitState,
  (state: ITemperatureUnitState) => state.temperatureUnit
);
