import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ICoordsState } from '../state/coords.state';
import { ICoords } from 'src/app/models/coords';

const coordsState: (state: IAppState) => ICoordsState = (state: IAppState) => state.coords;

export const selectCoords: MemoizedSelector<IAppState, ICoords> = createSelector(
  coordsState,
  (state: ICoordsState) => state.coords
);
