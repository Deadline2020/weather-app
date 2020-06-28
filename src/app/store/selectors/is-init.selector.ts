import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IIsInitState } from '../state/is-init.state';

const isInitState: (state: IAppState) => IIsInitState = (state: IAppState) => state.isInit;

export const selectIsInit: MemoizedSelector<IAppState, boolean> = createSelector(
	isInitState,
	(state: IIsInitState) => state.isInit
);
