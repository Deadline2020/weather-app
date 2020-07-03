import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IIsNewRequestState } from '../state/is-new-request.state';

const isNewRequestState: (state: IAppState) => IIsNewRequestState = (state: IAppState) => state.isNewRequest;

export const selectIsNewRequest: MemoizedSelector<IAppState, boolean> = createSelector(
	isNewRequestState,
	(state: IIsNewRequestState) => state.isNewRequest
);
