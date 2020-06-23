import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IIsLoadedState } from '../state/is-loaded.state';

const islLoadedState: (state: IAppState) => IIsLoadedState = (state: IAppState) => state.isLoaded;

export const selectIsLoaded: MemoizedSelector<IAppState, boolean> = createSelector(
  islLoadedState,
  (state: IIsLoadedState) => state.isLoaded
);
